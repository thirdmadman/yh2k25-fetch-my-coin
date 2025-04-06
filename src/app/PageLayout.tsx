import { APP_NAME } from '@/constants';
import { Footer } from '@/widgets/footer';
import { Navbar } from '@/widgets/navbar';
import { HeroUIProvider, ToastProvider } from '@heroui/react';
import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router';
import { getBreadcrumbsArrayByLocation } from './routes';

export function PageLayout() {
  const location = useLocation();

  useEffect(() => {
    const breadcrumbsArray = getBreadcrumbsArrayByLocation(location.pathname);
    const pageName: string | undefined = breadcrumbsArray[0]?.name;
    document.title = `${APP_NAME}${pageName ? ` - ${pageName}` : ``}`;
  }, [location]);

  return (
    <HeroUIProvider className="h-full">
      <ToastProvider />
      <div className="relative flex flex-col h-full min-h-screen bg-[radial-gradient(at_0%_100%,theme('colors.primary.100/50%'),transparent_30%),radial-gradient(at_100%_0%,theme('colors.primary.100/50%'),transparent_30%),url('svg/background/noise.svg')] bg-fixed">
        <Navbar />
        <main className="container mx-auto max-w-7xl pt-16 px-6 flex-grow">
          <Outlet />
        </main>
        <Footer />
      </div>
    </HeroUIProvider>
  );
}
