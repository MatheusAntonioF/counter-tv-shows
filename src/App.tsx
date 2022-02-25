import './styles/root.styles.scss';

import Layout from './components/Layout';
import { ListShows } from './components/ListShows';
import { AppProviders } from './providers';

function App() {
  return (
    <AppProviders>
      <Layout>
        <ListShows />
      </Layout>
    </AppProviders>
  );
}

export default App;
