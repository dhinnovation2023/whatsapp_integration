'use client';

import { QuotationsModelInterface } from '@/models/accounting/quotation'
import { StyleSheet, Text, View } from '@react-pdf/renderer'

export const quotationPDFHeadingsStyle = StyleSheet.create({
    heading1: {
        fontSize: "20px",
        fontWeight: "800",
    },
    heading2: {
        fontSize: "15px",
        fontWeight: "800",
    },
    paragraph: {
        fontSize: "12px",
    },
})

const PDFMetaData = ({ data }: {
    data: QuotationsModelInterface,
}) => {
    return (
        <View
            style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "flex-end",
                gap: "10px",
                justifyContent: "space-between"
            }}
        >
            <View
                style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    gap: "3px"
                }}
            >
                <Text
                    style={[quotationPDFHeadingsStyle.heading1]}
                >Invoice to:</Text>
                <Text
                    style={[quotationPDFHeadingsStyle.heading2]}
                >{data.customerName}</Text>

                <Text
                    style={[
                        quotationPDFHeadingsStyle.paragraph,
                    ]}
                >
                    {data.location}
                </Text>

            </View>
            <View
                style={{
                    width: "200px",
                    flexShrink: 0,
                    display: "flex",
                    flexDirection: "column",
                    gap: "6px"
                }}
            >
                {
                    [
                        {
                            label: "Invoice#",
                            value: data.invoiceNo,
                        },
                        {
                            label: "Date",
                            value: typeof data.createdAt === "string" ? data.createdAt.split('T')[0].split('-').join('\u00A0/\u00A0') : "not-set"
                        }
                    ].map((item, index) => (
                        <View
                            key={index}
                            style={{
                                display: "flex",
                                flexDirection: "row",
                            }}
                        >
                            <Text
                                style={[
                                    quotationPDFHeadingsStyle.paragraph,
                                    {
                                        width: "100%",
                                        fontWeight: "800",
                                    }
                                ]}
                            >{item.label}</Text>
                            <Text
                                style={[
                                    quotationPDFHeadingsStyle.paragraph,
                                    {
                                        width: "100%",
                                        textAlign: "right"
                                    }
                                ]}
                            >{item.value}</Text>
                        </View>
                    ))
                }
            </View>
        </View>
    )
}

export default PDFMetaData