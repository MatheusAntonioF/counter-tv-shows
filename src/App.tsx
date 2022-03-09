import './styles/root.styles.scss';

import { AppProviders } from './providers';
import { Routes } from './routes';

function App() {
  return (
    <AppProviders>
      <Routes />
    </AppProviders>
  );
}

export default App;
