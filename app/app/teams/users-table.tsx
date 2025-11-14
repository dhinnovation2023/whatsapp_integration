'use client';

import { handleCatchBlock } from "@/functions/common";
import { TeamMembersModelInterface } from "@/models/team-member";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const UsersTable = () => {
    const [users, setUsers] = useState<TeamMembersModelInterface[]>([]);
    const router = useRouter();

    const [isDeleting, setIsDeleting] = useState<boolean>(false);

    useEffect(() => {
        (async () => {
            const response = await axios.post('/api/teams/get');
            setUsers(response.data)
        })()
    }, [])

    async function deleteUser(userId: string) {
        setIsDeleting(true);

        try {
            await axios.post("/api/teams/delete", { userId });
            const response = await axios.post('/api/teams/get');
            setUsers(response.data)
        } catch (err) {
            const message = handleCatchBlock(err);
            console.log(message);
        }

        setIsDeleting(false);
    }

    return (
        <div
            className="max-w-[800px] w-full mx-auto bg-background p-3 rounded-2xl"
        >
            <table
                className="text-left w-full rounded-xl overflow-hidden"
            >
                <thead>
                    <tr>
                        {
                            [
                                "Name",
                                "Email",
                                "Actions",
                            ].map((heading, index) => (
                                <th
                                    key={index}
                                    className='font-semibold min-w-[100px] bg-stroke-light/20 py-2 px-4'
                                >{heading}</th>
                            ))
                        }
                    </tr>
                </thead>
                <tbody>

                    {
                        users.length === 0 && (
                            <tr>
                                <td
                                    className="py-3 px-4"
                                >
                                    <p>No users found!</p>
                                </td>
                            </tr>
                        )
                    }

                    {
                        users.map((user, index) => (
                            <tr
                                key={index}
                                className="border-b border-stroke-light/50 hover:bg-stroke-light/20"
                            >
                                {
                                    [
                                        {
                                            value: user.name,
                                            customClass: "font-semibold",
                                        },
                                        {
                                            value: user.email,
                                            customClass: "",
                                        },
                                    ].map((item, index) => (
                                        <td
                                            key={index}
                                            className={`${item.customClass} py-2 px-4`}
                                        >{item.value}</td>
                                    ))
                                }

                                <td
                                    className="py-3 px-4"
                                >
                                    <div
                                        className="flex items-center gap-2"
                                    >
                                        {
                                            [
                                                {
                                                    label: isDeleting ? "Loading..." : "Delete",
                                                    customClass: "bg-red-500 text-white",
                                                    onClick: async () => {
                                                        const confirm = window.confirm("Confirm deleting...");

                                                        if (confirm) {
                                                            await deleteUser(user.userId)
                                                        }
                                                    }
                                                },
                                                {
                                                    label: "Edit",
                                                    customClass: "bg-green-500 text-white",
                                                    onClick: () => {
                                                        router.push(`/app/teams/edit?userId=${user.userId}`)
                                                    },
                                                }
                                            ].map((item, index) => (
                                                <button
                                                    key={index}
                                                    className={`py-1 px-3 cursor-pointer rounded-lg text-sm ${item.customClass}`}
                                                    onClick={item.onClick}
                                                >
                                                    {item.label}
                                                </button>
                                            ))
                                        }
                                    </div>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default UsersTable