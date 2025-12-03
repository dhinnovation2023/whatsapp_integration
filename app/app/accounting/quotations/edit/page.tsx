import React, { Suspense } from 'react'
import EditQuotationPageClient from './client-component'

const EditQuotationPage = () => {
  return (
    <Suspense>
      <EditQuotationPageClient />
    </Suspense>
  )
}

export default EditQuotationPage