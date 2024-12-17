"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useFormStatus } from "react-dom";

export default function signUpForm() {
  const [state, setState] = useState({
    email: "",
    password: "",
    name: "",
  });
  console.log(state);
  const router = useRouter();
  const { pending } = useFormStatus();

  const handleChange = (e: React.FormEvent) => {
    const { name, value } = e.target;
    setState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("/api/auth/signup", { state });
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          value={state.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          value={state.password}
          onChange={handleChange}
        />
        <input
          type="name"
          name="name"
          value={state.name}
          onChange={handleChange}
        />
        <button type="submit" disabled={pending}>
          Register
        </button>
      </form>
    </div>
  );
}
