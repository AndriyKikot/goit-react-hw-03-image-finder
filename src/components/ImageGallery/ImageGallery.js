// import PropTypres from 'prop-types';
import s from './ImageGallery.module.css';
import ImageGalleryItem from '../ImageGalleryItem';

const ImageGallery = ({ images, onClickImage }) => {
  if (images.length === 0) return null;
  return (
    <ul className={s.ImageGallery}>
      {images.map(({ id, webformatURL, largeImageURL, tags }) => (
        <ImageGalleryItem
          key={id}
          webformatURL={webformatURL}
          tags={tags}
          onClickImage={() => onClickImage(largeImageURL)}
        />
      ))}
    </ul>
  );
};

export default ImageGallery;
