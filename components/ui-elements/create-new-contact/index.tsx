'use client';

import InputGroup from "@/components/ui/input-group";
import { handleCatchBlock } from "@/functions/common";
import { FormEvent, useState } from "react";
import ErrorTemplate from "../error-template";
import { CreateNewContactRequestData } from "@/app/api/whatsapp/create-new-contact/route";
import axios from "axios";
import { useRouter } from "next/navigation";
import { RiLoader4Line } from "@remixicon/react";

const CreateNewContactElement = () => {

    const [phone, setPhone] = useState<string>('');
    const [contactName, setContactName] = useState<string>('');

    const [inProgress, setInProgress] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const router = useRouter();

    async function handleFormSubmit (event: FormEvent) {
        event.preventDefault();
        setInProgress(true);
        setError(null);
        try {
            
            if (!phone) {
                throw new Error("Phone number is required!");
            } else if (!contactName) {
                throw new Error("Contact name is required!");
            }

            const requestData: CreateNewContactRequestData = {
                name: contactName,
                phone,
            }

            await axios.post('/api/whatsapp/create-new-contact', requestData);

            router.push(`/app?phone=${phone}`);

        } catch (err) {
            const message = handleCatchBlock(err);
            setError(message);
        }

        setInProgress(false);
    }

    return (
        <div
            className="max-w-[300px] w-full min-w-[250px]"
        >
            <form
                className="space-y-4 text-left"
                onSubmit={handleFormSubmit}
            >
                <InputGroup
                    label="Enter phone number"
                    name="phone"
                    onChange={(event) => {
                        setPhone(event.target.value);
                    }}
                    placeholder="97156****987"
                    disabled={inProgress}
                    required={true}
                    type="tel"
                    value={phone}
                />
                <InputGroup
                    label="Contact name"
                    name="contactName"
                    onChange={(event) => {
                        setContactName(event.target.value);
                    }}
                    placeholder="Contact name"
                    disabled={inProgress}
                    required={true}
                    type="text"
                    value={contactName}
                />

                {
                    error && (
                        <ErrorTemplate
                            error={error}
                        />
                    )
                }

                <button
                    className="py-2 px-3 rounded-lg bg-foreground text-background cursor-pointer flex items-center gap-2"
                    type="submit"
                    disabled={inProgress}
                >
                    {
                        inProgress && (
                            <RiLoader4Line
                                size={20}
                                className="animate-spin"
                            />
                        )
                    }
                    Send message
                </button>
            </form>
        </div>
    )
}

export default CreateNewContactElement