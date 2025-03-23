import { Footer } from '@/widgets/footer';
import { Navbar } from '@/widgets/navbar';
import { HeroUIProvider } from '@heroui/react';
import { Outlet } from 'react-router';

export function PageLayout() {
  return (
    <HeroUIProvider className="h-full">
      <div className="relative flex flex-col h-full min-h-screen">
        <Navbar />
        <main className="container mx-auto max-w-7xl pt-16 px-6 flex-grow">
          <Outlet />
        </main>
        <Footer />
      </div>
    </HeroUIProvider>
  );
}
