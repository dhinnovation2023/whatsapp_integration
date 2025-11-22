import DashboardLayout from '@/layouts/dashboard'
import Link from 'next/link'

const ViewWarrantyBrands = async () => {
  return (
    <DashboardLayout
      pageTitle='View Warranty Brands'
    >
      <div
        className='max-w-[800px] w-full mx-auto py-10'
      >
        <div>
          <Link
            href={'/app/warranty-cert/brands/add'}
            className='py-3 px-5 rounded-2xl bg-foreground text-background'
          >
            Add New Brand
          </Link>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default ViewWarrantyBrands