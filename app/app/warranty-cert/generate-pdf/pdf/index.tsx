'use client';

import { Document, Font, Image, PDFViewer, Text, View } from "@react-pdf/renderer";
import PageTemplate from "./page-template";
import { RiLoaderLine } from "@remixicon/react";
import PDFDetailsTable from "./details-table";
import { WarrantyCustomersModelInterface } from "@/models/warranty/customers";
import PDFBrandBasedContent from "./brand-based-content";
import RenderDateInPDF from "./render-date";

import StampImage from "./assets/transperant-stamp.png";

export type WarrantyPDFPagePDFContentInterface = Omit<WarrantyCustomersModelInterface, "brand"> & {
    brandName: string,
    brandContent: string,
}

const PDFViewerSection = ({ customerData }: {
    customerData: WarrantyPDFPagePDFContentInterface,
}) => {

    // React-PDF Configs
    Font.register({
        family: 'Open Sans', fonts: [
            { src: 'https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-regular.ttf' },
            { src: 'https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-600.ttf', fontWeight: 600 }
        ]
    })


    if (!customerData) {
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
        <div>
            <PDFViewer
                className="w-full min-h-screen"
            >
                <Document
                    style={{ fontFamily: 'Open Sans' }}
                    title="Warranty Certificate"
                >
                    <PageTemplate>
                        <View
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "space-between",
                                height: "100%",
                            }}
                        >
                            <View
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "30px"
                                }}
                            >
                                <PDFDetailsTable
                                    pdfContent={customerData}
                                />
                                <PDFBrandBasedContent
                                    htmlContent={customerData.brandContent}
                                />
                            </View>
                            <View
                                style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    alignItems: "flex-end"
                                }}
                            >
                                <View>
                                    {/* eslint-disable-next-line */}
                                    <Image
                                        src={StampImage.src}
                                        style={{
                                            width: "130px",
                                        }}
                                    />
                                    <Text>
                                        Authorized Signatory ___________________
                                    </Text>
                                </View>
                                <Text>
                                    <RenderDateInPDF
                                        date={customerData.currentDate}
                                    />
                                </Text>
                            </View>
                        </View>
                    </PageTemplate>
                </Document>
            </PDFViewer>
        </div>
    )
}

export default PDFViewerSection