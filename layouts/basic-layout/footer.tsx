import React from 'react'
import DefaultSection from '../default-section'
import Link from 'next/link'

const BasicLayoutFooter = () => {
  return (
    <DefaultSection
        className='flex items-center justify-between'
        outerClassName='py-[15px] bg-background'
    >
        <div>
            <p>&copy; All Right Reserved.</p>
        </div>
        <div
            className='flex items-center justify-end gap-2'
        >
            {
                [
                    {
                        label: "Privacy policy",
                        href: "/privacy-policy",
                    }, 
                    {
                        label: "Terms of services",
                        href: "/terms-of-services",
                    },
                ].map((item, index) => (
                    <Link
                        href={item.href}
                        key={index}
                    >{item.label}</Link>
                ))
            }
        </div>
    </DefaultSection>
  )
}

export default BasicLayoutFooter