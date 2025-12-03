import { GetOneProductRequestData } from '@/app/api/accounting/products/get-one/route';
import ErrorTemplate from '@/components/ui-elements/error-template';
import { handleCatchBlock } from '@/functions/common'
import { ProductsModelInterface } from '@/models/accounting/products';
import { RiLoader4Line } from '@remixicon/react';
import axios from 'axios';
import React, { ChangeEvent, useEffect, useState } from 'react'

export interface ProductSingleRowProps {
    text?: string,
    input?: {
        type: "text" | "number" | "select",
        value: string,
        handleChange: (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void,
    },
    action?: {
        label: string,
        onClick: () => void,
    }[]
}

const ProductsSingleRow = ({ dataCols }: {
    dataCols: ProductSingleRowProps[],
}) => {

    const [inProgress, setInProgress] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const [product, setProduct] = useState<ProductsModelInterface | null>(null);

    useEffect(() => {
        (async () => {
            setInProgress(true);
            try {
                const requestData: GetOneProductRequestData = {
                    objectId: dataCols[0].text,
                }

                const { data } = await axios.post<ProductsModelInterface>('/api/accounting/products/get-one', requestData);
                setProduct(data);
            } catch (err) {
                const message = handleCatchBlock(err);
                setError(message)
            }
            setInProgress(false)
        })()
    }, [dataCols])

    if (error) {
        return (
            <tr>
                <ErrorTemplate
                    error={error}
                />
            </tr>
        )
    }

    return (
        <tr
            className="odd:bg-background-2/20"
        >
            {dataCols.map((col, idx) => (
                <td
                    key={idx}
                    className={"py-3 px-5" + ` ${idx === 0 ? "w-full" : ""}`}
                >
                    {
                        col.text && (
                            <p
                                className='flex items-center gap-3'
                            >
                                {
                                    inProgress && (
                                        <RiLoader4Line
                                            size={20}
                                            className='animate-spin'
                                        />
                                    )
                                }
                                <span>{inProgress ? "Loading..." : product?.name || col.text}</span>
                            </p>
                        )
                    }

                    {
                        col.input?.type === "select" && (
                            <select
                                onChange={col.input.handleChange}
                                value={col.input.value}
                                className='py-2 px-3 bg-background-2 rounded-2xl'
                                required
                            >
                                {
                                    [
                                        {
                                            label: "With Tax",
                                            value: "true",
                                        },
                                        {
                                            label: "Without Tax",
                                            value: "false",
                                        }
                                    ].map((option, index) => (
                                        <option
                                            key={index}
                                            value={option.value}
                                        >{option.label}</option>
                                    ))
                                }
                            </select>
                        )
                    }

                    {
                        col.input && col.input.type !== "select" && (
                            <input
                                type={col.input.type}
                                value={col.input.value}
                                onChange={col.input.handleChange}
                                className='py-2 px-3 bg-background-2 rounded-2xl'
                                required
                            />
                        )
                    }

                    {
                        col.action && (
                            col.action.map((action, index) => (
                                <button
                                    key={index}
                                    className="py-2 px-3 text-sm bg-foreground text-background rounded-2xl cursor-pointer"
                                    onClick={action.onClick}
                                    type="button"
                                >{action.label}</button>
                            ))
                        )
                    }

                </td>
            ))}
        </tr>
    )
}

export default ProductsSingleRow