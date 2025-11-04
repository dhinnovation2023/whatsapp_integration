'use client';

import DashboardLayout from '@/layouts/dashboard'
import { useState } from 'react'
import RegisterForm from './register-form';
import UsersTable from './users-table';

const TeamsPage = () => {

    const [currentPage, setCurrentPage] = useState<"add" | "all">("add");

    return (
        <DashboardLayout
            pageTitle='Teams'
        >
            <div
                className='flex items-center justify-center mb-5'
            >
                {
                    [
                        {
                            label: "Add User",
                            value: "add",
                        },
                        {
                            label: "All Users",
                            value: "all",
                        },
                    ].map((item, index) => (
                        <button
                            key={index}
                            className={"py-5 px-7 border-b-2 cursor-pointer" + ` ${item.value === currentPage ? "border-theme-primary bg-foreground/5" : " border-transparent"}`}
                            onClick={() => {
                                setCurrentPage(item.value === "add" ? "add" : "all")
                            }}
                        >
                            {item.label}
                        </button>
                    ))
                }
            </div>
            {
                currentPage === "add" ? (
                    <RegisterForm/>
                ) : (
                    <UsersTable/>
                )
            }
        </DashboardLayout>
    )
}

export default TeamsPage