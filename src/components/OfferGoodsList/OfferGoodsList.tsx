import React from 'react';

interface OfferGoodsListProps {
  goods: string[];
}

export const OfferGoodsList: React.FC<OfferGoodsListProps> = (
  props: OfferGoodsListProps
) => {
  const { goods } = props;
  if (!goods || goods.length === 0) {
    return null;
  }

  return (
    <div className="offer__inside">
      <h2 className="offer__inside-title">What&apos;s inside</h2>
      <ul className="offer__inside-list">
        {goods.map((item: string) => (
          <li key={item} className="offer__inside-item">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};
