import { useContext } from 'react';

import { DrugsContext } from './contexts/drugs.context';
import { ThemeContext } from './contexts/theme.context';

import Settings from './components/settings/settings';
import DrugContainer from './components/drug-container/drug-container';

import './App.css';

const App = () => {
  const { isSettingsOpen } = useContext(DrugsContext);
  const { theme } = useContext(ThemeContext);

  return (
    <div className='main-container' data-theme={theme}>
      {
        isSettingsOpen ? <Settings /> : <DrugContainer />
      }
    </div>
  ); 
};

export default App;
