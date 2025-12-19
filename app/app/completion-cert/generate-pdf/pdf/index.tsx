'use client';

import { Font, PDFDownloadLink, PDFViewer } from '@react-pdf/renderer'
import { CompletionCertCustomersModelInterface } from '@/models/completion-cert/customers';
import CompletionPDFMain from './main';
import { RiLoaderLine } from '@remixicon/react';

export type CompletionCertPDFGenarateInterface = Omit<CompletionCertCustomersModelInterface, "brand"> & {
    brandName: string,
    brandContent: string,
}

const CompletionCertCustomerPDF = (data: {
    customerData: CompletionCertPDFGenarateInterface,
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
            className='w-full h-screen relative'
        >
            <PDFViewer
                className='w-full min-h-screen'
            >
                <CompletionPDFMain
                    customerData={data.customerData}
                />
            </PDFViewer>

            {window.innerWidth < 600 && (
                <div
                    className="absolute top-0 left-0 w-full h-full flex items-center bg-white justify-center"
                >
                    <PDFDownloadLink
                        document={
                            <CompletionPDFMain
                                customerData={data.customerData}
                            />
                        }
                        className="bg-foreground text-background py-3 px-5 rounded-2xl flex items-center gap-2"
                    >
                        {({ loading }) => (
                            loading ? (
                                <>
                                    <RiLoaderLine
                                        size={20}
                                        className="animate-spin"
                                    />
                                    Loading PDF
                                </>
                            ) : "Download PDF"
                        )}
                    </PDFDownloadLink>
                </div>
            )}
        </div>
    )
}

export default CompletionCertCustomerPDF