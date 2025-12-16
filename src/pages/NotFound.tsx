import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import { AlertCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="grid grid-rows-[auto_1fr] space-y-16">
      <header className="flex items-center justify-center">
        <img src="/logo.png" alt="logo" className="h-6" />
      </header>
      <div className="flex w-full flex-col gap-y-8 lg:gap-y-10">
        <div className="flex flex-col">
          <AlertCircle className="text-primary mx-auto mb-8 size-20" />
          <h2 className="text-ui-black mb-2 text-center text-2xl font-medium">
            Page not found
          </h2>
          <p className="text-ui-gray-1 mb-10 text-center text-xl">
            The page you're looking for doesn't exist.
          </p>
        </div>
        <Button size="lg" variant="link" className="w-full" asChild>
          <Link to="/">Go back to home</Link>
        </Button>
      </div>
    </div>
  );
}

