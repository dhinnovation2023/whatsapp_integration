'use client';

import ErrorTemplate from "@/components/ui-elements/error-template";
import TableTemplate from "@/components/ui-elements/table-template";
import InputGroup from "@/components/ui/input-group";
import { GetAllQuotationsRequestData } from "@/functions/accounting/quotations/get-all";
import { handleCatchBlock } from "@/functions/common";
import DashboardLayout from "@/layouts/dashboard";
import { QuotationsModelInterface } from "@/models/accounting/quotation";
import { RiArrowDownSLine, RiLoader4Line } from "@remixicon/react";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

const ViewAllQuotationsPage = () => {

    const [inProgress, setInProgress] = useState<boolean>(false);
    const [inPaginationProgress, setInPaginationProgress] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const [status, setStatus] = useState<QuotationsModelInterface["status"]>("quoted");
    const [currentPage, setCurrentPage] = useState<number>(1);

    const [quotations, setQuotations] = useState<QuotationsModelInterface[]>([]);

    async function handlePagination({ loadmore }: { loadmore: boolean }) {
        setInPaginationProgress(true);
        setError(null);
        try {

            const nextPage = currentPage + 1;

            const requestData: GetAllQuotationsRequestData = {
                currentPage: loadmore ? nextPage : 1,
                status,
            }

            const { data } = await axios.post<QuotationsModelInterface[]>('/api/accounting/quotations/get-all', requestData);

            if (loadmore) {
                setQuotations(prev => [...prev, ...data]);
                setCurrentPage(nextPage);
            } else {
                setQuotations(data);
                setCurrentPage(1);
            }

        } catch (err) {
            const message = handleCatchBlock(err);
            setError(message);
        }
        setInPaginationProgress(false);
    }

    useEffect(() => {
        (async () => {
            setInProgress(true)
            try {
                const requestData: GetAllQuotationsRequestData = {
                    currentPage: 1,
                }

                const { data } = await axios.post<QuotationsModelInterface[]>('/api/accounting/quotations/get-all', requestData);
                setQuotations(data)

            } catch (err) {
                const message = handleCatchBlock(err);
                setError(message);
            }
            setInProgress(false)
        })()
    }, [])

    return (
        <DashboardLayout
            pageTitle="View All Quotations"
        >
            <div
                className="max-w-[1000px] w-full mx-auto py-10 space-y-5"
            >
                {
                    error && (
                        <ErrorTemplate
                            error={error}
                        />
                    )
                }

                <Link
                    href={"/app/accounting/quotations/add"}
                    className="py-3 px-5 flex max-w-max rounded-2xl bg-foreground text-background"
                >Add Quotation</Link>

                <div>
                    <form
                        className="flex items-end gap-2"
                        onSubmit={(event) => {
                            event.preventDefault();
                            handlePagination({ loadmore: false })
                        }}
                    >
                        <div
                            className="w-full"
                        >
                            <InputGroup
                                label="Filter by Status"
                                name="status"
                                onChange={(event) => setStatus(event.target.value as QuotationsModelInterface["status"])}
                                placeholder="All Status"
                                disabled={inPaginationProgress}
                                options={["quoted", "pending", "invoiced"].map((item) => ({ label: item, value: item }))}
                                type="select"
                            />
                        </div>
                        <button
                            className="py-2 px-4 rounded-2xl bg-foreground text-background cursor-pointer"
                        >
                            Apply
                        </button>
                    </form>
                </div>

                <TableTemplate
                    headerRow={[
                        "Invoice No.",
                        "Customer Name",
                        "Phone",
                        "Status",
                        "Actions",
                    ]}
                    dataRows={quotations.map((quotation, index) => {

                        const statusColorSchema = {
                            quoted: "bg-blue-600/20 text-blue-600",
                            pending: "bg-orange-600/20 text-orange-600",
                            invoiced: "bg-green-600/20 text-green-600",
                        }

                        return [
                            quotation.invoiceNo,
                            quotation.customerName,
                            quotation.phone,
                            <div
                                key={index}
                            >
                                <p
                                    className={`py-1 px-2 text-xs rounded-lg capitalize ${statusColorSchema[quotation.status || 'quoted']}`}
                                >{quotation.status}</p>
                            </div>,
                            <div
                                key={index}
                                className="flex items-center gap-2"
                            >
                                {
                                    [
                                        {
                                            label: "Edit",
                                            href: `/app/accounting/quotations/edit?id=${encodeURIComponent(typeof quotation._id === "string" ? quotation._id : "not-found")}`
                                        },
                                        {
                                            label: "View Invoice",
                                            href: `/app/accounting/quotations/pdf-view?id=${encodeURIComponent(typeof quotation._id === "string" ? quotation._id : "not-found")}`
                                        }
                                    ].map((action, index) => (
                                        <Link
                                            key={index}
                                            className="py-2 px-4 rounded-2xl bg-foreground text-background text-nowrap min-w-max"
                                            href={action.href}
                                        >
                                            {action.label}
                                        </Link>
                                    ))
                                }
                            </div>
                        ]
                    })}
                    inProgress={inProgress}
                />

                <div
                    className="flex items-center justify-center"
                >
                    <button
                        className="py-2 px-4 bg-foreground text-background rounded-2xl mx-auto flex items-center gap-2 cursor-pointer"
                        type="button"
                        onClick={() => {
                            handlePagination({ loadmore: true })
                        }}
                    >
                        {
                            inPaginationProgress ? (
                                <RiLoader4Line
                                    size={20}
                                    className="animate-spin"
                                />
                            ) : (
                                <RiArrowDownSLine
                                    size={20}
                                />
                            )
                        }
                        <p>Load more</p>
                    </button>
                </div>
            </div>
        </DashboardLayout>
    )
}

export default ViewAllQuotationsPage