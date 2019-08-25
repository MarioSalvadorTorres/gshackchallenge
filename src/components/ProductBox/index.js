import TextBox from "../TextBox";
import ImageBox from "../ImageBox";
import React from "react";
import styles from "./index.module.sass";

import { ReactComponent as Envio } from "./icons/envio.svg";
import { ReactComponent as TiendasCercanas } from "./icons/tiendas-cercanas.svg";

/**
 * @name ProductBox
 * @description Componente para renderizar un solo producto
 *
 * @param {Object} props Props del componente React
 * @param {String} props.id Id del nodo
 * @param {Object} props.data Graphql fragment definition
 * @param {Bolean} props.boxShadow Sombra en los bordes (true|false)
 *
 * @example
 *
 *      <ProductBox data={product}></ProductBox>
 *
 * @returns {React.Component}
 */

const setCurrency = function(a) {
  var re = "\\d(?=(\\d{" + 3 + "})+" + (2 > 0 ? "\\." : "$") + ")";
  return a.toFixed(Math.max(0, ~~2)).replace(new RegExp(re, "g"), "$&,");
};

const ProductBox = ({ id, data = null, boxShadow = false }) => {
  const isPlaceholder = !data;
  const product = data || {};
  const loadingClass = (isPlaceholder && styles.loading) || "";

  return (
    <div
      id={id}
      className={`${styles.container}  ${boxShadow ? styles.boxShadow : ""}`}
    >
      <div className={styles.image}>
        <ImageBox
          width={150}
          height={150}
          radius="10px"
          fit="contain"
          alt={product.name}
          src={product.image}
          thumb={product.thumb}
        />
      </div>
      <div className={styles.body}>
        <TextBox size="medium" color="#666666">
          <strong>
            <div className={`${styles.title} ${loadingClass}`}>
              {product.name}
            </div>
          </strong>
        </TextBox>
        {(!!product.weekly || isPlaceholder) && (
          <TextBox
            size="small"
            color="#666666"
            className={`${styles.weeklyDescription} ${loadingClass}`}
          >
            <>
              {!!product.weekly && (
                <span>
                  Desde <b>${product.weekly}</b> semanales
                </span>
              )}
            </>
          </TextBox>
        )}
        <hr />
        <TextBox size="small" color="#666666">
          Precio de contado
        </TextBox>
        <TextBox size="medium" className={`${styles.cash} ${loadingClass}`}>
          <span>{!!product.price && `$${setCurrency(product.price)}`}</span>
          <del>{!!product.lastPrice && setCurrency(product.lastPrice)}</del>
        </TextBox>
        <hr />
        <TextBox size="small" color="#666666">
          Disponible para:
        </TextBox>
        <TextBox size="large" color="#000000">
          <strong>
            <div
              className={`${styles.deliveryType} ${product.logisticsInfo &&
                product.logisticsInfo.availableInStore &&
                styles.active}`}
            >
              <TiendasCercanas className={styles.logo} />
              Entrega en esta tienda
            </div>

            <div
              className={`${styles.deliveryType} ${product.logisticsInfo &&
                product.logisticsInfo.availableInWarehouse &&
                styles.active}`}
            >
              <Envio className={styles.logo} />
              <span>Envío a domicilio&nbsp;</span>
              <b>gratis</b>
            </div>
          </strong>
        </TextBox>
      </div>
    </div>
  );
};

export default ProductBox;
