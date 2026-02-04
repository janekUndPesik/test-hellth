import { createContext, useState, useEffect } from 'react';

import PLACEHOLDER_DATA from '../utils/placeholder-data';

export const DrugsContext = createContext({
  currentDrugs: [],
  addDrug: () => {},
  removeDrug: () => {},
  setCurrentDrugs: () => {},
  isSettingsOpen: false,
  setSettingsOpen: () => {},
});

export const DrugsProvider = ({ children }) => {
  const [currentDrugs, setCurrentDrugs] = useState(() => {
    const currentJsonValue = localStorage.getItem('LOCAL_STASH');
    console.log(currentJsonValue);
    const jsonValue = localStorage.getItem('PRIMARY_STORAGE_DATA');
    console.log(jsonValue)
    const jsonDate = localStorage.getItem('DATE');
    const date = new Date();
    const dateString = `${date.getDate()}${date.getMonth()}`;

    switch (true) {
      case currentJsonValue && (dateString === JSON.parse(jsonDate)):
        return JSON.parse(currentJsonValue);
      case jsonValue:
        const primaryValue = JSON.parse(jsonValue);
        return primaryValue.map((drug) => ({ ...drug, check: false }));
      default:
        return PLACEHOLDER_DATA;
    }
  });

  const [isSettingsOpen, setSettingsOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('PRIMARY_STORAGE_DATA', JSON.stringify(currentDrugs));
  }, [currentDrugs]);

const addDrug = (currentDrugs) => {
  const newDrug = {
  id: Date.now(),
  name: 'drug_name',
  description: '',
  check: false,
  };
  setCurrentDrugs([...currentDrugs, newDrug]);
};

  const removeDrug = (id) => {
    setCurrentDrugs(currentDrugs.filter(drug => drug.id !== id));
  };

  const toggleSettings = () => setSettingsOpen(!isSettingsOpen);

  const value = { currentDrugs, setCurrentDrugs, addDrug, removeDrug, toggleSettings, isSettingsOpen };

  return <DrugsContext.Provider value={value}>{children}</DrugsContext.Provider>
};
