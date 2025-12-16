import { useState, useEffect } from "react";
import { useForm, Controller, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ethImg from "@/assets/eth.png";
import rainbowImg from "@/assets/rainbow.png";
import metamaskImg from "@/assets/metamask.jpeg";
import walletconnectImg from "@/assets/wallet-connect.jpeg";
import usdtImg from "@/assets/usdt.jpeg";
import usdcImg from "@/assets/usdc.png";
import bnbImg from "@/assets/bnb.jpeg";
import ngnImg from "@/assets/ngn.png";
import usdImg from "@/assets/usd.png";
import eurImg from "@/assets/eur.jpg";
import gbpImg from "@/assets/gbp.jpg";
import { ChevronDownIcon, SearchIcon, Wallet } from "lucide-react";

type SelectItem = {
  label: string;
  value: string;
  image?: string;
};

// Crypto currencies
const cryptoCurrencies: SelectItem[] = [
  { label: "ETH", value: "eth", image: ethImg },
  { label: "USDT", value: "usdt", image: usdtImg },
  { label: "USDC", value: "usdc", image: usdcImg },
  { label: "BNB", value: "bnb", image: bnbImg },
];

// Real currencies
const realCurrencies: SelectItem[] = [
  { label: "NGN", value: "ngn", image: ngnImg },
  { label: "USD", value: "usd", image: usdImg },
  { label: "EUR", value: "eur", image: eurImg },
  { label: "GBP", value: "gbp", image: gbpImg },
];

// Wallet options
const walletOptions: SelectItem[] = [
  { label: "MetaMask", value: "metamask", image: metamaskImg },
  { label: "Rainbow", value: "rainbow", image: rainbowImg },
  { label: "Wallet Connect", value: "walletconnect", image: walletconnectImg },
];

// Payment methods
const paymentMethods: SelectItem[] = [
  { label: "Direct Transfer", value: "direct_transfer" },
  { label: "Cash Pickup", value: "cash_pickup" },
  { label: "Bank Transfer", value: "bank_transfer" },
  { label: "Mobile Money", value: "mobile_money" },
];

// Conversion rate map: [payCurrency][receiveCurrency] = rate
const conversionRates: Record<string, Record<string, number>> = {
  eth: {
    ngn: 2500000,
    usd: 2500,
    eur: 2300,
    gbp: 2000,
  },
  usdt: {
    ngn: 1500,
    usd: 1,
    eur: 0.92,
    gbp: 0.79,
  },
  usdc: {
    ngn: 1500,
    usd: 1,
    eur: 0.92,
    gbp: 0.79,
  },
  bnb: {
    ngn: 500000,
    usd: 500,
    eur: 460,
    gbp: 400,
  },
};

const formSchema = z.object({
  payAmount: z
    .string()
    .min(1, "Amount is required")
    .refine(
      (val) => !isNaN(Number(val)) && Number(val) > 0,
      "Amount must be a positive number",
    ),
  payCurrency: z.string().min(1, "Currency is required"),
  receiveAmount: z
    .string()
    .min(1, "Amount is required")
    .refine(
      (val) => !isNaN(Number(val)) && Number(val) > 0,
      "Amount must be a positive number",
    ),
  receiveCurrency: z.string().min(1, "Currency is required"),
  payFrom: z.string().min(1, "Wallet is required"),
  payTo: z.string().min(1, "Payment method is required"),
});

type FormData = z.infer<typeof formSchema>;

export default function CryptoToCash() {
  const navigate = useNavigate();
  const [paySearchQuery, setPaySearchQuery] = useState("");
  const [receiveSearchQuery, setReceiveSearchQuery] = useState("");
  const [payIsOpen, setPayIsOpen] = useState(false);
  const [receiveIsOpen, setReceiveIsOpen] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    control,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      payAmount: "1.00",
      payCurrency: cryptoCurrencies[0].value,
      receiveAmount: "2500000.00",
      receiveCurrency: realCurrencies[0].value,
      payFrom: "",
      payTo: "",
    },
  });

  const payCurrencyValue = useWatch({ control, name: "payCurrency" });
  const receiveCurrencyValue = useWatch({ control, name: "receiveCurrency" });

  const selectedPayCurrency =
    cryptoCurrencies.find((item) => item.value === payCurrencyValue) ||
    cryptoCurrencies[0];

  const selectedReceiveCurrency =
    realCurrencies.find((item) => item.value === receiveCurrencyValue) ||
    realCurrencies[0];

  const filteredPayCurrencies = cryptoCurrencies.filter(
    (item) =>
      item.label.toLowerCase().includes(paySearchQuery.toLowerCase()) ||
      item.value.toLowerCase().includes(paySearchQuery.toLowerCase()),
  );

  const filteredReceiveCurrencies = realCurrencies.filter(
    (item) =>
      item.label.toLowerCase().includes(receiveSearchQuery.toLowerCase()) ||
      item.value.toLowerCase().includes(receiveSearchQuery.toLowerCase()),
  );

  const formatNumber = (value: string): string => {
    const numericValue = value.replace(/[^\d.]/g, "");
    if (!numericValue || numericValue === ".") return "";

    const parts = numericValue.split(".");
    const integerPart = parts[0] || "";
    const decimalPart = parts[1] || "";

    const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    return decimalPart
      ? `${formattedInteger}.${decimalPart}`
      : formattedInteger;
  };

  const parseNumber = (value: string): string => {
    return value.replace(/,/g, "");
  };

  const convertPayToReceive = (payAmount: string) => {
    const payValue = parseFloat(parseNumber(payAmount));
    if (isNaN(payValue) || payValue <= 0) return "0.00";

    const rate = conversionRates[payCurrencyValue]?.[receiveCurrencyValue];
    if (!rate) return "0.00";

    const converted = payValue * rate;
    return converted.toFixed(2);
  };

  const convertReceiveToPay = (receiveAmount: string) => {
    const receiveValue = parseFloat(parseNumber(receiveAmount));
    if (isNaN(receiveValue) || receiveValue <= 0) return "0.00";

    const rate = conversionRates[payCurrencyValue]?.[receiveCurrencyValue];
    if (!rate) return "0.00";

    const converted = receiveValue / rate;
    return converted.toFixed(2);
  };

  const payAmountValue = watch("payAmount");
  const receiveAmountValue = watch("receiveAmount");

  const handlePayAmountBlur = () => {
    if (payAmountValue) {
      const converted = convertPayToReceive(payAmountValue);
      setValue("receiveAmount", converted, { shouldValidate: true });
    }
  };

  const handleReceiveAmountBlur = () => {
    if (receiveAmountValue) {
      const converted = convertReceiveToPay(receiveAmountValue);
      setValue("payAmount", converted, { shouldValidate: true });
    }
  };

  useEffect(() => {
    const currentPayAmount = watch("payAmount");
    if (currentPayAmount && payCurrencyValue && receiveCurrencyValue) {
      const converted = convertPayToReceive(currentPayAmount);
      setValue("receiveAmount", converted, { shouldValidate: true });
    }
  }, [payCurrencyValue, receiveCurrencyValue]);

  const onSubmit = (data: FormData) => {
    navigate("/pay?tab=bank-info", {
      state: {
        cryptoToCash: {
          payAmount: data.payAmount,
          payCurrency: data.payCurrency,
          receiveAmount: data.receiveAmount,
          receiveCurrency: data.receiveCurrency,
          payFrom: data.payFrom,
          payTo: data.payTo,
        },
      },
    });
  };

  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-8 lg:space-y-10"
    >
      <div className="space-y-4 lg:space-y-6">
        <div className="border-ui-gray-3 rounded-2xl border p-4 lg:rounded-4xl lg:p-6">
          <fieldset className="space-y-2">
            <legend className="text-ui-gray-2 text-base font-medium">
              You pay
            </legend>
            <div className="grid grid-cols-[1fr_auto] items-center justify-between gap-4">
              <div>
                <label htmlFor="payAmount" className="sr-only">
                  Amount
                </label>
                <Controller
                  name="payAmount"
                  control={control}
                  render={({ field }) => (
                    <input
                      type="text"
                      id="payAmount"
                      placeholder="0.00"
                      value={field.value || ""}
                      onChange={(e) => field.onChange(e.target.value)}
                      onBlur={() => {
                        field.onBlur();
                        handlePayAmountBlur();
                      }}
                      className="text-ui-black w-full text-2xl font-semibold outline-0"
                    />
                  )}
                />
                {errors.payAmount && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.payAmount.message}
                  </p>
                )}
              </div>

              <DropdownMenu onOpenChange={setPayIsOpen} aria-visible="false">
                <DropdownMenuTrigger asChild>
                  <button
                    type="button"
                    className="bg-ui-gray-6 font-clash text-primary flex items-center gap-x-1 rounded-2xl border px-3 py-2 text-sm font-medium"
                  >
                    <img
                      src={selectedPayCurrency.image}
                      alt={selectedPayCurrency.label}
                      className="size-5 rounded-full border"
                    />
                    <span>{selectedPayCurrency.label}</span>
                    <ChevronDownIcon
                      className={`size-5 transition-transform duration-200 ${
                        payIsOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="max-w-[244px] space-y-2 rounded-2xl px-3 py-4"
                >
                  <div className="relative">
                    <SearchIcon className="text-ui-gray-2 absolute top-1/2 left-4 size-5 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search"
                      value={paySearchQuery}
                      onChange={(e) => setPaySearchQuery(e.target.value)}
                      className="border-ui-gray-3 w-full rounded-2xl border bg-transparent px-3 py-2 ps-11"
                    />
                  </div>
                  {filteredPayCurrencies.length > 0 ? (
                    filteredPayCurrencies.map((item) => (
                      <DropdownMenuItem
                        key={item.value}
                        onClick={() => {
                          setValue("payCurrency", item.value);
                          setPayIsOpen(false);
                          setPaySearchQuery("");
                          setTimeout(() => {
                            const currentPayAmount = watch("payAmount");
                            if (currentPayAmount) {
                              const converted =
                                convertPayToReceive(currentPayAmount);
                              setValue("receiveAmount", converted, {
                                shouldValidate: true,
                              });
                            }
                          }, 0);
                        }}
                      >
                        <div className="flex items-center gap-x-2">
                          <img
                            src={item.image}
                            alt={item.label}
                            className="size-6 rounded-full border"
                          />
                          <span>{item.label}</span>
                        </div>
                      </DropdownMenuItem>
                    ))
                  ) : (
                    <div className="text-ui-gray-2 py-3 text-center text-sm">
                      No results found
                    </div>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
              <input type="hidden" {...register("payCurrency")} />
            </div>
          </fieldset>
        </div>

        <div className="border-ui-gray-3 rounded-2xl border p-4 lg:rounded-4xl lg:p-6">
          <fieldset className="space-y-2">
            <legend className="text-ui-gray-2 text-base font-medium">
              You receive
            </legend>
            <div className="grid grid-cols-[1fr_auto] items-center justify-between gap-4">
              <div>
                <label htmlFor="receiveAmount" className="sr-only">
                  Amount
                </label>
                <Controller
                  name="receiveAmount"
                  control={control}
                  render={({ field }) => (
                    <input
                      type="text"
                      id="receiveAmount"
                      placeholder="0.00"
                      value={formatNumber(field.value || "")}
                      onChange={(e) => {
                        const parsed = parseNumber(e.target.value);
                        field.onChange(parsed);
                      }}
                      onBlur={() => {
                        field.onBlur();
                        handleReceiveAmountBlur();
                      }}
                      className="text-ui-black w-full text-2xl font-semibold outline-0"
                    />
                  )}
                />
                {errors.receiveAmount && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.receiveAmount.message}
                  </p>
                )}
              </div>

              <DropdownMenu
                onOpenChange={setReceiveIsOpen}
                aria-visible="false"
              >
                <DropdownMenuTrigger asChild>
                  <button
                    type="button"
                    className="bg-ui-gray-6 font-clash text-primary flex items-center gap-x-1 rounded-2xl border px-3 py-2 text-sm font-medium"
                  >
                    <img
                      src={selectedReceiveCurrency.image}
                      alt={selectedReceiveCurrency.label}
                      className="size-5 rounded-full border"
                    />
                    <span>{selectedReceiveCurrency.label}</span>
                    <ChevronDownIcon
                      className={`size-5 transition-transform duration-200 ${
                        receiveIsOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="max-w-[244px] space-y-2 rounded-2xl px-3 py-4"
                >
                  <div className="relative">
                    <SearchIcon className="text-ui-gray-2 absolute top-1/2 left-4 size-5 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search"
                      value={receiveSearchQuery}
                      onChange={(e) => setReceiveSearchQuery(e.target.value)}
                      className="border-ui-gray-3 w-full rounded-2xl border bg-transparent px-3 py-2 ps-11"
                    />
                  </div>
                  {filteredReceiveCurrencies.length > 0 ? (
                    filteredReceiveCurrencies.map((item) => (
                      <DropdownMenuItem
                        key={item.value}
                        onClick={() => {
                          setValue("receiveCurrency", item.value);
                          setReceiveIsOpen(false);
                          setReceiveSearchQuery("");
                          setTimeout(() => {
                            const currentPayAmount = watch("payAmount");
                            if (currentPayAmount) {
                              const converted =
                                convertPayToReceive(currentPayAmount);
                              setValue("receiveAmount", converted, {
                                shouldValidate: true,
                              });
                            }
                          }, 0);
                        }}
                      >
                        <div className="flex items-center gap-x-2">
                          <img
                            src={item.image}
                            alt={item.label}
                            className="size-6 rounded-full border"
                          />
                          <span>{item.label}</span>
                        </div>
                      </DropdownMenuItem>
                    ))
                  ) : (
                    <div className="text-ui-gray-2 py-3 text-center text-sm">
                      No results found
                    </div>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
              <input type="hidden" {...register("receiveCurrency")} />
            </div>
          </fieldset>
        </div>

        <div className="grid grid-rows-[auto_1fr] space-y-4">
          <Label htmlFor="payFrom">Pay from</Label>
          <Controller
            name="payFrom"
            control={control}
            render={({ field }) => {
              return (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger id="payFrom">
                    <SelectValue placeholder="Select wallet" />
                  </SelectTrigger>
                  <SelectContent>
                    {walletOptions.map((item) => (
                      <SelectItem key={item.value} value={item.value}>
                        <div className="flex items-center gap-x-2">
                          <img
                            src={item.image}
                            alt={item.label}
                            className="size-5 rounded-full border"
                          />
                          <span>{item.label}</span>
                        </div>
                      </SelectItem>
                    ))}
                    <SelectItem value="other">
                      <div className="flex items-center gap-x-2">
                        <Wallet className="size-5" />
                        <span>
                          Other Crypto Wallets (Binance, Coinbase, Bybit etc)
                        </span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              );
            }}
          />
          {errors.payFrom && (
            <p className="text-xs text-red-500">{errors.payFrom.message}</p>
          )}
        </div>

        <div className="space-y-4">
          <Label htmlFor="payTo">Pay to</Label>
          <Controller
            name="payTo"
            control={control}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className="w-full" id="payTo">
                  <SelectValue placeholder="Select payment method" />
                </SelectTrigger>
                <SelectContent>
                  {paymentMethods.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.payTo && (
            <p className="text-xs text-red-500">{errors.payTo.message}</p>
          )}
        </div>
      </div>

      <Button type="submit" size="lg" className="w-full">
        Convert now
      </Button>
    </form>
  );
}
