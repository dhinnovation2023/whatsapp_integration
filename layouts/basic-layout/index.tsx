import React, { PropsWithChildren } from 'react'
import DefaultSection from '../default-section'
import BasicLayoutHeader from './header'
import BasicLayoutFooter from './footer'

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
            <BasicLayoutFooter/>
        </div>
    )
}

export default BasicLayout