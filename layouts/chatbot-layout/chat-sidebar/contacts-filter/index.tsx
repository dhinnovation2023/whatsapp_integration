'use client';

import { CustomContactsCardDataInterface } from "@/app/api/whatsapp/fetch-contacts/all/route";
import { handleCatchBlock } from "@/functions/common";
import { TeamMembersModelInterface } from "@/models/team-member";
import axios from "axios";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FetchContactsFilterOptions } from "@/functions/whatsapp/fetchContacts";
import ErrorTemplate from "@/components/ui-elements/error-template";
import { RiCloseLine } from "@remixicon/react";
import ContactCard from "../contact-card";
import { fetchFilteredContacts } from "./fetchContacts";
import LoadMoreFilterButton from "./load-more";

const ContactFilter = ({ onClose }: {
    onClose: () => void,
}) => {

    const [contacts, setContacts] = useState<CustomContactsCardDataInterface[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [paginationLoading, setPaginationLoading] = useState<boolean>(false);
    const [disablePagination, setDisablePagiination] = useState<boolean>(false);

    const [teamMember, setTeamMember] = useState<string>('');

    const [enableDate, setEnableDate] = useState<boolean>(false);
    const [date, setDate] = useState<{ start: Date, end: Date }>({
        start: new Date(),
        end: new Date(),
    });

    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const [teams, setTeams] = useState<TeamMembersModelInterface[]>([]);

    const dateSelectorsData: {
        value: Date,
        onChange: (event: ChangeEvent<HTMLInputElement>) => void,
    }[] = [
            {
                value: date.start,
                onChange: (event) => {
                    setDate(prev => ({
                        ...prev,
                        start: event.target.valueAsDate || new Date(),
                    }));
                }
            },
            {
                value: date?.end || new Date(),
                onChange: (event) => {
                    console.log(event.target.value)
                    setDate(prev => ({
                        ...prev,
                        end: event.target.valueAsDate || new Date(),
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

    useEffect(() => {
        (async () => {
            try {
                setPaginationLoading(true);
                const requestData: FetchContactsFilterOptions = {
                    currentPage: currentPage,
                    assigned: teamMember,
                    date: enableDate ? ({
                        start: date.start.getTime(),
                        end: date.end.getTime(),
                    }) : undefined,
                }

                const contacts = await fetchFilteredContacts(requestData);
                if (contacts.length === 0) {
                    setDisablePagiination(true);
                }
                setContacts(prev => [...prev, ...contacts]);
            } catch (err) {
                const message = handleCatchBlock(err);
                setError(message);
            }

            setPaginationLoading(false);
        })()

        // eslint-disable-next-line
    }, [currentPage])

    async function handleFormSubmit(event: FormEvent) {

        event?.preventDefault();
        setLoading(true);
        try {

            const requestData: FetchContactsFilterOptions = {
                currentPage: 1,
                assigned: teamMember,
                date: enableDate ? ({
                    start: date.start.getTime(),
                    end: date.end.getTime(),
                }) : undefined,
            }

            const contacts = await fetchFilteredContacts(requestData);

            setContacts(contacts);
            setLoading(false);
            setCurrentPage(1);
            setDisablePagiination(false);

        } catch (err) {
            const message = handleCatchBlock(err);
            setError(message);
        }

        setLoading(false)
    }

    return (
        <div
            className="fixed top-0 left-0 w-full h-full z-50 flex items-center justify-center"
        >
            <motion.form
                onSubmit={(event) => {
                    handleFormSubmit(event);
                }}
                className="bg-background-2 rounded-2xl max-w-[800px] h-full max-h-[90dvh] py-5 px-8 w-full shadow-md border border-stroke-light flex items-stretch gap-5"
                initial={{
                    opacity: 0,
                    y: 500,
                }}
                animate={{
                    opacity: 1,
                    y: 0,
                    transition: {
                        duration: 0.4,
                    }
                }}
                exit={{
                    opacity: 0,
                    y: 500,
                    transition: {
                        duration: 0.4,
                    }
                }}
            >
                <div
                    className="space-y-3"
                >
                    <div
                        className="flex items-center justify-between"
                    >
                        <h2
                            className="text-xl font-semibold"
                        >Search Contacts</h2>
                        <RiCloseLine
                            size={20}
                            className="shrink-0 cursor-pointer"
                            onClick={onClose}
                        />
                    </div>
                    <div
                        className="bg-background py-2 px-3 rounded-xl"
                    >
                        <select
                            className="w-full block outline-none"
                            name="users"
                            id="users"
                            onChange={(event) => {
                                setTeamMember(event.target.value);
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
                        className="flex items-center gap-2"
                    >
                        <input
                            type="checkbox"
                            id="enable-date"
                            checked={enableDate}
                            onChange={(event) => setEnableDate(event.target.checked)}
                        />
                        <label
                            htmlFor="enable-date"
                        >Enable Date filter</label>
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
                                    disabled={!enableDate}
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
                    </div>
                </div>

                <div
                    className="w-full bg-background rounded-2xl max-h-full overflow-x-hidden overflow-y-auto"
                >
                    <div>
                        {
                            loading ? (
                                <div
                                    className="py-4 px-6"
                                >
                                    <p>Loading...</p>
                                </div>
                            ) : contacts.length === 0 ? (
                                <div
                                    className="py-4 px-6"
                                >
                                    <p>No results found!</p>
                                </div>
                            ) : contacts.map((contact, index) => (
                                <ContactCard
                                    key={contact.phone + index}
                                    chat={contact}
                                    onClose={onClose}
                                />
                            ))
                        }

                        {
                            !disablePagination && (
                                <LoadMoreFilterButton
                                    onClick={() => {

                                        if (paginationLoading) {
                                            return;
                                        }

                                        setCurrentPage(prev => {
                                            console.log("prev value:", prev);
                                            return prev + 1;
                                        })
                                    }}
                                    paginationLoading={paginationLoading}
                                />
                            )
                        }

                    </div>
                </div>

            </motion.form>
        </div>
    )
}

export default ContactFilter