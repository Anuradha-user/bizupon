import React from "react";
import { Link } from "react-router-dom";

function ProductListCard({ products }) {

  return (

    <>
      {products.map((product) => (
        <div className="productCard" key={product.productId}>
          <div className="imgThumb">
            <Link to="#">
              <img
                src={product.image}
                alt={product.productName}
                className="img-fluid"
              />
            </Link>
          </div>
          <div className="product-content">
            <div className="d-flex justify-content-between">
              <p className="brand">{product.makers}</p>
              <p>BIZ ID: {product.productId}</p>
            </div>
            <h6 className="title">{product.productName}</h6>
            <div className="productInfo">
              <p>{product.mileage} km</p>
              <p>{product.registrationdate}</p>
              <p>{product.fuel}</p>
            </div>
          </div>
          <div className="line"></div>
          <div className="ProductCard-price">
            <button className="btn theme-btn w-100">
              ${product.price}
            </button>
          </div>
        </div>
      ))}
    </>

  );

}

export default ProductListCard;