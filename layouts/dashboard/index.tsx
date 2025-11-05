import { PropsWithChildren } from 'react'
import DashboardSidebar from './sidebar'
import PageHeader from './header'
import DefaultSection from '../default-section'

const DashboardLayout = ({
    children,
    pageTitle,
    hidePageHeader,
}: PropsWithChildren<{
    pageTitle: string,
    hidePageHeader?: boolean,
}>) => {

    return (
        <div
            className='flex items-stretch min-h-screen bg-background-2'
        >
            <DashboardSidebar />
            <div
                className='w-full'
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
                        className='py-3'
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
