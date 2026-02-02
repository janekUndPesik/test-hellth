import './drug-line.css';

const DrugLine = ({ drug, onClicker }) => {
  const { name, description } = drug;
  return (
    <div className='drug-line-container' onDoubleClick={() => onClicker(drug.id)}>
      <h2>{name}</h2>
      <p>{description}</p>
    </div>
  );
};

export default DrugLine;