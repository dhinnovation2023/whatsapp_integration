import { getAllWarrantyCustomers } from '@/functions/warranty/customers/get-all'
import DashboardLayout from '@/layouts/dashboard'
import Link from 'next/link'
import React from 'react'

type Props = {
  searchParams: Promise<{
    page?: number,
  }>
}

const WarrantyCertPage = async ({
  searchParams,
}: Props) => {

  const currentPage = (await searchParams).page;
  const customersData = await getAllWarrantyCustomers({ currentPage: currentPage || 1 })

  return (
    <DashboardLayout
      pageTitle='View Warranty'
    >
      <div
        className='max-w-[1000px] w-full mx-auto py-10 px-3 space-y-3'
      >
        <Link
          href={'/app/warranty-cert/add'}
          className='py-3 px-5 bg-foreground text-background rounded-2xl flex max-w-max'
        >
          Add New Customer
        </Link>
        <table
          className='w-full text-left bg-background rounded-2xl'
        >
          <thead>
            <tr>
              {[
                "Invoice No.",
                "Name",
                "Phone",
                "Product",
                "Created At",
                "Actions",
              ].map((data, index) => (
                <th
                  key={index}
                  className='py-4 px-6 min-w-max'
                >
                  {data}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {customersData.map((customer, index) => (
              <tr
                key={index}
                className='hover:bg-background-2/50 odd:bg-background-2/50'
              >
                {
                  [
                    customer.invoiceNo,
                    customer.customerName,
                    customer.phone,
                    customer.productName,
                    customer.createdAt?.toISOString().split('T')[0].split('-').join('/'),
                    () => (
                      <td
                        className='py-4 px-6'
                      >
                        <div
                          className='flex items-center gap-2'
                        >
                          {
                            [
                              {
                                label: "Edit",
                                href: `/app/warranty-cert/edit?id=${encodeURIComponent(customer._id || '')}`,
                              },
                              {
                                label: "View PDF",
                                href: `/app/warranty-cert/generate-pdf?customerId=${encodeURIComponent(customer._id || '')}`
                              }
                            ].map((action, index) => (
                              <Link
                                key={index}
                                href={action.href}
                                className='flex items-center py-2 px-3 bg-foreground text-background rounded-2xl'
                              >{action.label}</Link>
                            ))
                          }
                        </div>
                      </td>
                    )
                  ].map((ElementItem, index) => {
                    if (typeof ElementItem === "string") {
                      return (
                        <td
                          key={index}
                          className='py-4 px-6'
                        >{ElementItem}</td>
                      )
                    } else {
                      if (ElementItem) {
                        return (
                          <ElementItem
                            key={index}
                          />
                        )
                      }
                    }
                  })
                }
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  )
}

export default WarrantyCertPage