import React, { useState, useEffect } from "react";
import Grid from "../../components/Grid";
import ProductBox from "../../components/ProductBox";
import styles from "./index.module.sass";
import Header from "../../components/Header";
import InteractiveImage from "../../components/InteractiveImage";
import ImageBox from "../../components/ImageBox";

const Panel = () => {
  const [productsToShow, setProductsToShow] = useState([]);

  useEffect(() => {});

  const onSelectProduct = idProduct => {
    let auxProductsToShow = [...productsToShow];
    let existItem = auxProductsToShow.find(item => {
      console.log(item.image);
      console.log(idProduct.image);
      return item.image === idProduct.image;
    });

    if (existItem === undefined) {
      auxProductsToShow.push(idProduct);
    } else {
      auxProductsToShow.splice(auxProductsToShow.indexOf(idProduct), 1);
    }
    setProductsToShow(auxProductsToShow);

    console.log(productsToShow);
  };

  const existElement = product => {
    const seletedItem = productsToShow.find(item => {
      return item.image === product.image;
    });
    if (seletedItem === undefined) return false;
    else return true;
  };

  const list = [
    {
      image:
        "https://elektra.vteximg.com.br/arquivos/ids/418156-1000-1000/43002006.jpg?v=636578413128700000",
      thumb:
        "https://elektra.vteximg.com.br/arquivos/ids/418156-100-100/43002006.jpg?v=636578413128700000"
    },
    {
      image:
        "https://elektra.vteximg.com.br/arquivos/ids/438566-1000-1000/43003513.jpg?v=636652708945730000",
      thumb:
        "https://elektra.vteximg.com.br/arquivos/ids/438566-100-100/43003513.jpg?v=636652708945730000"
    },
    {
      image:
        "https://elektra.vteximg.com.br/arquivos/ids/405264-1000-1000/26001727.jpg?v=636552617007770000",
      thumb:
        "https://elektra.vteximg.com.br/arquivos/ids/405264-100-100/26001727.jpg?v=636552617007770000"
    }
  ];
  const listToRender = list.map((product, index) => {
    return (
      <div className={styles.container} key={index}>
        <input
          type="checkbox"
          checked={() => {
            existElement(product);
          }}
          onClick={() => {
            onSelectProduct(product);
          }}
        />
        <ProductBox key={index} data={product} boxShadow={true}></ProductBox>
      </div>
    );
  });

  return (
    <div className={styles.container}>
      <div className={styles.leftPanel}>
        <InteractiveImage></InteractiveImage>
      </div>
      <div className={styles.rightPanel}>
        <Grid col={2} gap={10}>
          {listToRender}
        </Grid>
      </div>
    </div>
  );
};

export default Panel;
