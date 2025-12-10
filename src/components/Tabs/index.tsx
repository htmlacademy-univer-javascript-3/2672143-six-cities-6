import { useState } from 'react';
import { TabItem } from './ui/TabItems';
import { City } from '../../types/City';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { changeCity } from '../../store/reducer';

type TabsProp = {
  cities: City[];
};

export const Tabs: React.FC<TabsProp> = (props: TabsProp) => {
  const { cities } = props;
  const [activeIndex, setActiveIndex] = useState(0);

  const dispatch = useDispatch<AppDispatch>();

  const handleTabClick = (index: number) => {
    setActiveIndex(index);
    dispatch(changeCity(cities[index]));
  };

  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {cities.map((city) => (
            <TabItem
              {...city}
              key={city.id}
              isActive={city.id === cities[activeIndex]?.id}
              onClick={() =>
                handleTabClick(cities.findIndex((c) => c.id === city.id))}
            />
          ))}
        </ul>
      </section>
    </div>
  );
};
