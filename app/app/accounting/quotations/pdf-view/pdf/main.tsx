import { Document, View } from '@react-pdf/renderer'
import React from 'react'
import QuotationPageTemplate from './page-template'
import PDFMetaData from './meta-data'
import QuotationPDFProductTable from './products-table'
import QuotationPDFNotes from './notes'
import QuotationPDFSummary from './summary'
import { QuotationsModelInterface } from '@/models/accounting/quotation'
import { ReadonlyURLSearchParams } from 'next/navigation'
import { QuotationPDFCustomProductInterface, QuoteationPDFSummaryInterface } from '.'

const QuotationPDFMain = ({
    isNoteLengthy,
    quotation,
    products,
    summary,
    searchParams,
}: {
    quotation: QuotationsModelInterface,
    isNoteLengthy: boolean,
    products: QuotationPDFCustomProductInterface[],
    summary: QuoteationPDFSummaryInterface,
    searchParams: ReadonlyURLSearchParams,
}) => {

    return (
        <Document
            style={{ fontFamily: 'Open Sans' }}
            title="Quotation"
        >
            <QuotationPageTemplate
                title={searchParams.get('title') || "Quotation"}
            >
                <PDFMetaData
                    data={quotation}
                />
                <QuotationPDFProductTable
                    products={products}
                />

                <View
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "flex-start"
                    }}
                >
                    <View
                        style={{
                            width: "100%"
                        }}
                    >
                        {!isNoteLengthy && (
                            <QuotationPDFNotes
                                notes={quotation.note}
                            />
                        )}
                    </View>
                    <View
                        style={{
                            width: "100%",
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "flex-end"
                        }}
                    >
                        <QuotationPDFSummary
                            summary={summary}
                        />
                    </View>
                </View>

            </QuotationPageTemplate>

            {isNoteLengthy && (
                <QuotationPageTemplate>
                    <QuotationPDFNotes
                        notes={quotation.note}
                    />
                </QuotationPageTemplate>
            )}

        </Document>
    )
}

export default QuotationPDFMain