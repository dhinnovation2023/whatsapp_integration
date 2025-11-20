'use client';

import ErrorTemplate from "@/components/ui-elements/error-template";
import InputGroup from "@/components/ui/input-group";
import { getClientSession } from "@/functions/auth/getClientSession";
import { handleCatchBlock } from "@/functions/common";
import BasicLayout from "@/layouts/basic-layout";
import { signIn } from "next-auth/react"
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

const HomePageClientComponent = () => {

    const [loadingForm, setLoadingForm] = useState<boolean>(true);
    const router = useRouter();
    const searchParams = useSearchParams();

    const [error, setError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    useEffect(() => {
        (async () => {
            try {

                const session = await getClientSession();
                if (session.user) {
                    router.push("/app");
                }

            } catch (err) {
                const message = handleCatchBlock(err);
                setError(message);
            }

            setLoadingForm(false)
        })()
    }, [router])

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

    useEffect(() => {
        const error = searchParams.get("error");
        const message = error === "CredentialsSignin" ? "Incorrect login details" : null;

        setError(message);

    }, [searchParams])

    return (
        <BasicLayout>
            <div
                className="flex items-center min-h-[80dvh] justify-center"
            >
                <div
                    className="min-w-[400px] bg-background p-5 rounded-2xl"
                >
                    {
                        loadingForm ? (
                            <p>Loading Form...</p>
                        ) : (
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
                        )
                    }
                </div >
            </div>
        </BasicLayout>
    )
}

export default HomePageClientComponent