import { render, screen } from '@testing-library/react';
import { OfferGallery } from '../OfferGallery';

const mockImages = [
  'https://example.com/image1.jpg',
  'https://example.com/image2.jpg',
  'https://example.com/image3.jpg',
];

describe('OfferGallery', () => {
  it('should render gallery div with correct class', () => {
    const { container } = render(<OfferGallery images={mockImages} />);

    const gallery = container.querySelector('.offer__gallery');
    expect(gallery).toBeInTheDocument();
  });

  it('should render all images', () => {
    render(<OfferGallery images={mockImages} />);

    const images = screen.getAllByAltText('Photo');
    expect(images).toHaveLength(3);
  });

  it('should render correct number of image wrappers', () => {
    const { container } = render(<OfferGallery images={mockImages} />);

    const wrappers = container.querySelectorAll('.offer__image-wrapper');
    expect(wrappers).toHaveLength(3);
  });

  it('should render first image with correct src', () => {
    render(<OfferGallery images={mockImages} />);

    const images = screen.getAllByAltText('Photo');
    expect(images[0]).toHaveAttribute('src', mockImages[0]);
  });

  it('should render second image with correct src', () => {
    render(<OfferGallery images={mockImages} />);

    const images = screen.getAllByAltText('Photo');
    expect(images[1]).toHaveAttribute('src', mockImages[1]);
  });

  it('should render third image with correct src', () => {
    render(<OfferGallery images={mockImages} />);

    const images = screen.getAllByAltText('Photo');
    expect(images[2]).toHaveAttribute('src', mockImages[2]);
  });

  it('should render images with correct alt text', () => {
    render(<OfferGallery images={mockImages} />);

    const images = screen.getAllByAltText('Photo');
    images.forEach((img) => {
      expect(img).toHaveAttribute('alt', 'Photo');
    });
  });

  it('should render images with correct class', () => {
    const { container } = render(<OfferGallery images={mockImages} />);

    const images = container.querySelectorAll('.offer__image');
    expect(images).toHaveLength(3);
    images.forEach((img) => {
      expect(img).toHaveClass('offer__image');
    });
  });

  it('should render empty gallery when images array is empty', () => {
    const { container } = render(<OfferGallery images={[]} />);

    const images = container.querySelectorAll('.offer__image');
    expect(images).toHaveLength(0);
  });

  it('should render single image', () => {
    const { container } = render(<OfferGallery images={[mockImages[0]]} />);

    const images = container.querySelectorAll('.offer__image');
    expect(images).toHaveLength(1);
    expect(images[0]).toHaveAttribute('src', mockImages[0]);
  });

  it('should render image wrapper with correct structure', () => {
    const { container } = render(<OfferGallery images={[mockImages[0]]} />);

    const wrapper = container.querySelector('.offer__image-wrapper');
    const img = wrapper?.querySelector('.offer__image');

    expect(wrapper).toBeInTheDocument();
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', mockImages[0]);
  });

  it('should render all wrappers with correct class', () => {
    const { container } = render(<OfferGallery images={mockImages} />);

    const wrappers = container.querySelectorAll('.offer__image-wrapper');
    wrappers.forEach((wrapper) => {
      expect(wrapper).toHaveClass('offer__image-wrapper');
    });
  });

  it('should render images as img tags', () => {
    const { container } = render(<OfferGallery images={mockImages} />);

    const images = container.querySelectorAll('img');
    expect(images).toHaveLength(3);
    images.forEach((img) => {
      expect(img.tagName).toBe('IMG');
    });
  });

  it('should render correct structure hierarchy', () => {
    const { container } = render(<OfferGallery images={mockImages} />);

    const gallery = container.querySelector('.offer__gallery');
    const wrappers = gallery?.querySelectorAll('.offer__image-wrapper');
    const images = gallery?.querySelectorAll('.offer__image');

    expect(gallery).toBeInTheDocument();
    expect(wrappers).toHaveLength(3);
    expect(images).toHaveLength(3);
  });

  it('should render multiple images with different URLs', () => {
    const differentImages = [
      'https://example.com/photo1.jpg',
      'https://example.com/photo2.png',
      'https://example.com/photo3.webp',
    ];

    render(<OfferGallery images={differentImages} />);

    const images = screen.getAllByAltText('Photo');
    expect(images[0]).toHaveAttribute('src', differentImages[0]);
    expect(images[1]).toHaveAttribute('src', differentImages[1]);
    expect(images[2]).toHaveAttribute('src', differentImages[2]);
  });

  it('should handle images array with many items', () => {
    const manyImages = Array.from(
      { length: 10 },
      (_, i) => `https://example.com/image${i + 1}.jpg`
    );

    const { container } = render(<OfferGallery images={manyImages} />);

    const images = container.querySelectorAll('.offer__image');
    expect(images).toHaveLength(10);
  });

  it('should render wrapper as div', () => {
    const { container } = render(<OfferGallery images={[mockImages[0]]} />);

    const wrapper = container.querySelector('.offer__image-wrapper');
    expect(wrapper?.tagName).toBe('DIV');
  });

  it('should render image inside wrapper', () => {
    const { container } = render(<OfferGallery images={[mockImages[0]]} />);

    const wrapper = container.querySelector('.offer__image-wrapper');
    const img = wrapper?.querySelector('img');

    expect(img).toBeInTheDocument();
    expect(img?.parentElement).toBe(wrapper);
  });
});
