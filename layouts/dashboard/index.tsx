import { PropsWithChildren } from 'react'
import DashboardSidebar from './sidebar'
import PageHeader from './header'
import DefaultSection from '../default-section'

const DashboardLayout = ({
    children,
    pageTitle,
    hidePageHeader,
    fullwidth,
}: PropsWithChildren<{
    pageTitle: string,
    hidePageHeader?: boolean,
    fullwidth?: boolean,
}>) => {

    return (
        <div
            className='flex flex-col md:flex-row items-stretch min-h-dvh md:min-h-screen md:max-h-screen bg-background-2'
        >
            <DashboardSidebar />
            <div
                className='w-full max-h-screen overflow-auto'
            >
                <div>
                    {
                        !hidePageHeader && (
                            <PageHeader
                                pageTitle={pageTitle}
                            />
                        )
                    }
                    <DefaultSection
                        disablePX
                        fullwidth={fullwidth}
                    >
                        <div
                            className='w-full'
                        >
                            {children}
                        </div>
                    </DefaultSection>
                </div>
            </div>
        </div>
    )
}

export default DashboardLayout
