'use client';

import React, { useCallback, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navigationItems = [
  {
    label: 'Home',
    href: '/',
    title: 'Home',
  },
  {
    label: 'Advocate Search',
    href: '/advocates/search',
    title: 'Advocate Search',
  },
];

const linkClassName = (active: boolean) => {
  let activeClassName = '';
  if (active) {
    activeClassName = 'bg-gray-200';
  }
  return activeClassName;
};

export default function Navigation() {
  const pathname = usePathname();
  const [activeItem, setActiveItem] = useState<string>(pathname);

  const onClick = useCallback((activeItem: string) => {
    setActiveItem(activeItem);
  }, []);

  return (
    <nav>
      <ol className="flex gap-4 justify-center">
        {navigationItems.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className={linkClassName(activeItem === item.href)}
              title={item.title}
              onClick={() => onClick(item.href)}
              aria-current={activeItem === item.href ? 'page' : undefined}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
}
