import { Footer } from '@/widgets/footer';
import { Navbar } from '@/widgets/navbar';
import { HeroUIProvider } from '@heroui/react';
import { Outlet } from 'react-router';

export function PageLayout() {
  return (
    <HeroUIProvider className="h-full">
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
