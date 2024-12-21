"use client";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useFormStatus } from "react-dom";
import { signIn } from "next-auth/react";
import { useToast } from "@/hooks/use-toast";
// import { useState } from "react";

export const LoginFormSchema = z.object({
  email: z
    .string()
    .email({ message: "Please enter a valid email." })
    .min(1, "Email required"),
  password: z.string().min(1, { message: "Password field must not be empty." }),
});

export default function SignInForm() {
  const { toast } = useToast();

  const router = useRouter();
  const { pending } = useFormStatus();

  const form = useForm<z.infer<typeof LoginFormSchema>>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (value: z.infer<typeof LoginFormSchema>) => {
    try {
      const signInData = await signIn("credentials", {
        redirect: false,
        email: value.email,
        password: value.password,
      });

      if (signInData?.error) {
        toast({
          title: "Error",
          description: "Something went wrong",
          variant: "destructive",
        });
      } else {
        router.refresh();
        router.push("/admin");
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-3 pt-12">
          <input id="email" {...form.register("email")} />
          {form.formState.errors.email?.message && (
            <p>{form.formState.errors.email.message}</p>
          )}
        </div>
        <div>
          <input id="password" type="password" {...form.register("password")} />
          {form.formState.errors.password?.message && (
            <p>{form.formState.errors.password.message}</p>
          )}
        </div>
        <button disabled={pending} type="submit">
          Sign IN
        </button>
      </form>
    </div>
  );
}
