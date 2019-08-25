import React from 'react';
import styles from './index.module.sass';

/**
 * TextBox Component
 *
 * @name TextBox
 * @description Componente para renderizar contenedores con texto
 *
 * @param {Objet} params props del componente React
 * @param {React.Component} params.component Texto a renderizar
 * @param {String} params.color Color del texto (RGB)
 * @param {String} params.textAlign Alineación horizontal (left|right|center|justify)
 * @param {String} params.size Tamaño de texto (small(14px)|medium(16px)|large(18px)|xlarge(20px))
 * @param {String} params.className Estilos a heredar
 *
 *
 * @example
 *
 *      <TextBox color="#30323d" letterSpacing="3px" textAlign="center" size="xlarge" >
 *        Hola Mundo
 *      </TextBox>
 *
 * @returns {React.Component}
 */

const TextBox = ({
  children = null,
  textAlign = 'left',
  color = 'black',
  size = 'medium',
  className = '',
}) => {
  if (!children) throw new Error('You need to define a children to render this component');
  return (
    <div
      className={`${styles.text}  ${styles[textAlign]} ${styles[size]} ${className}`}
      style={{ color: color }}>
      {children}
    </div>
  );
};

export default TextBox;
