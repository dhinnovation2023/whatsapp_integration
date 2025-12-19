import { Document, Image, Text, View } from '@react-pdf/renderer'
import React from 'react'
import PageTemplate from './page-template'
import PDFDetailsTable from './details-table'
import PDFBrandBasedContent from './brand-based-content'
import RenderDateInPDF from './render-date'
import { WarrantyPDFPagePDFContentInterface } from '.'
import StampImage from "./assets/prodi-seal-with-sign.png";

const WarrantyPDFMain = ({ customerData }: {
    customerData: WarrantyPDFPagePDFContentInterface
}) => {
    return (
        <Document
            style={{ fontFamily: 'Open Sans' }}
            title="Warranty Certificate"
        >
            <PageTemplate
                title="Warranty Certificate"
            >
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
                                    width: "160px",
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
    )
}

export default WarrantyPDFMain