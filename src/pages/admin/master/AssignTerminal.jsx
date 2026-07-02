import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AssignTerminal() {

    const [region, setRegion] = useState([]);
    const [selectRegion, setSelectRegion] = useState(null);

    const [terminal, setTerminal] = useState([]);
    const [selectTerminal, setSelectTerminal] = useState(null);

    const [country, setCountry] = useState([]);
    const [selectCountry, setSelectCountry] = useState(null);

    const [errors, setErrors] = useState({});

    // fetch region data
    const fetchRegionData = async () => {
        try {
            const res = await axios.get('https://localhost:7244/api/master/view-regions?CID=1')

            const data = (res.data.data || []).map(item => ({
                value: item.sid,
                label: item.stateName
            }));

            setRegion(data);

        } catch (error) {
            console.error("error fetching data", error);
        }
    };

    // fetch terminal data
    const fetchJapanTerminalData = async () => {
        try {
            const res = await axios.get('https://localhost:7244/api/Port/GetJapanTerminal')

            const data = (res.data.data || []).map(item => ({
                value: item.id,
                label: item.name
            }));

            setTerminal(data);

        } catch (error) {
            console.error("error fetching data", error);
        }
    };

    // fetch country data
    const fetchCountryData = async () => {
        try {
            const res = await axios.get('https://localhost:7244/api/master/view-Countries')

            const data = (res.data.data || [])
                .map(item => ({
                    value: item.cid,
                    label: item.name
                }))
                .reverse();

            setCountry(data);

        } catch (error) {
            console.error("error fetching data", error);
        }
    };

    useEffect(() => {
        fetchRegionData();
        fetchJapanTerminalData();
        fetchCountryData();
    }, []);

    // validation
    const validateForm = () => {
        let newErrors = {};
        if (!selectRegion) {
            newErrors.region = "Please select region";
        }
        if (!selectTerminal) {
            newErrors.terminal = "Please select terminal";
        }
        if (!selectCountry) {
            newErrors.country = "Please select country";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // submit
    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        toast.success("Terminal Assigned Successfully");

        console.log({
            regionId: selectRegion.value,
            terminalId: selectTerminal.value,
            countryId: selectCountry.value
        });

        // reset form
        setSelectRegion(null);
        setSelectTerminal(null);
        setSelectCountry(null);
        setErrors({});
    };

    return (
        <>
            <ToastContainer />

            <div className="row">
                <div className="col-lg-12 col-12">
                    <div className="card">
                        <div className="card-header">
                            <h5 className="title">Assign Terminal</h5>
                        </div>

                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="row">

                                    {/* Region */}
                                    <div className="col-lg-3 col-md-12 col-12">
                                        <div className="form-group">
                                            <label className="form-label">
                                                Select Region
                                            </label>

                                            <Select
                                                options={region}
                                                value={selectRegion}
                                                onChange={(value) => {
                                                    setSelectRegion(value);
                                                    setErrors({
                                                        ...errors,
                                                        region: ""
                                                    });
                                                }}
                                                placeholder="Select Region"
                                            />

                                            {errors.region && (
                                                <small className="text-danger">
                                                    {errors.region}
                                                </small>
                                            )}
                                        </div>
                                    </div>

                                    {/* Terminal */}
                                    <div className="col-lg-3 col-md-12 col-12">
                                        <div className="form-group">
                                            <label className="form-label">
                                                Select Terminal
                                            </label>

                                            <Select
                                                options={terminal}
                                                value={selectTerminal}
                                                onChange={(value) => {
                                                    setSelectTerminal(value);
                                                    setErrors({
                                                        ...errors,
                                                        terminal: ""
                                                    });
                                                }}
                                                placeholder="Select Terminal"
                                            />

                                            {errors.terminal && (
                                                <small className="text-danger">
                                                    {errors.terminal}
                                                </small>
                                            )}
                                        </div>
                                    </div>

                                    {/* Country */}
                                    <div className="col-lg-3 col-md-12 col-12">
                                        <div className="form-group">
                                            <label className="form-label">
                                                Select Country
                                            </label>

                                            <Select
                                                options={country}
                                                value={selectCountry}
                                                onChange={(value) => {
                                                    setSelectCountry(value);
                                                    setErrors({
                                                        ...errors,
                                                        country: ""
                                                    });
                                                }}
                                                placeholder="Select Country"
                                            />

                                            {errors.country && (
                                                <small className="text-danger">
                                                    {errors.country}
                                                </small>
                                            )}
                                        </div>
                                    </div>

                                    {/* Submit */}
                                    <div className="col-lg-3 col-md-12 col-12">
                                        <button type="submit" className="btn btn-primary mt-25" >
                                            Submit
                                        </button>
                                    </div>

                                </div>
                            </form>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default AssignTerminal