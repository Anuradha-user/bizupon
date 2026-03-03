import React, { useEffect, useState } from "react";
import ProductListCard from "./ProductListCard";

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts(productsData);
  }, []);

  return <ProductListCard products={products} />;
}

export default ProductList;