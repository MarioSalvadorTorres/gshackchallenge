import React from 'react';
import styles from './index.module.sass';

const ImageElement = ({ src, thumb, style, alt, loadLevel, imgStyle, imageElement }) => {
  const showBluredImage = thumb && loadLevel !== 2;
  const showImage = loadLevel === 2;

  return (
    <div style={style} className={styles.imageContainer}>
      {showBluredImage && (
        <img
          alt={alt}
          src={thumb}
          style={{ ...imgStyle, objectFit: 'cover' }}
          className={styles.blured}
        />
      )}
      {showImage && (
        <img
          alt={alt}
          style={{ ...imgStyle }}
          className={styles.image}
          src={(imageElement && imageElement.src) || src}
        />
      )}
    </div>
  );
};

export default ImageElement;
