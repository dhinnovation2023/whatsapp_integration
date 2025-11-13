'use client';

import { RiArrowDownSLine, RiLoader4Line } from '@remixicon/react'
import { useRef } from 'react';

const LoadMoreFilterButton = ({ onClick, paginationLoading }: {
    onClick: () => void,
    paginationLoading: boolean,
}) => {

    const wrapperRef = useRef<HTMLDivElement>(null);

    return (
        <div
            className='p-2'
            ref={wrapperRef}
        >
            <button
                className='flex items-center justify-center py-3 px-4 gap-2 text-theme-primary text-center w-full cursor-pointer font-semibold hover:bg-theme-primary/10 transition-all rounded-xl'
                onClick={onClick}
                type='button'
            >
                {
                    paginationLoading ? (
                        <RiLoader4Line
                            size={25}
                            className='animate-spin'
                        />
                    ) : (
                        <RiArrowDownSLine
                            size={25}
                            className='shrink-0'
                        />
                    )
                }
                <span>{paginationLoading ? "Loading Contacts..." : "Load more"}</span>
            </button>
        </div>
    )
}

export default LoadMoreFilterButton