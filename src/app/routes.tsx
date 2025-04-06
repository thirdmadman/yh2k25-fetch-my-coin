import { IndexRouteObject, NonIndexRouteObject, RouteObject } from 'react-router';

import { ROUTES } from '@/constants';
import { MainPage } from '@/pages/main/';
import { PageLayout } from './PageLayout';
import { CoinRatesPage } from '@/pages/coin-rates/';
import { AboutPage } from '@/pages/about';

export type TExtendedRouteObject =
  | (IndexRouteObject & {
      name: string;
    })
  | (NonIndexRouteObject & {
      name: string;
      children?: Array<TExtendedRouteObject>;
    });

export type TRoutesTreeType = Array<TExtendedRouteObject>;

export const ROUTES_TREE: TRoutesTreeType = [
  {
    path: ROUTES.main,
    name: 'Main',
    element: <MainPage />,
  },
  {
    path: ROUTES.ratesPage,
    name: 'Coin Rates',
    children: [
      {
        index: true,
        name: 'Coin Rates',
        element: <CoinRatesPage />,
      },
    ],
  },
  {
    path: ROUTES.about,
    name: 'About',
    children: [
      {
        index: true,
        name: 'About',
        element: <AboutPage />,
      },
    ],
  },
  {
    path: '*',
    name: 'Not Found',
    element: <h1>NOT FOUND</h1>,
  },
];

export const getBreadcrumbsArrayByLocation = (location: string) => {
  const matches = location.split('/').filter(Boolean);
  const reducedRoutes = matches.reduce(
    (acc, curr, i) => {
      const locationSegment = `${acc.currentSegments}${i === 0 ? `/${curr}/` : `${curr}/`}`;

      let currentRoute: TExtendedRouteObject | null = null;

      if (i === 0) {
        currentRoute = ROUTES_TREE.find((route) => route.path?.split(':')[0] === locationSegment) ?? null;
      } else {
        const parentRouteObject = acc.crumbs[i - 1];
        const routeObject = parentRouteObject.children as Array<TExtendedRouteObject> | undefined;
        currentRoute = routeObject?.find((route) => route.path === locationSegment) ?? null;
      }

      if (!currentRoute) {
        return { ...acc, currentSegments: locationSegment };
      }
      return { ...acc, currentSegments: locationSegment, crumbs: [...acc.crumbs, currentRoute] };
    },
    { currentSegments: '', crumbs: new Array<TExtendedRouteObject>() }
  );

  return reducedRoutes.crumbs;
};

const routes: RouteObject = {
  element: <PageLayout />,
  children: ROUTES_TREE.map((route) => ({
    path: route.path,
    element: route.element,
    children: route.children,
  })),
};

export default routes;
