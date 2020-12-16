// import PropTypres from 'prop-types';
import s from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ webformatURL, tags = '', onClickImage }) => {
  return (
    <li className={s.ImageGalleryItem}>
      <img
        src={webformatURL}
        alt={tags}
        className={s.ImageGalleryItem__image}
        onClick={onClickImage}
      />
    </li>
  );
};

export default ImageGalleryItem;
