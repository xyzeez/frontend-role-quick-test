import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router";
import { ArrowLeftIcon } from "lucide-react";
import gtbankImg from "@/assets/gtbank.jpeg";
import accessbankImg from "@/assets/accessbank.png";
import zenithbankImg from "@/assets/zenithbank.png";
import ubaImg from "@/assets/uba.jpeg";

type BankItem = {
  label: string;
  value: string;
  image: string;
};

const banks: BankItem[] = [
  { label: "Access Bank", value: "access_bank", image: accessbankImg },
  { label: "Zenith Bank", value: "zenith_bank", image: zenithbankImg },
  { label: "GTBank", value: "gtbank", image: gtbankImg },
  { label: "UBA", value: "uba", image: ubaImg },
];

const formSchema = z.object({
  bank: z.string().min(1, "Bank is required"),
  accountNumber: z
    .string()
    .min(1, "Account number is required")
    .refine(
      (val) => /^\d+$/.test(val),
      "Account number must contain only digits",
    ),
  accountName: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

export default function BankInfo() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      bank: "",
      accountNumber: "",
      accountName: "John Doe",
    },
  });

  const onSubmit = (data: FormData) => {
    console.log("Form submitted:", data);
    console.log("Bank info:", {
      bank: data.bank,
      accountNumber: data.accountNumber,
      accountName: data.accountName,
    });
  };

  return (
    <div className="grid grid-rows-[auto_1fr] space-y-10">
      <header className="grid grid-cols-[1fr_auto_1fr] items-center justify-between">
        <div>
          <Link to="/" className="block w-fit">
            <ArrowLeftIcon className="text-foreground" />
          </Link>
        </div>
        <div className="text-center">
          <h1 className="text-primary text-center text-xl font-medium">
            Recipient details
          </h1>
        </div>
        <div />
      </header>
      <form
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-y-8 lg:gap-y-10"
      >
        <div className="space-y-4 lg:space-y-6">
          <div className="space-y-4">
            <Label htmlFor="bank">Bank</Label>
            <Controller
              name="bank"
              control={control}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger id="bank">
                    <SelectValue placeholder="Select bank" />
                  </SelectTrigger>
                  <SelectContent>
                    {banks.map((bank) => (
                      <SelectItem key={bank.value} value={bank.value}>
                        <div className="flex items-center gap-x-2">
                          <img
                            src={bank.image}
                            alt={bank.label}
                            className="size-5 rounded-full border"
                          />
                          <span>{bank.label}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.bank && (
              <p className="text-xs text-red-500">{errors.bank.message}</p>
            )}
          </div>

          <div className="space-y-4">
            <Label htmlFor="accountNumber">Account Number</Label>
            <Input
              id="accountNumber"
              type="text"
              placeholder="Enter account number"
              {...register("accountNumber")}
            />
            {errors.accountNumber && (
              <p className="text-xs text-red-500">
                {errors.accountNumber.message}
              </p>
            )}
          </div>

          <div className="space-y-4">
            <Label htmlFor="accountName">Account Name</Label>
            <Input
              id="accountName"
              type="text"
              defaultValue="John Doe"
              disabled
              {...register("accountName")}
            />
          </div>
        </div>
        <Button type="submit" size="lg" className="mt-auto w-full">
          Next
        </Button>
      </form>
    </div>
  );
}
