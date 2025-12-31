import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import React from 'react'

const AllProductsPagination = () => {

    const searchParams = useSearchParams();

    return (
        <div
            className="flex items-center gap-2 w-full"
        >
            {
                [
                    {
                        label: "Prev",
                        url: `/app/accounting/products?page=${Number(searchParams.get("page") || '1') - 1}`,
                    },
                    {
                        label: "Next",
                        url: `/app/accounting/products?page=${Number(searchParams.get("page") || '1') + 1}`,
                    }
                ].map((action, index) => (
                    <Link
                        key={index}
                        href={action.url}
                        className="py-2 px-3 bg-foreground text-background rounded-lg"
                    >{action.label}</Link>
                ))
            }
        </div>
    )
}

export default AllProductsPagination