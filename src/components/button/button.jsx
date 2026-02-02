import { ReactComponent as ResetIcon } from '../../assets/reset-button.svg';

import './button.css';

const ResetButton = ({ onResetHandler }) => {
  return (
    <div 
      className='reset-btn'
      onClick={onResetHandler}
    >
      <ResetIcon />
    </div>
  );
};

export default ResetButton;
