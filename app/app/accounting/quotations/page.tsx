'use client';

import ErrorTemplate from "@/components/ui-elements/error-template";
import TableTemplate from "@/components/ui-elements/table-template";
import { GetAllQuotationsRequestData } from "@/functions/accounting/quotations/get-all";
import { handleCatchBlock } from "@/functions/common";
import DashboardLayout from "@/layouts/dashboard";
import { QuotationsModelInterface } from "@/models/accounting/quotation";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

const ViewAllQuotationsPage = () => {

    const [inProgress, setInProgress] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const [quotations, setQuotations] = useState<QuotationsModelInterface[]>([]);

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

                <TableTemplate
                    headerRow={[
                        "Invoice No.",
                        "Customer Name",
                        "Phone",
                        "Location",
                        "Actions",
                    ]}
                    dataRows={quotations.map((quotation, index) => {
                        return [
                            quotation.invoiceNo,
                            quotation.customerName,
                            quotation.phone,
                            quotation.location,
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
                                            className="py-2 px-4 rounded-2xl bg-foreground text-background"
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
            </div>
        </DashboardLayout>
    )
}

export default ViewAllQuotationsPage