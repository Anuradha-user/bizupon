import { IconArrowLeft, IconCheck, IconCirclePlusFilled, IconPencil, IconTrash } from '@tabler/icons-react';
import Select from "react-select";
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

function Port() {

    const [countries, setCountries] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [ports, setPorts] = useState([]);
    const [filteredPorts, setFilteredPorts] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedIds, setSelectedIds] = useState([]);
    const [deleteId, setDeleteId] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [editId, setEditId] = useState(null);

    const [formData, setFormData] = useState({
        id: 0,
        cid: 1,
        name: "",
        email: "",
        contact: "",
        fax: "",
        address: "",
        sActive: 1
    });

    useEffect(() => {
        fetchCountries();
    }, []);

    // fetch countries
    const fetchCountries = async () => {
        try {
            const res = await axios.get("https://localhost:7244/api/master/AllCountries");

            const list = res.data.data || [];

            const formatted = list.map(item => ({
                value: item.cid,
                label: item.name
            }))
            .reverse();
            setCountries(formatted);

            // default japan select
            const japan = formatted.find(
                item => item.label.toLowerCase() === "japan"
            );

            if (japan) {
                setSelectedCountry(japan);
                fetchPorts(japan.value);
            }

        } catch (error) {
            console.error("fetching error data", error);
        }
    };

    // fetch ports
    const fetchPorts = async (countryId) => {
        try {
            const res = await axios.get(
                `https://localhost:7244/api/Port/view-Port?CID=${countryId}`
            );

            console.log("Port API:", res.data);

            const list = res.data.data || [];

            setPorts(list);
            setFilteredPorts(list);

        } catch (err) {
            console.log("Port API Error:", err.response?.data || err);
        }
    };

    // filter button
    const handleFilter = async () => {
        if (!selectedCountry) return;
        try {
            const res = await axios.get(
                `https://localhost:7244/api/Port/view-Port?CID=${selectedCountry.value}`
            );

            const data = res.data;
            const list = Array.isArray(data)
                ? data
                : data.data || data.result || [];

            setPorts(list);
            setFilteredPorts(list);

        } catch (err) {
            console.error("Filter Error:", err);
        }
    };

    // handle input
    const handleChange = (e) => {

        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]:
                name === "sActive"
                    ? value === "true"
                    : value
        }));
    };

    // add and edit port
    const handleSubmit = async (e) => {

        e.preventDefault();

        try {
            const payload = {
                id: isEdit ? editId : 0,
                cid: formData.cid,
                name: formData.name,
                email: formData.email,
                contact: formData.contact,
                fax: formData.fax,
                address: formData.address,
                sActive: Number(formData.sActive)
            };

            console.log("PAYLOAD =>", payload);

            if (isEdit) {
                await axios.put(
                    "https://localhost:7244/api/Port/update-Port",
                    payload
                );
                toast.success(
                    "Port Updated Successfully"
                );

            } else {
                await axios.post(
                    "https://localhost:7244/api/Port/add-Port",
                    payload
                );
                toast.success(
                    "Port Added Successfully"
                );
            }

            fetchPorts(selectedCountry?.value);

            setShowModal(false);

            setIsEdit(false);
            setEditId(null);

            // reset form
            setFormData({
                id: 0,
                cid: selectedCountry?.value || 0,
                name: "",
                email: "",
                contact: "",
                fax: "",
                address: "",
                sActive: 1
            });

        } catch (error) {
            console.log(
                "SAVE ERROR =>",
                error.response?.data || error
            );
            toast.error(
                isEdit
                    ? "Failed To Update Port"
                    : "Failed To Add Port"
            );
        }
    };

    // delete port
    const handleDelete = async () => {
        try {
            const payload = [
                {
                    id: Number(deleteId)
                }
            ];

            await axios({
                method: "delete",
                url: "https://localhost:7244/api/Port/delete-Port",
                data: payload,
                headers: {
                    "Content-Type": "application/json"
                }
            });

            toast.success("Port Deleted Successfully");

            fetchPorts(selectedCountry?.value);

            setShowDeleteModal(false);
            setDeleteId(null);

        } catch (error) {
            console.log(
                "DELETE ERROR =>",
                error.response?.data || error
            );
            toast.error("Delete Failed");
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
            const allIds = ports.map(item => item.id);
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
    }, [ports]);

    return (
        <>
            <div className="row">
                <div className="col-lg-12 col-12">
                    <div className="card">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-lg-3 col-md-6 col-12">
                                    <label className="form-label">Select Country Name</label>
                                    <Select
                                        options={countries}
                                        value={selectedCountry}
                                        onChange={(e) => setSelectedCountry(e)}
                                        placeholder="Select Country"
                                    />
                                </div>
                                <div className="col-lg-3 col-md-6 col-12">
                                    <button className="btn btn-md btn-primary mt-25" onClick={handleFilter}>
                                        Filter
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-lg-12 col-12">
                    <div className="card table-card overflow-hidden">
                        <div className="card-header">
                            <h5 className="title">Port</h5>
                            <button className="btn btn-sm btn-primary" onClick={() => setShowModal(true)}>
                                <IconCirclePlusFilled /> Add Port
                            </button>
                        </div>
                        <div className="card-body">
                            <div className="table-responsive">
                                <table className="table table-hover">
                                    <thead>
                                        <tr>
                                            <th>
                                                <input type="checkbox" className="form-check-input" 
                                                    onChange={handleSelectAll}
                                                    checked={ports.length > 0 && selectedIds.length === ports.length}
                                                />
                                            </th>
                                            <th>Country Name</th>
                                            <th>Port Name</th>
                                            <th>Status</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredPorts.length > 0 ? (
                                            filteredPorts.map((item, index) => (
                                                <tr key={index}>
                                                    <td>
                                                        <input type="checkbox" className="form-check-input"
                                                            checked={selectedIds.includes(item.id)}
                                                            onChange={() => handleCheckboxChange(item.id)}
                                                        />
                                                    </td>
                                                    <td>{item.countryName}</td>
                                                    <td>{item.name}</td>
                                                    <td>
                                                        <span
                                                            className={`badge ${
                                                                item.sActive === "True"
                                                                    ? "bg-success"
                                                                    : "bg-danger"
                                                            }`}>
                                                            {item.sActive === "True"
                                                                ? "Active"
                                                                : "De-Active"}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <div className="text-end">
                                                            <Link to="#" className="avtar edit" data-bs-toggle="tooltip" data-bs-placement="top"
                                                                title="Edit"
                                                                onClick={(e) => {
                                                                    e.preventDefault();
                                                                    setIsEdit(true);
                                                                    setEditId(item.id);
                                                                    setFormData({
                                                                        id: item.id,
                                                                        cid: item.cid || 0,
                                                                        name: item.name || "",
                                                                        email: item.email || "",
                                                                        contact: item.contact || "",
                                                                        fax: item.fax || "",
                                                                        address: item.address || "",
                                                                        sActive:
                                                                            item.sActive === "True" ||
                                                                            item.sActive === 1
                                                                                ? 1
                                                                                : 0
                                                                    });

                                                                    // set selected country
                                                                    const selectedCountryOption = countries.find(
                                                                        c => c.value === item.cid
                                                                    );
                                                                    setSelectedCountry(
                                                                        selectedCountryOption || null
                                                                    );
                                                                    setShowModal(true);
                                                                }}>
                                                                <IconPencil />
                                                            </Link>
                                                            <Link to="#" className="avtar delete" data-bs-toggle="tooltip" data-bs-placement="top" title="Delete" 
                                                                onClick={(e) => {
                                                                    e.preventDefault();

                                                                    setDeleteId(item.id);
                                                                    setShowDeleteModal(true);
                                                                }}><IconTrash />
                                                            </Link>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="5" className="text-center">
                                                    No data found
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            <div className={`actionModal ${selectedIds.length > 0 ? "" : "d-none"}`} style={{ top: 0 }}>
                                <div className="selectedItem">
                                    {selectedIds.length} Selected from {ports.length}
                                </div>
                                <div className="actionButtonArea">
                                    <button className="btn btn-xs btn-primary"><IconCheck /> Active</button>
                                    <button className="btn btn-xs btn-warning"><IconCheck /> De-Active</button>
                                    <button className="btn btn-xs btn-danger"><IconTrash /> Delete</button>
                                    <button className="btn btn-xs btn-light" onClick={() => setSelectedIds([])}><IconArrowLeft /> Cancel</button>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            {/* Right Slide Drawer */}
            <div className={`custom-drawer ${showModal ? "open" : ""}`}>
                <div className="drawer-header">
                    <h5>{isEdit ? "Edit Port" : "Add Port"}</h5>
                    <button className="btn-close" onClick={() => {
                            setShowModal(false);
                            setIsEdit(false);
                            setEditId(null);
                            setFormData({
                                id: 0,
                                cid: 1,
                                name: "",
                                email: "",
                                contact: "",
                                fax: "",
                                address: "",
                                sActive: 1
                            });
                        }}>
                    </button>
                </div>
                <div className="drawer-body">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label className="form-label">Select Country Name</label>
                            <Select options={countries}
                                value={countries.find(
                                    item => item.value === formData.cid
                                )}
                                onChange={(e) => {
                                    setFormData({
                                        ...formData,
                                        cid: e.value
                                    });
                                }}
                                placeholder="Select Country"
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Enter Name</label>
                            <input type="text" className="form-control"
                                value={formData.name}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        name: e.target.value
                                    })
                                }
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Enter Email ID</label>
                            <input type="email" className="form-control"
                                value={formData.email}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        email: e.target.value
                                    })
                                }
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Enter Contact Number</label>
                            <input type="text" className="form-control"
                                value={formData.contact}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        contact: e.target.value
                                    })
                                }
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Enter Fax Number</label>
                            <input type="text" className="form-control"
                                value={formData.fax}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        fax: e.target.value
                                    })
                                }
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Enter Address</label>
                            <textarea className="form-control" rows="3"
                                value={formData.address}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        address: e.target.value
                                    })
                                }
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Status</label>
                            <select className="form-control"
                                value={formData.sActive}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        sActive: e.target.value
                                    })
                                }>
                                <option value={1}>Active</option>
                                <option value={0}>De-Active</option>
                            </select>
                        </div>
                        <button type="submit" className="btn btn-primary w-100 mt-5">
                            {isEdit ? "Update" : "Submit"}
                        </button>
                    </form>
                </div>
            </div>

            {/* Overlay */}
            {showModal && (
                <div className="drawer-overlay" onClick={() => setShowModal(false)}></div>
            )}

            {/* Delete Confirmation Modal */}
            {showDeleteModal && (
            <>
                <div className="modal fade show d-block" tabIndex="-1"
                    style={{ background: "rgba(0,0,0,.5)" }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header mb-0">
                                <h5 className="modal-title">Confirm Delete</h5>
                                <button className="btn-close"
                                    onClick={() => {
                                        setShowDeleteModal(false);
                                        setDeleteId(null);
                                    }}
                                />
                            </div>
                            <div className="modal-body mt-0">
                                <h6>Are you sure you want to delete this port?</h6>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-sm btn-light"
                                    onClick={() => {
                                        setShowDeleteModal(false);
                                        setDeleteId(null);
                                    }}>
                                    Cancel
                                </button>
                                <button className="btn btn-sm btn-danger"
                                    onClick={handleDelete}>
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
            )}

            <ToastContainer
                position="top-right"
                autoClose={3000}
                theme="colored"
            />
        </>
    )
}

export default Port;