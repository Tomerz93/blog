import Link from 'next/link';

const Header = () => (
  <header className='container'>
    <ul className='flex gap-4 py-4'>
      <li>
        <Link href='/'>
          <a>Home</a>
        </Link>
      </li>
      <li>
        <Link href='/posts'>
          <a>Posts</a>
        </Link>
      </li>
      <li>
        <Link href={'/categories'}>
          <a>Categories</a>
        </Link>
      </li>
      <li>
        <Link href={'/snippets'}>
          <a>Snippets</a>
        </Link>
      </li>
    </ul>
  </header>
);

export default Header;
