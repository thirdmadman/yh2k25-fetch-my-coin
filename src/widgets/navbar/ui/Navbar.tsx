import { Logo } from '@/shared/ui/logo';
import { Navbar as HeroUINavbar, NavbarBrand, NavbarContent, NavbarMenuToggle } from '@heroui/navbar';
import { Link } from 'react-router';
import { ThemeSwitch } from './ThemeSwitch';
import { useState } from 'react';
import { NAV_LINKS } from '../consts';
import { NavbarNavigationDesktop } from './NavbarNavigationDesktop';
import { NavbarNavigationMobile } from './NavbarNavigationMobile';

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <HeroUINavbar maxWidth="xl" position="sticky" isMenuOpen={isMenuOpen} disableAnimation>
      <NavbarBrand as="li" className="gap-3 max-w-fit pr-8">
        <Link className="flex justify-start items-center gap-1" to="/">
          <Logo />
        </Link>
      </NavbarBrand>
      <NavbarNavigationDesktop menuItems={NAV_LINKS} />
      <NavbarNavigationMobile menuItems={NAV_LINKS} />
      <NavbarContent className="ml-2 flex justify-center items-center gap-2" justify="end">
        <ThemeSwitch />
        <NavbarMenuToggle
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          className="sm:hidden min-w-[44px]"
          onChange={() => {
            setIsMenuOpen(!isMenuOpen);
          }}
        />
      </NavbarContent>
    </HeroUINavbar>
  );
};
