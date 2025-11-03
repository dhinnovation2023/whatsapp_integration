import { RiErrorWarningLine } from '@remixicon/react'
import React from 'react'

const ErrorTemplate = ({ error }: {
    error: string,
}) => {
    return (
        <div
            className='text-red-500 bg-red-500/20 flex items-center gap-5 py-3 px-4 rounded-xl'
        >
            <RiErrorWarningLine
                size={20}
                className='shrink-0'
            />
            <p>{error}</p>
        </div>
    )
}

export default ErrorTemplate