import React from "react";
import Grid from "../../components/Grid";
import ProductBox from "../../components/ProductBox";
import styles from "./index.module.sass";
import Header from "../../components/Header";
import InteractiveImage from "../../components/InteractiveImage";
import ImageBox from "../../components/ImageBox";

const Panel = () => {
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
      <ProductBox key={index} data={product} boxShadow={true}></ProductBox>
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
