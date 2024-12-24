import React from 'react'
import { DarkModeBtn } from "../elements/DarkModeBtn";
import SettingBtn from '../elements/SettingBtn';
import { NotificationBtn } from "../elements/NotificationBtn"
import { Link } from 'react-router-dom';
import { ButtonElement } from '../elements/FormElements';

export const Header = ({notifications, markNotificationRead}) => {
  return (
    <nav className="header">
      <div className="header-container relative flex w-full bg-white dark:bg-navy-700 print:hidden sm:flex-col">
        <div className="flex w-full items-center justify-between sm:h-16">
          <div className="items-center space-x-2 flex">
          </div>

          <div className="-mr-1.5 flex items-center space-x-2">
            {/* { user && user.is_staff && 
            <Link to='/admin'>
              <ButtonElement label='Go to Admin Dashboard' primary={true} />
              </Link> 
              } */}

            <DarkModeBtn />
            <NotificationBtn notifications={notifications} markNotificationRead={markNotificationRead} />
            <SettingBtn />
            </div>
        </div>
      </div>
    </nav>
  )
}
