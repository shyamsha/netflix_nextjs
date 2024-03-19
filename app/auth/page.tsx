"use client";
import React, { useCallback, useState } from "react";
import logo from "../../public/images/logo.png";
import Input from "../components/Input";
import axios from "axios";

const Page = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [variant, setVariant] = useState("signin");

  const toggleVariant = useCallback(() => {
    setVariant((currentVariant) =>
      currentVariant === "signin" ? "signup" : "signin"
    );
  }, []);
  const register = useCallback(async () => {
    try {
      await axios.post("/api/register.ts", {
        email,
        name,
        password,
      });
    } catch (error) {
      console.log(error);
    }
  }, [email, name, password]);

  return (
    <div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
      <div className="w-full h-full lg:bg-opacity-50">
        <nav className="px-12 py-5">
          <img src="/images/logo.png" alt="logo" className="h-10" />
        </nav>
        <div className="flex justify-center">
          <div className="bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:max-w-md rounded-md w-full">
            <h2 className="text-white text-4xl mb-8 font-semibold">
              {variant === "signin" ? "Sign in" : "Sign up"}
            </h2>
            <div className="flex flex-col gap-4">
              {variant === "signup" && (
                <Input
                  id="name"
                  label="Username"
                  value={name}
                  onChange={(e: {
                    target: { value: React.SetStateAction<string> };
                  }) => setName(e.target.value)}
                  type="text"
                />
              )}
              <Input
                id="email"
                label="email"
                value={email}
                onChange={(e: {
                  target: { value: React.SetStateAction<string> };
                }) => setEmail(e.target.value)}
                type="email"
              />
              <Input
                id="password"
                label="Password"
                value={password}
                onChange={(e: {
                  target: { value: React.SetStateAction<string> };
                }) => setPassword(e.target.value)}
                type="password"
              />
            </div>
            <button
              onClick={register}
              className="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition"
            >
              {variant === "signin" ? "Login" : "Signup"}
            </button>
            <p className="text-neutral-500  mt-12">
              {variant === "signin"
                ? "First time using Netflix?"
                : "Already have an account?"}
              <span
                onClick={toggleVariant}
                className="text-white ml-1 hover:underline cursor-pointer"
              >
                {variant === "signin"
                  ? "Create an account"
                  : "Login an account"}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
