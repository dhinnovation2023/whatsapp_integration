import DashboardLayout from "@/layouts/dashboard"
import { RiErrorWarningLine } from "@remixicon/react"
import Link from "next/link"
import ActionsButtons from "./actions-button"
import { getAllCompletionCertBrands } from "@/functions/completion-cert/brands/get-all"

const CompletionCertBrandsPage = async () => {

    const brands = await getAllCompletionCertBrands({
        currentPage: 1,
        customLimit: 0,
    })

    return (
        <DashboardLayout
            pageTitle='View Warranty Brands'
        >
            <div
                className='max-w-[800px] w-full mx-auto py-10 space-y-7'
            >
                <div>
                    <Link
                        href={'/app/completion-cert/brands/add'}
                        className='py-3 px-5 rounded-2xl bg-foreground text-background'
                    >
                        Add New Brand
                    </Link>
                </div>

                <div
                    className='space-y-2'
                >
                    {brands.length === 0 && (
                        <div
                            className='py-3 px-5 bg-background flex items-center gap-3 rounded-2xl'
                        >
                            <RiErrorWarningLine
                                size={20}
                            />
                            <p>No results found!</p>
                        </div>
                    )}
                    {brands.map((brand) => (
                        <div
                            key={brand._id.toString()}
                            className='w-full flex items-center justify-between bg-background py-3 px-5 rounded-2xl'
                        >
                            <div>
                                <h2
                                    className='text-lg font-semibold'
                                >{brand.name}</h2>
                            </div>
                            <div
                                className='flex items-center gap-1'
                            >
                                {
                                    [
                                        {
                                            label: "Edit",
                                            href: `/app/completion-cert/brands/edit?id=${brand._id}`,
                                        },
                                        {
                                            label: "Delete",
                                            href: `/api/completion-cert/brands/delete-one?id=${brand._id}`,
                                        },
                                    ].map((item, index) => (
                                        <ActionsButtons
                                            {...item}
                                            key={index}
                                        />
                                    ))
                                }
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </DashboardLayout>
    )
}

export default CompletionCertBrandsPage