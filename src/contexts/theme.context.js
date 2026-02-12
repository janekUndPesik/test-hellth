import { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext({
  theme: '',
  setTheme: () => {},
});

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    const jsonValue = localStorage.getItem('THEME');
    switch (JSON.parse(jsonValue)) {
      case 'light':
        return 'light';
      case 'wrong':
        return 'wrong';
      case 'hell':
        return 'hell';
      default:
        return 'default';
    };
  });

  useEffect(() => {
    localStorage.setItem('THEME', JSON.stringify(theme));
  }, [theme]);

  const value = { theme, setTheme };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};
