import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
});

type FormData = z.infer<typeof formSchema>;

export default function CryptoToFiatLoan() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: FormData) => {
    console.log("Form submitted:", data);
  };

  return (
    <div className="space-y-8 pt-8 xl:pt-10">
      <div className="space-y-2 text-center lg:space-y-4">
        <h1 className="text-primary font-clash text-[32px] font-medium">
          Coming Soon!
        </h1>
        <p className="text-ui-gray-1 text-lg font-normal lg:text-xl">
          Crypto to Fiat Loan is almost here. <br /> Enter your email and we'll
          let you know the moment it's live.
        </p>
      </div>
      <form
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-10 lg:space-y-14 xl:space-y-20"
      >
        <div className="space-y-4">
          <Label htmlFor="email">Email</Label>
          <div className="space-y-2">
            <Input
              type="email"
              id="email"
              placeholder="Enter your email"
              aria-describedby="email-error"
              {...register("email")}
            />
            {errors.email && (
              <p id="email-error" className="text-xs text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>
        </div>
        <Button type="submit" size="lg" className="w-full">
          Submit
        </Button>
      </form>
    </div>
  );
}
