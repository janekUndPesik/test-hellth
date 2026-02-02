import './inputDrug.css';

const InputDrug = ({ ...props }) => {
  
  return (
    <div className='input-container'>
      <input
        {...props}
      />
    </div>
  );
};

export default InputDrug;