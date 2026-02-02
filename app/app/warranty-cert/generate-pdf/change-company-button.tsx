'use client';

import { redirect } from "next/navigation";
import { CompanyNames } from "./pdf/main";

const ChangeCompanyButton = ({ company, customerId }: {
    company?: CompanyNames,
    customerId: string,
}) => {
    return (
        <a
            className="bg-theme-primary py-3 px-5 rounded-lg flex max-w-max"
            type="button"
            href={`/app/warranty-cert/generate-pdf?customerId=${customerId}&company=${company === "home-deluxe" ? "dream-home" : "home-deluxe"}`}
        >
            {company === "home-deluxe" ? "Dream Home" : "Home Delux"}
        </a>
    )
}

export default ChangeCompanyButton