'use client';

import { RiUser6Line } from "@remixicon/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { TeamMembersModelInterface } from "@/models/team-member";
import { handleCatchBlock } from "@/functions/common";
import axios from "axios";
import { CustomContactsCardDataInterface } from "@/app/api/whatsapp/fetch-contacts/all/route";
import LastMessageTemplate from "./last-message-template";
import { StatusModelInterface } from "@/models/status";

const ContactCard = ({
    chat,
    onClose,
    statusList,
}: {
    chat: CustomContactsCardDataInterface,
    onClose?: () => void,
    statusList: StatusModelInterface[],
}) => {

    const [currentStatus, setCurrentStatus] = useState<StatusModelInterface | null>(null);

    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        (() => {
            const targetStatus = statusList.find((status) => status.statusId === chat.statusId);
            setCurrentStatus(targetStatus || null);
        })()
    }, [statusList.length, statusList, chat.statusId])

    return (
        <>
            <div
                className={`py-2 px-5 min-h-[65px] border-b border-stroke-light/50 space-y-2 flex items-center overflow-hidden ${chat.phone === searchParams.get('phone') ? "bg-theme-primary/10" : "hover:bg-stroke-light/10"}`}
            >
                <div
                    className={`flex group items-center gap-3 w-full`}
                >
                    <div
                        className={`w-[30px] h-[30px] rounded-full flex items-center justify-center shrink-0 relative ${chat.phone === searchParams.get('phone') ? "bg-theme-primary! text-white" : ""}`}
                        style={{
                            backgroundColor: currentStatus ? currentStatus.color : "#00000005",
                            color: currentStatus ? "white" : '',
                        }}
                        title={currentStatus?.name}
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
                        className='space-y-1 w-full text-left'
                    >
                        <button
                            className='text-sm text-left font-semibold capitalize cursor-pointer flex items-center gap-2'
                            onClick={() => {
                                if (onClose) {
                                    onClose()
                                }
                                router.push(`/app?phone=${chat.phone}`)
                            }}
                        >
                            <p
                                className="line-clamp-1"
                                title={chat.name}
                            >{chat.name === "unknown" ? chat.phone : chat.name}</p>

                            {
                                chat.assigned && (
                                    <AssignedUserName
                                        userId={chat.assigned}
                                    />
                                )
                            }
                        </button>
                        <p
                            className="text-xs"
                        >{chat.phone}</p>
                        {
                            chat.lastChat && (
                                <LastMessageTemplate
                                    message={chat.lastChat}
                                />
                            )
                        }
                    </div>

                </div>

            </div>
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
        const h = Math.floor(Math.random() * 360);
        const hexColor = hslToHex(h, 70, 50);
        return hexColor;
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
    }, [userId])

    if (!userData?.name) {
        return null
    }

    return (
        <span
            className={`text-[10px] font-light py-0.5 px-1.5 rounded-lg text-nowrap`}
            style={{ backgroundColor: userData.labelColor || bgColor, color: "#ffffff" }}
        >{userData.name}</span>
    )
}

function hslToHex(h: number, s: number, l: number) {
    s /= 100;
    l /= 100;

    const k = (n: number) => (n + h / 30) % 12;
    const a = s * Math.min(l, 1 - l);
    const f = (n: number) =>
        l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));

    const toHex = (x: number) =>
        Math.round(x * 255)
            .toString(16)
            .padStart(2, '0');

    return `#${toHex(f(0))}${toHex(f(8))}${toHex(f(4))}`;
}

export default ContactCard