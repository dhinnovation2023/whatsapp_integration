'use client';

import ErrorTemplate from '@/components/ui-elements/error-template';
import { TeamMembersModelInterface } from '@/models/team-member';
import { ChangeEvent, Dispatch, FormEvent, SetStateAction, useEffect, useState } from 'react';
import { motion } from "framer-motion";
import { handleCatchBlock } from '@/functions/common';
import axios from 'axios';
import { StatusModelInterface } from '@/models/status';

const ContactInplaceFilter = ({
    date,
    setDate,
    setTeamMember,
    teamMember,
    enableDateFilter,
    setEnableDateFilter,
    onFilterSubmit,
    setStatusId,
    statusId,
}: {
    date: { start: Date, end: Date },
    setDate: Dispatch<SetStateAction<{ start: Date, end: Date }>>,
    teamMember: string,
    setTeamMember: Dispatch<SetStateAction<string>>,
    enableDateFilter: boolean,
    setEnableDateFilter: Dispatch<SetStateAction<boolean>>,
    statusId: string,
    setStatusId: Dispatch<SetStateAction<string>>,

    // formSubmit
    onFilterSubmit: (event?: FormEvent) => void | Promise<void>,
}) => {

    const [error, setError] = useState<string | null>(null);
    const [inProgress, setInProgress] = useState<boolean>(false);
    const [teams, setTeams] = useState<TeamMembersModelInterface[]>([]);
    const [statusList, setStatusList] = useState<StatusModelInterface[]>([]);

    const [resetType, setResetType] = useState<"clear" | "reset">("clear");

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

                const {
                    data: statusList,
                } = await axios.post<StatusModelInterface[]>('/api/status/get-all');
                setStatusList(statusList)

            } catch (err) {
                const message = handleCatchBlock(err);
                setError(message);
            }
        })()
    }, [])

    return (
        <motion.div
            className='py-3 px-4 bg-background-2 rounded-2xl overflow-hidden'
            initial={{
                opacity: 0,
                padding: 0,
                maxHeight: 0,
            }}
            animate={{
                opacity: 1,
                padding: "12px 16px",
                maxHeight: 300,
            }}
            exit={{
                opacity: 0,
                padding: 0,
                maxHeight: 0,
            }}
        >
            <form
                className="space-y-3"
                onSubmit={async (event) => {
                    setInProgress(true);
                    setResetType("clear");
                    await onFilterSubmit(event);
                    setInProgress(false);
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
                            setTeamMember(event.target.value);
                        }}
                        value={teamMember}
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
                    className="bg-background py-2 px-3 rounded-xl"
                >
                    <select
                        className="w-full block outline-none"
                        name="status-list" 
                        id="statusList"
                        onChange={(event) => {
                            setStatusId(event.target.value);
                        }}
                        value={statusId}
                    >
                        <option value="">-- Select Status --</option>
                        {statusList.map((status, index) => (
                            <option
                                value={status.statusId}
                                key={index}
                            >{status.name}</option>
                        ))}
                    </select>
                </div>

                <div
                    className="flex items-center gap-2"
                >
                    <input
                        type="checkbox"
                        id="enable-date"
                        checked={enableDateFilter}
                        onChange={(event) => setEnableDateFilter(event.target.checked)}
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
                                className="max-w-full text-[13px] disabled:opacity-50"
                                disabled={!enableDateFilter}
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
                        <p>{inProgress ? "Loading..." : "Apply"}</p>
                    </button>
                    <button
                        className='py-2 px-3 w-full bg-background capitalize text-foreground rounded-xl cursor-pointer shadow-md'
                        type='button'
                        onClick={() => {
                            if (resetType === "clear") {
                                setEnableDateFilter(false);
                                setDate({
                                    start: new Date(Date.now() - (86400000 * 30)),
                                    end: new Date(),
                                })
                                setTeamMember('');
                                setStatusId('');
                                setResetType("reset");
                            } else {
                                onFilterSubmit();
                                setResetType("clear");
                            }
                        }}
                    >
                        {resetType}
                    </button>
                </div>
            </form>
        </motion.div>
    )
}

export default ContactInplaceFilter