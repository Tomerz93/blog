import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { BsMoon, BsSunFill } from 'react-icons/bs';

const ThemeToggle = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }
  const toggleTheme = (type: string) => () => {
    setTheme(type);
  };

  return (
    <div>
      {theme === 'dark' ? (
        <BsSunFill
          className='cursor-pointer'
          size={16}
          onClick={toggleTheme('light')}
        />
      ) : (
        <BsMoon
          className='cursor-pointer'
          size={16}
          onClick={toggleTheme('dark')}
        />
      )}
    </div>
  );
};

export default ThemeToggle;
