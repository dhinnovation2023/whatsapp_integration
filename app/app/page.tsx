import React, { Suspense } from 'react'
import AppPage from './client-component'

const AppPageOutside = () => {
  return (
    <>
      <Suspense>
        <AppPage />
      </Suspense>
    </>
  )
}

export default AppPageOutside