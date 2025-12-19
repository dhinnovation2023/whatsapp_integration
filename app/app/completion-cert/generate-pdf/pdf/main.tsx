import PageTemplate from '@/app/app/warranty-cert/generate-pdf/pdf/page-template'
import { Document, Image, Text, View } from '@react-pdf/renderer'
import React from 'react'
import PDFDetailsTable from './pdf-details-table'
import PDFBrandBasedContent from './brand-based-content'
import RenderDateInPDF from '@/app/app/warranty-cert/generate-pdf/pdf/render-date'
import StampImage from "@/app/app/warranty-cert/generate-pdf/pdf/assets/prodi-seal-with-sign.png"
import { CompletionCertPDFGenarateInterface } from '.'

const CompletionPDFMain = (data: {
    customerData: CompletionCertPDFGenarateInterface,
}) => {
    return (
        <Document
            style={{ fontFamily: 'Open Sans' }}
            title="Completion Certificate"
        >
            <PageTemplate
                title='Completion Certificate'
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
                            pdfContent={data.customerData}
                        />
                        <PDFBrandBasedContent
                            htmlContent={data.customerData.brandContent}
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
                                date={data.customerData.createdAt || 0}
                            />
                        </Text>
                    </View>
                </View>

            </PageTemplate>
            <PageTemplate
                title='Completion Certificate'
            >
                <Text
                    style={{
                        fontSize: 20,
                        fontWeight: 700,
                    }}
                >Attachment</Text>
                <View
                    style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 10,
                        width: "100%",
                        flexDirection: "row",
                    }}
                >
                    {data.customerData.uploads.map((filepath, index) => (
                        // eslint-disable-next-line
                        <Image
                            key={index}
                            src={`/api/whatsapp/fetch-files/${encodeURIComponent(filepath)}`}
                            style={{
                                flexShrink: 0,
                                width: "49%",
                            }}
                        />
                    ))}
                </View>
            </PageTemplate>
        </Document>
    )
}

export default CompletionPDFMain