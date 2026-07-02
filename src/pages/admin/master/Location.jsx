import React, { useEffect, useState } from 'react';
import axios from "axios";
import { IconCirclePlusFilled, IconTrash, IconPencil, IconChevronLeft, IconChevronRight, IconArrowLeft, IconChecks, IconX } from '@tabler/icons-react'
import { Link } from 'react-router-dom'
import Select from 'react-select';

function Location() {

    const [showModal, setShowModal] = useState(false);
    
    const [selectedIds, setSelectedIds] = useState([]);
    const [locations, setLocations] = useState([]);
    const [categories, setCategories] = useState([]);
    const [country, setCountry] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [allLocations, setAllLocations] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const totalItems = locations.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentData = locations.slice(startIndex, startIndex + itemsPerPage);

    const fetchLocations = async () => {
        try {

            const res = await axios.get(
                "https://localhost:7244/api/master/view-locations?CID=1"
            );

            setLocations(res.data.data);

        } catch (error) {
            console.error(error);
        }
    };

    // fetch country 
    const fetchCountries = async () => {
        try {
            const res = await axios.get("https://localhost:7244/api/master/AllCountries");
            const data = (res.data.data || []).map(item => ({
                value: item.cid,
                label: item.name
            }))
            .reverse();
            setCountry(data);

        } catch (error) {
            console.error(error);
        }
    };

    // fetch api
    useEffect(() => {
        fetchLocations();
        fetchCountries();
    }, []);

    // filter
    const handleFilter = async () => {

        if (!selectedCountry) {
            fetchLocations();
            return;
        }

        try {
            const res = await axios.get(`https://localhost:7244/api/master/view-locations?CID=${selectedCountry.value}`);
            setLocations(res.data.data || []);
            setCurrentPage(1);
            setSelectedIds([]);

        } catch (error) {

            if (error.response?.status === 404) {

                setLocations([]);
                setCurrentPage(1);

                console.log(
                    "No locations found for country:",
                    selectedCountry.label
                );

            } else {
                console.log(error);
            }
        }
    };

    // selct all checkboxes
    const handleSelectAll = (e) => {
        if (e.target.checked) {
            const allIds = locations.map((item) => item.sid);
            setSelectedIds(allIds);
        } else {
            setSelectedIds([]);
        }
    };

    // selct single checkbox
    const handleCheckboxChange = (id) => {
        if (selectedIds.includes(id)) {
            setSelectedIds(selectedIds.filter((item) => item !== id));
        } else {
            setSelectedIds([...selectedIds, id]);
        }
    };

  return (
    <>
        <div className="row">
            <div className="col-lg-12 col-md-12 col-12">
                <div className="card">
                    <div className="card-header">
                        <h5>Location</h5>
                    </div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-lg-3 col-12">
                                <Select
                                    options={country}
                                    value={selectedCountry}
                                    onChange={setSelectedCountry}
                                    placeholder="Select Country Name"
                                />
                            </div>
                            <div className="col-lg-3 col-12">
                                <button type="button" className="btn btn-md btn-primary" onClick={handleFilter}>Filter</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card table-card overflow-hidden">
                    <div className="card-header justify-content-end">
                        <button type="submit" className="btn btn-sm btn-primary" onClick={() => setShowModal(true)}><IconCirclePlusFilled /> Add Location</button>
                    </div>
                    <div className="card-body">
                        <div className="table-responsive">
                            <table className="table table-hover" id="pc-dt-simple">
                                <thead>
                                    <tr>
                                        <th>
                                            <input type="checkbox" className="form-check-input" 
                                                onChange={handleSelectAll}
                                                checked={currentData.length > 0 &&
                                                currentData.every((item) => selectedIds.includes(item.sid))}
                                            />
                                        </th>
                                        <th>Location Name</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentData.length > 0 ? (
                                        currentData.map((item) => (
                                        <tr key={item.sid}>
                                            <td>
                                                <input
                                                    type="checkbox"
                                                    className="form-check-input"
                                                    checked={selectedIds.includes(item.sid)}
                                                    onChange={() => handleCheckboxChange(item.sid)}
                                                />
                                            </td>
                                            <td>{item.locationName.trim()}</td>
                                            <td>
                                            <span
                                                className={`badge ${
                                                item.lStatus?.trim().toLowerCase() === "active"
                                                    ? "bg-success"
                                                    : "bg-danger"
                                                }`}
                                            >
                                                {item.lStatus}
                                            </span>
                                            </td>

                                            <td>
                                                <div className="text-end">
                                                    <Link to="#" className="avtar edit">
                                                        <IconPencil />
                                                    </Link>
                                                    <Link to="#" className="avtar delete">
                                                        <IconTrash />
                                                    </Link>
                                                </div>
                                            </td>
                                        </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="4" className="text-center">
                                                No Data Found
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                            <div className={`actionModal ${selectedIds.length > 0 ? "" : "d-none"}`}>
                                <div className="selectedItem">
                                    {selectedIds.length} Selected from {locations.length}
                                </div>
                                <div className="actionButtonArea">
                                    <button className="btn btn-xs btn-primary"><IconChecks /> Active</button>
                                    <button className="btn btn-xs btn-warning"><IconX /> De-Active</button>
                                    <button className="btn btn-xs btn-danger"><IconTrash /> Delete</button>
                                    <button className="btn btn-xs btn-light" onClick={() => setSelectedIds([])}><IconArrowLeft /> Cancel</button>
                                </div>
                            </div>
                            <div className="paginationBlock d-flex justify-content-between align-items-center p-3">
                                {/* Left Side Info */}
                                <div>
                                    {totalItems > 0
                                        ? `${startIndex + 1} - ${Math.min(
                                            startIndex + itemsPerPage,
                                            totalItems
                                        )} of ${totalItems} entries`
                                        : "0 entries"}
                                </div>

                                {/* Right Side Pagination */}
                                <ul className="pagination mb-0">

                                    {/* Prev */}
                                    <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                                        <button className="page-link" 
                                            onClick={() =>
                                            currentPage > 1 &&
                                            setCurrentPage(currentPage - 1)
                                        }>
                                            <IconChevronLeft />
                                        </button>
                                    </li>

                                    {/* Page Numbers */}
                                    {[...Array(totalPages)].map((_, i) => (
                                        <li key={i} className={`page-item ${currentPage === i + 1 ? "active" : ""}`}>
                                            <button className="page-link" onClick={() => setCurrentPage(i + 1)}>
                                            {i + 1}
                                            </button>
                                        </li>
                                    ))}

                                    {/* Next */}
                                    <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                                        <button className="page-link" 
                                            onClick={() =>
                                            currentPage < totalPages &&
                                            setCurrentPage(currentPage + 1)
                                        }>
                                            <IconChevronRight />
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {/* Right Slide Drawer */}
        <div className={`custom-drawer ${showModal ? "open" : ""}`}>
            <div className="drawer-header">
                <h5>Add Location</h5>
                <button className="btn-close" onClick={() => setShowModal(false)}></button>
            </div>

            <div className="drawer-body">
            <form>
                <div className="form-group">
                    <label className="form-label">Select Country Name</label>
                    <input type="text" className="form-control" />
                </div>
                <div className="form-group">
                    <label className="form-label">Enter Location Name</label>
                    <input type="text" className="form-control" />
                </div>
                <div className="form-group">
                    <label className="form-label">Status</label>
                    <select className="form-control">
                        <option>Active</option>
                        <option>De-Active</option>
                    </select>
                </div>
                <button type="submit" className="btn btn-primary w-100 mt-5">
                    Save Location
                </button>
            </form>
            </div>
        </div>

        {/* Overlay */}
        {showModal && (
            <div className="drawer-overlay" onClick={() => setShowModal(false)}></div>
        )}
    </>
  )
}

export default Location
