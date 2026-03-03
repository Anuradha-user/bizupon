import React from "react";

function ProductListCard({ products }) {
  return (
    <>
      {products?.map((product) => (
        <div className="productCard" key={product.id}>
          <div className="imgThumb">
            <a href="#">
              <img src={product.imageUrl} alt={product.title} className="img-fluid"
              />
            </a>
          </div>

          <div className="product-content">
            <div className="d-flex justify-content-between">
              <p className="brand">{product.brand}</p>
              <p className="product-ID">BIZ ID: {product.bizId}</p>
            </div>

            <h6 className="title">{product.title}</h6>

            <div className="productInfo">
              <div className="coloumn">
                {/* <p>Kilometers:</p> */}
                <p>{product.kilometers} km</p>
              </div>

              <div className="coloumn">
                <p>{product.year}</p>
              </div>

              <div className="coloumn">
                <p>{product.fuelType}</p>
              </div>
            </div>
          </div>

          <div className="line"></div>

          <div className="ProductCard-price">
            <button className="btn theme-btn w-100">
              ¥{product.price}
            </button>
          </div>
        </div>
      ))}
    </>
  );
}

export default ProductListCard;