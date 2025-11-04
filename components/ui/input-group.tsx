import React, { ChangeEvent, InputHTMLAttributes } from 'react'

const InputGroup = (data: {
    label: string,
    placeholder: string,
    value?: string,
    onChange: (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => void,
    name: string,
    type?: InputHTMLAttributes<HTMLInputElement>["type"] | "select",
    required?: boolean,
    options?: {
        label: string,
        value: string,
    }[]
}) => {

    if (data.type === "select") {
        return (
            <div
                className='flex flex-col gap-2'
            >
                <label
                    htmlFor={data.name}
                    className='text-sm font-semibold'
                >{data.label} {data.required && <span className='text-red-500'>*</span>}</label>
                <select
                    name={data.name}
                    value={data.value}
                    onChange={data.onChange}
                    className='w-full py-2 px-4 border border-stroke-light rounded-lg'
                >
                    <option value="">-- {data.placeholder} --</option>
                    {data.options?.map((option, index) => (
                        <option
                            key={index}
                            value={option.value}
                        >{option.label}</option>
                    ))}
                </select>
            </div>
        )
    }

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