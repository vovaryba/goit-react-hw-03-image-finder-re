import s from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ images, onClose }) => (
  <>
    {images &&
      images.map(({ id, webformatURL, largeImageURL, tags }) => (
        <li className={s.ImageGalleryItem} key={id}>
          <img
            className={s.image}
            src={webformatURL}
            alt={tags}
            onClick={() => onClose(largeImageURL, tags)}
          />
        </li>
      ))}
  </>
);

export default ImageGalleryItem;
