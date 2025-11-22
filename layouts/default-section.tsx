import React, { PropsWithChildren } from 'react'

const DefaultSection = ({
    children,
    className,
    outerClassName,
    disablePX,
    fullwidth,
}: PropsWithChildren<{
    className?: string,
    outerClassName?: string,
    disablePX?: boolean,
    fullwidth?: boolean,
}>) => {
    return (
        <div
            className={`w-full ${!disablePX ? "px-5" : ""} ${outerClassName}`}
        >
            <div
                className={`mx-auto ${fullwidth ? "max-w-full" : "max-w-[1440px]"} w-full ${className}`}
            >{children}</div>
        </div>
    )
}

export default DefaultSection