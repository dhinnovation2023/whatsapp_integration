import React, { PropsWithChildren } from 'react'
import DefaultSection from '../default-section'
import BasicLayoutHeader from './header'

const BasicLayout = ({
    children
}: PropsWithChildren) => {
    return (
        <div
            className='min-h-screen bg-background-2'
        >
            <BasicLayoutHeader/>
            <DefaultSection
                outerClassName='py-[40px]'
            >
                {children}
            </DefaultSection>
        </div>
    )
}

export default BasicLayout