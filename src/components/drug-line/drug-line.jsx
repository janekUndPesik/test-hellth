import './drug-line.css';

const DrugLine = ({ drug, onClicker, classForChild }) => {
  const { name, description } = drug;
  return (
    <div
      className={`drug-line-container ${classForChild}`}
      onDoubleClick={() => onClicker(drug.id)}
    >
      <h2>{name}</h2>
      <p>{description}</p>
    </div>
  );
};

export default DrugLine;