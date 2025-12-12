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
        fontSize: "11px",
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
                    width: "37%",
                    display: "flex",
                    flexDirection: "column",
                    gap: "3px",
                    padding: "0 20px",
                    borderRight: "1px solid #cecece"
                }}
            >
                <Text
                    style={{
                        fontSize: "12px",
                        fontWeight: "800",
                    }}
                >PROUDI SOLAR SOLUTION</Text>
                <Text
                    style={[quotationPDFHeadingsStyle.paragraph]}
                >Proudi Trading FZE | Behind Emirates Road, Office – Warehouse No. 1, Al Sajaa Industrial, Sharjah, UAE</Text>

                {
                    [
                        "Mail: info@proudi.ae",
                        "Mob: +971 56 43 05 251",
                        "Tel: +971 (06) 715 0164",
                        "VAT TRN: 100489218600003",
                    ].map((item, index) => (
                        <Text
                            key={index}
                            style={[
                                quotationPDFHeadingsStyle.paragraph,
                            ]}
                        >
                            {item}
                        </Text>
                    ))
                }

            </View>

            <View
                style={{
                    width: "37%",
                    display: "flex",
                    flexDirection: "column",
                    gap: "3px",
                    padding: "0 20px",
                }}
            >
                <Text
                    style={[quotationPDFHeadingsStyle.heading2]}
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
                <Text
                    style={[
                        quotationPDFHeadingsStyle.paragraph,
                    ]}
                >
                    +{data.phone}
                </Text>

            </View>
            <View
                style={{
                    width: "25%",
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