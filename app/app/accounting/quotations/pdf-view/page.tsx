'use client';

import DashboardLayout from "@/layouts/dashboard";
import { QuotationsModelInterface } from "@/models/accounting/quotation";
import { Font } from "@react-pdf/renderer";
import { Suspense, useState } from "react";
import QuotationPDFViewTemplate from "./pdf";

const QuotationPDFViewPage = () => {

    const [quotation, setQuotation] = useState<QuotationsModelInterface | null>(null);

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