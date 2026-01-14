import { BreadcrumbItem, Breadcrumbs, Button, Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@heroui/react'
import React from 'react'
import { MenuIcon } from './Icons'
import { Link, useLocation } from 'react-router-dom'
interface NavigationBarProps {
  toggleSidebar: () => void
}

const Header: React.FC<NavigationBarProps> = ({ toggleSidebar }) => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);
  return (
    <Navbar position="static" isBordered className='bg-white'>
      <NavbarContent justify="start">
        <NavbarItem>
          <Button
            onPress={toggleSidebar}
            variant="ghost"
            isIconOnly
            size="sm"
          >
            <MenuIcon />
          </Button>
        </NavbarItem>
        <NavbarItem>
          <Breadcrumbs>
            <BreadcrumbItem>
              <Link to="/dashboard">Home</Link>
            </BreadcrumbItem>
            {pathnames.map((value, index) => {
              const last = index === pathnames.length - 1;
              const to = `/${pathnames.slice(0, index + 1).join("/")}`;

              return (
                <BreadcrumbItem key={to} isCurrent={last}>
                  <Link to={to} style={{ textTransform: 'capitalize' }}>
                    {value.replace(/-/g, " ")}
                  </Link>
                </BreadcrumbItem>
              );
            })}
          </Breadcrumbs>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  )
}

export default Header
