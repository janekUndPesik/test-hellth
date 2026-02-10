import { useContext } from 'react';

import { DrugsContext } from '../../contexts/drugs.context';
import { ThemeContext } from '../../contexts/theme.context';
import { ReactComponent as ResetIcon } from '../../assets/reset-button.svg';
import { ReactComponent as SettingsIcon } from '../../assets/settings-button.svg';

import './drug-container.css';

const DrugContainer = () => {
  const { currentDrugs, setCurrentDrugs, toggleSettings } = useContext(DrugsContext);
  const { theme } = useContext(ThemeContext);

  const handleReset = () => {
    setCurrentDrugs((prev) => prev.map((drug) => ({ ...drug, check: false })));
  };

  const handleLongClick = (id) => {
    setCurrentDrugs((prev) => (
      prev.map((drug) => 
        drug.id === id ? {...drug, check: !drug.check } : drug)
    ));
  };

  const toggleReset = currentDrugs.some((drug) => drug.check === true);

  return (
    <>
      <div className='nav-container' data-theme={theme}>
        <div className={toggleReset ? `reset-btn` : `reset-btn gray`} onClick={handleReset}><ResetIcon /></div>
        <div className='settings-btn' onClick={toggleSettings}><SettingsIcon /></div>
      </div>

      <div className='drug-container'>
          {currentDrugs.filter((drug) => drug.check === false)
          .map(({ id, name, time }) => (
            <div key={id} onClick={() => handleLongClick(id)} className='drug-line-container' data-theme={theme}>
              <h2>{name}</h2>
              <p>{`Time of injection: ${time}`}</p>
            </div>
          ))}
      </div>
    </>
    );
};

export default DrugContainer;