import { Button } from "@/components/ui/button";
import checkImg from "@/assets/check.png";
import { Link, useLocation } from "react-router";
import { Clipboarder } from "@/components/common/Clipboarder";

export default function Success() {
  const location = useLocation();

  // Console log all received data
  console.log("Success page - All received data:", location.state);
  console.log("Success page - cryptoToCash:", location.state?.cryptoToCash);
  console.log("Success page - contactInfo:", location.state?.contactInfo);
  console.log("Success page - bankInfo:", location.state?.bankInfo);

  return (
    <div className="grid grid-rows-[auto_1fr] space-y-16">
      <header className="flex items-center justify-center">
        <img src="/logo.png" alt="logo" className="h-6" />
      </header>
      <div className="flex w-full flex-col gap-y-8 lg:gap-y-10">
        <div className="flex flex-col">
          <img src={checkImg} alt="check" className="mx-auto mb-8 size-20" />
          <h2 className="text-ui-black mb-2 text-center text-2xl font-medium">
            Your transaction is processing.
          </h2>
          <p className="text-ui-gray-1 mb-10 text-center text-xl">
            The recipient will receive it shortly.
          </p>
          <div className="bg-ui-gray-6 rounded-sm px-6 py-4">
            <p className="flex items-center justify-between">
              <span className="text-ui-gray-2 text-sm">Transaction ID</span>
              <div className="text-primary flex items-center gap-x-2">
                <span className="text-base font-medium">NC123456789</span>
                <Clipboarder
                  toCopy="NC123456789"
                  className="text-primary size-6"
                />
              </div>
            </p>
          </div>
        </div>
        <Button size="lg" variant="link" className="w-full" asChild>
          <Link to="/"> Go back to home</Link>
        </Button>
      </div>
    </div>
  );
}
