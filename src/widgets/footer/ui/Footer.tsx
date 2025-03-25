import { Link } from 'react-router';

export function Footer() {
  return (
    <footer className="w-full flex items-center justify-center py-3 opacity-50">
      <Link
        className="flex items-center gap-1 text-current"
        to="https://thirdmadman.com"
        title="thirdmadman.com homepage"
      >
        <span className="text-default-600">Created by</span>
        <p className="text-primary">thirdmadman</p>
      </Link>
    </footer>
  );
}
