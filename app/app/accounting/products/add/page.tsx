'use client';

import ErrorTemplate from "@/components/ui-elements/error-template";
import InputGroup, { InputGroupDataInterface } from "@/components/ui/input-group";
import { handleCatchBlock } from "@/functions/common";
import DashboardLayout from "@/layouts/dashboard";
import { ProductsModelInterface, ProductsType } from "@/models/accounting/products";
import { RiLoader4Line } from "@remixicon/react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";

const AddProductsPage = () => {

    const [inProgress, setInProgress] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const [formData, setFormData] = useState<{
        name: string,
        price: string,
        productType: ProductsType,
    }>({
        name: "",
        price: '',
        productType: "product",
    });

    const fieldsData: InputGroupDataInterface[] = [
        {
            label: "Product Name",
            name: "name",
            onChange: handleInputChange,
            placeholder: "Product Name",
            disabled: inProgress,
            required: true,
            type: "text",
            value: formData["name"],
        },
        {
            label: "Price",
            name: "price",
            onChange: handleInputChange,
            placeholder: "Price",
            disabled: inProgress,
            required: true,
            type: "number",
            value: formData["price"],
        },
        {
            label: "Product Type",
            name: "productType",
            onChange: handleInputChange,
            placeholder: "Select Type",
            disabled: inProgress,
            options: [
                {
                    label: "Product",
                    value: "product",
                },
                {
                    label: "Service",
                    value: "service",
                },
            ],
            required: true,
            type: "select",
            value: formData["productType"],
        }
    ]

    function handleInputChange (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        setFormData(prev => ({
            ...prev,
            [event.target.name]: event.target.value,
        }))
    }

    async function handleFormSubmit (event: FormEvent) {
        event.preventDefault();
        setError(null);
        setInProgress(true);
        try {
            for (const field of fieldsData) {
                if (field.required === true && !field.value) {
                    throw new Error(`${field.label} field is required.`);
                }
            }

            const requestData: ProductsModelInterface = {
                name: formData["name"],
                price: Number(formData.price),
                productType: formData["productType"],
            }

            await axios.post("/api/accounting/products/add-one", requestData);
            router.push('/app/accounting/products')

        } catch (err) {
            const message = handleCatchBlock(err);
            setError(message);
        }
        setInProgress(false);
    }

  return (
    <DashboardLayout
        pageTitle="Add Product"
    >
        <div
            className="max-w-[800px] mx-auto py-10"
        >
            <form
                className="space-y-3"
                onSubmit={handleFormSubmit}
            >
                {fieldsData.map((field, index) => (
                    <InputGroup
                        {...field}
                        key={index}
                    />
                ))}

                <button
                    className="py-3 px-4 rounded-2xl bg-foreground text-background flex items-center gap-3"
                >
                    {
                        inProgress && (
                            <RiLoader4Line
                                size={20}
                                className="animate-spin"
                            />
                        )
                    }

                    <p>{inProgress ? "Loading..." : "Add Product"}</p>

                </button>

                {
                    error && (
                        <ErrorTemplate
                            error={error}
                        />
                    )
                }

            </form>
        </div>
    </DashboardLayout>
  )
}

export default AddProductsPage