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
import { DashboardIcon, DesainIcon, ExitIcon, MonitorIcon, UserIcon } from './Icons';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../modules/auth/auth.store';

interface SidebarProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;
}

const SidebarComponent: React.FC<SidebarProps> = ({
  isSidebarOpen,
  setIsSidebarOpen
}) => {
  const location = useLocation();
  const logout = useAuthStore((s) => s.logout);
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };
  const isActive = (path: string) => location.pathname === path;
  return (
    <div style={{ display: 'flex', height: '100vh', position: 'sticky', top: 0, zIndex: 50 }}>
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

        <div style={{ flex: 1 }} className='text-black'>
          <Menu
            menuItemStyles={{
              button: ({ active }) => ({
                backgroundColor: active ? '#e6f2ff' : 'transparent',
                color: active ? '#2D68A2' : '#666',
                '&:hover': {
                  backgroundColor: '#f5f5f5',
                  color: '#2D68A2',
                },
              }),
            }}
          >
            <SubMenu defaultOpen label="Dashboard">
              <MenuItem
                active={isActive('/dashboard')}
                icon={<DashboardIcon />}
                component={<Link to="/dashboard" />}
              >
                Dashboard
              </MenuItem>

              <MenuItem
                active={isActive('/monitor')}
                icon={<MonitorIcon />}
              >
                Monitor
              </MenuItem>

              <MenuItem
                active={isActive('/dashboard/flow')}
                icon={<DesainIcon />}
                component={<Link to="/dashboard/flow" />}
              >
                Design
              </MenuItem>
            </SubMenu>

            <SubMenu defaultOpen label="Management">
              <MenuItem icon={<UserIcon />}> Users Management</MenuItem>
            </SubMenu>
          </Menu>
        </div>

        <Menu>
          <MenuItem>
            <Button
              type="submit"
              className="w-full bg-[#2D68A2] text-white"
              onPress={handleLogout}
              startContent={<ExitIcon />}
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
