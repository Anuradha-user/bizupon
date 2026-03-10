import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

function ProductFilters() {

  const [products, setProducts] = useState([]);
  const [brandModels, setBrandModels] = useState({});

  const bodyTypes = ["Sedan", "SUV", "Coupe", "Hatchback", "Wagon", "Mini Van", "Station Wagon", "Van"];
  const fuelTypes = ["Petrol", "Diesel", "Electric", "Hybrid"];

  const kmsOptions = [
  10000,
  30000,
  50000,
  75000,
  100000,
  125000
];

  const [searchParams, setSearchParams] = useSearchParams();

  const selectedModels = searchParams.getAll("model");
  const selectedBody = searchParams.getAll("body");
  const selectedFuel = searchParams.getAll("fuel");
  const selectedKms = searchParams.get("kms");

  const minLimit = 500000;
  const maxLimit = 10000000;

  const minPrice = Number(searchParams.get("minPrice")) || minLimit;
  const maxPrice = Number(searchParams.get("maxPrice")) || maxLimit;
  

  const [openBrand, setOpenBrand] = useState(null);

  // 🔥 FETCH PRODUCTS
  useEffect(() => {

    fetch("https://jaishriganesha.com/BizuponInterview/api/Home/GetProductData")
      .then((res) => res.json())
      .then((data) => {

        setProducts(data);

        // create brand -> models structure
        const grouped = {};

        data.forEach((item) => {

          if (!grouped[item.makers]) {
            grouped[item.makers] = [];
          }

          if (!grouped[item.makers].includes(item.productName)) {
            grouped[item.makers].push(item.productName);
          }

        });

        setBrandModels(grouped);

      });

  }, []);

  const updatePrice = (min, max) => {
    const params = new URLSearchParams(searchParams);

    params.set("minPrice", min);
    params.set("maxPrice", max);

    setSearchParams(params);
  };

  const updateParams = (key, values) => {
    const params = new URLSearchParams(searchParams);

    params.delete(key);

    values.forEach((v) => params.append(key, v));

    setSearchParams(params);
  };

  const updateModels = (productName) => {
    updateParams("model", productName);
  };

  const toggleBrand = (makers) => {

    const productName = brandModels[makers];

    const allSelected = productName.every((m) =>
      selectedModels.includes(m)
    );

    if (allSelected) {
      updateModels(selectedModels.filter((m) => !productName.includes(m)));
    } else {
      updateModels([...new Set([...selectedModels, ...productName])]);
    }
  };

  const toggleModel = (productName) => {

    let updated;

    if (selectedModels.includes(productName)) {
      updated = selectedModels.filter((m) => m !== productName);
    } else {
      updated = [...selectedModels, productName];
    }

    updateModels(updated);
  };

  const toggleBody = (body) => {

    let updated;

    if (selectedBody.includes(body)) {
      updated = selectedBody.filter((b) => b !== body);
    } else {
      updated = [...selectedBody, body];
    }

    updateParams("body", updated);
  };

  const toggleFuel = (fuel) => {

    let updated;

    if (selectedFuel.includes(fuel)) {
      updated = selectedFuel.filter((f) => f !== fuel);
    } else {
      updated = [...selectedFuel, fuel];
    }

    updateParams("fuel", updated);
  };

  const updateKms = (kms) => {
  const params = new URLSearchParams(searchParams);

  if (selectedKms == kms) {
    // agar same radio dubara click ho
    params.delete("kms"); // filter remove
  } else {
    params.set("kms", kms);
  }

  setSearchParams(params);
};

  return (
    <div className="filters">

      {/* BRAND + MODELS */}
      <h4 className="filter-title">Brand + Models</h4>

      <div className="accordion">

        {Object.keys(brandModels).map((brand) => {

          const models = brandModels[brand];

          const brandChecked = models.every((m) =>
            selectedModels.includes(m)
          );

          return (
            <div className="accordion-item" key={brand}>

              <h2 className="accordion-header">

                <label className="check">
                  <input
                    type="checkbox"
                    checked={brandChecked}
                    onChange={() => toggleBrand(brand)}
                  />
                </label>

                <button
                  className={`accordion-button p-0 ${openBrand === brand ? "" : "collapsed"}`}
                  onClick={() =>
                    setOpenBrand(openBrand === brand ? null : brand)
                  }
                >
                  <h6>{brand}</h6>
                </button>

              </h2>

              <div className={`accordion-collapse collapse ${openBrand === brand ? "show" : ""}`}>
                <div className="accordion-body">
                  <div className="d-grid gap-2">
                    {models.map((productName) => (
                      <label className="check" key={productName}>
                        <input
                          type="checkbox"
                          checked={selectedModels.includes(productName)}
                          onChange={() => toggleModel(productName)}
                        />
                        {productName}
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}

      </div>

      {/* BODY TYPE */}
      <h4 className="filter-title">Body Type</h4>
      <div className="accordion d-grid gap-2">
        {bodyTypes.map((body) => (
          <label className="check" key={body}>
            <input
              type="checkbox"
              checked={selectedBody.includes(body)}
              onChange={() => toggleBody(body)}
            />
            {body}
          </label>
        ))}
      </div>

      {/* FUEL TYPE */}
      <h4 className="filter-title">Fuel Type</h4>
      <div className="accordion d-grid gap-2">
        {fuelTypes.map((fuel) => (
          <label className="check" key={fuel}>
            <input
              type="checkbox"
              checked={selectedFuel.includes(fuel)}
              onChange={() => toggleFuel(fuel)}
            />
            {fuel}
          </label>
        ))}
      </div>

      {/* KMS DRIVEN */}
      <h4 className="filter-title">Kms Driven</h4>
      <div className="accordion d-grid gap-2">
        {kmsOptions.map((kms) => (
          <label className="check" key={kms}>
            <input
              type="radio"
              name="kms"
              checked={selectedKms == kms}
              onChange={() => updateKms(kms)}
            />
            {kms.toLocaleString()} kms or less
          </label>
        ))}
      </div>

      {/* PRICE FILTER */}
      <h4 className="filter-title">Price Range</h4>
      <div className="accordion d-grid gap-2">
        <div className="d-flex justify-content-between mb-2">
          <strong>$ {Number(minPrice).toLocaleString()}</strong>
          <strong>$ {Number(maxPrice).toLocaleString()}</strong>
        </div>

        <div className="range-slider">
          <input
            type="range"
            min={minLimit}
            max={maxLimit}
            value={minPrice}
            onChange={(e) => updatePrice(e.target.value, maxPrice)}
          />
          <input
            type="range"
            min={minLimit}
            max={maxLimit}
            value={maxPrice}
            onChange={(e) => updatePrice(minPrice, e.target.value)}
          />
        </div>
      </div>

    </div>
  );
}

export default ProductFilters;