import DashboardLayout from '@/layouts/dashboard'
import React from 'react'
import GenerateReportPageClientComponent from './client-component'

const ReportsPage = () => {
  return (
    <DashboardLayout
        pageTitle='Generate Reports'
    >
      <GenerateReportPageClientComponent/>
    </DashboardLayout>
  )
}

export default ReportsPage