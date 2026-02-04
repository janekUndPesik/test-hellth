import { useContext } from 'react';

import { DrugsContext } from '../../contexts/drugs.context';

import './drug-container.css';

const DrugContainer = () => {
  const { currentDrugs, setCurrentDrugs } = useContext(DrugsContext);

  const handleLongClick = (id) => {
    setCurrentDrugs((prev) => (
      prev.map((drug) => 
        drug.id === id ? {...drug, check: !drug.check } : drug)
    ));
  };

  return (
    <div className='drug-container'>
        {currentDrugs.filter((drug) => drug.check === false)
        .map(({ id, name, description }) => (
          <div key={id} onClick={() => handleLongClick(id)} className='drug-line-container'>
            <h2>{name}</h2>
            <p>{description}</p>
          </div>
        ))}
      </div>
    );
};

export default DrugContainer;