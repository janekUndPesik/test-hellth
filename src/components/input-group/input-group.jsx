import { useState } from 'react';

import './input-group.css';

const LABEL_TYPES = {
  text: 'text-input',
  time: 'time-input',
};

const InputGroup = ({label, value, type, ...props }) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => setIsFocused(!isFocused);

  const isShrinked = () => isFocused || value ? 'shrink' : '';

  return (
    <div className='input-group'>
      <input 
        { ...props }
        onFocus={handleFocus}
        onBlur={handleFocus}
        value={value}
        type={type}
        className={`input-raw ${LABEL_TYPES[type]}`}
      />

      <label 
        className={`label-raw ${LABEL_TYPES[type]} ${isShrinked()}`}
      >
        {label}
      </label>
    </div>
  );
};

export default InputGroup;
