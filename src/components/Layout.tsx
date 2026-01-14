import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import SidebarComponent from "./Sidebar";

const Layout: React.FC = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
    console.log("trigger dari layout dashboard", isSidebarOpen);
  };

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
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        <Header toggleSidebar={toggleSidebar} />

        <div
          className="content-container px-4"
          style={{ flex: 1, overflowY: "auto" }}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
