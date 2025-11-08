'use client';

import { ContactsModelInterface } from "@/models/contacts";
import { RiListSettingsLine, RiUser6Line } from "@remixicon/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import SaveContactPopup from "./save-contact-popup";
import { TeamMembersModelInterface } from "@/models/team-member";
import { handleCatchBlock } from "@/functions/common";
import axios from "axios";

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
            <div
                className={`flex group items-center gap-3 w-full py-4 px-5 border-b border-stroke-light/50 ${chat.phone === searchParams.get('phone') ? "bg-theme-primary/10" : "hover:bg-stroke-light/10"}`}
            >
                <div
                    className={`w-[30px] h-[30px] rounded-full flex items-center justify-center shrink-0 relative ${chat.phone === searchParams.get('phone') ? "bg-theme-primary text-white" : "bg-background-2"}`}
                >
                    {
                        chat.unread &&
                        <p
                            className="absolute -left-1.5 -top-1.5 w-4 h-4 rounded-full bg-theme-primary shadow-xl text-xs flex items-center justify-center text-white font-semibold"
                        >{chat.unread}</p>
                    }

                    <RiUser6Line
                        size={15}
                    />
                </div>
                <div
                    className='space-y-0.5 w-full text-left'
                >
                    <button
                        className='text-sm font-semibold capitalize cursor-pointer flex items-center gap-2'
                        onClick={() => {
                            router.push(`/app?phone=${chat.phone}`)
                        }}
                    >
                        <p>{chat.name}</p>

                        {
                            chat.assigned && (
                                <AssignedUserName
                                    userId={chat.assigned}
                                />
                            )
                        }
                    </button>
                    <p
                        className='text-xs'
                    >{chat.phone}</p>
                </div>

                <div
                    className='group-hover:block md:hidden'
                >
                    <RiListSettingsLine
                        size={20}
                        className='cursor-pointer'
                        onClick={() => setShowPopup("save-contact")}
                    />
                </div>

            </div>

            {
                showPopup === "save-contact" ? (
                    <SaveContactPopup
                        defaultName={chat.name}
                        phone={chat.phone}
                        onClose={() => {
                            setShowPopup(null)
                        }}
                    />
                ) : null
            }

        </>
    )
}

function AssignedUserName({
    userId,
}: {
    userId: string,
}) {

    const [userData, setUserData] = useState<TeamMembersModelInterface | null>(null);
    const [bgColor] = useState<string>(() => {
        const color = '#' + Math.floor(Math.random() * 16777215).toString(16);
        return color;
    })

    useEffect(() => {
        (async () => {
            try {
                const response = await axios.post<TeamMembersModelInterface>('/api/teams/get-one-by-id', { userId });
                setUserData(response.data);
            } catch (err) {
                const message = handleCatchBlock(err);
                console.error(message);
            }
        })()
    }, [])

    if (!userData?.name) {
        return null
    }

    return (
        <span
            className={`text-[10px] font-light py-0.5 px-1.5 rounded-lg`}
            style={{ backgroundColor: `${bgColor}30`, color: bgColor }}
        >{userData.name}</span>
    )
}

export default ContactCard