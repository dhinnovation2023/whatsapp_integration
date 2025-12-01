'use client';

import PageTemplate from '@/app/app/warranty-cert/generate-pdf/pdf/page-template'
import RenderDateInPDF from '@/app/app/warranty-cert/generate-pdf/pdf/render-date';
import { ServiceCustomersModelInterface } from '@/models/service/customers'
import { Document, Font, Image, PDFViewer, Text, View } from '@react-pdf/renderer'
import StampImage from "@/app/app/warranty-cert/generate-pdf/pdf/assets/prodi-seal-with-sign.png"
import PDFDetailsTable from './pdf-details-table';
import PDFBrandBasedContent from './brand-based-content';

export type ServiceCustomerPDFGenerateInterface = Omit<ServiceCustomersModelInterface, "brand"> & {
    brandName: string,
    brandContent: string,
}

const ServiceCustomerPDF = (data: {
    customerData: ServiceCustomerPDFGenerateInterface,
}) => {

    // React-PDF Configs
    Font.register({
        family: 'Open Sans', fonts: [
            { src: 'https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-regular.ttf' },
            { src: 'https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-600.ttf', fontWeight: 600 }
        ]
    })

    return (
        <div
            className='w-full h-screen'
        >
            <PDFViewer
                className='w-full min-h-screen'
            >
                <Document
                    style={{ fontFamily: 'Open Sans' }}
                    title="Service Certificate"
                >
                    <PageTemplate
                        title='Service Certificate'
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
                        title='Service Certificate'
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
            </PDFViewer>
        </div>
    )
}

export default ServiceCustomerPDF