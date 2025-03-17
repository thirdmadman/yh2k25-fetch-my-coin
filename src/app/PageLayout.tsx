import { Link, Outlet } from 'react-router';
import { Navbar } from '@/shared/components/Navbar';

export function PageLayout() {
  return (
    <div>
      <div className="relative flex flex-col h-full">
        <Navbar />
        <main className="container mx-auto max-w-7xl pt-16 px-6 flex-grow">
          <Outlet />
        </main>
        <footer className="w-full flex items-center justify-center py-3">
          <Link
            className="flex items-center gap-1 text-current"
            to="https://heroui.com?utm_source=next-app-template"
            title="heroui.com homepage"
          >
            <span className="text-default-600">Powered by</span>
            <p className="text-primary">HeroUI</p>
          </Link>
        </footer>
      </div>
    </div>
  );
}
