import React, { Suspense } from 'react'
import EditProductPageClient from './client-component'

const EditProductsPage = () => {
    return (
        <Suspense>
            <EditProductPageClient />
        </Suspense>
    )
}

export default EditProductsPage