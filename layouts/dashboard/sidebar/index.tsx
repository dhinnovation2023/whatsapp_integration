import SidebarMenu from './menu'
import UserInfo from './user-info'

const DashboardSidebar = () => {
  return (
    <div
        className='min-w-[300px] bg-background min-h-[300px] py-6 px-4 shadow-lg shadow-neutral-200 z-40'
    >
      <div
        className='space-y-8'
      >
        <UserInfo/>
        <SidebarMenu/>
      </div>
    </div>
  )
}

export default DashboardSidebar
