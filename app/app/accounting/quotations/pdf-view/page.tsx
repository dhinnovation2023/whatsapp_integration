'use client';

import DashboardLayout from "@/layouts/dashboard";
import { Suspense } from "react";
import QuotationPDFViewTemplate from "./pdf";

const QuotationPDFViewPage = () => {

    return (
        <DashboardLayout
            pageTitle="Quotation"
            hidePageHeader
        >
            <div
                className="min-w-full min-h-screen bg-foreground"
            >
                <Suspense>
                    <QuotationPDFViewTemplate />
                </Suspense>
            </div>
        </DashboardLayout>
    )
}

export default QuotationPDFViewPage