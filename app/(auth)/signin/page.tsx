"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import { useManageOtp } from "./_hooks";
import { LoaderCircle } from "lucide-react";
import { useShallow } from "zustand/react/shallow";
const SigninSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
});

export default function SignInForm() {
  const { setEmail, seconds, setCallbackUrl, isPlayed, pause} =
    useManageOtp(useShallow((state) => state));
  const form = useForm<z.infer<typeof SigninSchema>>({
    resolver: zodResolver(SigninSchema),
    defaultValues: { email: "" },
  });
  async function onSubmit(values: z.infer<typeof SigninSchema>) {
    const { email } = values; 
    if (
      toast.promise(signIn("email", { email, redirect: false }), {
        loading: "Sending email...",
        success: "Check your email",
        error: "Something went wrong",
      })
    ) {
      setEmail(email, true);
      setCallbackUrl("/signin");
      form.reset();
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormDescription>
                We&apos;ll send a one-time password to this email.
              </FormDescription>
              <FormControl>
                <Input placeholder="Enter your email" disabled={isPlayed} {...field}/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={form.formState.isSubmitSuccessful}>
          {form.formState.isSubmitting  ? (
            <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
          ) : form.formState.isSubmitSuccessful || pause ? (
            <span className="mr-2">{seconds}s</span>
          ) : (
            "Send OTP"
          )}
        </Button>
      </form>
    </Form>
  );
}
