import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import axios from "axios";
import { IconSearch } from "@tabler/icons-react";
import apiLayout from "../api/ApiLayout";
import { setFilterLoading, setFilterData, setFilterError } from "../redux/filterSlice";

function CarFilterForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { makers = [], model: allModels = [], fuelTypes = [], bodyTypes = [], loading } = useSelector(
    (state) => state.filters
  );
  const [form1 , setform1] = useState ({maker: true})
  const [form, setForm] = useState({ maker: null, model: null, fuel: null });

  // Fetch Master Data once if Redux is empty
  useEffect(() => {
    if (makers.length || allModels.length) return;

    dispatch(setFilterLoading(true));
    axios.get(apiLayout.CarData)
      .then((res) => dispatch(setFilterData(res.data?.data || {})))
      .catch((err) => dispatch(setFilterError(err.message || "Fetch failed")));
  }, [dispatch, makers.length, allModels.length]);

  // Dropdown options
  const makersOptions = useMemo(() =>
    makers.filter((m) => m.name?.trim()).map((m) => ({ value: m.name, label: m.name, id: m.id })),
    [makers]
  );

  const fuelsOptions = useMemo(() =>
    Array.from(new Set(fuelTypes.map((f) => f.name?.trim()).filter((n) => n && n !== "-")))
      .map((name) => ({ value: name, label: name })),
    [fuelTypes]
  );

  const modelsOptions = useMemo(() => {
    if (!form.maker) return [];
    const filtered = allModels.filter((m) => String(m.makerId) === String(form.maker.id) && m.name?.trim());
    return Array.from(new Set(filtered.map((m) => m.name))).map((name) => ({ value: name, label: name }));
  }, [form.maker, allModels]);

  // Handle Submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (form.maker?.value) params.append("makers", form.maker.value);
    if (form.model?.value) params.append("model", form.model.value);
    if (form.fuel?.value) params.append("fuel", form.fuel.value);

    navigate(`/product-list?${params.toString()}`);
  };

  return (
    <section className="search-form">
      <div className="container">
        <div className="form-block">
          <h1 className="form-title">Let's Find Your Perfect Car</h1>
          <form onSubmit={handleSubmit} className="row mt-4">
            <div className="col-md-3">
              <Select
                options={makersOptions}
                value={form.maker}
                placeholder="Select Maker"
                isLoading={loading}
                onChange={(opt) => setForm({ maker: opt, model: null, fuel: form.fuel })}
                isSearchable isClearable
              />
            </div>

            <div className="col-md-3">
              <Select
                options={modelsOptions}
                value={form.model}
                placeholder="Select Model"
                isDisabled={!form.maker}
                onChange={(opt) => setForm((prev) => ({ ...prev, model: opt }))}
                isSearchable isClearable
              />
            </div>

            <div className="col-md-3">
              <Select
                options={fuelsOptions}
                value={form.fuel}
                placeholder="Select Fuel"
                isLoading={loading}
                onChange={(opt) => setForm((prev) => ({ ...prev, fuel: opt }))}
                isSearchable isClearable
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
    </section>
  );
}

export default CarFilterForm;