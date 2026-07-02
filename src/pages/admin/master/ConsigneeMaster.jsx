import { IconCirclePlusFilled, IconPencil, IconTrash, IconArrowLeft } from '@tabler/icons-react';
import React, { useEffect, useState } from 'react';
import Select from "react-select";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ConsigneeMaster() {

    const [consigneeList, setConsigneeList] = useState([]);
    const [selectedIds, setSelectedIds] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [client, setclient] = useState([]);
    const [filterClient, setFilterClient] = useState(null);
    const [modalClient, setModalClient] = useState(null);

    const fetchClientData = async() =>{
        try{
            const res = await axios.get('https://localhost:7244/api/master/GetClient');
            const data = (res.data.data || []).map(item => ({
                value: item.id,
                label: item.name
            }));

            setclient(data);

        } catch(error){
            console.error("error fetching data", error);
        }
    };

    const fetchConsigneeData = async() =>{
        try{
            const res = await axios.get('https://localhost:7244/api/master/view-consignee?Id=0');
            setConsigneeList(res.data.data || res.data)

        } catch(error){
            console.error("error fetching data", error);
        }
    };

    // fetch data
    useEffect(() => {
        fetchClientData();
        fetchConsigneeData();
    }, []);


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
            const allIds = consigneeList.map(item => item.id); 
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
    }, [consigneeList]);

    // add consignee master
    const [formData, setFormData] = useState({
        "clientID": "",
        "cfs": "",
        "consigneeName": "",
        "email": "",
        "address": "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            id: 0,
            ClientName: modalClient?.label,
            CFS: formData.cfs,
            ConsigneeName: formData.consigneeName,
            Email: formData.email,
            Address: formData.address
        };

        console.log("Payload:", payload);

        try {
            const res = await axios.post(
                "https://localhost:7244/api/master/add-consignee",
                payload
            );

            console.log("Response:", res.data);

            toast.success("Consignee added successfully");
            await fetchConsigneeData();
            setShowModal(false);

            setFormData({
                clientID: "",
                cfs: "",
                consigneeName: "",
                email: "",
                address: "",
            });

            setModalClient(null);

        } catch (error) {
            console.log("Status:", error.response?.status);
            console.log("Data:", error.response?.data);
            console.log("Errors:", error.response?.data?.errors);

            toast.error("Something went wrong");
        }
    };

    // delete row
    const handleDelete = () => {
        if (selectedIds.length === 0) {
            alert("Please select at least one record");
            return;
        }
        const confirmDelete = window.confirm("Are you sure you want to delete selected records?");
        if (confirmDelete) {
            console.log("Deleting IDs:", selectedIds);

            setSelectedIds([]);
        }
    };

    const confirmDelete = () => {
        console.log("Deleting IDs:", selectedIds);
        setSelectedIds([]);
        setShowDeleteModal(false);
    };

  return (
    <>
        <div className="row">
            <div className="col-lg-12 col-12">
                <div className="card">
                    <div className="card-header">
                        <h5 className="title">Consignee Master</h5>
                    </div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-lg-3 col-12">
                                <div className="form-group">
                                    <label className="form-label">Client Name</label>
                                    <Select
                                        options={client}
                                        value={filterClient}
                                        onChange={setFilterClient}
                                        placeholder="Select Client Name"
                                    />
                                </div>
                            </div>
                            <div className="col-lg-3 col-12">
                                <div className="form-group">
                                    <button className="btn btn-md btn-primary mt-25">Filter</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card overflow-hidden">
                    <div className="card-header justify-content-end">
                        <button className="btn btn-sm btn-primary" onClick={() => setShowModal(true)}><IconCirclePlusFilled /> Add Consignee Master</button>
                    </div>
                    <div className="table-responsive">
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th>
                                        <input type="checkbox" className="form-check-input" 
                                            onChange={handleSelectAll}
                                            checked={selectedIds.length === consigneeList.length && consigneeList.length > 0} 
                                        />
                                    </th>
                                    <th>Client Name</th>
                                    <th>CFS</th>
                                    <th>Consignee Name</th>
                                    <th>Email ID</th>
                                    <th>Address</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {consigneeList.length > 0 ? (
                                    consigneeList.map((item, index) => (
                                        <tr key={index}>
                                            <td>
                                                <input type="checkbox" className="form-check-input"
                                                    checked={selectedIds.includes(item.id)}
                                                    onChange={() => handleCheckboxChange(item.id)}
                                                />
                                            </td>
                                            <td>{item.clientName}</td>
                                            <td>{item.cfs}</td>
                                            <td>{item.consigneeName}</td>
                                            <td>{item.email}</td>
                                            <td>{item.address}</td>
                                            <td>
                                                <div className="text-end">
                                                    <Link to="#" className="avtar edit" data-bs-toggle="tooltip" data-bs-placement="top" title="Edit"><IconPencil /></Link>
                                                    <Link to="#" className="avtar delete" data-bs-toggle="tooltip" data-bs-placement="top" title="Delete" onClick={() => setShowDeleteModal(true)}><IconTrash /></Link>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="7" className="text-center">
                                            No Data Found
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    <div className={`actionModal ${selectedIds.length > 0 ? "" : "d-none"}`}>
                        <div className="selectedItem">
                            {selectedIds.length} Selected from {consigneeList.length}
                        </div>
                        <div className="actionButtonArea">
                            <button className="btn btn-xs btn-danger"><IconTrash /> Delete</button>
                            <button className="btn btn-xs btn-light" onClick={() => setSelectedIds([])}><IconArrowLeft /> Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* Right Slide Drawer */}
        <div className={`custom-drawer ${showModal ? "open" : ""}`}>
            <div className="drawer-header">
                <h5>Upload Bills</h5>
                <button className="btn-close" onClick={() => setShowModal(false)}></button>
            </div>
            <div className="drawer-body">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label">Client Name</label>
                        <Select
                            options={client}
                            value={modalClient}
                            required
                            onChange={(selected) =>{
                                setModalClient(selected);
                                setFormData({
                                    ...formData,
                                    clientID: selected?.value || ""
                                });
                            }}
                            placeholder="Select Client Name"
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">CFS</label>
                        <input type="text" className="form-control" required
                            value={formData.cfs}
                            onChange={(e) => 
                                setFormData({
                                    ...formData,
                                    cfs: e.target.value
                                })
                            }
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Consignee Name</label>
                        <input type="text" className="form-control" required
                            value={formData.consigneeName}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    consigneeName: e.target.value
                                })
                            }
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Email ID</label>
                        <input type="email" className="form-control" required
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
                        <label className="form-label">Address</label>
                        <input type="text" className="form-control" required
                            value={formData.address}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    address: e.target.value
                                })
                            }
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100 mt-4">
                        Submit
                    </button>
                </form>
            </div>
        </div>

        {/* Overlay */}
        {showModal && (
            <div className="drawer-overlay" onClick={() => setShowModal(false)}></div>
        )}

        {/*-- delete row alert popup --*/}
        {showDeleteModal && (
            <>
                <div className="modal fade show d-block">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header m-0">
                                <h5 className="modal-title">Confirm Delete</h5>
                                <button className="btn-close" onClick={() => setShowDeleteModal(false)}></button>
                            </div>
                            <div className="modal-body m-0">
                                Are you sure you want to delete {selectedIds.length} selected record(s)?
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-sm btn-light" onClick={() => setShowDeleteModal(false)}>
                                    Cancel
                                </button>
                                <button className="btn btn-sm btn-danger" onClick={confirmDelete}>
                                    Yes, Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* backdrop */}
                <div className="modal-backdrop fade show"></div>

                <ToastContainer
                    position="top-right"
                    autoClose={3000}
                    theme="colored"
                />
            </>
        )}
    </>
  )
}

export default ConsigneeMaster
