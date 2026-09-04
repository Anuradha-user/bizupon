import { IconSearch } from "@tabler/icons-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import axios from "axios";
import ApiLayout from "../api/apiLayout";

function CarFilterForm() {
  const navigate = useNavigate();

  const [allModels, setAllModels] = useState([]);
  const [makersOptions, setMakersOptions] = useState([]);
  const [fuelsOptions, setFuelsOptions] = useState([]);

  const [selectedMaker, setSelectedMaker] = useState(null);
  const [selectedModel, setSelectedModel] = useState(null);
  const [selectedFuel, setSelectedFuel] = useState(null);

   const fetchMasterData = async () => {
      try {
        const response = await axios.get(ApiLayout.CarData);
        const data = response.data?.data || {};

        const formattedMakers = (data.lstmaker || [])
          .filter((m) => m.name?.trim())
          .map((m) => ({
            value: m.name,
            label: m.name,
            id: m.id,
          }));
        setMakersOptions(formattedMakers);

        setAllModels(data.lstmodel || []);

        const uniqueFuelsMap = new Map();
        (data.lstfuletype || []).forEach((f) => {
          const name = f.name?.trim();
          if (name && name !== "-" && !uniqueFuelsMap.has(name)) {
            uniqueFuelsMap.set(name, { value: name, label: name });
          }
        });
        setFuelsOptions(Array.from(uniqueFuelsMap.values()));

      } catch (err) {
        console.error("Error fetching Car Master Data:", err);
      }
    };

  useEffect(() => {
   
    fetchMasterData();
  }, []);

  const modelsOptions = selectedMaker
    ? Array.from(
        new Map(
          allModels
            .filter(
              (m) =>
                String(m.makerId) === String(selectedMaker.id) &&
                m.name?.trim()
            )
            .map((m) => [m.name, { value: m.name, label: m.name }])
        ).values()
      )
    : [];

  const handleSubmit = (e) => {
    e.preventDefault();

    const queryParams = new URLSearchParams();
    if (selectedMaker?.value) queryParams.append("makers", selectedMaker.value);
    if (selectedModel?.value) queryParams.append("model", selectedModel.value);
    if (selectedFuel?.value) queryParams.append("fuel", selectedFuel.value);

    navigate(`/product-list?${queryParams.toString()}`);
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
                  <Select
                    options={makersOptions}
                    value={selectedMaker}
                    placeholder="Select Maker"
                    onChange={(option) => {
                      setSelectedMaker(option);
                      setSelectedModel(null); 
                    }}
                    isSearchable
                    isClearable
                  />
                </div>

                <div className="col-md-3">
                  <Select
                    options={modelsOptions}
                    value={selectedModel}
                    placeholder="Select Model"
                    onChange={(option) => setSelectedModel(option)}
                    isSearchable
                    isClearable
                  />
                </div>

                <div className="col-md-3">
                  <Select
                    options={fuelsOptions}
                    value={selectedFuel}
                    placeholder="Select Fuel"
                    onChange={(option) => setSelectedFuel(option)}
                    isSearchable
                    isClearable
                  />
                </div>

                <div className="col-md-3">
                  <button type="submit" className="btn theme-btn w-100">
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