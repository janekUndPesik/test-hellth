import { createContext, useState, useEffect } from 'react';

import PLACEHOLDER_DATA from '../utils/placeholder-data';

export const DrugsContext = createContext({
  currentDrugs: [],
  // addDrug: () => {},
  // removeDrug: () => {},
  setCurrentDrugs: () => {},
  isSettingsOpen: false,
  setSettingsOpen: () => {},
});

// const sortTime = (a, b ) => {
//   const aHours = a.slice(0, 2);
//   const aMinutes = a.slice(2);
//   const bHours = b.slice(0, 2);
//   const bMinutes = b.slice(2);
//   a.aSortableTime = aHours + aMinutes;
//   b.bSortableTime = bHours + bMinutes;
//   return a.aSortableTime - b.bSortableTime;
//      .sort((a, b) => (a.time.slice(0,2) + a.time.slice(2)) - (b.time.slice(0,2) + b.time.slice(2)))
// } 

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

  // const addDrug = (currentDrugs) => {
  //   const newDrug = {
  //     id: Date.now(),
  //     name: 'drug_name',
  //     description: '',
  //     check: false,
  //     tempName: '',
  //     tempDescription: '',
  //   };
  //   setCurrentDrugs([...currentDrugs, newDrug]);
  // };

  // const removeDrug = (id) => {
  //   setCurrentDrugs(currentDrugs.filter(drug => drug.id !== id));
  // };

  const toggleSettings = () => setSettingsOpen(!isSettingsOpen);

  const value = { currentDrugs, setCurrentDrugs, /*addDrug, removeDrug,*/ toggleSettings, isSettingsOpen };

  return <DrugsContext.Provider value={value}>{children}</DrugsContext.Provider>
};