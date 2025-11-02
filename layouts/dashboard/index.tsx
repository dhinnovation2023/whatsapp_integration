import React, { PropsWithChildren } from 'react'
import DashboardSidebar from './sidebar'
import PageHeader from './header'
import DefaultSection from '../default-section'

const DashboardLayout = ({
    children,
    pageTitle,
}: PropsWithChildren<{
    pageTitle: string,
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
                    <PageHeader
                        pageTitle={pageTitle}
                    />
                    <DefaultSection
                        className='py-10'
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
