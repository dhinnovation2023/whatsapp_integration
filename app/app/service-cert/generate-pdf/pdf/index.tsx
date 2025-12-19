'use client';

import { ServiceCustomersModelInterface } from '@/models/service/customers'
import { Font, PDFDownloadLink, PDFViewer } from '@react-pdf/renderer'
import ServicePDFMain from './main';
import { RiLoaderLine } from '@remixicon/react';

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
            className='w-full h-screen relative'
        >
            <PDFViewer
                className='w-full min-h-screen'
            >
                <ServicePDFMain
                    customerData={data.customerData}
                />
            </PDFViewer>

            {window.innerWidth < 600 && (
                <div
                    className="absolute top-0 left-0 w-full h-full flex items-center bg-white justify-center"
                >
                    <PDFDownloadLink
                        document={
                            <ServicePDFMain
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

export default ServiceCustomerPDF