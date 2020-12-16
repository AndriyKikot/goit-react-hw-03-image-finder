// import PropTypres from 'prop-types';
import s from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({
  webformatURL,
  largeImageURL,
  tags = '',
  onsetImgData,
  onOpenModal,
}) => {
  return (
    <li className={s.ImageGalleryItem}>
      <img
        src={webformatURL}
        alt={tags}
        className={s.ImageGalleryItem__image}
        onClick={() => {
          onsetImgData({ largeImageURL, tags });
          onOpenModal();
        }}
      />
    </li>
  );
};

export default ImageGalleryItem;
