import React from 'react';
import styles from './index.module.sass';

/**
 * @name Grid
 * @description Componente para renderizar un array de elementos en forma de grid
 *
 * @param {Object} props props del componente React
 * @param {Array} props.children Elementos a renderizar
 * @param {Number} props.col Número de columnas a renderizar
 * @param {String} props.gap  Espacio entre items
 *
 * @example
 *
 *      <Grid col={5} gap='30px'>
 *        <ReactComponent/>
 *        <ReactComponent/>
 *        <ReactComponent/>
 *        <ReactComponent/>
 *      </Grid>
 *
 * @returns {React.Component}
 */

const Grid = ({ children = null, col = 1, gap = 0 }) => {
  const configStyle = {
    gridTemplateColumns: `repeat(${col}, 1fr)`,
    gridGap: `${gap}px`,
  };

  if (!children) throw new Error('You need to define children to render');
  return (
    <div className={styles.container}>
      <div className={styles.grid} style={configStyle}>
        {children}
      </div>
    </div>
  );
};

export default Grid;
