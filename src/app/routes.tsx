import { IndexRouteObject, NonIndexRouteObject, RouteObject } from 'react-router';

import { ROUTE_COIN_RATES_PAGE, ROUTE_MAIN } from '@/constants';
import { MainPage } from '@/pages/main/';
import { PageLayout } from './PageLayout';
import { CoinRatesPage } from '@/pages/coin-rates/';

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
    path: ROUTE_MAIN,
    name: 'Main',
    element: <MainPage />,
  },
  {
    path: ROUTE_COIN_RATES_PAGE,
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
        currentRoute = ROUTES_TREE.find((route) => route.path === locationSegment) ?? null;
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
