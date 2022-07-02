import Link from 'next/link';

const NotFound = () => {
  return (
    <div className='grid place-items-center place-content-center min-h-full'>
      <h1 className='text-6xl mb-4'>Not Found</h1>
      <p className='text-xl mb-2'>
        Page not found, its probably a typo in the url
      </p>
      <Link className='text-xl underline' href='/'>
        <a>Go to home</a>
      </Link>
    </div>
  );
};
export default NotFound;
