import { NavbarItem, NavbarMenu } from '@heroui/react';
import { INavbarItem } from '../consts';
import { Link } from 'react-router';

interface INavbarNavigationMobileProps {
  menuItems: Array<INavbarItem>;
}

export function NavbarNavigationMobile({ menuItems }: INavbarNavigationMobileProps) {
  return (
    <NavbarMenu>
      {menuItems.map((el) => (
        <NavbarItem key={`${el.label}-${el.to}`}>
          <Link className="flex w-full text-xl" color="foreground" to={el.to}>
            {el.label}
          </Link>
        </NavbarItem>
      ))}
    </NavbarMenu>
  );
}
