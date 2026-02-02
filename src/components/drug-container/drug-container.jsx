import DrugLine from '../drug-line/drug-line'; 

import './drug-container.css';

const DrugContainer = ({ drugs, onClicker }) => {
  return (
    <div className='drug-container'>
      {drugs.map((drug) => (
        <DrugLine
          classForChild={`drugLine${drug.check}`}
          key={drug.id}
          drug={drug}
          onClicker={onClicker}
        />
      ))}
    </div>
    );
};

export default DrugContainer;