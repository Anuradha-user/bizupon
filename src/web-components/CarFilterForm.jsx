import { IconSearch } from "@tabler/icons-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";

function CarFilterForm() {

  const navigate = useNavigate();

  const [cars, setCars] = useState([]);

  const [makers, setMakers] = useState([]);
  const [models, setModels] = useState([]);
  const [fuels, setFuels] = useState([]);

  const [filters, setFilters] = useState({
    makers: "",
    model: "",
    fuel: ""
  });

  // API CALL
  useEffect(() => {

  fetch("https://jaishriganesha.com/BizuponInterview/api/Home/GetProductData")
    .then(res => res.json())
    .then(data => {

      setCars(data);

      const uniqueMakers = [...new Set(data.map(car => car.makers))];
      setMakers(uniqueMakers.map(m => ({ value: m, label: m })));

      const uniqueFuels = [...new Set(data.map(car => car.fuel))];
      setFuels(uniqueFuels.map(f => ({ value: f, label: f })));

    });

  }, []);

  // MODELS BASED ON MAKER
  useEffect(() => {

  if (!filters.makers) {
    setModels([]);
    return;
  }

  const filteredModels = [
    ...new Set(
      cars
        .filter(car => car.makers === filters.makers)
        .map(car => car.productName)
    )
  ];

  setModels(filteredModels.map(m => ({ value: m, label: m })));

  }, [filters.makers, cars]);

  const handleSelectChange = (selected, name) => {
    setFilters(prev => ({
      ...prev,
      [name]: selected ? selected.value : ""
    }));

  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const cleanFilters = Object.fromEntries(
      Object.entries(filters).filter(([_, v]) => v)
    );
    const query = new URLSearchParams(cleanFilters).toString();
    navigate(`/product-list?${query}`);
  };

  return (

    <section className="search-form">
      <div className="container">
        <div className="form-block">
          <div className="row">
            <div className="col-lg-12">

              <h1 className="form-title">Let's Find Your Perfect Car</h1>

              <form onSubmit={handleSubmit} className="row mt-4">

                {/* MAKER */}
                <div className="col-md-3">
                  <Select options={makers}
                    placeholder="Select Maker"
                    onChange={(selected) => handleSelectChange(selected,"makers")}
                    isSearchable />
                </div>

                {/* MODEL */}
                <div className="col-md-3">
                  <Select options={models}
                    placeholder="Select Model"
                    onChange={(selected) => handleSelectChange(selected,"model")}
                    isSearchable />
                </div>

                {/* FUEL */}
                <div className="col-md-3">
                  <Select options={fuels}
                    placeholder="Select Fuel"
                    onChange={(selected) => handleSelectChange(selected,"fuel")}
                    isSearchable />
                </div>

                {/* BUTTON */}
                <div className="col-md-3">
                  <button className="btn theme-btn w-100">
                    <IconSearch width={18} strokeWidth="3" className="me-1" />
                    Apply Filter
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