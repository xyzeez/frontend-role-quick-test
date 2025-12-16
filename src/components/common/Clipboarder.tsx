import { useState, useEffect } from "react";
import { CopyIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ClipboarderProps {
  toCopy: string;
  className?: string;
}

export const Clipboarder = ({ toCopy, className }: ClipboarderProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(toCopy);
      setCopied(true);
    } catch (err) {
      console.error("Failed to copy text:", err);
    }
  };

  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => {
        setCopied(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  return (
    <button className={cn(className, "cursor-pointer")} onClick={handleCopy}>
      {copied ? (
        <span className="text-xs font-light">Copied!</span>
      ) : (
        <CopyIcon className="size-6" />
      )}
    </button>
  );
};
