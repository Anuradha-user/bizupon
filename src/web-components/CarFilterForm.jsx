import { IconSearch } from "@tabler/icons-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Select from "react-select";

function CarFilterForm() {
  const navigate = useNavigate();
  const { makers, model, fuelTypes, loading,bodyTypes } = useSelector(
    (state) => state.filters
  );
console.log("bodyTypes:", bodyTypes);
  const [selectedMaker, setSelectedMaker] = useState(null);
  const [selectedModel, setSelectedModel] = useState(null);
  const [selectedFuel, setSelectedFuel] = useState(null);

  const makersOptions = (makers || [])
    .filter((m) => m.name?.trim())
    .map((m) => ({
      value: m.id,
      label: m.name,
    }));

  const modelsOptions = selectedMaker
    ? (model || [])
        .filter(
          (m) =>
            String(m.makerId) === String(selectedMaker.value) && m.name?.trim()
        )
        .map((m) => ({
          value: m.id,
          label: m.name,
        }))
    : [];

  const uniqueFuelsMap = new Map();
  (fuelTypes || []).forEach((f) => {
    const name = f.name?.trim();
    if (name && name !== "-" && !uniqueFuelsMap.has(name)) {
      uniqueFuelsMap.set(name, { value: name, label: name });
    }
  });
  const fuelsOptions = Array.from(uniqueFuelsMap.values());

  const handleSubmit = (e) => {
    e.preventDefault();

    const queryParams = new URLSearchParams();
    if (selectedModel?.value) {
      queryParams.append("model", selectedModel.value);
    } else if (selectedMaker?.value) {
      queryParams.append("makers", selectedMaker.value);
    }
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
                    placeholder={loading ? "Loading makers..." : "Select Maker"}
                    onChange={(option) => {
                      setSelectedMaker(option);
                      setSelectedModel(null);
                    }}
                    isSearchable
                    isClearable
                    isDisabled={loading}
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
                    isDisabled={!selectedMaker}
                  />
                </div>

                <div className="col-md-3">
                  <Select
                    options={fuelsOptions}
                    value={selectedFuel}
                    placeholder={loading ? "Loading fuel..." : "Select Fuel"}
                    onChange={(option) => setSelectedFuel(option)}
                    isSearchable
                    isClearable
                    isDisabled={loading}
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
