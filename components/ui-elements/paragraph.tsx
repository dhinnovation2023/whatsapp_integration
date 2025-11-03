import React, { PropsWithChildren } from 'react'

const Paragraph = ({ children }: PropsWithChildren) => {
    return (
        <p
            className='text-foreground/80'
        >{children}</p>
    )
}

export default Paragraph