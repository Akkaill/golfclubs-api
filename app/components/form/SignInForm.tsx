"use client";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useFormStatus } from "react-dom";
import { signIn } from "next-auth/react";
// import { useState } from "react";

export const LoginFormSchema = z.object({
  email: z
    .string()
    .email({ message: "Please enter a valid email." })
    .min(1, "Email required"),
  password: z.string().min(1, { message: "Password field must not be empty." }),
});

export default function SignInForm() {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
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
      const signInData = await signIn('credentials', {
        redirect: false,
        email: value.email,
        password: value.password,
      });

      if (signInData?.error) {
        console.log(signInData.error);
      } else {
        router.push("/");
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div>
          <input
            id="email"
            type="email"
            // onChange={(e) => setEmail(e.target.value)}
            {...form.register("email")}
          />
          {form.formState.errors.email?.message && (
            <p>{form.formState.errors.email.message}</p>
          )}
        </div>
        <div>
          <input
            id="password"
            type="password"
            // onChange={(e) => setPassword(e.target.value)}
            {...form.register("password")}
          />
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
