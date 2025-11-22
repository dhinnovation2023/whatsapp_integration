import React, { PropsWithChildren } from 'react'

const DefaultSection = ({
    children,
    className,
    outerClassName,
    disablePX,
}: PropsWithChildren<{
    className?: string,
    outerClassName?: string,
    disablePX?: boolean,
}>) => {
    return (
        <div
            className={`w-full ${!disablePX ? "px-5" : ""} ${outerClassName}`}
        >
            <div
                className={`mx-auto max-w-[1440px] w-full ${className}`}
            >{children}</div>
        </div>
    )
}

export default DefaultSection