export interface INavbarItem {
  label: string;
  to: string;
}

export const NAV_LINKS: Array<INavbarItem> = [
  {
    label: 'Home',
    to: '/',
  },
  {
    label: 'About',
    to: '/about',
  },
];
