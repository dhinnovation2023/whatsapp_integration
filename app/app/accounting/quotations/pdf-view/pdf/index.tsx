'use client';

import { Font, PDFViewer, PDFDownloadLink } from "@react-pdf/renderer";
import { useEffect, useState } from "react";
import { QuotationsModelInterface } from "@/models/accounting/quotation";
import { RiLoader4Line, RiLoaderLine } from "@remixicon/react";
import { handleCatchBlock } from "@/functions/common";
import { GetOneQuotationRequestData } from "@/app/api/accounting/quotations/get-one/route";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import ErrorTemplate from "@/components/ui-elements/error-template";
import { GetOneProductRequestData } from "@/app/api/accounting/products/get-one/route";
import { ProductsModelInterface } from "@/models/accounting/products";
import { calculateTax } from "@/functions/accounting/calculations";
import QuotationPDFMain from "./main";

export interface QuotationPDFCustomProductInterface {
    productName: string,
    qty: number,
    price: number,
    total: number,
    tax: boolean,
}

export interface QuoteationPDFSummaryInterface {
    subtotal: number,
    tax: number,
    total: number,
}

const QuotationPDFViewTemplate = () => {

    const [error, setError] = useState<string | null>(null);

    const [quotation, setQuotation] = useState<QuotationsModelInterface | null>(null);
    const [products, setProducts] = useState<QuotationPDFCustomProductInterface[]>([]);
    const [summary, setSummary] = useState<QuoteationPDFSummaryInterface | null>(null);

    const [isNoteLengthy, setIsNoteLengthy] = useState<boolean>(false);

    const searchParams = useSearchParams();

    // React-PDF Configs
    Font.register({
        family: 'Open Sans',
        fonts: [
            { src: 'https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-regular.ttf' },
            { src: 'https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-600.ttf', fontWeight: 600 }
        ],
    })

    useEffect(() => {
        (async () => {
            setError(null);
            try {

                const objectId = searchParams.get('id');

                if (!objectId) {
                    throw new Error("ObjectId is not found!");
                }

                const requestData: GetOneQuotationRequestData = {
                    objectId,
                }

                const response = await axios.post<QuotationsModelInterface>('/api/accounting/quotations/get-one', requestData);
                setQuotation(response.data);

                if (response.data) {
                    const contentItems: string[] = [];
                    for (const note of response.data.note || []) {
                        contentItems.push(note.content);
                    }

                    if (contentItems.join('').split(' ').length > 20) {
                        setIsNoteLengthy(true);
                    }
                }

                const productsList: QuotationPDFCustomProductInterface[] = [];

                for (const item of response.data.products) {
                    const requestData: GetOneProductRequestData = {
                        objectId: item.productId,
                    }
                    const { data } = await axios.post<ProductsModelInterface>('/api/accounting/products/get-one', requestData);
                    productsList.push({
                        productName: data.name,
                        qty: item.qty,
                        price: item.price,
                        total: item.qty * item.price,
                        tax: item.tax,
                    })
                }

                setProducts(productsList);

                let taxValue: string | number = calculateTax(productsList.filter(product => product.tax).map(product => (product.price * product.qty)));
                taxValue = Number(taxValue);
                const subtotal = productsList.reduce((sum, product) => sum + (product.price * product.qty), 0);
                const total = subtotal + taxValue;

                setSummary({
                    subtotal,
                    tax: taxValue,
                    total,
                })

            } catch (err) {
                const message = handleCatchBlock(err);
                setError(message);
            }
        })()
    }, [searchParams])

    if (error) {
        return (
            <ErrorTemplate
                error={error}
            />
        )
    }

    if (!quotation || products.length === 0 || !summary) {
        return (
            <div
                className="flex items-center gap-2 justify-center min-h-screen text-white"
            >
                <RiLoader4Line
                    size={20}
                    className="animate-spin"
                />
                <p>Loading...</p>
            </div>
        )
    }

    return (
        <div
            className="relative"
        >
            <PDFViewer
                className='w-full min-h-screen'
            >
                <QuotationPDFMain
                    isNoteLengthy={isNoteLengthy}
                    products={products}
                    quotation={quotation}
                    summary={summary}
                    searchParams={searchParams}
                />
            </PDFViewer>

            {window.innerWidth < 600 && (
                <div
                    className="fixed top-0 left-0 w-full h-full flex items-center bg-white justify-center"
                >
                    <PDFDownloadLink
                        document={
                            <QuotationPDFMain
                                isNoteLengthy={isNoteLengthy}
                                products={products}
                                quotation={quotation}
                                summary={summary}
                                searchParams={searchParams}
                            />
                        }
                        className="bg-foreground text-background py-3 px-5 rounded-2xl flex items-center gap-2"
                    >
                        {({ loading }) => (
                            loading ? (
                                <>
                                    <RiLoaderLine
                                        size={20}
                                        className="animate-spin"
                                    />
                                    Loading PDF
                                </>
                            ) : "Download PDF"
                        )}
                    </PDFDownloadLink>
                </div>
            )}

        </div>
    )
}

export default QuotationPDFViewTemplate