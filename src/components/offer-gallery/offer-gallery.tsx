import React from 'react';

type OfferGalleryProps = {
  images: string[];
};

export const OfferGallery: React.FC<OfferGalleryProps> = (
  props: OfferGalleryProps
) => {
  const { images } = props;
  return (
    <div className="offer__gallery">
      {(images || []).map((image: string) => (
        <div key={image} className="offer__image-wrapper">
          <img className="offer__image" src={image} alt="Photo" />
        </div>
      ))}
    </div>
  );
};
