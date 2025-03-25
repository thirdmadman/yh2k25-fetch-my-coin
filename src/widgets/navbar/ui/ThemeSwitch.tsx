import { useEffect, useState } from 'react';

export function ThemeSwitch() {
  const [theme, setTheme] = useState<string>(localStorage.getItem('theme') ?? 'light');

  const darkModeImage = (
    <img src="/svg/icons/icon-dark-mode.svg" width="24" height="24" alt="dark" className="min-w-6" />
  );

  const lightModeImage = (
    <img src="/svg/icons/icon-light-mode.svg" width="24" height="24" alt="light" className="min-w-6" />
  );

  useEffect(() => {
    document.documentElement.classList.remove('dark', 'light');
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    }
    if (theme === 'light') {
      document.documentElement.classList.add('light');
    } else if (!window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.classList.add('system-dark');
    }
  }, [theme]);

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      aria-controls="theme-switch"
      className="flex items-center justify-center min-w-[44px] min-h-[44px] rounded-md p-2 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-neutral-800 focus:outline-hidden cursor-pointer"
      onClick={() => {
        handleThemeChange(isDark ? 'light' : 'dark');
      }}
    >
      {isDark ? lightModeImage : darkModeImage}
    </button>
  );
}
