'use client';

import { Text, View } from '@react-pdf/renderer'
import { ServiceCustomerPDFGenerateInterface } from '.';
import RenderDateInPDF from '@/app/app/warranty-cert/generate-pdf/pdf/render-date';

const PDFDetailsTable = ({ pdfContent }: {
    pdfContent: ServiceCustomerPDFGenerateInterface
}) => {

    if (!pdfContent) {
        throw new Error("PDF Content is not loaded!")
    }

    return (
        <View
            style={{
                border: "1px solid #F7F7F7"
            }}
        >
            {
                [
                    {
                        label: "Invoice No",
                        value: pdfContent.invoiceNo
                    },
                    {
                        label: "Brand",
                        value: pdfContent.brandName
                    },
                    {
                        label: "Product",
                        value: pdfContent.productName,
                    },
                    {
                        label: pdfContent.customerType,
                        value: pdfContent.customerName,
                    },
                    {
                        label: "Phone",
                        value: pdfContent.phone,
                    },
                    {
                        label: "Villa No",
                        value: pdfContent.villaNo,
                    },
                    {
                        label: "Location / Area",
                        value: pdfContent.location,
                    },
                    {
                        label: "Date of Service / Execution",
                        value: pdfContent.dateOfService,
                        isDate: true,
                    },
                    {
                        label: "Nth Service",
                        value: pdfContent.nthService,
                    }
                ].map((row, index) => (
                    <View
                        key={index}
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            padding: "7px 10px",
                            backgroundColor: index % 2 === 1 ? "#F7F7F7" : "#ffffff"
                        }}
                    >
                        <Text
                            style={{
                                width: "100%",
                                fontWeight: "800",
                                textTransform: "capitalize"
                            }}
                        >{row.label}</Text>
                        <Text
                            style={{
                                width: "100%",
                            }}
                        >
                            {
                                row.isDate ? (
                                    <RenderDateInPDF
                                        date={row.value}
                                    />
                                ) : (
                                    <>{row.value}</>
                                )
                            }
                        </Text>
                    </View>
                ))
            }
        </View>
    )
}

export default PDFDetailsTable