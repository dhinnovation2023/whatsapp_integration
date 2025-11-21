'use client';

import { Fragment, useState } from 'react'
import { DashboardMenuItemsInterface } from './menu-items'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from "framer-motion";
import ErrorTemplate from '@/components/ui-elements/error-template';
import Link from 'next/link';
import { RiArrowDownSLine } from '@remixicon/react';

const SubmenuItem = ({ menuItem }: {
    menuItem: DashboardMenuItemsInterface,
}) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const pathname = usePathname();

    if (!menuItem.submenu) {
        return (
            <ErrorTemplate
                error='Submenu items not found'
            />
        )
    }

    return (
        <div
            className='space-y-3'
        >
            <button
                className={"flex w-full cursor-pointer items-center justify-between gap-3 py-3 px-5 rounded-full shadow-md shadow-theme-primary/20" + ` ${pathname === menuItem.href ? "bg-theme-primary text-white" : "bg-theme-primary/10"}`}
                onClick={() => {
                    setIsOpen(prev => !prev);
                }}
            >
                <div
                    className='flex items-center gap-3'
                >
                    <menuItem.icon
                        size={20}
                        className={`${pathname !== menuItem.href ? "text-theme-primary" : ""}`}
                    />
                    <p>{menuItem.label}</p>
                </div>
                <RiArrowDownSLine
                    size={20}
                    className={`transition-all ${isOpen ? "rotate-180" : ""}`}
                />
            </button>

            <AnimatePresence>
                {
                    isOpen && (
                        <motion.div
                            className='pl-4'
                            initial={{
                                x: 30,
                                opacity: 0,
                            }}
                            animate={{
                                x: 0,
                                opacity: 1,
                            }}
                            exit={{
                                x: 30,
                                opacity: 0,
                            }}
                        >
                            {menuItem.submenu.map((item, index) => (
                                <Fragment
                                    key={index}
                                >
                                    {index !== 0 && (
                                        <hr
                                            className='border-stroke-light/60 mx-3'
                                        />
                                    )}
                                    <Link
                                        key={index}
                                        href={item.href}
                                        className='flex py-3 px-4 w-full hover:bg-stroke-light/20 rounded-2xl'
                                    >{item.label}</Link>
                                </Fragment>
                            ))}
                        </motion.div>
                    )
                }
            </AnimatePresence>

        </div>
    )
}

export default SubmenuItem