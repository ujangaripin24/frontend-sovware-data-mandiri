import React, { useState } from 'react'
import Header from './Header'
import SidebarComponent from './Sidebar';
import './Layout.css'

const Layout: React.FC<Readonly<{ children: React.ReactNode }>> = ({
  children
}: Readonly<{ children: React.ReactNode }>) => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev)
    console.log("triger dari layout dashboard", isSidebarOpen);
  }
  return (
    <div
      className="layout-container"
      style={{ display: "flex", height: "100vh" }}
    >
      <SidebarComponent
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setSidebarOpen}
      />
      <div
        className="main-content"
        style={{ flex: 1, display: "flex", flexDirection: "column" }}
      >
        <Header toggleSidebar={toggleSidebar} />
        <div
          className="content-container px-4"
          style={{ flex: 1, overflowY: "auto" }}
        >
          <div className="mt-2" style={{ overflow: "hidden" }}>
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Layout