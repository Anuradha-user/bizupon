import { IconArrowLeft, IconCheck, IconChecks, IconChevronLeft, IconChevronRight, IconCirclePlusFilled, IconPencil, IconTrash, IconX } from '@tabler/icons-react'
import axios from 'axios';
import React, {useEffect, useState,} from 'react'
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Transport() {

    const [showModal, setShowModal] = useState(false);
    const [transportList, setTransportList] = useState([]);
    const [selectedIds, setSelectedIds] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const [deleteId, setDeleteId] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const [isEdit, setIsEdit] = useState(false);
    const [editId, setEditId] = useState(null);


    const totalItems = transportList.length;

    const totalPages = Math.ceil(
        totalItems / itemsPerPage
    );

    const startIndex =
        (currentPage - 1) * itemsPerPage;

    const currentItems = transportList.slice(
        startIndex,
        startIndex + itemsPerPage
    );

    const [formData, setFormData] = useState({
        name: "",
        faxno: "",
        address: "",
        contact: "",
        email: "",
        tActive: 1
    });

    // fetch table data
    const fetchTransportData = async ()=> {
        try{
            const res = await axios.get('https://localhost:7244/api/Port/view-Transport')
            setTransportList(res.data.data);

        } catch (error) {
            console.error("error", error);
        }
    }

    useEffect(() => {
        fetchTransportData();
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
            const allIds = transportList.map(item => item.id);
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
    }, [transportList]);

    // add transport
    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]:
                name === "tActive" ||
                name === "obalance"
                    ? Number(value)
                    : value
        }));
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {
            const payload = {
                id: editId,
                tActive: Number(formData.tActive),
                name: formData.name,
                faxno: formData.faxno,
                address: formData.address,
                contact: formData.contact,
                email: formData.email
            };

            console.log(payload);

            if (isEdit) {

                await axios.put(
                    "https://localhost:7244/api/Port/update-Transport",
                    payload
                );

                toast.success("Transport Updated Successfully");

            } else {

                await axios.post(
                    "https://localhost:7244/api/Port/add-Transport",
                    payload
                );

                toast.success("Transport Added Successfully");
            }

            fetchTransportData();
            setShowModal(false);

            setFormData({
                name: "",
                faxno: "",
                address: "",
                contact: "",
                email: "",
                tActive: 1
            });

            setIsEdit(false);
            setEditId(null);

        } catch(error) {
            console.log(error.response?.data || error);
            toast.error(
                isEdit
                    ? "Failed to update transport"
                    : "Failed to add transport"
            );
        }
    };

    // delete transport
    const handleDelete = async () => {
        try {

            const payload = [
                {
                    id: Number(deleteId)
                }
            ];

            console.log(payload);

            await axios.delete(
                "https://localhost:7244/api/Port/delete-Transport",
                {
                    data: payload,
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            );

            toast.success("Transport Deleted Successfully");

            fetchTransportData();
            setShowDeleteModal(false);
            setDeleteId(null);

        } catch (error) {
            console.log("DELETE ERROR =>", error.response?.data || error);
            toast.error("Delete Failed");
        }
    };
    

  return (
    <>
        <div className="row">
            <div className="col-lg-12 col-12">
                <div className="card table-card overflow-hidden">
                    <div className="card-header">
                        <h5 className="title">Transport</h5>
                        <button className="btn btn-sm btn-primary"
                            onClick={() => {

                                setIsEdit(false);
                                setEditId(null);

                                setFormData({
                                    name: "",
                                    faxno: "",
                                    address: "",
                                    contact: "",
                                    email: "",
                                    tActive: 1
                                });
                                setShowModal(true);
                            }}>
                            <IconCirclePlusFilled /> Add Transport
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
                                                checked={selectedIds.length === transportList.length && transportList.length > 0}
                                            />
                                        </th>
                                        <th>Transport Name</th>
                                        <th>Email ID</th>
                                        <th>Pin Code</th>
                                        <th>Opening Balance</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {transportList.length > 0 ? (
                                        currentItems.map((item, index) => (
                                            <tr key={item.id}>
                                                <td>
                                                    <input type="checkbox" className="form-check-input"
                                                        checked={selectedIds.includes(item.id)}
                                                        onChange={() => handleCheckboxChange(item.id)}
                                                    />
                                                </td>
                                                <td>{item.name}</td>
                                                <td>{item.email}</td>
                                                <td>{item.pwd}</td>
                                                <td>
                                                    <input
                                                        type="number"
                                                        value={item.obalance || 0}
                                                        onChange={(e) => {
                                                            const updated = transportList.map(row =>
                                                                row.id === item.id
                                                                    ? {
                                                                        ...row,
                                                                        obalance: e.target.value
                                                                    }
                                                                    : row
                                                            );

                                                            setTransportList(updated);
                                                        }}
                                                        className="editable-control"
                                                    />
                                                </td>
                                                <td>
                                                    <span className={`badge ${item.tActive === "Active" ? "bg-success" : "bg-danger"}`}>
                                                        {item.tActive}
                                                    </span>
                                                </td>
                                                <td>
                                                    <div className="text-end">
                                                        <Link to="#" type="button" className="avtar edit" data-bs-toggle="tooltip" data-bs-placement="top" title="Edit"
                                                            onClick={() => {
                                                                setIsEdit(true);
                                                                setEditId(item.id);
                                                                setFormData({
                                                                    name: item.name || "",
                                                                    faxno: item.faxno || "",
                                                                    address: item.address || "",
                                                                    contact: item.contact || "",
                                                                    email: item.email || "",
                                                                    tActive: item.tActive === "Active" ? 1 : 0
                                                                });
                                                                setShowModal(true);
                                                            }}>
                                                            <IconPencil />
                                                        </Link>
                                                        <Link to="#" type="button" className="avtar delete" data-bs-toggle="tooltip" data-bs-placement="top" title="Delete" 
                                                            onClick={() => {
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
                                {selectedIds.length} Selected from {transportList.length}
                            </div>
                            <div className="actionButtonArea">
                                <button className="btn btn-xs btn-primary"><IconChecks /> Active</button>
                                <button className="btn btn-xs btn-warning"><IconX /> De-Active</button>
                                <button className="btn btn-xs btn-danger"><IconTrash /> Delete</button>
                                <button className="btn btn-xs btn-light" onClick={() => setSelectedIds([])}><IconArrowLeft /> Cancel</button>
                            </div>
                        </div>

                        {/*--pagination--*/}
                        <div className="paginationBlock d-flex justify-content-between align-items-center p-3">
                            <div>
                                {totalItems > 0
                                    ? `${startIndex + 1} - ${Math.min(
                                        startIndex + itemsPerPage,
                                        totalItems
                                    )} of ${totalItems}`
                                    : "0 entries"}
                            </div>

                            <ul className="pagination mb-0">
                                <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                                    <button className="page-link"
                                        onClick={() =>
                                            setCurrentPage(prev => prev - 1)
                                        }>
                                        <IconChevronLeft />
                                    </button>
                                </li>

                                {[...Array(totalPages)].map((_, i) => (
                                    <li key={i}
                                        className={`page-item ${
                                            currentPage === i + 1
                                                ? "active"
                                                : ""
                                        }`}>
                                        <button className="page-link"
                                            onClick={() =>
                                                setCurrentPage(i + 1)
                                            }>
                                            {i + 1}
                                        </button>
                                    </li>
                                ))}

                                <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                                    <button className="page-link"
                                        onClick={() =>
                                            setCurrentPage(prev => prev + 1)
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

        {/* Right Slide Drawer */}
        <div className={`custom-drawer ${showModal ? "open" : ""}`}>
            <div className="drawer-header">
                <h5>{isEdit ? "Edit Transport" : "Add Transport"}</h5>
                <button className="btn-close" onClick={() => setShowModal(false)}></button>
            </div>
            <div className="drawer-body">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label">Transport Name </label>
                        <input type="text" name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="form-control"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Contact No.</label>
                        <input type="number" name="contact"
                            value={formData.contact}
                            onChange={handleChange}
                            className="form-control"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Fax No.</label>
                        <input type="text" name="faxno"
                            value={formData.faxno}
                            onChange={handleChange}
                            className="form-control"
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
                        <label className="form-label">Address </label>
                        <input type="text" name="address"
                            value={formData.address}
                            onChange={handleChange}
                            className="form-control"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Status</label>
                            <select name="tActive"
                                value={formData.tActive}
                                onChange={handleChange}
                                required
                                className="form-control">
                                <option value={1}>Active</option>
                                <option value={0}>De-Active</option>
                            </select>
                    </div>
                    <button type="submit" className="btn btn-primary w-100 mt-4">
                        {isEdit ? "Update Transport" : "Submit"}
                    </button>
                </form>
            </div>
        </div>
        
        {/* Overlay */}
        {showModal && (
            <div className="drawer-overlay" onClick={() => setShowModal(false)}></div>
        )}

        {showDeleteModal && (
            <>
                <div className="modal fade show d-block" tabIndex="-1"
                    style={{ background: "rgba(0,0,0,.5)" }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header mb-0">
                                <h5 className="modal-title">Confirm Delete</h5>
                                <button className="btn-close"
                                    onClick={()=>{
                                        setShowDeleteModal(false)
                                        setDeleteId(null)
                                    }}
                                />
                            </div>
                            <div className="modal-body mt-0">
                                <h6 className="mb-0 fw-400">Are you sure you want to delete this transport?</h6>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-sm btn-light"
                                    onClick={()=>{
                                        setShowDeleteModal(false)
                                        setDeleteId(null)
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

        <ToastContainer />
    </>
  );
}

export default Transport
