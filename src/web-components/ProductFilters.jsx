import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

function ProductFilters() {

  const [products, setProducts] = useState([]);
  const [brandModels, setBrandModels] = useState({});
  const [fuelTypes, setFuelTypes] = useState([]);
  const [ccOptions, setCcOptions] = useState([]);

  const kmsOptions = [
    10000,
    30000,
    50000,
    75000,
    100000,
    125000
  ];

  const priceRanges = [
    { label: "Under $50 K", min: 0, max: 50000 },
    { label: "$50k – $1 Lakh", min: 50000, max: 100000 },
    { label: "$1 – $2 Lakh", min: 100000, max: 200000 },
    { label: "$2 – $3 Lakh", min: 200000, max: 300000 },
    { label: "$3 – $4 Lakh", min: 300000, max: 400000 },
    { label: "Above 4 Lakh", min: 400000, max: 2000000 }
  ];

  const [searchParams, setSearchParams] = useSearchParams();

  const selectedModels = searchParams.getAll("model");
  const selectedFuel = searchParams.getAll("fuel");
  const selectedKms = searchParams.get("kms");
  const selectedCC = searchParams.get("cc");

  const minPrice = Number(searchParams.get("minPrice")) || 0;
  const maxPrice = Number(searchParams.get("maxPrice")) || Infinity;

  const [openBrand, setOpenBrand] = useState(null);

  // FETCH PRODUCTS
  useEffect(() => {

    fetch("https://jaishriganesha.com/BizuponInterview/api/Home/GetProductData")
      .then((res) => res.json())
      .then((data) => {

        setProducts(data);

        // BRAND -> MODELS
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

        // FUEL TYPES FROM API
        const uniqueFuels = [...new Set(data.map(car => car.fuel))];
        setFuelTypes(uniqueFuels);

        // ENGINE CAPACITY FROM API
        const engineRanges = [800, 1000, 1200, 1500, 1800, 2000, 3000, 4000, 5000];
        setCcOptions(engineRanges);

      });
  }, []);

  const updatePriceRange = (min, max) => {
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

  const toggleFuel = (fuel) => {
    let updated;
    if (selectedFuel.includes(fuel)) {
      updated = selectedFuel.filter((f) => f !== fuel);
    } else {
      updated = [...selectedFuel, fuel];
    }
    updateParams("fuel", updated);
  };

  const updateEngine = (cc) => {
  const params = new URLSearchParams(searchParams);
  if (selectedCC == cc) {
    params.delete("cc");
  } else {
    params.set("cc", cc);
  }
  setSearchParams(params);
};

  const updateKms = (kms) => {
    const params = new URLSearchParams(searchParams);
    if (selectedKms == kms) {
      params.delete("kms");
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
                  <input type="checkbox"
                    checked={brandChecked}
                    onChange={() => toggleBrand(brand)} />
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
                        <input type="checkbox"
                          checked={selectedModels.includes(productName)}
                          onChange={() => toggleModel(productName)} />
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

      {/* FUEL TYPE */}
      <h4 className="filter-title">Fuel Type</h4>
      <div className="accordion d-grid gap-2">
        {fuelTypes.map((fuel) => (
          <label className="check" key={fuel}>
            <input type="checkbox"
              checked={selectedFuel.includes(fuel)}
              onChange={() => toggleFuel(fuel)} />
            {fuel}
          </label>
        ))}
      </div>

      {/* ENGINE CAPACITY */}
      <h4 className="filter-title">Engine Capacity</h4>
      <div className="accordion d-grid gap-2">
        {ccOptions.map((cc) => (
          <label className="check" key={cc}>
            <input
              type="radio"
              name="cc"
              checked={selectedCC == cc}
              onChange={() => updateEngine(cc)}
            />
            {cc} cc or less
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
        {priceRanges.map((range, index) => {
          const checked =
            Number(minPrice) === range.min &&
            Number(maxPrice) === range.max;

          return (
            <label className="check" key={index}>
              <input type="checkbox"
                checked={checked}
                onChange={() => updatePriceRange(range.min, range.max)} />
              {range.label}
            </label>
          );
        })}
      </div>

    </div>
  );
}

export default ProductFilters;