import { RiUser6Line } from '@remixicon/react'
import React from 'react'

const UserInfo = () => {
    return (
        <div
            className='border-b border-stroke-light pb-4'
        >
            <div
                className='flex items-center gap-3'
            >
                <div
                    className='w-[50px] h-[50px] bg-background-2 rounded-full flex items-center justify-center shrink-0'
                >
                    <RiUser6Line
                        size={20}
                    />
                </div>
                <div
                    className='space-y-0.5'
                >
                    <h3
                        className='text-sm font-semibold'
                    >Abhilash</h3>
                    <p
                        className='text-xs'
                    >Manager</p>
                </div>
            </div>
        </div>
    )
}

export default UserInfo
