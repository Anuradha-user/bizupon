import React from "react";
import { Link } from "react-router-dom";

function ProductListCard({ products, view }) {

  return (
    <>
      {products.map((product) => (
        <Link to={`/product-list/${product.productId}`} key={product.productId}>
          <div className={`productCard ${view === "list-view" ? "listViewCard" : ""}`}
            key={product.productId} >

            <div className="imgThumb">
                <img src={product.image} alt={product.productName} className="img-fluid" />
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

              {/* LIST VIEW EXTRA INFO */}
              {view === "list-view" && (
                <div className="productInfo">
                  <p>{product.cc} cc</p>
                  <p>{product.transmission}</p>
                  <p>{product.handle}</p>
                </div>
              )}
            </div>

            <div className="line"></div>

            <div className="ProductCard-price">
              <button className="btn theme-btn w-100">
                ${product.price}
              </button>
            </div>

          </div>
        </Link>
      ))}
    </>
  );
}

export default ProductListCard;