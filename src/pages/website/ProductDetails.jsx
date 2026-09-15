import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Breadcrumb from "../../web-components/Breadcrumb";
import CarImageSlider from "../../web-components/CarImageSlider";
import CarOverview from "../../web-components/CarOverview";
import CarInfoSidebar from "../../web-components/CarInfoSidebar";
import Preloader from "../../web-components/Preloader";
import { getProductDetails } from "../../api/apiServices";
// import { getProductDetails } from "../../api/productApi.js";

function ProductDetails() {

  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [error, setError] = useState("");

  const [loading, setLoading] = useState(true);

  const fetchProduct = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getProductDetails({
          PID: id,
          CurrencyCode: "YEN",
          CurrencyValue: "1",
        });
        console.log("Product Details:", data);
        if (data) {
          setCar(data.data.data);
        }
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch product details.");
        console.error("Error fetching product details:", err);
      }
      finally {
        setLoading(false);
      }
      };
  useEffect(() => {
    
      fetchProduct();
    },[id]);
    if(loading){
      return <h1>Loading...</h1>
    }
    

  if (!car) {
    return (
      <div className="loader-wrapper">
        <Preloader />
      </div>
    );
  }
console.log("Product Details:", car);
  return (
    <section className="product-details">
        <div className="container">
            <div className="row">
                <div className="col-lg-8 col-md-6 col-12">
                    <Breadcrumb car={car} />
                    <CarImageSlider images={car.lstImage} />
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