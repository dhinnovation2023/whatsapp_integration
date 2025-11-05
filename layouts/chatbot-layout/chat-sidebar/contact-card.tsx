'use client';

import { ContactsModelInterface } from "@/models/contacts";
import { RiListSettingsLine, RiUser6Line } from "@remixicon/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import SaveContactPopup from "./save-contact-popup";

const ContactCard = ({
    chat
}: {
    chat: ContactsModelInterface,
}) => {

    const router = useRouter();
    const searchParams = useSearchParams();

    const [showPopup, setShowPopup] = useState<null | "save-contact">(null);

    return (
        <>
            <button
                className={`flex group items-center gap-3 w-full py-4 px-5 cursor-pointer border-b border-stroke-light/50 ${chat.phone === searchParams.get('phone') ? "bg-theme-primary/10" : "hover:bg-stroke-light/10"}`}
                onClick={() => {
                    router.push(`/app?phone=${chat.phone}`)
                }}
            >
                <div
                    className={`w-[30px] h-[30px] rounded-full flex items-center justify-center shrink-0 ${chat.phone === searchParams.get('phone') ? "bg-theme-primary text-white" : "bg-background-2"}`}
                >
                    <RiUser6Line
                        size={15}
                    />
                </div>
                <div
                    className='space-y-0.5 w-full text-left'
                >
                    <h3
                        className='text-sm font-semibold capitalize'
                    >{chat.name}</h3>
                    <p
                        className='text-xs'
                    >{chat.phone}</p>
                </div>

                <div
                    className='group-hover:block hidden'
                >
                    <RiListSettingsLine
                        size={20}
                        className='cursor-pointer'
                        onClick={() => setShowPopup("save-contact")}
                    />
                </div>

            </button>

            {
                showPopup === "save-contact" && (
                    <SaveContactPopup
                        defaultName={chat.name}
                        phone={chat.phone}
                        onClose={() => {
                            setShowPopup(null)
                        }}
                    />
                )
            }

        </>
    )
}

export default ContactCard