import DashboardLayout from '@/layouts/dashboard'
import GenerateReportPageClientComponent from './client-component'
import { getServerSession } from 'next-auth'
import { handleCatchBlock } from '@/functions/common';
import ErrorTemplate from '@/components/ui-elements/error-template';

const ReportsPage = async () => {

  try {
    const session = await getServerSession();
    const SUPER_ADMIN_EMAIL = process.env.SUPER_ADMIN_EMAIL;

    if (!SUPER_ADMIN_EMAIL) {
      throw new Error("Please provide SUPER_ADMIN_EMAIL in .env");
    }

    if (session?.user?.email !== SUPER_ADMIN_EMAIL) {
      throw new Error("you are not authorized to access here.")
    }

  } catch (err) {
    const message = handleCatchBlock(err);
    return (
      <DashboardLayout
        pageTitle='Generate Report'
      >
        <ErrorTemplate
          error={message}
        />
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout
      pageTitle='Generate Reports'
    >
      <GenerateReportPageClientComponent />
    </DashboardLayout>
  )
}

export default ReportsPage