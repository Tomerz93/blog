import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { type PropsWithChildren } from 'react';
import cx from 'classnames';
import { ThemeToggle } from '../';
interface ActiveLinkProps {
  href: string;
}

const ActiveLink: React.FC<PropsWithChildren<ActiveLinkProps>> = ({
  href,
  children,
}) => {
  const pathname = useRouter().pathname;
  const isHomePage = href === '/';
  const isActive = pathname.startsWith(href);
  const linkClasses = cx({
    active: (!isHomePage && isActive) || (pathname === '/' && isHomePage),
  });
  return (
    <Link href={href}>
      <a className={linkClasses}>{children}</a>
    </Link>
  );
};

const Header = () => (
  <header className='container'>
    <nav className='flex justify-between items-center'>
      <ul className='flex gap-4 py-4'>
        <li>
          <ActiveLink href='/'>Home</ActiveLink>
        </li>
        <li>
          <ActiveLink href='/posts'>Posts</ActiveLink>
        </li>
        <li>
          <ActiveLink href={'/categories'}>Categories</ActiveLink>
        </li>
        <li>
          <ActiveLink href={'/snippets'}>Snippets</ActiveLink>
        </li>
      </ul>
      <ThemeToggle />
    </nav>
  </header>
);

export default Header;
