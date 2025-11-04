import React, { ChangeEvent, InputHTMLAttributes } from 'react'

const InputGroup = (data: {
    label: string,
    placeholder: string,
    value: string,
    onChange: (event: ChangeEvent<HTMLInputElement>) => void,
    name: string,
    type: InputHTMLAttributes<HTMLInputElement>["type"],
    required?: boolean,
}) => {
    return (
        <div
            className='flex flex-col gap-2'
        >
            <label
                htmlFor={data.name}
                className='text-sm font-semibold'
            >{data.label} {data.required && <span className='text-red-500'>*</span>}</label>
            <input
                type={data.type}
                placeholder={data.placeholder}
                name={data.name}
                value={data.value}
                onChange={data.onChange}
                className='w-full py-2 px-4 border border-stroke-light rounded-lg'
            />
        </div>
    )
}

export default InputGroup