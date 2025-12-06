import { Text, View } from '@react-pdf/renderer'
import React from 'react'
import { QuoteationPDFSummaryInterface } from '.'

const QuotationPDFSummary = ({ summary }: {
    summary: QuoteationPDFSummaryInterface,
}) => {
    return (
        <View
            style={{
                width: "80%",
                display: "flex",
                flexDirection: "column",
            }}
        >
            {
                [
                    {
                        label: "Sub Total",
                        value: `AED ${summary.subtotal}`,
                    },
                    {
                        label: "VAT (5%)",
                        value: `AED ${summary.tax}`,
                    },
                ].map((item, index) => (
                    <View
                        key={index}
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            padding: "10px 15px"
                        }}
                    >
                        <Text
                            style={{
                                width: "100%",
                                fontWeight: "800"
                            }}
                        >{item.label}</Text>
                        <Text
                            style={{
                                width: "100%"
                            }}
                        >{item.value}</Text>
                    </View>
                ))
            }

            <View
                style={{
                    backgroundColor: "#555e59",
                    padding: "10px 15px",
                    display: "flex",
                    flexDirection: "row",
                    fontWeight: "800",
                    borderRadius: "10px",
                    color: "#ffffff"
                }}
            >
                <Text
                    style={{
                        width: "100%"
                    }}
                >Total</Text>
                <Text
                    style={{
                        width: "100%"
                    }}
                >AED {summary.total}</Text>
            </View>
        </View>
    )
}

export default QuotationPDFSummary