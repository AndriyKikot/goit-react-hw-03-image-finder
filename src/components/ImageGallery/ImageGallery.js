// import PropTypres from 'prop-types';
import s from './ImageGallery.module.css';
import ImageGalleryItem from '../ImageGalleryItem';

const ImageGallery = ({ images }) => {
  if (images.length === 0) return null;
  return (
    <ul className={s.ImageGallery}>
      {images.map(({ id, webformatURL, largeImageURL }) => (
        <ImageGalleryItem
          key={id}
          imageSrc={webformatURL}
          imageUrl={largeImageURL}
        />
      ))}
    </ul>
  );
};

export default ImageGallery;
