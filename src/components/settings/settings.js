import { useContext, useState } from 'react';

import { DrugsContext } from '../../contexts/drugs.context';

import { ReactComponent as DeleteIcon } from '../../assets/delete-icon.svg';
import { ReactComponent as AddIcon } from '../../assets/add-button.svg';
import { ReactComponent as CrossIcon } from '../../assets/cross-button.svg';

import './settings.css';

const Settings = () => {
  const { currentDrugs, addDrug, removeDrug, setCurrentDrugs, toggleSettings } = useContext(DrugsContext);
  const [ formFields, setFormFields ] = useState(currentDrugs);

  const handleChange = (id, field, value) => {
    setCurrentDrugs((prev) =>
      prev.map((drug) =>
        drug.id === id ? { ...drug, [field]: value } : drug
      )
    );
  }

  return (
    <>
      <div className='cross-btn' onClick={toggleSettings}><CrossIcon /></div>
      <div className='settings-container'>
        {currentDrugs.map((drug) => (
          <div key={drug.id} className='input-container'>
            <h2>Name</h2>
            <input 
              placeholder={drug.name}
              onChange={(e) => handleChange(drug.id, 'name', e.target.value)}
              value={drug.name}
            />
            <p>Description</p>
            <input 
              placeholder={drug.description}
              onChange={(e) => handleChange(drug.id, 'value', e.target.value)}
              value={drug.description}
            />
            <div onClick={() => removeDrug(drug.id)} className='delete-button'><DeleteIcon /></div>
          </div>
        ))}
        <div onClick={() => addDrug(currentDrugs)} className='add-button'><AddIcon /></div>
      </div>
    </>
  );
};

export default Settings;