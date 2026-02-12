import { useContext, useState } from 'react';

import { DrugsContext } from '../../contexts/drugs.context';
import { ThemeContext } from '../../contexts/theme.context';
import InputGroup from '../input-group/input-group';
import ThemeVariants from '../theme-variants/theme-variants';

import { ReactComponent as DeleteIcon } from '../../assets/delete-icon.svg';
import { ReactComponent as AddIcon } from '../../assets/add-button.svg';
import { ReactComponent as CrossIcon } from '../../assets/cross-button.svg';
import { ReactComponent as SaveIcon } from '../../assets/save-button.svg';

import './settings.css';

const Settings = () => {
  const { currentDrugs, setCurrentDrugs, toggleSettings } = useContext(DrugsContext);
  const { theme } = useContext(ThemeContext);
  const [formFields, setFormFields] = useState(currentDrugs);

  const handleChange = (id, field, value) => {
    setFormFields((prev) =>
      prev.map((drug) =>
        drug.id === id ? { ...drug, [field]: value } : drug
      )
    );
  };

  const handleDelete = (id) => {
    setFormFields(formFields.filter(drug => drug.id !== id))
  };

  const handleAdd = (formFields) => {
    const newDrug = {
      id: Date.now(),
      name: 'Enter a name',
      check: false,
      tempName: '',
      time: '00:01',
      tempTime: '00:01',
    };
    setFormFields([ newDrug, ...formFields ]);
};

const handleSave = () => {
  setCurrentDrugs(formFields.toSorted((a, b) => a.time.localeCompare(b.time))
    .map((drug) => {
      switch (true) {
        case drug.tempName && drug.tempTime !== drug.time:
          return { ...drug, name: drug.tempName, tempName: '', time: drug.tempTime };
        case !drug.tempName && drug.tempTime !== drug.time:
          return { ...drug, time: drug.tempTime };
        case drug.tempName && drug.tempTime === drug.time:
          return { ...drug, name: drug.tempName, tempName: ''};
        default:
          return { ...drug };
      }
    }
  ));
  toggleSettings();
};

  return (
    <>
      <div className='nav-container settings' data-theme={theme}>
        <div className='save-btn' onClick={handleSave}><SaveIcon /></div>
        <ThemeVariants />
        <div className='cross-btn' onClick={toggleSettings}><CrossIcon /></div>
      </div>

      <div className='settings-container' data-theme={theme}>
        {formFields.map(({ id, name, tempName, tempTime }) => (
          <div key={id} className='input-container'  data-theme={theme}>
            <InputGroup 
              label={name}
              type='text'
              value={tempName}
              maxLength={22}
              onChange={(e) => handleChange(id, 'tempName', e.target.value)}
            />
            <InputGroup 
              label='Time:'
              type='time'
              value={tempTime}
              onChange={(e) => handleChange(id, 'tempTime', e.target.value)}
            />
            <div onClick={() => handleDelete(id)} className='delete-button'><DeleteIcon /></div>
          </div>
        ))}
      </div>

      <div onClick={() => handleAdd(formFields)} className='add-button'><AddIcon /></div>
    </>
  );
};

export default Settings;