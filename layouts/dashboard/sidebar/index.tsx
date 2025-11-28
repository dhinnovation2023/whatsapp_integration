'use client';

import { useEffect, useState } from 'react'
import SidebarMenu from './menu'
import UserInfo from './user-info'
import { RiArrowLeftLine, RiArrowRightLine } from '@remixicon/react';
import useDeviceType from '@/functions/hooks/use-device-type';

const DashboardSidebar = () => {

  const deviceType = useDeviceType();
  const [openSidebar, setOpenSidebar] = useState<boolean>(false);

  useEffect(() => {
    (() => setOpenSidebar(deviceType === "desktop" ? true : false))()
  }, [deviceType])

  return (
    <div
      className={
        `${openSidebar ? "max-w-[300px] py-6 px-4" : "max-w-0 py-6"} w-full transition-all md:duration-500 shrink-0 overflow-auto bg-background min-h-dvh max-h-dvh md:min-h-[300px] shadow-lg shadow-neutral-200 z-40`
        + ` fixed md:relative`
      }
    >

      <button
        className={`fixed cursor-pointer transition-all ${openSidebar ? "left-[300px]" : "left-0"} bottom-10 bg-foreground text-white border border-stroke-light border-l-0 py-2 px-2 rounded-tr-2xl rounded-br-2xl`}
        onClick={() => setOpenSidebar(prev => !prev)}
      >
        {
          openSidebar ? (
            <RiArrowLeftLine
              size={20}
            />
          ) : (
            <RiArrowRightLine
              size={20}
            />
          )
        }
      </button>

      <div
        className='space-y-0 min-w-max'
      >
        <UserInfo />
        <SidebarMenu />
      </div>
    </div>
  )
}

export default DashboardSidebar
