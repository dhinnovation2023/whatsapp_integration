'use client';

import { CustomContactsCardDataInterface } from "@/app/api/whatsapp/fetch-contacts/all/route";
import { handleCatchBlock } from "@/functions/common";
import { TeamMembersModelInterface } from "@/models/team-member";
import axios from "axios";
import { ChangeEvent, Dispatch, FormEvent, SetStateAction, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FetchContactsFilterOptions } from "@/functions/whatsapp/fetchContacts";
import ErrorTemplate from "@/components/ui-elements/error-template";

const ContactFilter = ({
    setContacts,
    update,
    values,
}: {
    setContacts: Dispatch<SetStateAction<CustomContactsCardDataInterface[]>>,
    values: {
        teamMember: string,
        date: {
            start: Date,
            end: Date,
        } | null,
    },
    update: {
        setTeamMembers: Dispatch<SetStateAction<string>>,
        setDate: Dispatch<SetStateAction<{ start: Date, end: Date } | null>>,
    },
    enableDateFilter: boolean,
    setEnableDateFilter: Dispatch<SetStateAction<boolean>>,
}) => {

    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const [teams, setTeams] = useState<TeamMembersModelInterface[]>([]);

    const dateSelectorsData: {
        value: Date,
        onChange: (event: ChangeEvent<HTMLInputElement>) => void,
    }[] = [
            {
                value: values.date?.start || new Date(),
                onChange: (event) => {
                    update.setDate(prev => prev ? ({
                        ...prev,
                        "start": event.target.valueAsDate || new Date(),
                    }) : ({
                        start: event.target.valueAsDate || new Date(),
                        end: new Date(),
                    }));
                }
            },
            {
                value: values.date?.end || new Date(),
                onChange: (event) => {
                    console.log(event.target.value)
                    update.setDate(prev => prev ? ({
                        ...prev,
                        "end": event.target.valueAsDate || new Date(),
                    }) : ({
                        end: event.target.valueAsDate || new Date(),
                        start: new Date(),
                    }));
                }
            }
        ]

    useEffect(() => {
        (async () => {

            try {

                const {
                    data
                } = await axios.post<TeamMembersModelInterface[]>('/api/teams/get');

                setTeams(data);


            } catch (err) {
                const message = handleCatchBlock(err);
                console.log(message)
            }
        })()

    }, [])

    async function handleFormSubmit(reset: boolean, event?: FormEvent ) {

        if (reset) {
            update.setDate(null);
            update.setTeamMembers('');
        }

        event?.preventDefault();
        setLoading(true);
        try {

            console.log(values.teamMember)

            const requestData: FetchContactsFilterOptions = {
                currentPage: 1,
                assigned: !reset ? values.teamMember : undefined,
                date: values.date && !reset ? {
                    start: values.date.start.getTime(),
                    end: values.date.end.getTime(),
                } : undefined,
            }

            const {
                data,
            } = await axios.post<CustomContactsCardDataInterface[]>(
                '/api/whatsapp/fetch-contacts/all',
                requestData,
            );

            setContacts(data);
            setLoading(false);

        } catch (err) {
            const message = handleCatchBlock(err);
            setError(message);
        }

        setLoading(false)
    }

    return (
        <motion.form
            onSubmit={(event) => {
                handleFormSubmit(false, event);
            }}
            className="bg-background-2 rounded-2xl space-y-3 overflow-hidden"
            initial={{
                opacity: 0,
                height: 0,
                padding: 0,
            }}
            animate={{
                opacity: 1,
                height: 165,
                padding: "12px 16px",
            }}
            exit={{
                opacity: 0,
                height: 0,
                padding: 0,
            }}
        >
            <div
                className="bg-background py-2 px-3 rounded-xl"
            >
                <select
                    className="w-full block outline-none"
                    name="users"
                    id="users"
                    onChange={(event) => {
                        update.setTeamMembers(event.target.value);
                    }}
                >
                    <option value="">-- Select User --</option>
                    {teams.map((team, index) => (
                        <option
                            value={team.userId}
                            key={index}
                        >{team.name}</option>
                    ))}
                </select>
            </div>

            <div
                className="flex items-center justify-between overflow-hidden"
            >
                {dateSelectorsData.map((data, index) => (
                    <div
                        className="max-w-[48%] bg-background py-1 px-3 rounded-xl"
                        key={index}
                    >
                        <input
                            type="date"
                            value={`${data.value.getFullYear()}-${(data.value.getMonth() + 1).toString().padStart(2, '0')}-${data.value.getDate().toString().padStart(2, '0')}`}
                            onChange={data.onChange}
                            className="max-w-full text-[13px]"
                        />
                    </div>
                ))}
            </div>

            {
                error && (
                    <ErrorTemplate
                        error={error}
                    />
                )
            }

            <div
                className="flex items-center gap-3"
            >
                <button
                    className="py-2 px-3 w-full bg-foreground text-background rounded-xl cursor-pointer"
                >
                    <p>{loading ? "Loading..." : "Apply"}</p>
                </button>
                <button
                    className="py-2 capitalize px-3 w-full bg-background text-foreground shadow-md rounded-xl cursor-pointer"
                    type={"reset"}
                    onClick={() => {
                        handleFormSubmit(true)
                    }}
                >
                    Reset
                </button>
            </div>

        </motion.form>
    )
}

export default ContactFilter