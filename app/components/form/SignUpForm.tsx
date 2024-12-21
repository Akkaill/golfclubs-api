"use client";
import {  z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useFormStatus } from "react-dom";
import React from "react";
import {useToast} from"@/hooks/use-toast"

export const SignupFormSchema = z
  .object({
    name: z
      .string()
      .min(2, { message: "Name must be at least 2 characters long." })
      .trim(),
    email: z.string().email({ message: "Please enter a valid email." }).trim(),
    password: z
      .string()
      .min(8, { message: "Be at least 8 characters long" })
      .regex(/[a-zA-Z]/, { message: "Contain at least one letter." })
      .regex(/[0-9]/, { message: "Contain at least one number." })
      .regex(/[^a-zA-Z0-9]/, {
        message: "Contain at least one special character.",
      })
      .trim(),
    confirmPassword: z.string().min(1, "Password confirmation is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Password do not match",
  });

export default function SignUpForm() {
  const router = useRouter();
  const { pending } = useFormStatus();
  const{toast}=useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof SignupFormSchema>>({
    resolver: zodResolver(SignupFormSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });
  const onSubmit = async (values: z.infer<typeof SignupFormSchema>) => {
    const response = await fetch("/api/auth/signup", {
        method:"POST",
 
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: values.email,
        password: values.password,
        name: values.name,
      }),
    });
    if (response.ok) {
      router.push("/sign-in");
    } else {
      toast({
        title:"Error",
        description:"Something went wrong",
        variant:"destructive"
      })
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <div>
        <input {...register("name")} />
        {errors.name?.message && <p>{errors.name?.message}</p>}
      </div>
      <div>
        {" "}
        <input {...register("email")} />
        {errors.email?.message && <p>{errors.email?.message}</p>}
      </div>
      <div>
        {" "}
        <input {...register("password")} type="password" />
        {errors.password?.message && <p>{errors.password?.message}</p>}
      </div>
    
      <div>
        {" "}
        <input {...register("confirmPassword")} type="password" />
        {errors.confirmPassword?.message && <p>{errors.confirmPassword?.message}</p>}
      </div>
    

      <button type="submit" disabled={pending}>
        Sign Up
      </button>
    </form>
  );
}
