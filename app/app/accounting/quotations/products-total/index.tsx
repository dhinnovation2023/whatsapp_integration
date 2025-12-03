'use client';

import ErrorTemplate from "@/components/ui-elements/error-template";
import { calculateTax } from "@/functions/accounting/calculations";
import { handleCatchBlock } from "@/functions/common";
import { QuotationsModelInterface } from "@/models/accounting/quotation";
import { RiLoader4Line } from "@remixicon/react";
import { useEffect, useState } from "react";

const ProductsTotalTableLast = ({ products }: {
    products: QuotationsModelInterface["products"],
}) => {

    const [error, setError] = useState<string | null>(null);
    const [inProgress, setInProgress] = useState<boolean>(false);

    const [priceTotal, setPriceTotal] = useState<number | null>(null);
    const [subTotal, setSubTotal] = useState<number | null>(null)
    const [taxTotal, setTaxTotal] = useState<number | null>(null);

    const subTotalRow: (null | string | number)[] = [
        null,
        null,
        null,
        "Sub Total",
        subTotal,
    ]

    const priceTotalRow: (null | string | number)[] = [
        null,
        null,
        null,
        "Total",
        priceTotal,
    ]

    const taxTotalRow: (null | string | number)[] = [
        null,
        null,
        null,
        "Tax Total",
        taxTotal,
    ]

    useEffect(() => {
        (() => {
            setInProgress(true);
            setError(null);
            try {

                const taxedProducts = products.filter((product) => product.tax);
                const taxValue = calculateTax(taxedProducts.map((product) => (product.price * product.qty)));
                const productsPriceSum = products.reduce((sum, item) => sum + (item.price * item.qty), 0);

                setSubTotal(productsPriceSum);
                setTaxTotal(Number(taxValue));
                setPriceTotal(productsPriceSum + Number(taxValue))

            } catch (err) {
                const message = handleCatchBlock(err);
                setError(message);
            }
            setInProgress(false)
        })()
    }, [products])

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
        <>
            <tr
                className="odd:bg-background-2/20"
            >
                {subTotalRow.map((data, index) => (
                    <td
                        key={index}
                        className={"py-3 px-5"}
                    >{data}</td>
                ))}
            </tr>
            <tr
                className="odd:bg-background-2/20"
            >
                {taxTotalRow.map((data, index) => (
                    <td
                        key={index}
                        className={"py-3 px-5"}
                    >{data}</td>
                ))}
            </tr>
            <tr
                className="odd:bg-background-2/20"
            >
                {priceTotalRow.map((data, index) => (
                    <td
                        key={index}
                        className={"py-3 px-5"}
                    >
                        <div
                            className="flex items-center gap-2"
                        >
                            {
                                inProgress && (
                                    <RiLoader4Line
                                        size={20}
                                    />
                                )
                            }
                            <p>{data}</p>
                        </div>
                    </td>
                ))}
            </tr>
        </>
    )
}

export default ProductsTotalTableLast