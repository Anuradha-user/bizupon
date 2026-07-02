import { IconCirclePlusFilled, IconPencil, IconTrash } from '@tabler/icons-react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function DepartmentMaster() {

    const [loading, setLoading] = useState(false);
    const [departmentlist, setDepartmentList] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedIds, setSelectedIds] = useState([]);
    const [isEdit, setIsEdit] = useState(false);
    const [editId, setEditId] = useState(null);

    // fetch data
    useEffect(() => {
        fetchDeparmentData();
    }, []);

    const fetchDeparmentData = async () => {
        setLoading(true);
        try {
            const res = await axios.get('https://localhost:7244/api/master/view-department')
            setDepartmentList(res.data.data || res.data);
        }
        catch (error) {
            console.error("error fetching data", error);
        } finally {
            setLoading(false);
        }
    };

    // add deparment
    const [formData, setFormData] = useState({
        departmentName: '',
        departmentCode: ''
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
            if (isEdit) {
                // UPDATE API
                await axios.put(
                    'https://localhost:7244/api/master/update-department',
                    {
                        id: editId,
                        departmentName: formData.departmentName,
                        departmentCode: formData.departmentCode
                    }
                );

                toast.success("Department Updated Successfully");
            } else {
                // ADD API
                await axios.post(
                    'https://localhost:7244/api/master/add-department',
                    {
                        departmentName: formData.departmentName,
                        departmentCode: formData.departmentCode
                    }
                );

                toast.success("Department Added Successfully");
            }

            // reset
            setFormData({
                departmentName: '',
                departmentCode: ''
            });

            setIsEdit(false);
            setEditId(null);
            setShowModal(false);

            fetchDeparmentData();

        } catch (error) {
            console.error("Error saving department", error);
            toast.error("Failed to save department");
        }
    };

    // delete department
    const handleConfirmDelete = async (id) => {
        if (selectedIds.length === 0) {
            toast.warning("Please select at least one record");
            return;
        }
        try {
            const response = await axios.delete("https://localhost:7244/api/master/delete-department", {
                data: [
                    {
                        "id": selectedIds[0],
                        "userId": 9183
                    }
                ]
            })

            console.log("response", response);

            toast.success("Deleted Successfully");

            fetchDeparmentData();
            closeDeleteModal();
            setSelectedIds([]);
            setShowDeleteModal(false);

        } catch (error) {
            console.error("Delete error", error);
            toast.error("Failed to delete");
        }
    };

    const closeDeleteModal = () => {
        setShowDeleteModal(false);
        setSelectedIds([]);
    };

    const handleCheckboxChange = (id) => {
        setSelectedIds(prev => 
            prev.includes(id)
                ? prev.filter(item => item !== id)
                : [...prev, id]
        );
    };

    return (
        <>
             <ToastContainer 
                position="top-right"
                autoClose={3000}
                theme="colored"
            />

            <div className="row">
                <div className="col-lg-12 col-12">
                    <div className="card table-card overflow-hidden">
                        <div className="card-header">
                            <h5 className="title">Department Master</h5>
                            <button className="btn btn-sm btn-primary" onClick={() => setShowModal(true)}><IconCirclePlusFilled /> Add Department</button>
                        </div>
                        <div className="card-body">
                            <div className="table-responsive">
                                <table className="table table-hover">
                                    <thead>
                                        <tr>
                                            <th>
                                                <input type="checkbox" className="form-check-input" disabled />
                                            </th>
                                            <th>Department Name</th>
                                            <th>Department Code</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {loading ? (
                                            <tr>
                                                <td colSpan="4" className="text-center py-4">
                                                    <div className="spinner-border text-primary" role="status">
                                                        <span className="visually-hidden">Loading...</span>
                                                    </div>
                                                </td>
                                            </tr>
                                        ) : departmentlist.length === 0 ? (
                                            <tr>
                                                <td colSpan="4" className="text-center py-4">
                                                    No Data Found
                                                </td>
                                            </tr>
                                        ) : (
                                            departmentlist.map(item => (
                                            <tr key={item.id}>
                                                <td>
                                                    <input type="checkbox" className="form-check-input"
                                                        checked={selectedIds.includes(item.id)}
                                                        onChange={() => handleCheckboxChange(item.id)}
                                                    />
                                                </td>
                                                <td>{item.departmentName}</td>
                                                <td>{item.departmentCode}</td>
                                                <td>
                                                    <div className="text-end">
                                                        <Link to="#" className="avtar edit" data-bs-toggle="tooltip" data-bs-placement="top" title="Edit"
                                                            onClick={() => {
                                                                setFormData({
                                                                    departmentName: item.departmentName,
                                                                    departmentCode: item.departmentCode
                                                                });
                                                                setEditId(item.id);
                                                                setIsEdit(true);
                                                                setShowModal(true);
                                                            }}><IconPencil />
                                                        </Link>
                                                        <Link to="#" className="avtar delete" data-bs-toggle="tooltip" data-bs-placement="top" title="Delete" 
                                                            onClick={() => {
                                                                setSelectedIds([item.id]);
                                                                setShowDeleteModal(true);
                                                            }}>
                                                            <IconTrash />
                                                        </Link>
                                                    </div>
                                                </td>
                                            </tr>
                                            ))
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
                    <h5>{isEdit ? "Edit Department" : "Add Department Master"}</h5>
                    <button className="btn-close" onClick={() => setShowModal(false)}></button>
                </div>
                <div className="drawer-body">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label className="form-label">Department Name</label>
                            <input type="text" name="departmentName" required
                                className="form-control"
                                value={formData.departmentName}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Department Code</label>
                            <input type="text" name="departmentCode" required
                                className="form-control"
                                value={formData.departmentCode}
                                onChange={handleChange}
                            />
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


            {/*-- delete row alert popup --*/}
            {showDeleteModal && (
                <>
                    <div className="modal fade show d-block">
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-header m-0">
                                    <h5 className="modal-title">Confirm Delete</h5>
                                    <button className="btn-close" 
                                         onClick={() => {
                                            setShowModal(false);
                                            setIsEdit(false);
                                            setEditId(null);
                                            setFormData({
                                                departmentName: '',
                                                departmentCode: ''
                                            });
                                        }}>
                                    </button>
                                </div>
                                <div className="modal-body m-0">
                                    Are you sure you want to delete {selectedIds.length} selected record(s)?
                                </div>
                                <div className="modal-footer">
                                    <button className="btn btn-sm btn-light" onClick={() => {
                                            setShowDeleteModal(false);
                                            setSelectedIds([]);
                                        }}>
                                        Cancel
                                    </button>
                                    <button className="btn btn-sm btn-danger" onClick={()=>handleConfirmDelete()}>
                                        Yes, Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* backdrop */}
                    <div className="modal-backdrop fade show"></div>

                </>
            )}
        </>
    )
}

export default DepartmentMaster
