import { useState } from 'react';

import InputDrug from "../input-drug/input-drug";
import { ReactComponent as DeleteIcon } from '../../assets/delete-icon.svg';
import { ReactComponent as AddIcon } from '../../assets/add-button.svg';

import './settings.css';

const Settings = () => {

  // useState sets form fields with data
  // from main file
  const [formFields, setFormFields] = useState(() => {
    const tempData = localStorage.getItem('PRIMARY_STORAGE_DATA');
    return JSON.parse(tempData);
  });

  //useState for current data
  const [currentData, setCurrentData] = useState(() => {
    const tempData = localStorage.getItem('LOCAL_STASH');
    return JSON.parse(tempData);
  });

  const handleChange = (id, field, value) => {
    setFormFields((prev) =>
      prev.map((drug) =>
        drug.id === id ? { ...drug, [field]: value } : drug
      )
    );
    setCurrentData((prev) =>
      prev.map((drug) =>
        drug.id === id ? {...drug, [field]: value } : drug
      )
    );
  };

  const deleteDrug = (id) => {
    setFormFields((prev) => prev.filter((drug) => drug.id !== id));
    setCurrentData((prev) => prev.filter((drug) => drug.id !== id));
  };

  const addDrug = () => {
    const newDrug = {
      id: Date.now(),
      name: '',
      description: '',
    };
    setFormFields((prev) => [...prev, newDrug]);
    setCurrentData((prev) => [...prev, newDrug]);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    localStorage.setItem('PRIMARY_STORAGE_DATA', JSON.stringify(formFields));
    localStorage.setItem('LOCAL_STASH', JSON.stringify(currentData));
    alert('Saved');
  };

  return (
    <div className='settings-container'>
      <h2>Settings</h2>
      <form onSubmit={onSubmitHandler}>
        {formFields.map((drug) => (
          <div 
            key={drug.id}
            className='input-group'
          >
            <label>Name</label>
            <InputDrug
              required
              type='text'
              value={drug.name}
              onChange={(e) =>
                handleChange(drug.id, 'name', e.target.value)
              }
             />
            <label>Description</label>
            <InputDrug
              type='text'
              value={drug.description}
              onChange={(e) =>
                handleChange(drug.id, 'description', e.target.value)
              }
             />
            <div
              className='delete-button'
              onClick={() => deleteDrug(drug.id)}
            >
              <DeleteIcon />
            </div>
          </div>
        ))}
        <div
          className='add-button'
          onClick={addDrug}
        >
          <AddIcon />
        </div>
        <div className='save-btn'>
          <button type='submit' className='btn-4'>
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default Settings;