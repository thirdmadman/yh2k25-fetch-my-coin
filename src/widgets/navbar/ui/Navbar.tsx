import { Logo } from '@/shared/ui/logo';
import { Navbar as HeroUINavbar, NavbarBrand, NavbarContent } from '@heroui/navbar';

import { Link } from 'react-router';

export const Navbar = () => {
  return (
    <HeroUINavbar maxWidth="xl" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <Link className="flex justify-start items-center gap-1" to="/">
            <Logo />
          </Link>
        </NavbarBrand>
        <ul className="hidden lg:flex gap-4 justify-start ml-2"></ul>
      </NavbarContent>
    </HeroUINavbar>
  );
};
