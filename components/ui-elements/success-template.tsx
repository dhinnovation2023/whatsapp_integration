import { RiCheckLine } from '@remixicon/react'
import React from 'react'

const SuccessTemplate = ({ message }: {
    message: string,
}) => {
    return (
        <div
            className='text-green-500 bg-green-500/20 flex items-center gap-5 py-3 px-4 rounded-xl'
        >
            <RiCheckLine
                size={20}
                className='shrink-0'
            />
            <p>{message}</p>
        </div>
    )
}

export default SuccessTemplate