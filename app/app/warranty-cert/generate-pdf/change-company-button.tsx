'use client';

import { useRouter } from "next/navigation";
import { CompanyNames } from "./pdf/main";

const ChangeCompanyButton = ({ customerId }: {
    company?: CompanyNames,
    customerId: string,
}) => {

    const router = useRouter();

    return (
        <div>
            <select
                onChange={(event) => {
                    if (!event.target.value) {
                        return;
                    }
                    router.push(`/app/warranty-cert/generate-pdf?customerId=${customerId}&company=${event.target.value}`)
                }}
                className="border border-stroke-light rounded-lg py-2 px-4 bg-gray-200"
            >
                {
                    [
                        {
                            label: "Select Company",
                            value: "",
                        },
                        {
                            label: "Proudi",
                            value: "proudi",
                        },
                        {
                            label: "Home Delux",
                            value: "home-deluxe",
                        },
                        {
                            label: "Dream Home",
                            value: "dream-home",
                        }
                    ].map((item, index) => (
                        <option
                            value={item.value}
                            key={index}
                        >{item.label}</option>
                    ))
                }
            </select>
        </div>
    )
}

export default ChangeCompanyButton