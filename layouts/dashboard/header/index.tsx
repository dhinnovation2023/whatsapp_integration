import DefaultSection from '@/layouts/default-section'
import React from 'react'

const PageHeader = ({ pageTitle }: {
    pageTitle: string,
}) => {
    return (
        <DefaultSection
            outerClassName='bg-background py-[20px] shadow-lg shadow-lg shadow-neutral-100'
        >
            <div>
                <h2
                    className='text-xl font-semibold'
                >{pageTitle}</h2>
            </div>
        </DefaultSection>
    )
}

export default PageHeader
