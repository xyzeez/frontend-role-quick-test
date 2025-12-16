import { Button } from "@/components/ui/button";
import { Link, useNavigate, useLocation, Navigate } from "react-router";
import { ArrowLeftIcon, CircleAlert, CopyIcon } from "lucide-react";
import { Clipboarder } from "@/components/common/Clipboarder";

// Currency mapping
const currencyMap: Record<string, string> = {
  eth: "ETH",
  usdt: "USDT",
  usdc: "USDC",
  bnb: "BNB",
};

// Wallet mapping
const walletMap: Record<string, string> = {
  metamask: "MetaMask",
  rainbow: "Rainbow",
  walletconnect: "Wallet Connect",
  other: "Other",
};

export default function SenderDetails() {
  const navigate = useNavigate();
  const location = useLocation();

  // Get currency and wallet from form data
  const payCurrency = location.state?.cryptoToCash?.payCurrency || "eth";
  const currencyLabel = currencyMap[payCurrency] || payCurrency.toUpperCase();
  const payAmount = location.state?.cryptoToCash?.payAmount || "100";
  const payFrom = location.state?.cryptoToCash?.payFrom || "other";
  const walletLabel = walletMap[payFrom] || "Other";

  const summaryData = [
    {
      label: "Amount to send",
      text: `${payAmount} ${currencyLabel}`,
      icon: CopyIcon,
    },
    {
      label: "Network",
      text: currencyLabel,
    },
    {
      label: "Wallet",
      text: walletLabel,
    },
  ];

  const handleSubmit = () => {
    navigate("/pay/success", {
      state: {
        cryptoToCash: location.state.cryptoToCash,
        contactInfo: location.state.contactInfo,
        bankInfo: location.state.bankInfo,
      },
    });
  };

  if (!location.state?.contactInfo || !location.state?.bankInfo) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="grid grid-rows-[auto_1fr] space-y-8">
      <header className="grid grid-cols-[1fr_auto_1fr] items-center justify-between">
        <div>
          <Link to="/" className="block w-fit">
            <ArrowLeftIcon className="text-foreground" />
          </Link>
        </div>
        <div className="text-center">
          <h1 className="text-primary text-center text-xl font-medium">
            Send {currencyLabel} to the address below
          </h1>
        </div>
        <div />
      </header>
      <div className="flex flex-col gap-y-8 lg:gap-y-10">
        <div className="space-y-6">
          <p className="bg-ui-green-1 border-ui-green-2 mx-auto mb-16 flex w-fit items-center justify-center gap-x-2 rounded-4xl border px-4 py-2 text-base font-medium">
            <span>4LiV4YjbxsL6739MKghUd</span>
            <Clipboarder
              toCopy="4LiV4YjbxsL6739MKghUd"
              className="text-primary size-6"
            />
          </p>
          <ul className="bg-ui-gray-6 space-y-6 rounded-sm px-6 py-4">
            {summaryData.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <li key={index} className="flex items-center justify-between">
                  <span className="text-ui-gray-2 text-sm">{item.label}</span>
                  <div className="text-primary flex items-center gap-x-2">
                    <span className="text-base font-medium">{item.text}</span>
                    {IconComponent && (
                      <button>
                        <IconComponent className="size-6" />
                      </button>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
          <p className="grid grid-cols-[auto_1fr] gap-2">
            <CircleAlert className="text-primary size-6" />
            <span className="text-ui-gray-1 text-sm">
              Only send {currencyLabel} to this address. Ensure the sender is on
              the {walletLabel}
              network otherwise you might lose your deposit
            </span>
          </p>
        </div>
        <Button size="lg" className="mt-auto w-full" onClick={handleSubmit}>
          I have sent it
        </Button>
      </div>
    </div>
  );
}
