import { useState, useEffect } from 'react';

import PLACEHOLDER_DATA from './utils/placeholder-data';
import DrugContainer from "./components/drug-container/drug-container";
import ResetButton from './components/button/button';
import Settings from './components/settings/settings';
import { ReactComponent as SettingsIcon } from './assets/settings-button.svg';

import  './App.css';

const date = new Date();
const dateString = `${date.getDate()}${date.getMonth()}`;

const App = () => {
  const [PRIMARY_STORAGE_DATA, setPRIMARY_STORAGE_DATA] = useState(() => {
    const tempData = localStorage.getItem('PRIMARY_STORAGE_DATA');
    return tempData ? JSON.parse(tempData) : PLACEHOLDER_DATA;
  });
  
  // useState using local storage if exists if not using initial state
  // and tracking for changes during the day and restarts cycle the next day
  const [drugs, setDrugs] = useState(() => {
    const drugsFromStash = localStorage.getItem('LOCAL_STASH');
    const dateFromStash = localStorage.getItem('DATE');
    return (drugsFromStash && JSON.parse(dateFromStash) === dateString) ? 
    JSON.parse(drugsFromStash) : 
    PRIMARY_STORAGE_DATA;
  });

  const [toggled, setToggle] = useState(false);
  
  useEffect(() => {
  const storedData = localStorage.getItem('PRIMARY_STORAGE_DATA');

  if (!storedData) {
    // creates file in local if it doesn't exist
    localStorage.setItem('PRIMARY_STORAGE_DATA', JSON.stringify(PLACEHOLDER_DATA));
    setPRIMARY_STORAGE_DATA(PLACEHOLDER_DATA);
    setDrugs(PLACEHOLDER_DATA);
    } else {
      // load file if it exists
      setPRIMARY_STORAGE_DATA(JSON.parse(storedData));
    }
  }, []);

  
  // useEffect saving current state to local storage whenever state changed
  useEffect(() => {
    localStorage.setItem('LOCAL_STASH', JSON.stringify(drugs));
    localStorage.setItem('DATE', JSON.stringify(dateString));
  }, [drugs]);

  const onDoubleClickHandler = (id) => {
    setDrugs((prevDrugs) =>
     prevDrugs.map((drug) => 
      drug.id === id ? {...drug, check: !drug.check } : drug 
     )
     );
  };

  const handleReset = () => {
    setDrugs((prevDrugs) =>
      prevDrugs.map((drug) => ({ ...drug, check: false }))
    );
  };

  const handleToggle = () => {
    setToggle(!toggled);
  }

  // cheks for any drug've been taken
  const drugsTaken = drugs.some((drug) => drug.check === true);

  // fricking crutch
  const crutch = drugsTaken && !toggled;
  console.log(crutch);

  return (
    <div className='main-container'>
      {crutch &&
        (<div><ResetButton onResetHandler={handleReset} /></div>)}
      <div 
        className='settings-btn'
        onClick={handleToggle}
      >
        <SettingsIcon />
      </div>
        {
        toggled ? 
          <Settings /> : 
          <DrugContainer 
            drugs={drugs}
            onClicker={onDoubleClickHandler}
          />
        }
    </div>
  );
}

export default App;
