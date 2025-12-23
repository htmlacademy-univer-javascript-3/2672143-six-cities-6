import { useMemo, useCallback } from 'react';
import { TabItem } from './ui/TabItems';
import { City } from '../../types/City';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../store';
import { selectSelectedCity } from '../../store/selectors';
import { changeCity } from '../../store/reducer';
type TabsProp = {
  cities: City[];
};

export const Tabs: React.FC<TabsProp> = (props: TabsProp) => {
  const { cities } = props;
  const dispatch = useDispatch<AppDispatch>();
  const selectedCity = useSelector(selectSelectedCity);

  const activeIndex = useMemo(
    () => cities.findIndex((city) => city.name === selectedCity.name),
    [cities, selectedCity.name]
  );

  const handleTabClick = useCallback(
    (index: number) => {
      dispatch(changeCity(cities[index]));
    },
    [cities, dispatch]
  );

  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {cities.map((city, index) => (
            <TabItem
              {...city}
              key={city.name}
              isActive={activeIndex === index}
              onClick={() => handleTabClick(index)}
            />
          ))}
        </ul>
      </section>
    </div>
  );
};
