import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import DatePicker from "react-datepicker";
import axios from 'axios';
import { use } from 'react';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';

function UpdateAnotherStatus() {

    const [category, setCategory] = useState([]);
    const [selectCategory, setSelectCategory] = useState(null);
    const [auctionHouse, setAuctionHouse] = useState([]);
    const [selectAuction, setSelectAuction] = useState(null);
    const [shipping, setShipping] = useState([]);
    const [selectShippng, setSelectShipping] = useState(null);
    const [port, setPort] = useState([]);
    const [selectPort, setSelectPort] = useState(null);
    const [country, setCountry] = useState([]);
    const [selectCountry, setSelectCountry] = useState(null);
    const [auctionDate, setAuctionDate] = useState(null);
    const [rikujiDate, setRikujiDate] = useState(null);
    const [drDate, setDrDate] = useState(null);
    const [registrationDate, setRegistrationDate] = useState(null);
    const [updateDataList, setUpdateDataList] = useState([]);
    const [selectUpdateData, setSelectUpdateData] = useState(null);
    const [tableData, setTableData] = useState([]);
    const [selectedIds, setSelectedIds] = useState([]);
    const [errors, setErrors] = useState({});
    const [productType, setProductType] = useState(null);
    const [urgent, setUrgent] = useState("");
    const [reauction, setReauction] = useState("");

    const [page, setPage] = useState(1);
    const perPage = 500;

    // fetch category dropdown data
    const fetchSubcategoriesData = async() => {
        try{
            const res = await axios.get('https://jaishriganesha.com/bizupon-master/api/master/view-subcategories')
            const data = (res.data.data || res.data).map(item => ({
                value: item.id,
                label: item.name
            }))
            setCategory(data);
        } catch (error) {
            console.error("Error fetching data", error);
        }
    }

    // fetch auction house dropdown data
    const fetchAuctionHouseData = async() => {
        try{
            const res = await axios.get('https://jaishriganesha.com/bizupon-master/api/Port/view-auction?CID=0&AcutionName=0')
            const data = (res.data.data || res.data).map(item => ({
                value: item.id,
                label: item.name
            }))
            setAuctionHouse(data);
        } catch (error) {
            console.error("Error fetching data", error);
        }
    }

    // fetch shipping dropdown data
    const fetchShippingData = async() => {
        try{
            const res = await axios.get('https://jaishriganesha.com/bizupon-master/api/Port/GetddlShipping')
            const data = (res.data.data || res.data).map(item => ({
                value: item.id,
                label: item.name
            }))
            setShipping(data);
        } catch (error) {
            console.error("Error fetching data", error);
        }
    }

    // fetch port dropdown data
    const fetchPortData = async() => {
        try{
            const res = await axios.get('https://jaishriganesha.com/bizupon-master/api/Port/GetddlPort')
            const data = (res.data.data || res.data).map(item => ({
                value: item.id,
                label: item.name
            }))
            setPort(data);
        } catch (error) {
            console.error("Error fetching data", error);
        }
    }

    // fetch country sold dropdown data
    const fetchCountriesData = async() => {
        try{
            const res = await axios.get('https://jaishriganesha.com/bizupon-master/api/master/AllCountries')
            const data = (res.data.data || res.data).map(item => ({
                value: item.cid,
                label: item.name
            }))
            setCountry(data);
        } catch (error) {
            console.error("Error fetching data", error);
        }
    }

    // fetch table data
    const fetchTableData = async () => {
        try {
            const res = await axios.get('https://localhost:7069/api/Product/GetUpdateAnotherStatus');

            console.log(res.data);

            setTableData(res.data.data.lst || []);
        } 
        catch (error) {
            console.error("Error fetching data", error);
        }
    };

    useEffect(()=>{
        fetchTableData();
        fetchCountriesData();
        fetchPortData();
        fetchShippingData();
        fetchAuctionHouseData();
        fetchSubcategoriesData();
    }, []);

    // select single checkbox
    const handleCheckboxChange = (id) => {
        if (selectedIds.includes(id)) {
            setSelectedIds(selectedIds.filter(item => item !== id));
        } else {
            setSelectedIds([...selectedIds, id]);
        }
    };

    // product type
    const productTypeOptions = [
        { value: "Normal", label: "Normal" },
        { value: "Constructor", label: "Constructor" },
        { value: "Container", label: "Container" },
        { value: "Cut", label: "Cut" }
    ];
    
    // select all checkboxes
    const handleSelectAll = (e) => {
        if (e.target.checked) {
            const allIds = tableData.map(item => item.productId);
            setSelectedIds(allIds);
        } else {
            setSelectedIds([]);
        }
    };

    // validation
    const validateForm = () => {
        let newErrors = {};
        if (!selectCategory) {
            newErrors.category = "Category is required";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    const handleFilter = () => {
        if (!validateForm()) {
            return;
        }
        console.log("Filter Applied");
    };

    // Pagination
    const total = tableData.length;
    const pages = Math.ceil(total / perPage);
    const data = tableData.slice((page - 1) * perPage, page * perPage);


  return (
    <div className="row">
        <div className="col-lg-12 col-12">
            <div className="card">
                <div className="card-header">
                    <h5 className="title">Update Another Status</h5>
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-lg-3 col-md-12 col-12">
                            <div className="form-group">
                                <label className="form-label">Category</label>
                                <Select
                                    options={category}
                                    value={selectCategory}
                                    onChange={(selected) => {
                                        setSelectCategory(selected);
                                        setErrors((prev) => ({
                                            ...prev,
                                            category: ""
                                        }));
                                    }}
                                    placeholder="Select Category"
                                />
                                {errors.category && (
                                    <small className="text-danger">
                                        {errors.category}
                                    </small>
                                )}
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-12 col-12">
                            <div className="form-group">
                                <label className="form-label">Select Product</label>
                                <Select />
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-12 col-12">
                            <div className="form-group">
                                <label className="form-label">Auction House</label>
                                <Select 
                                    options={auctionHouse}
                                    value={selectAuction}
                                    onChange={setSelectAuction}
                                    placeholder="Select Auction House"
                                />
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-12 col-12">
                            <div className="form-group">
                                <label className="form-label">Shipping</label>
                                <Select 
                                    options={shipping}
                                    value={selectShippng}
                                    onChange={setSelectShipping}
                                    placeholder="Select Shipping"
                                />
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-12 col-12">
                            <div className="form-group">
                                <label className="form-label">Port From</label>
                                <Select 
                                    options={port}
                                    value={selectPort}
                                    onChange={setSelectPort}
                                    placeholder="Select Port"
                                />
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-12 col-12">
                            <div className="form-group">
                                <label className="form-label">Sold Country</label>
                                <Select 
                                    options={country}
                                    value={selectCountry}
                                    onChange={setSelectCountry}
                                    placeholder="Select Sold Country"
                                />
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-12 col-12">
                            <div className="form-group">
                                <label className="form-label">Product Type</label>
                                <Select
                                    options={productTypeOptions}
                                    value={productType}
                                    onChange={setProductType}
                                    placeholder="Select Product Type"
                                />
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-12 col-12">
                            <div className="form-group">
                                <label className="form-label">Urgent</label>
                                <select className="form-control"
                                    value={urgent}
                                    onChange={(e) => setUrgent(e.target.value)}>
                                    <option value="">Select One</option>
                                    <option value="1">Yes</option>
                                    <option value="0">No</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-12 col-12">
                            <div className="form-group">
                                <label className="form-label">Auction Date</label>
                                <DatePicker
                                    selected={auctionDate}
                                    onChange={(date) => setAuctionDate(date)}
                                    className="form-control"
                                    placeholderText="DD/MM/YYYY"
                                    dateFormat="dd/MM/yyyy"
                                />
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-12 col-12">
                            <div className="form-group">
                                <label className="form-label">Rikuji Date</label>
                                <DatePicker
                                    selected={rikujiDate}
                                    onChange={(date) => setRikujiDate(date)}
                                    className="form-control"
                                    placeholderText="DD/MM/YYYY"
                                    dateFormat="dd/MM/yyyy"
                                />
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-12 col-12">
                            <div className="form-group">
                                <label className="form-label"><abbr data-title="Document Received Date">D. R. Date</abbr></label>
                                <DatePicker
                                    selected={drDate}
                                    onChange={(date) => setDrDate(date)}
                                    className="form-control"
                                    placeholderText="DD/MM/YYYY"
                                    dateFormat="dd/MM/yyyy"
                                />
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-12 col-12">
                            <div className="form-group">
                                <label className="form-label">Reauction</label>
                                <select className="form-control"
                                    value={reauction}
                                    onChange={(e) => setReauction(e.target.value)}>
                                    <option value="">Select One</option>
                                    <option value="1">Yes</option>
                                    <option value="0">No</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-12 col-12">
                            <div className="form-group">
                                <label className="form-label">Registration Date</label>
                                <DatePicker
                                    selected={registrationDate}
                                    onChange={(date) => setRegistrationDate(date)}
                                    className="form-control"
                                    placeholderText="DD/MM/YYYY"
                                    dateFormat="dd/MM/yyyy"
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Chassis Number</label>
                                <input type="text" className="form-control" />
                            </div>
                        </div>
                        <div className="col-lg-9 col-md-12 col-12">
                            <div className="form-group">
                                <label className="form-label">All Chassis Number</label>
                                <textarea id="allNumber" rows="5" className="form-control" />
                            </div>
                        </div>
                        <div className="col-lg-12 col-md-12 col-12">
                            <button className="btn btn-md btn-primary mt-2 float-end" onClick={handleFilter}>Filter</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="card table-card overflow-hidden">
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th>
                                        <input type="checkbox" className="form-check-input"
                                            onChange={handleSelectAll}
                                            checked={selectedIds.length === tableData.length && tableData.length > 0}
                                        />
                                    </th>
                                    <th>#</th>
                                    <th>Chassis No.</th>
                                    <th>Car Status</th>
                                    <th>Sold</th>
                                    <th>Product Type</th>
                                    <th>Shipping</th>
                                    <th>Port From</th>
                                    <th>Urgent</th>
                                    <th>No. Plate</th>
                                    <th><abbr data-title="Document Received Date">D. R. Date</abbr></th>
                                    <th><abbr data-title="Registration Date">R. Date</abbr></th>
                                    <th>Another Status</th>
                                    <th>Rikuji Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tableData.length > 0 ? (
                                    data.map((item, index) => (
                                        <tr key={index}>
                                            <td>
                                                <input type="checkbox" className="form-check-input"
                                                    checked={selectedIds.includes(item.productId)}
                                                    onChange={() => handleCheckboxChange(item.productId)}
                                                />
                                            </td>
                                            <td>{(page - 1) * perPage + index + 1}</td>
                                            <td>{item.chno}</td>
                                            <td>{item.carstatus}</td>
                                            <td>{item.countryName}</td>
                                            <td>{item.productType}</td>
                                            <td>{item.shipping}</td>
                                            <td>{item.portFrom}</td>
                                            <td>{item.urgent ? "Yes" : "No"}</td>
                                            <td>{item.noplatestatus}</td>
                                            <td>{item.d_R_Date}</td>
                                            <td>{item.registrationDate}</td>
                                            <td>{item.anotherStatus}</td>
                                            <td>{item.rickujidate}</td>
                                        </tr>
                                    ))
                                    ) : (
                                    <tr>
                                        <td colSpan="14" className="text-center">
                                            No Data Found
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    {/* Pagination */}
                    <div className="paginationBlock d-flex justify-content-between align-items-center p-3">
                        <p>Showing {(page - 1) * perPage + 1} to {Math.min(page * perPage, total)} of {total}</p>
                        <ul className="pagination mb-0">
                            <li className={`page-item ${page === 1 && "disabled"}`}>
                                <button className="page-link" onClick={() => setPage(p => p - 1)}>
                                    <IconChevronLeft />
                                </button>
                            </li>
                            {[...Array(pages)].map((_, i) => (
                                <li key={i} className={`page-item ${page === i + 1 && "active"}`}>
                                    <button className="page-link" onClick={() => setPage(i + 1)}>
                                        {i + 1}
                                    </button>
                                </li>
                            ))}
                            <li className={`page-item ${page === pages && "disabled"}`}>
                                <button className="page-link" onClick={() => setPage(p => p + 1)}>
                                    <IconChevronRight />
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default UpdateAnotherStatus
