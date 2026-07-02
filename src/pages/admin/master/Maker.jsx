import { IconCirclePlusFilled, IconPencil, IconTrash, IconChevronLeft, IconChevronRight, IconCheck, IconArrowLeft} from '@tabler/icons-react'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Maker() {

    const [maker, setMaker] = useState([]);
    const [selectedIds, setSelectedIds] = useState([]);
    const [showModal, setShowModal] = useState(false);

    const [isEdit, setIsEdit] = useState(false);
    const [selectedMakerId, setSelectedMakerId] = useState(null);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const totalItems = maker.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentItems = maker.slice(startIndex, startIndex + itemsPerPage);

    const [formData, setFormData] = useState({
        name: "",
        mactive: 1,
        titleTag: "",
        keywordTag: "",
        descriptionTag: "",
        canonicalTag: "",
        details: "",
        nameRussia: "",
        nameJapan: "",
        flag: null
    });

    // fetch data
    const fetchMaker = async () => {
        try {
        const response = await fetch(`https://localhost:7244/api/master/view-maker`);

        if (!response.ok) throw new Error("API Error");

        const data = await response.json();
        console.log("MAKER DATA:", data);

        setMaker(data.data || []);
        setCurrentPage(1);

        } catch (error) {
            console.error("Error Fetch data:", error);
        }
    };

    useEffect(() => {
        fetchMaker();
    }, []);

    // select single checkbox
    const handleCheckboxChange = (id) => {
        if (selectedIds.includes(id)) {
            setSelectedIds(selectedIds.filter(item => item !== id));
        } else {
            setSelectedIds([...selectedIds, id]);
        }
    };

    // add maker
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const payload = {
                name: formData.name,
                mactive: Number(formData.mactive),
                titleTag: formData.titleTag,
                keywordTag: formData.keywordTag,
                descriptionTag: formData.descriptionTag,
                canonicalTag: formData.canonicalTag,
                details: formData.details,
                flag: "",
                nameRussia: formData.nameRussia,
                nameJapan: formData.nameJapan
            };

            const response = await fetch(
                "https://localhost:7244/api/master/add-maker",
                {
                    method: "POST",
                    headers: {
                        "Content-Type":"application/json"
                    },
                    body: JSON.stringify(payload)
                }
            );

            const data = await response.json();

            if(response.ok){
                toast.success("Maker Added Successfully");
                fetchMaker();
                setShowModal(false);
            } else {
                toast.error(data.message || "Failed to add maker");
            }

        } catch(error){
            console.log(error);
            toast.error("Something went wrong");
        }
    };

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]:
            files
            ? files[0]
            : name === "mactive"
            ? Number(value)
            : value
        }));
    };

    // delete maker
    const handleDelete = async (id) => {

        if (!window.confirm("Delete this maker?")) return;

        try {
            await axios.delete("https://localhost:7244/api/master/delete-maker",
                {
                    data: [{ id }]
                }
            );

            toast.success("Maker Successfully Deleted");
            fetchMaker();
            setSelectedIds(prev =>
                prev.filter(item => item !== id)
            );

        } catch(error){
            console.log(error.response?.data || error);
            toast.error("Delete failed");
        }
    };

    // edit maker
    const handleEdit = (item) => {
        setIsEdit(true);
        setSelectedMakerId(item.id);
        setFormData({
            name: item.name || "",
            mactive: Number(item.mactive) || 1,
            titleTag: item.titleTag || "",
            keywordTag: item.keywordTag || "",
            descriptionTag: item.descriptionTag || "",
            canonicalTag: item.canonicalTag || "",
            details: item.details || "",
            nameRussia: item.nameRussia || "",
            nameJapan: item.nameJapan || "",
            flag: item.flag || ""
        });
        setShowModal(true);
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                id:selectedMakerId,
                name: formData.name,
                mactive:Number(formData.mactive),
                titleTag:formData.titleTag,
                keywordTag:formData.keywordTag,
                descriptionTag:formData.descriptionTag,
                canonicalTag:formData.canonicalTag,
                details:formData.details,
                flag:"",
                nameRussia:formData.nameRussia,
                nameJapan:formData.nameJapan
            };

            await axios.put(
                "https://localhost:7244/api/master/update-maker",
                payload
            );

            toast.success("Maker Updated");
            fetchMaker();
            setShowModal(false);
            setIsEdit(false);
        } catch(error){
            console.log(error.response?.data);
            toast.error("Update failed");
        }
    };

    // select all checkboxes
    const handleSelectAll = (e) => {
        if (e.target.checked) {
            const allIds = maker.map(item => item.id); 
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
    }, [maker]); 

  return (
    <>
        <div className="row">
            <div className="col-lg-12">
                <div className="card table-card overflow-hidden">
                    <div className="card-header">
                        <h5 className="title">Maker</h5>
                        <button className="btn btn-sm btn-primary" onClick={() => setShowModal(true)}><IconCirclePlusFilled /> Add Maker</button>
                    </div>
                    <div className="card-body">
                        <div className="table-responsive">
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th>
                                            <input type="checkbox" className="form-check-input" 
                                                onChange={handleSelectAll}
                                                checked={selectedIds.length === maker.length && maker.length > 0} 
                                            />
                                        </th>
                                        <th>Maker Name</th>
                                        <th>Country</th>
                                        <th>Russia</th>
                                        <th>Japan</th>
                                        <th>Logo</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {currentItems.length > 0 ? (
                                    currentItems.map((item) => (
                                    <tr key={item.id}>
                                        <td>
                                            <input type="checkbox" className="form-check-input"
                                                checked={selectedIds.includes(item.id)}
                                                onChange={() => handleCheckboxChange(item.id)}
                                            />
                                        </td>
                                        <td>{item.name}</td>
                                        <td>{item.cname}</td>
                                        <td>
                                            <input type="text" name="nameRussia"
                                                value={item.nameRussia || ""}
                                                onChange={(e) => {
                                                const updated = maker.map(cat =>
                                                    cat.id === item.id
                                                    ? { ...cat, nameRussia: e.target.value }
                                                    : cat
                                                );
                                                setMaker(updated);
                                                }}
                                                className="editable-control"
                                            />
                                        </td>
                                        <td>
                                            <input type="text" name="nameJapan"
                                                value={item.nameJapan || ""}
                                                onChange={(e) => {
                                                const updated = maker.map(cat =>
                                                    cat.id === item.id
                                                    ? { ...cat, nameJapan: e.target.value }
                                                    : cat
                                                );
                                                setMaker(updated);
                                                }}
                                                className="editable-control"
                                            />
                                        </td>
                                        <td>
                                        {item.flag ? (
                                            <img src={`https://www.bizupon.com/Makerimage/${item.flag}`} alt="" width="40" />
                                            ) : "-"}
                                        </td>
                                        <td>
                                            <span className={`badge ${item.mactive === "Active" ? "bg-success" : "bg-danger"}`}>
                                                {item.mactive}
                                            </span>
                                        </td>
                                        <td>
                                            <div className="text-end">
                                                <Link to="#" className="avtar edit" data-bs-toggle="tooltip" data-bs-placement="top" title="Edit" onClick={() => handleEdit(item)}><IconPencil /></Link>
                                                <Link to="#" className="avtar delete" data-bs-toggle="tooltip" data-bs-placement="top" title="Delete" onClick={() => handleDelete(item.id)}><IconTrash /></Link>
                                            </div>
                                        </td>
                                    </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="8" className="text-center">No Data Found</td>
                                    </tr>
                                )}
                                </tbody>
                            </table>
                        </div>

                        <div className={`actionModal ${selectedIds.length > 0 ? "" : "d-none"}`}>
                            <div className="selectedItem">
                                {selectedIds.length} Selected from {maker.length}
                            </div>
                            <div className="actionButtonArea">
                                <button className="btn btn-xs btn-primary"><IconCheck /> Update</button>
                                <button className="btn btn-xs btn-danger"><IconTrash /> Delete</button>
                                <button className="btn btn-xs btn-light" onClick={() => setSelectedIds([])}><IconArrowLeft /> Cancel</button>
                            </div>
                        </div>

                        {/* ✅ PAGINATION */}
                        <div className="paginationBlock d-flex justify-content-between align-items-center p-3">
                            <div>
                                {totalItems > 0
                                ? `${startIndex + 1} - ${Math.min(startIndex + itemsPerPage, totalItems)} of ${totalItems}`
                                : "0 entries"}
                            </div>
                            <ul className="pagination mb-0">
                                <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                                    <button className="page-link" onClick={() => setCurrentPage(prev => prev - 1)}>
                                        <IconChevronLeft />
                                    </button>
                                </li>
                                {[...Array(totalPages)].map((_, i) => (
                                    <li key={i} className={`page-item ${currentPage === i + 1 ? "active" : ""}`}>
                                        <button className="page-link" onClick={() => setCurrentPage(i + 1)}>
                                        {i + 1}
                                        </button>
                                    </li>
                                ))}
                                <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                                    <button className="page-link" onClick={() => setCurrentPage(prev => prev + 1)}>
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
                <h5>{isEdit ? "Edit Maker" : "Add Maker"}</h5>
                <button className="btn-close" onClick={() => setShowModal(false)}></button>
            </div>

            <div className="drawer-body">
                <form onSubmit={isEdit ? handleUpdate : handleSubmit}>
                    <div className="form-group">
                        <label className="form-label">Maker Name</label>
                        <input type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Maker Name (In Russia)</label>
                        <input type="text"
                            name="nameRussia"
                            value={formData.nameRussia}
                            onChange={handleChange}
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Maker Name (In japan)</label>
                        <input type="text"
                            name="nameJapan"
                            value={formData.nameJapan}
                            onChange={handleChange}
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Browse Maker Logo</label>
                        <input type="file"
                            name="logo"
                            onChange={handleChange}
                            className="form-control"
                        />
                    </div>
                    <div className="d-flex  justify-content-between gap-3">
                        <div className="form-group w-100">
                            <label className="form-label">Title Tag</label>
                            <input type="text"
                                name="titleTag"
                                value={formData.titleTag}
                                onChange={handleChange}
                                className="form-control"
                            />
                        </div>
                        <div className="form-group w-100">
                            <label className="form-label">Keyword Tag</label>
                            <input type="text"
                                name="keywordTag"
                                value={formData.keywordTag}
                                onChange={handleChange}
                                className="form-control"
                            />
                        </div>
                    </div>
                    
                    <div className="d-flex  justify-content-between gap-3">
                        <div className="form-group w-100">
                            <label className="form-label">Canonical Tag</label>
                            <input type="text"
                                name="canonicalTag"
                                value={formData.canonicalTag}
                                onChange={handleChange}
                                className="form-control"
                            />
                        </div>
                        <div className="form-group w-100">
                            <label className="form-label">Status</label>
                            <select name="mactive"
                                value={formData.mactive}
                                onChange={handleChange}
                                className="form-control">
                                <option value={1}>Active</option>
                                <option value={0}>De-Active</option>
                            </select>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="form-label">Description</label>
                        <textarea rows="3"
                            name="details"
                            value={formData.details}
                            onChange={handleChange}
                            className="form-control"
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100 mt-4">
                        {isEdit ? "Update Maker" : "Add Maker"}
                    </button>
                </form>
            </div>
        </div>
        {/* Overlay */}
        {showModal && (
            <div className="drawer-overlay" onClick={() => setShowModal(false)}></div>
        )}
        <ToastContainer />
    </>
  )
}

export default Maker;