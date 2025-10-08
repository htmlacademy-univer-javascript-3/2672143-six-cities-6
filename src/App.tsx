import React from 'react';
import { Offer } from './types/Offer';
import Main from './pages/Main';

interface MainProps {
  offers: Offer[];
}

export const App: React.FC<MainProps> = (props: MainProps) => {
  const { offers } = props;

  return <Main offers={offers} />;
};
