import React from 'react'
import { Menu, MenuItem, Sidebar as ProSidebar, sidebarClasses } from 'react-pro-sidebar'

interface SidebarProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;
}

const SidebarComponent: React.FC<SidebarProps> = ({
  isSidebarOpen,
  setIsSidebarOpen
}) => {
  return (
    <div>
      <ProSidebar
        toggled={isSidebarOpen}
        collapsed={!isSidebarOpen}
        onBackdropClick={() => setIsSidebarOpen(false)}
        breakPoint="md"
        rootStyles={{
          [`.${sidebarClasses.container}`]: {
            background: "linear-gradient(180deg, #2c3e50 0%, #1a2530 100%)",
            boxShadow: "4px 0 15px rgba(0, 0, 0, 0.1)",
            transition: "all 0.3s ease",
          },
        }}
        transitionDuration={300}
      >
        <Menu>
          <MenuItem>
            Logout
          </MenuItem>
        </Menu>
      </ProSidebar>
    </div>
  )
}

export default SidebarComponent
