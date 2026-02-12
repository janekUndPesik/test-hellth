import { useContext } from 'react';

import { ThemeContext } from '../../contexts/theme.context';

import './theme-variants.css';

const ThemeVariants = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  const handleDecrement = () => {
    switch (true) {
      case theme === 'default':
        return setTheme('wrong');
      case theme === 'wrong':
        return setTheme('light');
      case theme === 'light':
        return setTheme('hell');
      default: 
        return setTheme('default');
    }
  };

  const handleIncrement = () => {
    switch (true) {
      case theme === 'default':
        return setTheme('hell');
      case theme === 'hell':
        return setTheme('light');
      case theme === 'light':
        return setTheme('wrong');
      default: 
        return setTheme('default');
    }
  };


  return (
    <div className='theme-variants'>
      <div onClick={handleDecrement} className='left-arrow'><span>&#10094;</span></div>
      <div><span>{theme}</span></div>
      <div onClick={handleIncrement} className='right-arrow'><span>&#10095;</span></div>
    </div>
  );
};

export default ThemeVariants;
