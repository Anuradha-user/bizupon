import { IconCirclePlusFilled, IconPencil, IconTrash } from '@tabler/icons-react'
import React, { useEffect, useState } from "react";
import Select from "react-select";
import { Link } from 'react-router-dom';

function AssignCity() {

    const [countries, setCountries] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [searchName, setSearchName] = useState("");
    const [regions, setRegions] = useState([]);
    const [selectedRegion, setSelectedRegion] = useState(null);
    const [auctions, setAuctions] = useState([]);
    const [selectedIds, setSelectedIds] = useState([]);

    // Initial Load
    useEffect(() => {
        fetchCountries();
    }, []);

    // Countries
    const fetchCountries = async () => {
        try {
            const res = await fetch("https://jaishriganesha.com/bizupon-master/api/master/view-Countries");
            const result = await res.json();

            const formatted = result?.data?.map(item => ({
                value: item.cid,
                label: item.name
            })).reverse();

            setCountries(formatted);

            // ✅ auto select first country
            if (formatted.length > 0) {
                const firstCountry = formatted[0];
                setSelectedCountry(firstCountry);

                fetchRegions(firstCountry.value);
                fetchAuctions(firstCountry.value); // default table data
            }

        } catch (error) {
            console.error(error);
        }
    };

    // Regions
    const fetchRegions = async (countryId = 0) => {
        try {
            const res = await fetch(
                `https://jaishriganesha.com/bizupon-master/api/master/view-regions?CID=${countryId}`
            );
            const result = await res.json();

            const formatted = result?.data?.map(item => ({
                value: item.sid,
                label: item.stateName
            })) || [];

            setRegions(formatted);
        } catch (error) {
            console.error(error);
        }
    };

    // Auctions
    const fetchAuctions = async (cid, name = "") => {
        try {
            let url = `https://localhost:7244/api/Port/view-auction?CID=0&AcutionName=0`;

            // ✅ only when real value
            if (name && name.trim() !== "") {
                url += `&AcutionName=${name}`;
            }

            const res = await fetch(url);
            const result = await res.json();

            console.log("Final URL:", url);
            console.log("Auction API:", result);

            setAuctions(result?.data || []);
        } catch (error) {
            console.error("Error fetching auctions:", error);
            setAuctions([]);
        }
    };

    // 🔥 Country Change
    const handleCountryChange = (selected) => {
        setSelectedCountry(selected);
        setSelectedRegion(null);

        // ✅ reset old data
        setAuctions([]);
        setSelectedIds([]);

        if (selected) {
            fetchRegions(selected.value);
        }
    };

    // Single checkbox
    const handleCheckboxChange = (id) => {
        setSelectedIds(prev =>
            prev.includes(id)
                ? prev.filter(item => item !== id)
                : [...prev, id]
        );
    };

    // Select All
    const handleSelectAll = (e) => {
        if (e.target.checked) {
            setSelectedIds(auctions.map(item => item.id));
        } else {
            setSelectedIds([]);
        }
    };


    return (
        <div className="row">
            <div className="col-lg-12 col-12">
                <div className="card">
                    <div className="card-header">
                        <h5 className="title">Assign City</h5>
                    </div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-lg-3 col-md-6 col-12">
                                <div className="form-group">
                                    <label className="form-label">Country Name</label>
                                    <Select options={countries}
                                        value={selectedCountry}
                                        onChange={handleCountryChange}
                                        placeholder="Select Country"
                                        isSearchable
                                    />
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6 col-12">
                                <div className="form-group">
                                    <label className="form-label">City Name</label>
                                    <Select options={regions}
                                        value={selectedRegion}
                                        onChange={setSelectedRegion}
                                        placeholder="Select City Name"
                                        isSearchable
                                        isDisabled={!selectedCountry}
                                    />
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6 col-12">
                                <div className="form-group">
                                    <button className="btn btn-md btn-primary mt-25"
                                        onClick={() => {
                                            if (!selectedCountry) {
                                                alert("Please select country");
                                                return;
                                            }

                                            fetchAuctions(selectedCountry.value, searchName);
                                        }}>Filter
                                    </button>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            {/* 🔹 Table */}
            <div className="col-lg-12 col-12">
                <div className="card table-card overflow-hidden">
                    <div className="card-header justify-content-end">
                        <button className="btn btn-sm btn-primary">Assign Auction</button>
                    </div>
                    <div className="card-body">
                        <div className="table-responsive">
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th>
                                            <input type="checkbox" className="form-check-input"
                                                onChange={handleSelectAll}
                                                checked={
                                                    auctions.length > 0 &&
                                                    selectedIds.length === auctions.length
                                                }
                                            />
                                        </th>
                                        <th>Auction Name</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {auctions.length > 0 ? (
                                        auctions.map((item) => (
                                            <tr key={item.id}>
                                                <td>
                                                    <input type="checkbox" className="form-check-input"
                                                        checked={selectedIds.includes(item.id)}
                                                        onChange={() => handleCheckboxChange(item.id)}
                                                    />
                                                </td>
                                                <td>{item.name}</td>
                                                <td>
                                                    <div className="text-end">
                                                        <Link to="#" className="avtar edit" data-bs-toggle="tooltip" data-bs-placement="top" title="Edit"><IconPencil /></Link>
                                                        <Link to="#" className="avtar delete" data-bs-toggle="tooltip" data-bs-placement="top" title="Delete"><IconTrash /></Link>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="3" className="text-center">
                                                No Data Found
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AssignCity;