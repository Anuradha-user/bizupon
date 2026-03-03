import { IconSearch } from "@tabler/icons-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CarFilterForm() {
  const navigate = useNavigate();

  const [filters, setFilters] = useState({
    maker: "",
    model: "",
    fuel: "",
    body: "",
    minPrice: "",
    maxPrice: ""
  });

  const modelsByMaker = {
    Toyota: ["Corolla", "Fortuner"],
    Honda: ["City"],
    BMW: ["X5"]
  };

  const availableModels = modelsByMaker[filters.maker] || [];

  const priceRanges = [
    { label: "5 - 10 Lakh", min: 500000, max: 1000000 },
    { label: "10 - 15 Lakh", min: 1000000, max: 1500000 },
    { label: "15 - 20 Lakh", min: 1500000, max: 2000000 },
    { label: "20 - 25 Lakh", min: 2000000, max: 2500000 },
    { label: "25 - 30 Lakh", min: 2500000, max: 3000000 },
    { label: "30 - 35 Lakh", min: 3000000, max: 3500000 },
    { label: "35 - 40 Lakh", min: 3500000, max: 4000000 },
    { label: "40 - 45 Lakh", min: 4000000, max: 4500000 },
    { label: "45 - 50 Lakh", min: 4500000, max: 5000000 }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFilters(prev => ({
      ...prev,
      [name]: value,
      ...(name === "maker" && { model: "" })
    }));
  };

  const handleBudgetChange = (e) => {
    const selected = priceRanges.find(r => r.label === e.target.value);

    setFilters(prev => ({
      ...prev,
      minPrice: selected?.min || "",
      maxPrice: selected?.max || ""
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const cleanFilters = Object.fromEntries(
      Object.entries(filters).filter(([_, v]) => v)
    );

    // ❌ agar koi filter select nahi
    if (Object.keys(cleanFilters).length === 0) {
      alert("Please select at least one filter");
      return;
    }

    const query = new URLSearchParams(cleanFilters).toString();
    navigate(`/ProductList?${query}`);
  };

  return (
    <section className="search-form">
      <div className="container">
        <div className="form-block">
          <div className="row">
            <div className="col-lg-12">
              <h1 className="form-title">Let's Find Your Perfect Car</h1>
              <form onSubmit={handleSubmit} className="row mt-4">

                <div className="col-md-3">
                  <select name="maker" className="form-control" onChange={handleChange}>
                    <option value="">Select Maker</option>
                    <option value="Toyota">Toyota</option>
                    <option value="Honda">Honda</option>
                    <option value="BMW">BMW</option>
                  </select>
                </div>

                <div className="col-md-3">
                  <select name="model" className="form-control" onChange={handleChange}>
                    <option value="">Select Model</option>
                    {availableModels.map((model, i) => (
                      <option key={i} value={model}>{model}</option>
                    ))}
                  </select>
                </div>

                <div className="col-md-3">
                  <select name="body" className="form-control" onChange={handleChange}>
                    <option value="">Select Body</option>
                    <option value="sedan">Sedan</option>
                    <option value="SUV">SUV</option>
                    <option value="coupe">Coupe</option>
                  </select>
                </div>

                <div className="col-md-3">
                  <select name="fuel" className="form-control" onChange={handleChange}>
                    <option value="">Select Fuel</option>
                    <option value="Petrol">Petrol</option>
                    <option value="Diesel">Diesel</option>
                    <option value="Hybrid">Hybrid</option>
                    <option value="Electric">Electric</option>
                  </select>
                </div>

                {/* ✅ Budget Dropdown */}
                <div className="col-md-3 mt-4">
                  <select className="form-control" onChange={handleBudgetChange}>
                    <option value="">Select Price</option>
                    {priceRanges.map((range, index) => (
                      <option key={index} value={range.label}>
                        {range.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-md-3 mt-4">
                  <button className="btn theme-btn w-100">
                    <IconSearch width={16} strokeWidth="3" />Apply Filter
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CarFilterForm;