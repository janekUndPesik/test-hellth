import { createContext, useState } from 'react';

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
    const jsonDate = localStorage.getItem('DATE');
    const date = new Date();
    const dateString = `${date.getDate()}${date.getMonth()}`;

    switch (true) {
      case currentJsonValue && (dateString === JSON.parse(jsonDate)):
        return JSON.parse(currentJsonValue);
      case currentJsonValue && (dateString !== JSON.parse(jsonDate)):
        const primaryValue = JSON.parse(currentJsonValue);
        return primaryValue.map((drug) => ({ ...drug, check: false }));
      default:
        return PLACEHOLDER_DATA;
    }
  });

  const [isSettingsOpen, setSettingsOpen] = useState(false);

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
