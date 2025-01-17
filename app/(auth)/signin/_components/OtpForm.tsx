"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import verifyOTP from "@/actions/auth/verifyOtp";
import { useManageOtp } from "../_hooks";
import { useShallow } from "zustand/react/shallow";

const FormSchema = z.object({
  otp: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});

export default function OTPForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      otp: "",
    },
  });
  const router = useRouter();
  const { setShowModal, callbackUrl, email, seconds, resetTimer } =
    useManageOtp(useShallow((state) => state));
  const handleOTPChange = (e: string) => {
    form.setValue("otp", e);
    if (e.length === 6) {
      form.handleSubmit(onSubmit)();
    }
  };
  async function onSubmit({ otp }: z.infer<typeof FormSchema>) {
    try {
      const res = await verifyOTP({ otp, email, callbackUrl });
      if (res) {
        toast.loading("Redirecting...");
        setShowModal(false);
        resetTimer();
      } else {
        toast.error("Invalid OTP");
      }

      form.reset();
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={
          form.formState.isValid ? form.handleSubmit(onSubmit) : undefined
        }
        className="w-full flex flex-col items-center  space-y-6"
      >
        <FormField
          control={form.control}
          name="otp"
          render={({ field }) => (
            <FormItem className="">
              <FormControl>
                <InputOTP maxLength={6} {...field} onChange={handleOTPChange}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSeparator />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {seconds > 0 && (
          <p className="text-sm text-muted-foreground">
            Resend OTP in {seconds} seconds
          </p>
        )}
        <Button
          type="submit"
          className="md:w-1/2 w-full px-4"
          disabled={form.formState.isSubmitting || seconds > 0}
        >
          {form.formState.isSubmitting ? "..." : "Verify"}
        </Button>
      </form>
    </Form>
  );
}
