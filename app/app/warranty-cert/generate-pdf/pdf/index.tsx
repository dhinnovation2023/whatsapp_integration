'use client';

import { Font, PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import { RiLoaderLine } from "@remixicon/react";
import { WarrantyCustomersModelInterface } from "@/models/warranty/customers";
import WarrantyPDFMain, { CompanyNames } from "./main";
import { useSearchParams } from "next/navigation";

export type WarrantyPDFPagePDFContentInterface = Omit<WarrantyCustomersModelInterface, "brand"> & {
    brandName: string,
    brandContent: string,
}

const PDFViewerSection = ({ customerData }: {
    customerData: WarrantyPDFPagePDFContentInterface,
}) => {

    const searchParams = useSearchParams();

    // const isMobile = useIsMobile();

    // React-PDF Configs
    Font.register({
        family: 'Open Sans', fonts: [
            { src: 'https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-regular.ttf' },
            { src: 'https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-600.ttf', fontWeight: 600 }
        ]
    })


    if (!customerData || !searchParams?.get) {
        return (
            <div
                className="py-10 px-5"
            >
                <RiLoaderLine
                    size={20}
                    className="animate-spin"
                />
                <p>Loading PDF Viewer</p>
            </div>
        )
    }

    return (
        <div
            className="relative"
        >
            <PDFViewer
                className="w-full min-h-screen"
            >
                <WarrantyPDFMain
                    customerData={customerData}
                    company={searchParams.get("company") as CompanyNames}
                />
            </PDFViewer>

            {window.innerWidth < 600 && (
                <div
                    className="absolute top-0 left-0 w-full h-full flex items-center bg-white justify-center"
                >
                    <PDFDownloadLink
                        document={
                            <WarrantyPDFMain
                                customerData={customerData}
                                company={searchParams.get("company") as CompanyNames}
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

export default PDFViewerSection