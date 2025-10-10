import { useState } from 'react';
import { TabItem } from './ui/TabItems';
import { City } from '../../types/City';

type TabsProp = {
  cities: City[];
  onCityChange?: (city: City, index: number) => void;
};

export const Tabs: React.FC<TabsProp> = (props: TabsProp) => {
  const { cities, onCityChange } = props;
  const [activeIndex, setActiveIndex] = useState(0);

  const handleTabClick = (index: number) => {
    setActiveIndex(index);
    onCityChange?.(cities[index], index);
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
