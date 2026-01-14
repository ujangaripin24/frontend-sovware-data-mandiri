import { BreadcrumbItem, Breadcrumbs, Button, Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@heroui/react'
import React from 'react'
import { MenuIcon } from './Icons'
interface NavigationBarProps {
  toggleSidebar: () => void
}

const Header: React.FC<NavigationBarProps> = ({ toggleSidebar }) => {
  return (
    <Navbar position="static" isBordered>
      <NavbarBrand>
        <Button
          onPress={toggleSidebar}
          variant="ghost"
          isIconOnly
          size="sm"
        >
          <MenuIcon />
        </Button>
      </NavbarBrand>
      <NavbarContent>
        <NavbarItem>
          <Breadcrumbs>
            <BreadcrumbItem>Home</BreadcrumbItem>
            <BreadcrumbItem>Music</BreadcrumbItem>
            <BreadcrumbItem>Artist</BreadcrumbItem>
            <BreadcrumbItem>Album</BreadcrumbItem>
            <BreadcrumbItem>Song</BreadcrumbItem>
          </Breadcrumbs>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  )
}

export default Header