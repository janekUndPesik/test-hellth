import { createContext, useState } from 'react';

import PLACEHOLDER_DATA from '../utils/placeholder-data';

export const DrugsContext = createContext({
  currentDrugs: [],
  setCurrentDrugs: () => {},
  isSettingsOpen: false,
  setSettingsOpen: () => {},
});

export const DrugsProvider = ({ children }) => {
  const [currentDrugs, setCurrentDrugs] = useState(() => {
    const currentJsonValue = localStorage.getItem('LOCAL_STASH');
    const jsonDate = localStorage.getItem('DATE');
    const date = new Date();
    const dateString = `${date.getDate()}${date.getMonth()}`;

    switch (true) {
      case currentJsonValue && (dateString === JSON.parse(jsonDate)):
        return JSON.parse(currentJsonValue)
          .toSorted((a, b) => a.time.localeCompare(b.time));
      case currentJsonValue && (dateString !== JSON.parse(jsonDate)):
        const primaryValue = JSON.parse(currentJsonValue);
        return primaryValue.toSorted((a, b) => a.time.localeCompare(b.time))
          .map((drug) => ({ ...drug, check: false }));
      default:
        return PLACEHOLDER_DATA.toSorted((a, b) => a.time.localeCompare(b.time));
    }
  });

  const [isSettingsOpen, setSettingsOpen] = useState(false);


  useEffect(() => {
    const date = new Date();
    const dateString = `${date.getDate()}${date.getMonth()}`;
    localStorage.setItem('LOCAL_STASH', JSON.stringify(currentDrugs));
    localStorage.setItem('DATE', JSON.stringify(dateString));
  }, [currentDrugs]);
  
  const toggleSettings = () => setSettingsOpen(!isSettingsOpen);

  const value = { currentDrugs, setCurrentDrugs, toggleSettings, isSettingsOpen };

  return <DrugsContext.Provider value={value}>{children}</DrugsContext.Provider>
};