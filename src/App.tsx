import { Provider } from 'react-redux';
import { AppInitializer } from './AppInitializer';
import { Offer } from './types/Offer';
import { store } from './store';

interface MainProps {
  offers: Offer[];
}

export const App: React.FC<MainProps> = (
  props: MainProps
): React.ReactElement => {
  const { offers } = props;

  return (
    <Provider store={store}>
      <AppInitializer offers={offers} />
    </Provider>
  );
};

export default App;
