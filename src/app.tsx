import { Provider } from 'react-redux';
import { AppInitializer } from './app-initializer';
import { store } from './store';

export const App: React.FC = (): React.ReactElement => (
  <Provider store={store}>
    <AppInitializer />
  </Provider>
);

export default App;
