import { useContext, useEffect } from 'react';

import { DrugsContext } from './contexts/drugs.context';

import Settings from './components/settings/settings';
import DrugContainer from './components/drug-container/drug-container';
import { ReactComponent as ResetIcon } from './assets/reset-button.svg';
import { ReactComponent as SettingsIcon } from './assets/settings-button.svg';

import './App.css';

const App = () => {
  const { currentDrugs, setCurrentDrugs, isSettingsOpen, toggleSettings } = useContext(DrugsContext);

  useEffect(() => {
    const date = new Date();
    const dateString = `${date.getDate()}${date.getMonth()}`;
    localStorage.setItem('LOCAL_STASH', JSON.stringify(currentDrugs));
    localStorage.setItem('DATE', JSON.stringify(dateString));
  }, [currentDrugs])

  const handleReset = () => {
    setCurrentDrugs((prev) => prev.map((drug) => ({ ...drug, check: false })));
  };

  return (
    <div className='main-container'>
      {!isSettingsOpen && <div className='reset-btn' onClick={handleReset}><ResetIcon /></div>}
      {!isSettingsOpen && <div className='settings-btn' onClick={toggleSettings}><SettingsIcon /></div>}
      {!isSettingsOpen && <DrugContainer />}
      {isSettingsOpen && <Settings />}
    </div>
  ); 
};

export default App;
