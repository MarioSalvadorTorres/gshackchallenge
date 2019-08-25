import React, { Suspense, useState, useRef, useEffect } from 'react';
import styles from './index.module.sass';
import Image from './image';

/**
 * ImageBox Component
 *NPM
 * @name ImageBox
 * @description Componente para renderizar contenedores con imagenes
 *
 * @param {Object} params props del componente React
 * @param {String} params.src Url de la imagen a renderizar obligatorio
 * @param {String} params.thumb Url de la miniatura a renderizar  es obligatorio
 * @param {String} [params.fit='cover'] Modo de contención de la imagen
 * @param {String} [params.background='transparent'] Color de fondo del contenedor
 * @param {Number} [params.radius=0] Radio del borde del contenedor
 * @param {Number} [params.width='auto'] Ancho del contenedor
 * @param {Number} [params.height='auto'] Alto del contenedor
 * @param {String} [params.cursor='auto'] Efecto cursor del contenedor de la imagen
 *
 * @example
 *
 *      <ImageBox src="http://www.google.com/my-image.png" width="50" height="50" />
 *
 * @returns {React.Component}
 */

const loadImage = (src) => {
  return new Promise((resolve, reject) => {
    const image = new window.Image();
    image.src = src;

    if ('decode' in image) {
      image
        .decode()
        .then(() => resolve(image))
        .catch(reject);
    } else {
      image.onload = () => {
        resolve(image);
      };
      image.onerror = () => {
        reject();
      };
    }
  });
};

const ImageBox = ({
  src,
  thumb,
  alt = '',
  radius = 0,
  lazy = false,
  fit = 'cover',
  width = 'auto',
  height = 'auto',
  cursor = 'auto',
  fullLoad = false,
}) => {
  const [imageElement, setImageElement] = useState(null);
  const [loadLevel, setLoadLevel] = useState(0);
  const isBase64 = !!thumb && !thumb.includes('http');
  const thumbSrc = (isBase64 && `data:image/webp;base64, ${thumb}`) || thumb;

  const ComponentRef = useRef(
    (src &&
      React.lazy(() => {
        return loadImage((!isBase64 && thumb) || src)
          .then((imageElement) => {
            if (isBase64 || (!thumb && src)) setImageElement(imageElement);
            setLoadLevel((level) => {
              const newLevel = (!isBase64 && !!thumb && level < 2 && 1) || 2;
              return newLevel;
            });
            return { default: Image };
          })
          .catch((e) => {
            console.log(e);
            return { default: Image };
          });
      })) ||
      null,
  );

  useEffect(() => {
    if (!isBase64 && thumb && src && (!lazy || (lazy && fullLoad)))
      loadImage(src)
        .then(() => {
          setLoadLevel(2);
        })
        .catch((e) => {
          console.log(e);
        });
  }, [src, thumb, lazy, fullLoad, isBase64]);

  const divStyle = {
    borderRadius: radius,
    cursor: cursor,
    width: width,
    height: height,
  };

  const imgStyle = {
    objectFit: fit,
    borderRadius: radius,
    width: '100%',
    height: height,
  };

  const loader = <div style={divStyle} className={styles.loading} />;
  const blured =
    (isBase64 && (
      <div style={divStyle} className={styles.imageContainer}>
        <img
          alt={alt}
          src={`data:image/webp;base64, ${thumb}`}
          style={{ ...imgStyle, objectFit: 'cover' }}
          className={styles.blured}
        />
      </div>
    )) ||
    null;

  if (!src) return loader;

  return (
    <Suspense fallback={blured || loader}>
      <ComponentRef.current
        alt={alt}
        src={src}
        thumb={thumbSrc}
        style={divStyle}
        imgStyle={imgStyle}
        loadLevel={loadLevel}
        imageElement={imageElement}
      />
    </Suspense>
  );
};

export default ImageBox;
