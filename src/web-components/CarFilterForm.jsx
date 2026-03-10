import { IconSearch } from "@tabler/icons-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

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

        // MAKERS
        const uniqueMakers = [...new Set(data.map(car => car.makers))];
        setMakers(uniqueMakers);

        // FUELS
        const uniqueFuels = [...new Set(data.map(car => car.fuel))];
        console.log("uniqueFuels",uniqueFuels,data);
        
        setFuels(uniqueFuels);

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
    setModels(filteredModels);

  }, [filters.makers, cars]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value,
      ...(name === "maker" && { model: "" })
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
                  <select name="makers" className="form-control" value={filters.makers} onChange={handleChange}>
                    <option value="">Select Maker</option>
                    {makers.map((maker, i) => (
                      <option key={i} value={maker}>
                        {maker}
                      </option>
                    ))}
                  </select>
                </div>

                {/* MODEL */}
                <div className="col-md-3">
                  <select name="model" className="form-control" value={filters.model} onChange={handleChange}>
                    <option value="">Select Model</option>
                    {models.map((model, i) => (
                      <option key={i} value={model}>
                        {model}
                      </option>
                    ))}

                  </select>
                </div>

                {/* FUEL */}
                <div className="col-md-3">
                  <select name="fuel" className="form-control" value={filters.fuel} onChange={handleChange}>
                    <option value="">Select Fuel</option>
                    {fuels.map((fuel, i) => (
                      <option key={i} value={fuel}>
                        {fuel}
                      </option>
                    ))}
                  </select>
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