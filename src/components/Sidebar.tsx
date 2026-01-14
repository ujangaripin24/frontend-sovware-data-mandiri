import { Button, Image } from '@heroui/react';
import Logo from "../assets/assets-s2re.svg"
import React from 'react'
import {
  Menu,
  MenuItem,
  Sidebar as ProSidebar,
  sidebarClasses,
  SubMenu,
} from 'react-pro-sidebar'
import { EyeFilledIcon, MenuIcon, MonitorIcon, UserIcon } from './Icons';

interface SidebarProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;
}

const SidebarComponent: React.FC<SidebarProps> = ({
  isSidebarOpen,
  setIsSidebarOpen
}) => {
  return (
    <div style={{ display: 'flex', height: '100vh', position: 'sticky', top: 0, zIndex: 100 }}>
      <ProSidebar
        toggled={isSidebarOpen}
        collapsed={!isSidebarOpen}
        onBackdropClick={() => setIsSidebarOpen(false)}
        breakPoint="md"
        rootStyles={{
          [`.${sidebarClasses.container}`]: {
            backgroundColor: 'white',
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
          },
        }}
      >
        <div style={{ padding: '24px', fontWeight: 'bold' }}>
          <div className='flex flex-col items-center justify-center'>
            <div className='flex items-center'>
              <Image alt="Icon Logo" src={Logo} width={40} />
              {isSidebarOpen && (
                <div className='leading-tight ml-4'>
                  <div className='font-extrabold text-xl'>S.2.R.E</div>
                  <div className='text-sm tracking-widest'>ADMIN</div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div style={{ flex: 1 }}>
          <Menu
            menuItemStyles={{
              button: {
                '&:hover': {
                  backgroundColor: '#f5f5f5',
                },
              },
            }}
          >
            <SubMenu defaultOpen label="Dashboard">
              <MenuItem icon={<MonitorIcon/>}> Dashboard </MenuItem>
              <MenuItem icon={<MonitorIcon/>}> Monitor </MenuItem>
              <MenuItem icon={<MonitorIcon/>}> Design </MenuItem>
            </SubMenu>

            <SubMenu defaultOpen label="Management">
              <MenuItem icon={<UserIcon/>}> Users Management</MenuItem>
            </SubMenu>
          </Menu>
        </div>

        <Menu>
          <MenuItem>
            <Button
              type="submit"
              className="w-full bg-[#2D68A2] text-white"
            >
              Logout
            </Button>
          </MenuItem>
        </Menu>
      </ProSidebar>
    </div>
  )
}

export default SidebarComponent
