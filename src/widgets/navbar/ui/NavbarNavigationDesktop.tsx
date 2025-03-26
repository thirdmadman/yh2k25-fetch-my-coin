import { NavbarContent, NavbarItem } from '@heroui/react';
import { INavbarItem } from '../consts';
import { Link } from 'react-router';

interface INavbarNavigationDesktopProps {
  menuItems: Array<INavbarItem>;
}

export function NavbarNavigationDesktop({ menuItems }: INavbarNavigationDesktopProps) {
  return (
    <NavbarContent className="hidden sm:flex gap-4" justify="center">
      {menuItems.map((el) => (
        <NavbarItem key={`${el.label}-${el.to}`}>
          <Link color="foreground" to={el.to}>
            {el.label}
          </Link>
        </NavbarItem>
      ))}
    </NavbarContent>
  );
}
