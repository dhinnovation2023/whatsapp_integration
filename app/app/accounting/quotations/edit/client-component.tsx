'use client';

import InputGroup, { InputGroupDataInterface } from "@/components/ui/input-group";
import DashboardLayout from "@/layouts/dashboard";
import { QuotationsModelInterface } from "@/models/accounting/quotation";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import ProductsSelectionPopup from "../products-selection-popup";
import ProductsSingleRow, { ProductSingleRowProps } from "../add/product-single-row";
import { handleCatchBlock } from "@/functions/common";
import { RiLoader4Line } from "@remixicon/react";
import ProductsTotalTableLast from "../products-total";
import ErrorTemplate from "@/components/ui-elements/error-template";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { GetOneQuotationRequestData } from "@/app/api/accounting/quotations/get-one/route";
import { DeleteOneQuotationRequestData } from "@/app/api/accounting/quotations/delete-one/route";
import { UpdateQuotationRequestData } from "@/functions/accounting/quotations/update-one";

const EditQuotationPageClient = () => {

    const [initialLoading, setInitialLoading] = useState<boolean>(true);

    const [inProgress, setInProgress] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [deleteInProgress, setDeleteInProgress] = useState<boolean>(false);

    const router = useRouter();
    const searchParams = useSearchParams();

    const [formData, setFormData] = useState<QuotationsModelInterface>({
        customerName: '',
        location: '',
        phone: '',
        products: [],
        note: '',
    });

    function handleInnerProductDataChange(value: string | number | boolean, index: number, name: string) {
        console.log(value, index, name);
        setFormData(prev => {
            const products = prev.products;
            const update: QuotationsModelInterface["products"]
                = products.map((product, idx) => {
                    if (idx === index) {
                        return ({
                            ...product,
                            [name]: value,
                        })
                    } else {
                        return product;
                    }
                })

            return ({
                ...prev,
                products: update,
            })
        })
    }

    const fieldsData: (InputGroupDataInterface | string | {
        products: QuotationsModelInterface["products"],
        onPriceChange: (value: number, index: number) => void,
        onTaxChange: (value: boolean, index: number) => void,
        onQtyChange: (value: number, index: number) => void,
    } | {
        textarea: boolean,
        value: string,
        textareaChange: (event: ChangeEvent<HTMLTextAreaElement>) => void,
        textareaLabel: string,
        placeholder: string,
        name: string,
    })[] = [
            {
                label: "Invoice No.",
                name: "invoiceNo",
                onChange: () => window.alert("Can't edit invoice No."),
                placeholder: "Invoice No.",
                disabled: false,
                type: "text",
                value: formData["invoiceNo"] || "Not-Set"
            },
            "Customer Details",
            {
                label: "Customer Name",
                name: "customerName",
                onChange: handleInputChange,
                placeholder: "Customer Name",
                disabled: inProgress,
                required: true,
                type: "text",
                value: formData["customerName"],
            },
            {
                label: "Location",
                name: "location",
                onChange: handleInputChange,
                placeholder: "Location",
                disabled: inProgress,
                required: true,
                type: "text",
                value: formData["location"],
            },
            {
                label: "Phone",
                name: "phone",
                onChange: handleInputChange,
                placeholder: "97156*****9",
                disabled: inProgress,
                required: true,
                type: "text",
                value: formData["phone"],
            },
            "Products Data",
            {
                products: formData["products"],
                onPriceChange: (value, index) => {
                    handleInnerProductDataChange(value, index, "price")
                },
                onTaxChange: (value, index) => {
                    handleInnerProductDataChange(value, index, "tax");
                },
                onQtyChange: (value, index) => {
                    handleInnerProductDataChange(value, index, "qty");
                }
            },
            "Other Data",
            {
                textareaLabel: "Note",
                placeholder: "Quotation Note",
                value: formData["note"],
                textarea: true,
                textareaChange: handleInputChange,
                name: "note"
            },

        ]

    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
        console.log(event.target.value)
        console.log(event.target.name)
        setFormData(prev => ({
            ...prev,
            [event.target.name]: event.target.value,
        }))
    }

    function handleProductSelect(product: QuotationsModelInterface["products"]) {
        setFormData(prev => ({
            ...prev,
            products: [...prev.products, ...product],
        }))
    }

    async function handleFormSubmit(event: FormEvent) {
        event.preventDefault();
        setInProgress(true);
        setError(null);
        try {

            for (const field of fieldsData) {
                if (typeof field === "object" && field !== null && "label" in field) {
                    if (field.required === true && !field.value) {
                        throw new Error(`Field ${field.label} is required.`);
                    }
                }
            }

            const objectId = searchParams.get('id');

            if (!objectId) {
                throw new Error("Object Id not found");
            }

            const requestData: UpdateQuotationRequestData = {
                ...formData,
                objectId,
            };

            await axios.post('/api/accounting/quotations/update-one', requestData);
            router.push('/app/accounting/quotations')

        } catch (err) {
            const message = handleCatchBlock(err);
            setError(message);
        }
        setInProgress(false);
    }

    useEffect(() => {
        (async () => {
            setInitialLoading(true);
            setError(null);
            try {

                const objectId = searchParams.get('id');

                if (!objectId) {
                    throw new Error("Object Id is not found");
                }

                const requestData: GetOneQuotationRequestData = {
                    objectId,
                }

                const { data } = await axios.post<QuotationsModelInterface>('/api/accounting/quotations/get-one', requestData);
                console.log(data);
                setFormData(data);

            } catch (err) {
                const message = handleCatchBlock(err);
                window.alert(message);
            }
            setInitialLoading(false)
        })()
    }, [searchParams])

    if (initialLoading) {
        return (
            <DashboardLayout
                pageTitle="Edit Quotation"
            >
                <div
                    className="max-w-[1000px] w-full mx-auto py-10 flex items-center gap-3 px-5"
                >
                    <RiLoader4Line
                        size={20}
                    />
                    <p>Loading Data...</p>
                </div>
            </DashboardLayout>
        )
    }

    return (
        <DashboardLayout
            pageTitle="Add Quotation"
        >
            <div
                className="max-w-[1000px] w-full mx-auto py-10"
            >
                <form
                    className="space-y-5"
                    onSubmit={handleFormSubmit}
                >
                    {fieldsData.map((field, index) => {

                        if (typeof field === "string") {
                            return (
                                <h2
                                    key={index}
                                    className="text-xl font-semibold"
                                >{field}</h2>
                            )
                        }

                        if ("label" in field) {
                            return (
                                <InputGroup
                                    {...field}
                                    key={index}
                                />
                            )
                        }

                        if ("textarea" in field) {
                            return (
                                <div
                                    key={index}
                                >
                                    <label
                                        htmlFor={field.name}
                                        className="text-sm font-semibold"
                                    >{field.textareaLabel}</label>
                                    <textarea
                                        value={field.value}
                                        onChange={field.textareaChange}
                                        className="bg-background w-full rounded-xl outline-none border border-stroke-light py-2 px-4"
                                        rows={3}
                                        id={field.name}
                                        name={field.name}
                                    ></textarea>
                                </div>
                            )
                        }

                        if (field.products.length === 0) {
                            return (
                                <div
                                    key={index}
                                    className="py-3 px-5 bg-background rounded-2xl space-y-3"
                                >
                                    <p>Please add atleast one Product</p>
                                    <ProductsSelectionPopup
                                        onSelect={handleProductSelect}
                                    />
                                </div>
                            )
                        } else {
                            return (
                                <div
                                    key={index}
                                    className="space-y-3"
                                >
                                    <ProductsSelectionPopup
                                        onSelect={handleProductSelect}
                                    />
                                    <table
                                        className="bg-background rounded-2xl w-full"
                                    >
                                        <thead>
                                            <tr>
                                                {
                                                    [
                                                        "Product Name",
                                                        "Price",
                                                        "Tax",
                                                        "Qty",
                                                        "Actions"
                                                    ].map((heading, index) => (
                                                        <th
                                                            key={index}
                                                            className="py-3 px-5 text-left"
                                                        >{heading}</th>
                                                    ))
                                                }
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {field.products.map((product, index) => {

                                                const dataCols: ProductSingleRowProps[] = [
                                                    {
                                                        text: product.productId,
                                                    },
                                                    {
                                                        input: {
                                                            type: "number",
                                                            handleChange: (event) => {
                                                                field.onPriceChange(Number(event.target.value), index)
                                                            },
                                                            value: String(product.price),
                                                        },
                                                    },
                                                    {
                                                        input: {
                                                            handleChange: (event) => {
                                                                field.onTaxChange(event.target.value === "true" ? true : false, index);
                                                            },
                                                            type: "select",
                                                            value: String(product.tax),
                                                        }
                                                    },
                                                    {
                                                        input: {
                                                            handleChange: (event) => {
                                                                field.onQtyChange(Number(event.target.value), index);
                                                            },
                                                            type: "number",
                                                            value: String(product.qty),
                                                        }
                                                    },
                                                    {
                                                        action: [
                                                            {
                                                                label: "Remove",
                                                                onClick: () => {
                                                                    setFormData(prev => {
                                                                        const update = prev.products.filter((product, idx) => index !== idx);
                                                                        return ({
                                                                            ...prev,
                                                                            products: update,
                                                                        })
                                                                    })
                                                                }
                                                            }
                                                        ]
                                                    }
                                                ]

                                                return (
                                                    <ProductsSingleRow
                                                        dataCols={dataCols}
                                                        key={product.productId + index}
                                                    />
                                                )
                                            })}
                                            <ProductsTotalTableLast
                                                products={formData.products}
                                            />
                                        </tbody>
                                    </table>
                                </div>
                            )
                        }

                    })}

                    <div
                        className="flex items-center gap-3"
                    >
                        <button
                            className="flex items-center gap-2 py-3 px-5 rounded-2xl bg-foreground text-background cursor-pointer"
                        >
                            {
                                inProgress && (
                                    <RiLoader4Line
                                        size={20}
                                    />
                                )
                            }
                            {inProgress ? "Loading..." : "Save Changes"}
                        </button>
                        <button
                            className="flex items-center gap-2 py-3 px-5 rounded-2xl bg-red-600 text-white cursor-pointer"
                            type="button"
                            disabled={deleteInProgress}
                            onClick={async () => {
                                setDeleteInProgress(true);
                                try {

                                    const objectId = searchParams.get('id');

                                    if (!objectId) {
                                        throw new Error("Object Id not found");
                                    }

                                    const requestData: DeleteOneQuotationRequestData = {
                                        objectId,
                                    }

                                    await axios.post('/api/accounting/quotations/delete-one', requestData);
                                    router.push('/app/accounting/quotations')
                                } catch (err) {
                                    const message = handleCatchBlock(err);
                                    setError(message);
                                }
                                setDeleteInProgress(false)
                            }}
                        >
                            {
                                deleteInProgress && (
                                    <RiLoader4Line
                                        size={20}
                                        className="animate-spin"
                                    />
                                )
                            }
                            <p>Delete Quotation</p>
                        </button>
                    </div>

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

export default EditQuotationPageClient