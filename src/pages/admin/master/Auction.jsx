import { IconCirclePlusFilled, IconPencil, IconTrash } from '@tabler/icons-react'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Select from 'react-select';

function Auction() {

    const [auctions, setAuctions] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedIds, setSelectedIds] = useState([]);
    const [country, setCountry] = useState([]);
    const [countrySelect, setSelectCountry] = useState(null);
    const [cid, setCid] = useState("");
    const [auctionName, setAuctionName] = useState("");

    const [isEdit, setIsEdit] = useState(false);
    const [editId, setEditId] = useState(null);

    const [formData, setFormData] = useState({
        id: 0,
        cid: 0,
        name: "",
        address: "",
        email: "",
        contactNo: "",
        faxNo: "",
        sActive: 1
    });

    useEffect(() => {
        fetchAuctions()
        fetchCountriesData()
    }, []);

    // fetch country data
    const fetchCountriesData = async () => {
        try {
            const response = await axios.get("https://localhost:7244/api/master/AllCountries")
            let data = response.data.data.map(item => ({
                value: item.id,
                label: item.name
            }))
            .reverse();
            setCountry(data)

        } catch (error) {
            console.log("error", error);

        }
    }

    // filter
    const fetchAuctions = async () => {
        try {
            let url = `https://localhost:7244/api/Port/view-auction?CID=0&AcutionName=0`;

            const params = [];

            // ✅ IMPORTANT FIX
            if (countrySelect) {
                params.push(`CID=${countrySelect.value}`);
            }

            if (auctionName) {
                params.push(`AuctionName=${encodeURIComponent(auctionName)}`);
            }

            if (params.length === 0) {
                url += "?CID=0&AuctionName=";
            } else {
                url += "?" + params.join("&");
            }

            console.log("API URL:", url); // 🔍 debug

            const res = await fetch(url);
            const data = await res.json();

            setFilteredData(data.data || []);

        } catch (err) {
            console.error(err);
        }
    };

    // Filter Function
    const handleFilter = () => {
        fetchAuctions(); 
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]:
                name === "sActive"
                    ? Number(value)
                    : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const payload = {
                id: isEdit ? editId : 0,
                cid: countrySelect?.value || 0,
                name: formData.name,
                address: formData.address,
                email: formData.email,
                contactNo: formData.contactNo,
                faxNo: formData.faxNo,
                sActive: Number(formData.sActive)
            };

            console.log(payload);

            if (isEdit) {
                await axios.put(
                    "https://localhost:7244/api/Port/update-auction",
                    payload
                );

                alert("Auction Updated Successfully");

            } else {
                await axios.post(
                    "https://localhost:7244/api/Port/add-auction",
                    payload
                );

                alert("Auction Added Successfully");
            }

            fetchAuctions();
            setShowModal(false);
            setIsEdit(false);
            setEditId(null);

            // reset form
            setFormData({
                id: 0,
                cid: 0,
                name: "",
                address: "",
                email: "",
                contactNo: "",
                faxNo: "",
                sActive: 1
            });

            setSelectCountry(null);

        } catch (error) {
            console.log(
                error.response?.data || error
            );
            alert(
                isEdit
                    ? "Failed To Update Auction"
                    : "Failed To Add Auction"
            );
        }
    };

    // select single checkbox
    const handleCheckboxChange = (id) => {
        if (selectedIds.includes(id)) {
            setSelectedIds(selectedIds.filter(item => item !== id));
        } else {
            setSelectedIds([...selectedIds, id]);
        }
    };

    // select all checkboxes
    const handleSelectAll = (e) => {
        if (e.target.checked) {
            const allIds = country.map(item => item.id);
            setSelectedIds(allIds);
        } else {
            setSelectedIds([]);
        }
    };
    
    // Tooltip init
    useEffect(() => {
        const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
        const tooltipList = [...tooltipTriggerList].map(
            (tooltipTriggerEl) => new window.bootstrap.Tooltip(tooltipTriggerEl)
        );
    }, [auctions]);


  return (
    <>
        <div className="row">
            <div className="col-lg-12 col-12">
                <div className="card">
                    <div className="card-header">
                        <h5 className="title">Auction Filter</h5>
                    </div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-lg-3 col-md-6 col-12">
                                <div className="form-group">
                                    <label className="form-label">Select Country Name</label>
                                    <Select 
                                        options={country}
                                        value={countrySelect}
                                        onChange={setSelectCountry}
                                        placeholder="Select County Name"
                                    />
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6 col-12">
                                <div className="form-group">
                                    <label className="form-label">Auction Name</label>
                                    <input type="text" className="form-control" value={auctionName} onChange={(e) => setAuctionName(e.target.value)} />
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6 col-12">
                                <div className="form-group">
                                    <button className="btn btn-md btn-primary mt-25" onClick={handleFilter}>Filter</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-lg-12 col-12">
                <div className="card table-card overflow-hidden">
                    <div className="card-header">
                        <h5 className="title">Auction</h5>
                        <button className="btn btn-sm btn-primary" onClick={() => setShowModal(true)}><IconCirclePlusFilled/> Add Auction</button>
                    </div>
                    <div className="card-body">
                        <div className="table-responsive">
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th>
                                            <input type="checkbox" className="form-check-input" 
                                                onChange={handleSelectAll}
                                                checked={country.length > 0 && selectedIds.length === country.length}
                                            />
                                        </th>
                                        <th>Country Name</th>
                                        <th>Auction Name</th>
                                        <th>Out Day</th>
                                        <th>Out Time</th>
                                        <th>Auction ID</th>
                                        <th>A/C Manager</th>
                                        <th>B Limit</th>
                                        <th>Auction Group</th>
                                        <th>O Balance</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredData.length > 0 ? (
                                        filteredData.map((item, index) => (
                                        <tr key={item.id}>
                                            <td>
                                                <input type="checkbox" className="form-check-input"
                                                    checked={selectedIds.includes(item.id)}
                                                    onChange={() => handleCheckboxChange(item.id)}
                                                />
                                            </td>
                                            <td>{item.countryName || "-"}</td>
                                            <td>{item.name || "-"}</td>
                                            <td>{item.outday || "-"}</td>
                                            <td>{item.outtime || "-"}</td>
                                            <td>{item.auctionID || "-"}</td>
                                            <td>{item.amanager || "-"}</td>
                                            <td>{item.ablimit || "-"}</td>
                                            <td>{item.gname || "-"}</td>
                                            <td>{item.obalance || "-"}</td>

                                            {/* ✅ STATUS FIX */}
                                            <td>
                                            <span className={`badge ${item.sActive === "True" ? "bg-success" : "bg-danger"}`}>
                                                {item.sActive === "True" ? "Active" : "Inactive"}
                                            </span>
                                            </td>
                                            <td>
                                                <div className="text-end">
                                                    <Link to="#" className="avtar edit" data-bs-toggle="tooltip" data-bs-placement="top" title="Edit"
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            setIsEdit(true);
                                                            setEditId(item.id);
                                                            setFormData({
                                                                id: item.id,
                                                                cid: item.cid || 0,
                                                                name: item.name || "",
                                                                address: item.address || "",
                                                                email: item.email || "",
                                                                contactNo: item.contactNo || "",
                                                                faxNo: item.faxNo || "",
                                                                sActive:
                                                                    item.sActive === "True"
                                                                        ? 1
                                                                        : 0
                                                            });
                                                            const selectedCountryOption =
                                                                country.find(
                                                                    c => c.value === item.cid
                                                                );
                                                            setSelectCountry(
                                                                selectedCountryOption || null
                                                            );
                                                            setShowModal(true);
                                                        }}
                                                    >
                                                        <IconPencil />
                                                    </Link>
                                                    <Link to="#" className="avtar delete" data-bs-toggle="tooltip" data-bs-placement="top" title="Delete"><IconTrash /></Link>
                                                </div>
                                            </td>
                                        </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="12" className="text-center">
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

        {/* Right Slide Drawer */}
        <div className={`custom-drawer ${showModal ? "open" : ""}`}>
            <div className="drawer-header">
                <h5>
                    {isEdit
                        ? "Edit Auction"
                        : "Add Auction"}
                </h5>
                <button className="btn-close"
                    onClick={() => {
                        setShowModal(false);
                        setIsEdit(false);
                        setEditId(null);
                        setFormData({
                            id: 0,
                            cid: 0,
                            name: "",
                            address: "",
                            email: "",
                            contactNo: "",
                            faxNo: "",
                            sActive: 1
                        });
                        setSelectCountry(null);
                    }}>
                </button>
            </div>

            <div className="drawer-body">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label">Country Name</label>
                        <Select 
                            options={country}
                            value={countrySelect}
                            onChange={setSelectCountry}
                            placeholder="Select County Name"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Name </label>
                        <input type="text" name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="form-control"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Address </label>
                        <input type="text" name="address"
                            value={formData.address}
                            onChange={handleChange}
                            className="form-control"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Email ID </label>
                        <input type="text" name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="form-control"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Contact No.</label>
                        <input type="number" name="contactNo"
                            value={formData.contactNo}
                            onChange={handleChange}
                            className="form-control"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Fax No.</label>
                        <input type="text" name="faxNo"
                            value={formData.faxNo}
                            onChange={handleChange}
                            className="form-control"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Status</label>
                        <select name="sActive"
                            value={formData.sActive}
                            onChange={handleChange}
                            required
                            className="form-control w-100">
                            <option value="1">Active</option>
                            <option value="0">De-Active</option>
                        </select>
                    </div>
                    <button type="submit" className="btn btn-primary w-100 mt-4">
                        {isEdit ? "Update" : "Submit"}
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

export default Auction
