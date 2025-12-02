'use client'

import ErrorTemplate from "@/components/ui-elements/error-template"
import TableTemplate from "@/components/ui-elements/table-template"
import { GetAllProductsRequestData } from "@/functions/accounting/products/get-all-products"
import { handleCatchBlock } from "@/functions/common"
import DashboardLayout from "@/layouts/dashboard"
import { ProductsModelInterface } from "@/models/accounting/products"
import axios from "axios"
import Link from "next/link"
import { useEffect, useState } from "react"

const ViewAllProducts = () => {

    const [inProgress, setInProgress] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const [products, setProducts] = useState<ProductsModelInterface[]>([]);

    async function _fetchProducts(options: GetAllProductsRequestData) {
        const response = await axios.post<ProductsModelInterface[]>('/api/accounting/products/get-all', options);
        return response.data;
    }

    useEffect(() => {
        (async () => {
            setError(null);
            setInProgress(true);
            try {
                const requestData: GetAllProductsRequestData = {
                    currentPage: 1,
                }

                const products = await _fetchProducts(requestData);
                setProducts(products);

            } catch (err) {
                const message = handleCatchBlock(err);
                setError(message);
            }
            setInProgress(false);
        })()
    }, []);

    return (
        <DashboardLayout
            pageTitle="Products"
        >
            <div
                className="max-w-[800px] mx-auto py-10 space-y-3"
            >
                <Link
                    href={"/app/accounting/products/add"}
                    className="py-3 px-4 bg-foreground text-background rounded-2xl flex max-w-max"
                >
                    Add Product
                </Link>
                <TableTemplate
                    headerRow={[
                        "Name",
                        "Price",
                        "Created At",
                        "Actions",
                    ]}
                    dataRows={products.map((product, index) => {
                        return [
                            product.name,
                            product.price,
                            typeof product.createdAt === "string" ? product.createdAt.split("T")[0].split("-").join('/') : "not-set",
                            <div
                                className='flex items-center gap-2'
                                key={index}
                            >
                                {
                                    [
                                        {
                                            label: "Edit",
                                            href: `/app/accounting/products/edit?id=${product._id}`,
                                        },
                                    ].map((action, index) => (
                                        <Link
                                            key={index}
                                            href={action.href}
                                            className='flex items-center py-2 px-3 bg-foreground text-background rounded-2xl min-w-max'
                                        >{action.label}</Link>
                                    ))
                                }
                            </div>
                        ]
                    })}
                    inProgress={inProgress}
                />

                {
                    error && (
                        <ErrorTemplate
                            error={error}
                        />
                    )
                }
            </div>
        </DashboardLayout>
    )
}

export default ViewAllProducts