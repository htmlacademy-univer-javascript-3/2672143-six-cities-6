import React from 'react';
import { City } from '../../../../types/City';

type TabItemProps = City & {
  isActive: boolean;
  onClick: () => void;
};

export const TabItem: React.FC<TabItemProps> = (props: TabItemProps) => {
  const { name, href, isActive, onClick } = props;
  return (
    <li className="locations__item">
      <a
        className={`locations__item-link tabs__item ${
          isActive ? 'tabs__item--active' : ''
        }`}
        href={href}
        onClick={(e) => {
          e.preventDefault();
          onClick();
        }}
      >
        <span>{name}</span>
      </a>
    </li>
  );
};
