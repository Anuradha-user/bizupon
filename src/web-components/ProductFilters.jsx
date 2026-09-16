import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";

const kmsOptions = [
  { minKmsOption: 1, maxKmsOption: 10000 },
  { minKmsOption: 1, maxKmsOption: 30000 },
  { minKmsOption: 1, maxKmsOption: 50000 },
  { minKmsOption: 1, maxKmsOption: 75000 },
  { minKmsOption: 1, maxKmsOption: 100000 },
  { minKmsOption: 1, maxKmsOption: 125000 },
];

const ccOptions = [800, 1000, 1200, 1500, 1800, 2000, 3000, 4000, 5000];

const priceRanges = [
  { label: "Under $50 K", min: 1, max: 50000 },
  { label: "$50k – $1 Lakh", min: 50000, max: 100000 },
  { label: "$1 – $2 Lakh", min: 100000, max: 200000 },
  { label: "$2 – $3 Lakh", min: 200000, max: 300000 },
  { label: "$3 – $4 Lakh", min: 300000, max: 400000 },
  { label: "Above 4 Lakh", min: 400000, max: 9999999999999 },
];

function ProductFilters() {
  const { makers, model, fuelTypes } = useSelector((state) => state.filters);

  const [searchParams, setSearchParams] = useSearchParams();
  const [openBrand, setOpenBrand] = useState(null);

  const selectedBrands = searchParams.getAll("makers");
  const selectedModels = searchParams.getAll("model");
  const selectedFuel = searchParams.getAll("fuel");
  const selectedCC = searchParams.get("cc");

  const minKms = Number(searchParams.get("minKms")) || 0;
  const maxKms = Number(searchParams.get("maxKms")) || Infinity;
  const minPrice = Number(searchParams.get("minPrice")) || 0;
  const maxPrice = Number(searchParams.get("maxPrice")) || Infinity;

  const updateParams = (key, values) => {
    const params = new URLSearchParams(searchParams);
    params.delete(key);
    values.forEach((v) => params.append(key, v));
    setSearchParams(params);
  };

  const updateMultipleParams = (changes) => {
    const params = new URLSearchParams(searchParams);
    Object.entries(changes).forEach(([key, values]) => {
      params.delete(key);
      values.forEach((v) => params.append(key, v));
    });
    setSearchParams(params);
  };

  const getBrandModelIds = (makerId) =>
    (model || [])
      .filter(
        (item) =>
          String(item.makerId) === String(makerId) && item.name?.trim()
      )
      .map((item) => String(item.id));

  const isModelChecked = (modelItem) =>
    selectedBrands.includes(String(modelItem.makerId)) ||
    selectedModels.includes(String(modelItem.id));

  const updatePriceRange = (min, max) => {
    const params = new URLSearchParams(searchParams);
    const isSelected = Number(minPrice) === min && Number(maxPrice) === max;
    if (isSelected) {
      params.delete("minPrice");
      params.delete("maxPrice");
    } else {
      params.set("minPrice", min);
      params.set("maxPrice", max);
    }
    setSearchParams(params);
  };

  const updateKmsRange = (min, max) => {
    const params = new URLSearchParams(searchParams);
    params.set("minKms", min);
    params.set("maxKms", max);
    setSearchParams(params);
  };

  const toggleBrand = (makerId) => {
    const id = String(makerId);
    const brandModelIds = getBrandModelIds(makerId);
    const isSelected = selectedBrands.includes(id);

    if (isSelected) {
      updateParams("makers", selectedBrands.filter((b) => b !== id));
      return;
    }

    updateMultipleParams({
      makers: [...selectedBrands, id],
      model: selectedModels.filter((m) => !brandModelIds.includes(String(m))),
    });
  };

  const toggleModel = (modelItem) => {
    const modelId = String(modelItem.id);
    const makerId = String(modelItem.makerId);
    const brandModelIds = getBrandModelIds(modelItem.makerId);
    const brandSelected = selectedBrands.includes(makerId);

    if (brandSelected) {
      const remainingModels = brandModelIds.filter((id) => id !== modelId);
      updateMultipleParams({
        makers: selectedBrands.filter((b) => b !== makerId),
        model: [
          ...selectedModels.filter((m) => !brandModelIds.includes(String(m))),
          ...remainingModels,
        ],
      });
      return;
    }

    const updatedModels = selectedModels.includes(modelId)
      ? selectedModels.filter((m) => m !== modelId)
      : [...selectedModels, modelId];

    const allBrandModelsSelected = brandModelIds.every((id) =>
      updatedModels.includes(id)
    );

    if (allBrandModelsSelected && brandModelIds.length > 0) {
      updateMultipleParams({
        makers: [...selectedBrands, makerId],
        model: updatedModels.filter((m) => !brandModelIds.includes(String(m))),
      });
      return;
    }

    updateParams("model", updatedModels);
  };

  const toggleFuel = (fuelName) => {
    const updated = selectedFuel.includes(fuelName)
      ? selectedFuel.filter((f) => f !== fuelName)
      : [...selectedFuel, fuelName];
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

  const hasFilters =
    selectedBrands.length > 0 ||
    selectedModels.length > 0 ||
    selectedFuel.length > 0 ||
    selectedCC ||
    searchParams.has("minKms") ||
    searchParams.has("maxKms") ||
    searchParams.has("minPrice") ||
    searchParams.has("maxPrice");

  const clearFilters = () => {
    setSearchParams({});
    setOpenBrand(null);
  };

  return (
    <div className="filters">

      {/* BRAND + MODELS */}
      <div className="filter-title d-flex align-items-center">
        <h4>Brand + Models</h4>
        {hasFilters && (
          <button
            type="button"
            className="clear-all-filters"
            onClick={clearFilters}
          >
            Clear All
          </button>
        )}
      </div>
      <div className="accordion">
        {(makers || []).map((brand) => {
          const models = (model || []).filter(
            (item) =>
              String(item.makerId) === String(brand.id) && item.name?.trim()
          );
          const brandChecked = selectedBrands.includes(String(brand.id));

          return (
            <div className="accordion-item" key={brand.id}>
              <h2 className="accordion-header">
                <label className="check">
                  <input
                    type="checkbox"
                    checked={brandChecked}
                    onChange={() => toggleBrand(brand.id)}
                  />
                </label>
                <button
                  type="button"
                  className={`accordion-button p-0 ${openBrand === brand.id ? "" : "collapsed"}`}
                  onClick={() =>
                    setOpenBrand(openBrand === brand.id ? null : brand.id)
                  }
                >
                  <h6>{brand.name}</h6>
                </button>
              </h2>

              <div className={`accordion-collapse collapse ${openBrand === brand.id ? "show" : ""}`}>
                <div className="accordion-body">
                  <div className="d-grid gap-2">
                    {models.map((modelItem) => (
                      <label className="check" key={modelItem.id}>
                        <input
                          type="checkbox"
                          checked={isModelChecked(modelItem)}
                          onChange={() => toggleModel(modelItem)}
                        />
                        {modelItem.name}
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
        {(fuelTypes || [])
          .filter((fuel) => fuel.name?.trim())
          .map((fuel) => (
            <label className="check" key={fuel.id}>
              <input
                type="checkbox"
                checked={selectedFuel.includes(fuel.name)}
                onChange={() => toggleFuel(fuel.name)}
              />
              {fuel.name}
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
              onClick={() => {
                if (selectedCC == cc) {
                  updateEngine(cc);
                }
              }}
            />
            {cc} cc or less
          </label>
        ))}
      </div>

      {/* KMS DRIVEN */}
      <h4 className="filter-title">Kms Driven</h4>
      <div className="accordion d-grid gap-2">
        {kmsOptions.map((option) => {
          const checked =
            Number(minKms) === option.minKmsOption &&
            Number(maxKms) === option.maxKmsOption;

          return (
            <label className="check" key={option.maxKmsOption}>
              <input
                type="radio"
                name="kms"
                checked={checked}
                onChange={() =>
                  updateKmsRange(option.minKmsOption, option.maxKmsOption)
                }
              />
              {option.maxKmsOption.toLocaleString()} kms or less
            </label>
          );
        })}
      </div>

      {/* PRICE RANGE */}
      <h4 className="filter-title">Price Range</h4>
      <div className="accordion d-grid gap-2">
        {priceRanges.map((range) => {
          const checked =
            Number(minPrice) === range.min &&
            Number(maxPrice) === range.max;

          return (
            <label className="check" key={range.label}>
              <input
                type="radio"
                name="price"
                checked={checked}
                onChange={() => updatePriceRange(range.min, range.max)}
                onClick={() => {
                  if (checked) {
                    updatePriceRange(range.min, range.max);
                  }
                }}
              />
              {range.label}
            </label>
          );
        })}
      </div>

    </div>
  );
}

export default ProductFilters;
