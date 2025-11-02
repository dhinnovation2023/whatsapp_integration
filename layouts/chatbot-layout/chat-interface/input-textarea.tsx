'use client';

import { RiSendPlaneLine } from '@remixicon/react'
import { useState } from 'react'

const InputTextarea = ({}: {
    onSubmit: (value: string) => void,
}) => {

    const [value, setValue] = useState<string>('');

    return (
        <div
            className='py-3 px-4 bg-background flex items-center rounded-2xl'
        >
            <input
                type="text"
                placeholder='Enter message'
                className='w-full pl-[17px] outline-none'
                value={value}
                onChange={(event) => setValue(event.target.value)}
            />
            <button
                className='shrink-0 rounded-md bg-theme-primary text-white min-w-[50px] h-[50px] flex items-center justify-center'
            >
                <RiSendPlaneLine
                    size={20}
                />
            </button>
        </div>
    )
}

export default InputTextarea
