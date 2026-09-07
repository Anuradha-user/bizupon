import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Breadcrumb from "../../web-components/Breadcrumb";
import CarImageSlider from "../../web-components/CarImageSlider";
import CarOverview from "../../web-components/CarOverview";
import CarInfoSidebar from "../../web-components/CarInfoSidebar";
import Preloader from "../../web-components/Preloader";

function ProductDetails() {

  const { id } = useParams();
  const [car, setCar] = useState(null);
  useEffect(() => {

    fetch("https://jaishriganesha.com/BizuponInterview/api/Home/GetProductData")
      .then(res => res.json())
      .then(data => {
        const singleCar = data.find(item => item.productId.toString() === id);
        setCar(singleCar);
      });

  }, [id]);

  if (!car) {
    return (
      <div className="loader-wrapper">
        <Preloader />
      </div>
    );
  }

  return (
    <section className="product-details">
        <div className="container">
            <div className="row">
                <div className="col-lg-8 col-md-6 col-12">
                    <Breadcrumb car={car} />
                    <CarImageSlider car={car} />
                    <CarOverview car={car} />
                </div>
                <div className="col-lg-4 col-md-6 col-12">
                    <CarInfoSidebar car={car} />
                </div>
            </div>
        </div>
    </section>
  );

}

export default ProductDetails;