import TableTemplate from '@/components/ui-elements/table-template';
import { getAllCompletionCertCustomers } from '@/functions/completion-cert/customers/get-all';
import DashboardLayout from '@/layouts/dashboard';
import Link from 'next/link';

type Props = {
    searchParams: Promise<{
        page: number,
    }>
}

const CompletionCertCustomersListPage = async ({ searchParams }: Props) => {
    const currentPage = (await searchParams).page;
    const customersData = await getAllCompletionCertCustomers({ currentPage: currentPage || 1 })

    return (
        <DashboardLayout
            pageTitle='View Completion Cert'
        >
            <div
                className='max-w-[1000px] w-full mx-auto py-10 px-3 space-y-3'
            >
                <Link
                    href={'/app/completion-cert/add'}
                    className='py-3 px-5 bg-foreground text-background rounded-2xl flex max-w-max'
                >
                    Add New Customer
                </Link>

                <TableTemplate
                    inProgress={false}
                    headerRow={[
                        "Invoice No.",
                        "Name",
                        "Phone",
                        "Product",
                        "Created At",
                        "Actions",
                    ]}
                    dataRows={customersData.map((customer, index) => {
                        return ([
                            customer.invoiceNo,
                            customer.customerName,
                            customer.phone,
                            customer.productName,
                            customer.createdAt?.toISOString().split('T')[0].split('-').join('/'),
                            <div
                                className='flex items-center gap-2'
                                key={index}
                            >
                                {
                                    [
                                        {
                                            label: "Edit",
                                            href: `/app/completion-cert/edit?id=${encodeURIComponent(customer._id || '')}`,
                                        },
                                        {
                                            label: "View PDF",
                                            href: `/app/completion-cert/generate-pdf?customerId=${encodeURIComponent(customer._id || '')}`
                                        }
                                    ].map((action, index) => (
                                        <Link
                                            key={index}
                                            href={action.href}
                                            className='flex items-center py-2 px-3 bg-foreground text-background rounded-2xl min-w-max'
                                        >{action.label}</Link>
                                    ))
                                }
                            </div>
                        ])
                    })}
                />
            </div>
        </DashboardLayout>
    )
}

export default CompletionCertCustomersListPage