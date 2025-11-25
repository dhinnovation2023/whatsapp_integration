export const dynamic = "force-dynamic";

import ErrorTemplate from '@/components/ui-elements/error-template';
import { handleCatchBlock } from '@/functions/common'
import { getAllWarrantyBrands } from '@/functions/warranty/fetch-all-brands';
import DashboardLayout from '@/layouts/dashboard'
import { WarrantyBrandsModelInterface } from '@/models/warranty/brands';
import Link from 'next/link'
import ActionsButtons from './actions-buttons';
import { RiErrorWarningLine } from '@remixicon/react';

const ViewWarrantyBrands = async () => {

  let brands: WarrantyBrandsModelInterface[] = [];

  try {
    brands = await getAllWarrantyBrands({
      currentPage: 1,
    });
  } catch (err) {
    const message = handleCatchBlock(err);
    return (
      <DashboardLayout
        pageTitle='Error'
      >
        <ErrorTemplate
          error={message}
        />
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout
      pageTitle='View Warranty Brands'
    >
      <div
        className='max-w-[800px] w-full mx-auto py-10 space-y-7'
      >
        <div>
          <Link
            href={'/app/warranty-cert/brands/add'}
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
                      href: `/app/warranty-cert/brands/edit?id=${brand._id}`,
                    },
                    {
                      label: "Delete",
                      href: `/api/warranty/brand/delete-one?id=${brand._id}`,
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

export default ViewWarrantyBrands