import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ProductListCard from "./ProductListCard";

function ProductList() {

  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [searchParams] = useSearchParams();

  // API CALL
  useEffect(() => {

    fetch("https://jaishriganesha.com/BizuponInterview/api/Home/GetProductData")
      .then((res) => res.json())
      .then((data) => {

        setAllProducts(data);
        setProducts(data);

      })
      .catch((err) => console.log(err));

  }, []);
  

  // FILTER LOGIC
  useEffect(() => {

    let filtered = [...allProducts];

    const maker = searchParams.get("maker");
    const model = searchParams.get("model");
    const fuel = searchParams.get("fuel");

    if (maker) {
      filtered = filtered.filter(
        (p) => p.maker?.toLowerCase() === maker.toLowerCase()
      );
    }

    if (model) {
      filtered = filtered.filter(
        (p) => p.productName?.toLowerCase() === model.toLowerCase()
      );
    }

    if (fuel) {
      filtered = filtered.filter(
        (p) => p.fuel?.toLowerCase() === fuel.toLowerCase()
      );
    }

    setProducts(filtered);

  }, [searchParams, allProducts]);


  return (
    <div className="container py-5">
      <div className="row">
        <ProductListCard products={products} />
      </div>
    </div>
  );
}

export default ProductList;