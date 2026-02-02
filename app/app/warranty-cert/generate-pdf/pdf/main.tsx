import { Document, Image, Text, View } from '@react-pdf/renderer'
import PageTemplate from './page-template'
import PDFDetailsTable from './details-table'
import PDFBrandBasedContent from './brand-based-content'
import RenderDateInPDF from './render-date'
import { WarrantyPDFPagePDFContentInterface } from '.'
import HomeDeluxeStampImage from "./assets/home-delux-seal.png";
import DreamHomeLogo from "./assets/dream-home-innovation-seal.jpeg";

export type CompanyNames = "home-deluxe" | "dream-home";

const WarrantyPDFMain = ({ customerData, company }: {
    customerData: WarrantyPDFPagePDFContentInterface,
    company: CompanyNames,
}) => {

    return (
        <Document
            style={{ fontFamily: 'Open Sans' }}
            title="Warranty Certificate"
        >
            <PageTemplate
                title="Warranty Certificate"
                company={company}
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
                                src={company === "home-deluxe" ? HomeDeluxeStampImage.src : DreamHomeLogo.src}
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