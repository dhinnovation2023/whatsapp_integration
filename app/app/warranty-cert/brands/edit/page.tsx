import React from 'react'
import EditWarrantyBrandPage from './edit-form'
import { fetchOneWarrantyBrand } from '@/functions/warranty/fetch-one-brand'
import DashboardLayout from '@/layouts/dashboard'
import ErrorTemplate from '@/components/ui-elements/error-template'

type Props = {
    searchParams: Promise<{
        id?: string,
    }>
}

const EditWarrantyBrandsPage = async ({ searchParams }: Props) => {

    const objectId = (await searchParams).id;

    if (!objectId) {
        return (
            <DashboardLayout
                pageTitle='Error'
            >
                <ErrorTemplate
                    error='Object ID is not valid'
                />
            </DashboardLayout>
        )
    }

    const brand = await fetchOneWarrantyBrand(objectId);

    return (
        <EditWarrantyBrandPage
            name={brand.name}
            content={brand.content}
            objectId={objectId}
        />
    )
}

export default EditWarrantyBrandsPage