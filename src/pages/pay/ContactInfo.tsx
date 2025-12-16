import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router";
import { ArrowLeftIcon, ChevronDownIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import ethImg from "@/assets/eth.png";

const countryCodes = [
  { code: "+234", name: "Nigeria" },
  { code: "+1", name: "United States" },
  { code: "+44", name: "United Kingdom" },
  { code: "+33", name: "France" },
  { code: "+49", name: "Germany" },
  { code: "+91", name: "India" },
  { code: "+86", name: "China" },
  { code: "+81", name: "Japan" },
];

const formSchema = z.object({
  email: z
    .string()
    .transform((val) => val.trim())
    .refine((val) => val.length > 0, {
      message: "Email is required",
    })
    .refine((val) => z.email().safeParse(val.trim()).success, {
      message: "Please enter a valid email address",
    }),
  countryCode: z.string().min(1, "Country code is required"),
  phoneNumber: z
    .string()
    .min(1, "Phone number is required")
    .regex(
      /^[\d\s-]+$/,
      "Phone number must contain only digits, spaces, or hyphens",
    )
    .refine(
      (val) => {
        const digitsOnly = val.replace(/\D/g, "");
        return digitsOnly.length >= 10 && digitsOnly.length <= 15;
      },
      {
        message: "Phone number must contain between 10 and 15 digits",
      },
    ),
});

type FormData = z.infer<typeof formSchema>;

export default function ContactInfo() {
  const [isOpen, setIsOpen] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      countryCode: "+234",
      phoneNumber: "",
    },
  });

  const onSubmit = (data: FormData) => {
    console.log("Form submitted:", data);
    console.log("Contact info:", {
      email: data.email,
      phoneNumber: `${data.countryCode} ${data.phoneNumber}`,
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
            <Label htmlFor="email">Recipient email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter recipient email"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-xs text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-4">
            <Label htmlFor="phoneNumber">Recipient phone number</Label>
            <div className="grid grid-cols-[auto_1fr]">
              <Controller
                name="countryCode"
                control={control}
                render={({ field }) => (
                  <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
                    <DropdownMenuTrigger
                      className="bg-ui-gray-6 flex items-center gap-x-1 rounded-s-4xl border border-e-0 px-3 py-2.5 sm:gap-x-2 sm:px-6 sm:py-5"
                      asChild
                    >
                      <button type="button">
                        <div className="flex items-center gap-x-0.5 sm:gap-x-1">
                          <span>{field.value}</span>
                          <img
                            src={ethImg}
                            alt="Country"
                            className="size-5 rounded-full"
                          />
                        </div>
                        <ChevronDownIcon
                          className={`text-primary size-5 transition-transform duration-200 ${
                            isOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      {countryCodes.map((country) => (
                        <DropdownMenuItem
                          key={country.code}
                          onClick={() => {
                            field.onChange(country.code);
                            setIsOpen(false);
                          }}
                        >
                          <div className="flex items-center gap-x-1">
                            <img
                              src={ethImg}
                              alt={country.name}
                              className="size-5 rounded-full"
                            />
                            <span>{country.code}</span>
                          </div>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              />
              <Input
                id="phoneNumber"
                type="tel"
                placeholder="000 - 000 - 00000"
                className="rounded-none rounded-e-4xl"
                {...register("phoneNumber")}
              />
            </div>
            {errors.phoneNumber && (
              <p className="text-xs text-red-500">
                {errors.phoneNumber.message}
              </p>
            )}
            {errors.countryCode && (
              <p className="text-xs text-red-500">
                {errors.countryCode.message}
              </p>
            )}
          </div>
        </div>
        <Button type="submit" size="lg" className="mt-auto w-full">
          Next
        </Button>
      </form>
    </div>
  );
}
