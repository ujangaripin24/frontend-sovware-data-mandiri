import { BreadcrumbItem, Breadcrumbs, Button, Navbar, NavbarContent, NavbarItem } from '@heroui/react'
import React from 'react'
import { MenuIcon } from './Icons'
import { useLocation, Link } from 'react-router-dom'

interface NavigationBarProps {
  toggleSidebar: () => void
}

const Header: React.FC<NavigationBarProps> = ({ toggleSidebar }) => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <Navbar
      position="static"
      isBordered
      className='bg-white'
      maxWidth="full"
      classNames={{
        wrapper: "px-2 justify-start gap-2",
      }}
    >
      <NavbarContent className="gap-2" justify="start">
        <NavbarItem>
          <Button
            onPress={toggleSidebar}
            variant="light"
            isIconOnly
            size="sm"
          >
            <MenuIcon />
          </Button>
        </NavbarItem>
        <NavbarItem>
          <Breadcrumbs size="sm">
            <BreadcrumbItem key="home">
              <Link to="/">Home</Link>
            </BreadcrumbItem>
            {pathnames.map((value, index) => {
              const to = `/${pathnames.slice(0, index + 1).join("/")}`;
              const isLast = index === pathnames.length - 1;
              return (
                <BreadcrumbItem key={to} isCurrent={isLast}>
                  <Link to={to} className="capitalize">
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