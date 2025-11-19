'use client';

import { AddStatusApiRouteRequestData } from "@/app/api/status/add/route";
import ErrorTemplate from "@/components/ui-elements/error-template";
import InputGroup from "@/components/ui/input-group";
import { handleCatchBlock } from "@/functions/common";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, InputHTMLAttributes, useState } from "react";

const AddStatusForm = () => {

    const [inProgress, setInProgress] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const [formData, setFormData] = useState<{
        name: string,
        color: string,
    }>({
        name: "",
        color: "",
    });

    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        setFormData(prev => ({
            ...prev,
            [event.target.name]: event.target.value,
        }));
    }

    const fieldsData: {
        label: string,
        placeholder: string,
        value?: string,
        onChange: (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => void,
        name: string,
        type?: InputHTMLAttributes<HTMLInputElement>["type"] | "select",
        required?: boolean,
        options?: {
            label: string,
            value: string,
        }[]
    }[] = [
        {
            label: 'Status name',
            name: "name",
            placeholder: "Status name",
            required: true,
            type: "text",
            value: formData.name,
            onChange: handleInputChange,
        },
        {
            label: 'Status Color',
            name: "color",
            placeholder: "Status Color",
            required: true,
            type: "color",
            value: formData.color,
            onChange: handleInputChange,
        },
    ]

    async function handleFormSubmit (event: FormEvent) {
        event.preventDefault();
        setError(null)
        setInProgress(true);
        try {
            const requestData: AddStatusApiRouteRequestData = formData;
            await axios.post('/api/status/add', requestData);
        } catch (err) {
            const message = handleCatchBlock(err);
            setError(message);
        }
        setInProgress(false);
        router.refresh();
    }

    return (
        <form
            className="space-y-3"
            onSubmit={handleFormSubmit}
        >
            {fieldsData.map((field, index) => (
                <InputGroup
                    key={index}
                    {...field}
                />
            ))}
            <button
                className="w-full py-3 px-4 rounded-2xl bg-theme-primary text-white font-semibold cursor-pointer"
            >
                {inProgress ? "Loading..." : "Add New Status"}
            </button>

            {
                error && (
                    <ErrorTemplate
                        error={error}
                    />
                )
            }
        </form>
    )
}

export default AddStatusForm