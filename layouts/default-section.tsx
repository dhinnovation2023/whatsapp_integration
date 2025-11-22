import React, { PropsWithChildren } from 'react'

const DefaultSection = ({
    children,
    className,
    outerClassName,
}: PropsWithChildren<{
    className?: string,
    outerClassName?: string,
}>) => {
    return (
        <div
            className={`w-full md:px-5 ${outerClassName}`}
        >
            <div
                className={`mx-auto max-w-[1440px] w-full ${className}`}
            >{children}</div>
        </div>
    )
}

export default DefaultSection