'use client';

import ErrorTemplate from "@/components/ui-elements/error-template";
import InputGroup from "@/components/ui/input-group";
import { handleCatchBlock } from "@/functions/common";
import DefaultSection from "@/layouts/default-section";
import { signIn } from "next-auth/react"
import { FormEvent, useState } from "react";

export default function Home() {

  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  async function handleFormSubmit(event: FormEvent) {

    setIsLoading(true);
    setError(null)

    try {
      event.preventDefault();
      if (!email || !password) {
        throw new Error("Email and password is required.")
      }

      await signIn(
        "credentials",
        {
          email,
          password,
          callbackUrl: "/app",
        }
      )

    } catch (err) {
      const message = handleCatchBlock(err);
      setError(message);
    }

    setIsLoading(false);

  }

  return (
    <DefaultSection
      className="flex items-center justify-center min-h-screen"
    >
      <div
        className="min-w-[300px]"
      >
        <form
          onSubmit={handleFormSubmit}
        >
          <div
            className="space-y-4"
          >
            <InputGroup
              label="Email"
              name="email"
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Email address"
              type="email"
              value={email}
            />

            <InputGroup
              label="Password"
              name="password"
              placeholder="Password"
              onChange={(event) => setPassword(event.target.value)}
              type="password"
              value={password}
            />

            <button
              className="text-lg font-semibold bg-theme-primary py-3 px-5 text-white w-full rounded-lg cursor-pointer"
            >
              {isLoading ? "Loading..." : "Login"}
            </button>

            {
              error && (
                <ErrorTemplate
                  error={error}
                />
              )
            }

          </div>
        </form>
      </div>
    </DefaultSection>
  )
}