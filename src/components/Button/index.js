import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import styles from './index.module.sass';
import { useSpring, animated } from 'react-spring';

/**
 * Button Component
 *
 * @name Button
 * @description Componente para renderizar botones customizados
 *
 * @param {String} params.type Tipo de botón
 * @param {String} params.width Define el ancho del boton [circle|default]
 * @param {String} params.link Url al navegar en el click
 * @param {node} params.children Contenido del boton
 * @param {Boolean} params.outline Indica si el boton tiene que tener un borde
 * @param {function} params.onClick Accion que se ejecutara en link del boton
 * @param {string} params.className Estilos aplicados al boton
 *
 * @example
 *
 *      <Button width="medium" onClick={() => {}}><DeliveryIcon />Ver detalle action </Button>
 *
 * @returns {React.Component}
 */

function Button({
  link = null,
  outline = false,
  type = 'default',
  children = null,
  onClick = undefined,
  width = 'default',
  className = '',
}) {
  const timerRef = useRef(null);
  const [active, setActive] = useState(false);
  const animatedStyles = useSpring({
    transform: active ? 'scale(0.90)' : 'scale(1)',
    config: {
      mass: 1,
      tension: 0,
      friction: 0,
      velocity: 0,
    },
  });

  if (!children) throw new Error('You need to define a children to render this component');

  const buttonElement = (
    <div className={`${styles.positionContainer} w-100 relative ${styles[type]}`}>
      <div
        className={`${
          styles.textButton
        } flex w-100 h-100 items-center justify-center bn normal f5 pv0 ph4 ${(outline &&
          styles.outline) ||
          ''}`}>
        {children}
      </div>
      <animated.div
        style={animatedStyles}
        className={`${className} ${styles.button} w-100 h-100 br-pill bn absolute ${(outline &&
          styles.outline) ||
          ''} ${className} `}
      />
    </div>
  );

  const props = {
    onClick,
    className: `${styles.wrapButton} ${(width && styles[width]) || ''} flex pa2`,
    onTouchStart: () => {
      clearTimeout(timerRef.current);
      setActive(true);
    },
    onTouchEnd: () => {
      timerRef.current = setTimeout(() => setActive(false), 75);
    },
  };

  return (
    (link && (
      <Link {...props} to={link}>
        {buttonElement}
      </Link>
    )) || <div {...props}>{buttonElement}</div>
  );
}

export default Button;
