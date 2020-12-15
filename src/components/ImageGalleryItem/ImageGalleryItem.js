// import PropTypres from 'prop-types';
import s from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ id, imageSrc, imageUrl }) => {
  return (
    <li key={id} className={s.ImageGalleryItem}>
      <img
        src={imageSrc}
        alt=""
        data-url={imageUrl}
        className={s.ImageGalleryItem__image}
      />
    </li>
  );
};

export default ImageGalleryItem;
