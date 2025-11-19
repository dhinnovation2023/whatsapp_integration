import DashboardLayout from '@/layouts/dashboard'
import GenerateReportPageClientComponent from './client-component'

const ReportsPage = async () => {

  return (
    <DashboardLayout
        pageTitle='Generate Reports'
    >
      <GenerateReportPageClientComponent/>
    </DashboardLayout>
  )
}

export default ReportsPage