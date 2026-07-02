import { IconCirclePlusFilled, IconPencil, IconTrash } from '@tabler/icons-react'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Fuzokuhin() {

    const [showModal, setShowModal] = useState(false);
    const [fuzokuhinList, setFuzokuhinList ] = useState([]);
    const [selectedIds, setSelectedIds] = useState([]);

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

    const [isEdit, setIsEdit] = useState(false);
    const [editId, setEditId] = useState(null);

    // Fetch API
    useEffect(()=>{
        fetchfuzokuhin()
    }, [])

    const fetchfuzokuhin = async () => {
        try{
            const res = await axios.get('https://localhost:7244/api/master/view-fuzokuhin')
            setFuzokuhinList(res.data.data || res.data)
        } 
        catch (error){
            console.error("Error fetching data:", error)
        }
    }

    // add fuzokuhin
    const [formData, setFormData] = useState({
        fuzokuhinName: "",
        price: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const payload = {
                id: editId,
                fuzokuhinName: formData.fuzokuhinName,
                price: Number(formData.price),
                uid: 1
            };

            console.log("Payload:", payload);

            if (isEdit) {
                await axios.put("https://localhost:7244/api/master/update-fuzokuhin",payload);
                toast.success(
                    "Fuzokuhin updated successfully!"
                );

            } else {

                await axios.post("https://localhost:7244/api/master/add-fuzokuhin",
                    {
                        fuzokuhinName: formData.fuzokuhinName,
                        price: Number(formData.price),
                        uid: 1
                    }
                );
                toast.success(
                    "Fuzokuhin added successfully!"
                );
            }

            fetchfuzokuhin();
            setFormData({
                fuzokuhinName: "",
                price: ""
            });

            setIsEdit(false);
            setEditId(null);
            setShowModal(false);

        } catch (error) {
            console.log(
                "API Error:",
                error.response?.data
            );
            toast.error(
                isEdit ? "Update failed" : "Add failed"
            );
        }
    };
    // delete fuzokuhin
    const handleDelete = async (id) => {
        try {
            await axios.delete(`https://localhost:7244/api/master/delete-fuzokuhin?id=${deleteId}`);

            toast.success("Deleted successfully!");

            fetchfuzokuhin();
            setShowDeleteModal(false);
            setDeleteId(null);

        } catch (error) {
            toast.error("Delete failed");
            console.log(error.response?.data || error);
        }
    };

    // edit fuzokuhin
    const handleEdit = (item) => {
        setIsEdit(true);
        setEditId(item.id || item.uid);
        setFormData({
            fuzokuhinName: item.fuzokuhinName || "",
            price: item.price || ""
        });
        setShowModal(true);
    };

    // selct all checkboxes
    const handleSelectAll = (e) => {
        if (e.target.checked) {
            setSelectedIds(
                fuzokuhinList.map((_, index) => index)
            );
        } else {
            setSelectedIds([]);
        }
    };
    
    // selct single checkbox
    const handleCheckboxChange = (id) => {
        setSelectedIds(prev =>
            prev.includes(id)
                ? prev.filter(item => item !== id)
                : [...prev, id]
        );
    };

  return (
    <>
        <div className="row">
            <div className="col-lg-12 col-md-12 col-12">
                <div className="card table-card overflow-hidden">
                    <div className="card-header">
                        <h5>Fuzokuhin Master</h5>
                        <button type="submit" className="btn btn-sm btn-primary" onClick={() => setShowModal(true)}><IconCirclePlusFilled /> Add Fuzokuhin</button>
                    </div>
                    <div className="card-body">
                        <div className="table-responsive">
                            <table className="table table-hover" id="pc-dt-simple">
                                <thead>
                                    <tr>
                                        <th>
                                            <input type="checkbox" className="form-check-input" 
                                                onChange={handleSelectAll}
                                                checked={
                                                    fuzokuhinList.length > 0 &&
                                                    fuzokuhinList.every((_, index) =>
                                                        selectedIds.includes(index)
                                                    )
                                                }
                                            />
                                        </th>
                                        <th>Fuzokuhin</th>
                                        <th>Price</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {fuzokuhinList.length > 0 ? (
                                        fuzokuhinList.map((item, index) => (
                                            <tr key={item.id || index}>
                                                <td>
                                                    <input type="checkbox" className="form-check-input"
                                                        checked={selectedIds.includes(index)}
                                                        onChange={() => handleCheckboxChange(index)}
                                                    />
                                                </td>
                                                <td>{item.fuzokuhinName}</td>
                                                <td>{item.price}</td>
                                                <td>
                                                    <div className="text-end">
                                                        <Link to="#" className="avtar edit"
                                                            onClick={() => handleEdit(item)}>
                                                            <IconPencil />
                                                        </Link>
                                                        <Link to="#" className="avtar delete"
                                                            onClick={() => {
                                                                setDeleteId(item.id || item.uid);
                                                                setShowDeleteModal(true);
                                                            }}>
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
                        ? "Edit Fuzokuhin"
                        : "Add Fuzokuhin"}
                </h5>
                <button className="btn-close" 
                    onClick={()=>{
                        setShowModal(false);
                        setIsEdit(false);
                        setEditId(null);
                        setFormData({
                            fuzokuhinName:"",
                            price:""
                        });
                    }}>
                </button>
            </div>

            <div className="drawer-body">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label">Fuzokuhin Name</label>
                        <input type="text" className="form-control" name="fuzokuhinName"
                            value={formData.fuzokuhinName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Price</label>
                        <input type="number" className="form-control" name="price"
                            value={formData.price}
                            onChange={handleChange}
                            required
                        />
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

        {showDeleteModal && (
        <>
            <div className="modal fade show d-block">
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
                            Are you sure you want to delete this Fuzokuhin?
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-sm btn-light"
                                onClick={() => {
                                    setShowDeleteModal(false);
                                    setDeleteId(null);
                                }}
                            >Cancel
                            </button>
                            <button className="btn btn-sm btn-danger"
                                onClick={handleDelete}
                            >Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal-backdrop fade show"></div>
        </>
    )}

    <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
    />

    </>
  )
}

export default Fuzokuhin
