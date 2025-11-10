'use client';

import { RiAddLargeLine, RiCloseLine, RiLoader4Line, RiSendPlaneLine } from '@remixicon/react'
import { useRef, useState } from 'react'

const InputTextarea = ({
    onSubmit,
    sending,
}: {
    onSubmit: (
        value: string,
        file: File | null,
    ) => void,
    sending: boolean,
}) => {

    const [value, setValue] = useState<string>('');
    const [attachment, setAttachment] = useState<File | null>(null);

    const fileInputElement = useRef<HTMLInputElement>(null);

    return (
        <div
            className='py-2 px-5 bg-background flex items-center rounded-2xl gap-3 relative'
        >
            {
                attachment && (
                    <div
                        className='absolute bottom-[70px] left-0 bg-background shadow-2xl py-3 px-4 rounded-2xl flex items-center gap-5'
                    >
                        <div>
                            <p
                                className='text-xs font-semibold text-foreground/60'
                            >Selected attachment:</p>
                            <p
                                className='text-lg font-bold'
                            >{attachment.name}</p>
                        </div>
                        <button
                            className='shrink-0 cursor-pointer'
                            onClick={() => {
                                setAttachment(null)
                                if (fileInputElement.current) {
                                    fileInputElement.current.files = null
                                }
                            }}
                        >
                            <RiCloseLine
                                size={20}
                            />
                        </button>
                    </div>
                )
            }
            <>
                <button
                    className='shrink-0 cursor-pointer'
                    onClick={() => {
                        if (fileInputElement.current) {
                            fileInputElement.current.files = null
                            fileInputElement.current.click();
                        }
                    }}
                >
                    <RiAddLargeLine
                        size={20}
                    />
                </button>
                <input
                    type="file"
                    hidden
                    ref={fileInputElement}
                    onChange={(event) => {
                        if (event.target.files?.[0]) {
                            setAttachment(event.target.files[0]);
                        }
                    }}
                />
            </>
            <input
                type="text"
                placeholder='Enter message'
                className='w-full outline-none'
                value={value}
                onChange={(event) => setValue(event.target.value)}
                onKeyDown={(event) => {
                    if (event.key === "Enter") {
                        onSubmit(value, attachment);
                        setValue("");
                        setAttachment(null)
                        if (fileInputElement.current) {
                            fileInputElement.current.files = null;
                        }
                    }
                }}
                disabled={sending || attachment ? true : false}
            />
            <button
                className='shrink-0 rounded-2xl bg-theme-primary text-white min-w-[50px] h-[50px] flex items-center justify-center cursor-pointer'
                onClick={() => {
                    onSubmit(value, attachment);
                    setValue("")
                    setAttachment(null)
                    if (fileInputElement.current) {
                        fileInputElement.current.files = null;
                    }
                }}
            >
                {
                    sending ? (
                        <RiLoader4Line
                            size={20}
                            className='animate-spin'
                        />
                    ) : (
                        <RiSendPlaneLine
                            size={20}
                        />
                    )
                }
            </button>
        </div>
    )
}

export default InputTextarea
