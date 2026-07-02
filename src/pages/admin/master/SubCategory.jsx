import React, { useState, useEffect } from 'react'
import { IconCirclePlusFilled, IconPencil, IconTrash, IconArrowLeft, IconCheck } from '@tabler/icons-react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import Select from 'react-select';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SubCategory() {

    const [subcategories, setSubcategories] = useState([]);
    const [selectedIds, setSelectedIds] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [categories, setCategories] = useState([]);
    const [selectCategories, setSelectCategories] = useState(null)

    const [isEdit, setIsEdit] = useState(false);
    const [editId, setEditId] = useState(null);

    const [deleteId, setDeleteId] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const fetchSubcategories = async () => {
        try {
            const res = await axios.get("https://localhost:7244/api/master/view-subcategories");
            console.log(res.data);
            setSubcategories(
                res.data.data || res.data
            );
        } catch (error) {
            console.error(
                "Error fetching data:",
                error
            );
        }
    };

    // fetch categories data
    const fetchCategories = async () => {
        try {
            const res = await axios.get("https://localhost:7244/api/Port/GetddlCategory");
            const data = (res.data.data || []).map(item => ({
                value: item.id,
                label: item.name
            }));
            setCategories(data);
        } catch (err) {
            console.log(err);
        }
    };

    // fetch data
    useEffect(() => {
        fetchSubcategories();
        fetchCategories();
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
            const allIds = subcategories.map(item => item.id);
            setSelectedIds(allIds);
        } else {
            setSelectedIds([]);
        }
    };

    // add sub cagegories
    const [formData, setFormData] = useState({
        name: "",
        cActive: 1,
        titleTag: "",
        keywordTag: "",
        descriptionTag: "",
        nameRussia: "",
        nameJapan: "",
        cid: 0,
        scActive: 1
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async(e)=>{
        e.preventDefault();
        try{
            const payload={
            id:Number(editId),
            name:formData.name,
            flag:formData.flag || "",
            sActive:Number(formData.sActive),
            titleTag:formData.titleTag,
            keywordTag:formData.keywordTag,
            descriptionTag:formData.descriptionTag,
            nameRussia:formData.nameRussia,
            nameJapan:formData.nameJapan,
            catID:Number(selectCategories?.value)
        };

        console.log(payload);

        await axios.put("https://localhost:7244/api/master/update-subcategory",
            payload
        );

        toast.success("Updated Successfully");
        fetchSubcategories();
        setShowModal(false);

    }   catch(error){
            console.log(error.response?.data);
            toast.error("Update failed");
        }
    }

    // edit sub categories
    const handleEdit = async (id) => {
        try {
            const res = await axios.get(`https://localhost:7244/api/master/edit-subcategory?id=${id}`);

            const data = res.data.data[0];
            setIsEdit(true);
            setEditId(data.id);
            setFormData({
                name: data.name || "",
                flag: data.flag || "",
                sActive: data.sActive === "True" ? 1 : 0,
                titleTag: data.titleTag || "",
                keywordTag: data.keywordTag || "",
                descriptionTag: data.descriptionTag || "",
                nameRussia: data.nameRussia || "",
                nameJapan: data.nameJapan || ""
            });

            // category dropdown selected
            setSelectCategories({
                value: data.catID || 0,
                label: data.categoryName || "Select Category"
            });
            setShowModal(true);
        } catch(error) {
            console.log(error);
            toast.error("Edit load failed");
        }
    };

    // delete
    const handleDelete = async () => {
        try {
            await axios.delete("https://localhost:7244/api/master/delete-subcategory",
                {
                    data: [
                        {
                            id: deleteId
                        }
                    ]
                }
            );

            toast.success("Sub Category Deleted");
            fetchSubcategories();

            setSelectedIds(prev =>
                prev.filter(item => item !== deleteId)
            );

            setShowDeleteModal(false);
            setDeleteId(null);

        } catch (error) {
            console.log(error.response);
            toast.error(
                error?.response?.data?.message ||
                "Delete failed"
            );
        }
    };

  return (
    <>
        <div className="row">
            <div className="col-lg-12 col-12">
                <div className="card table-card overflow-hidden">
                    <div className="card-header">
                        <h5>Sub Categories</h5>
                        <button type="submit" className="btn btn-sm btn-primary" onClick={() => setShowModal(true)}><IconCirclePlusFilled /> Add Sub Categories</button>
                    </div>
                    <div className="card-body">
                        <div className="table-responsive">
                            <table className="table table-hover" id="pc-dt-simple">
                                <thead>
                                    <tr>
                                        <th>
                                            <input type="checkbox" className="form-check-input"
                                                onChange={handleSelectAll}
                                                checked={selectedIds.length === subcategories.length && subcategories.length > 0}
                                            />
                                        </th>
                                        <th>Sub Category Name</th>
                                        <th>Russia</th>
                                        <th>Japan</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {subcategories.map((item, index) => (
                                        <tr key={index}>
                                            <td>
                                                <input type="checkbox" className="form-check-input"
                                                    checked={selectedIds.includes(item.id)}
                                                    onChange={() => handleCheckboxChange(item.id)}
                                                />
                                            </td>
                                            <td>{item.name}</td>
                                            <td>
                                                <input type="text" name="nameRussia"
                                                    value={item.nameRussia || ""}
                                                    onChange={(e) => {
                                                    const updated = subcategories.map(cat =>
                                                        cat.id === item.id
                                                        ? { ...cat, nameRussia: e.target.value }
                                                        : cat
                                                    );
                                                    setSubcategories(updated);
                                                    }}
                                                    className="editable-control"
                                                />
                                            </td>
                                            <td>
                                                <input type="text" name="nameJapan"
                                                    value={item.nameJapan || ""}
                                                    onChange={(e) => {
                                                    const updated = subcategories.map(cat =>
                                                        cat.id === item.id
                                                        ? { ...cat, nameJapan: e.target.value }
                                                        : cat
                                                    );
                                                    setSubcategories(updated);
                                                    }}
                                                    className="editable-control"
                                                />
                                            </td>
                                            <td>
                                                <span className={`badge ${item.cActive === "Active" ? "bg-success" : "bg-danger"}`}>
                                                    {item.cActive}
                                                </span>
                                            </td>
                                            <td>
                                                <div className="text-end">
                                                    <Link to="#" className="avtar edit" data-bs-toggle="tooltip" data-bs-placement="top" title="Edit" onClick={()=>handleEdit(item.id)}><IconPencil /></Link>
                                                    <Link to="#" className="avtar delete" data-bs-toggle="tooltip" data-bs-placement="top" title="Delete" 
                                                        onClick={() => {
                                                        setDeleteId(item.id);
                                                        setShowDeleteModal(true);
                                                        }}><IconTrash />
                                                    </Link>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className={`actionModal ${selectedIds.length > 0 ? "" : "d-none"}`}>
                            <div className="selectedItem">
                                {selectedIds.length} Selected from {subcategories.length}
                            </div>
                            <div className="actionButtonArea">
                                <button className="btn btn-xs btn-primary"><IconCheck /> Update</button>
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
                <h5>Add Sub Categories</h5>
                <button className="btn-close" onClick={() => setShowModal(false)}></button>
            </div>
            <div className="drawer-body">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label">Select Category Name</label>
                        <Select 
                            options={categories}
                            value={selectCategories}
                            onChange={setSelectCategories}
                            placeholder="Select Category Name"
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Sub Category Name</label>
                        <input type="text" className="form-control" name="name"
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Category Name (In Russia)</label>
                        <input type="text" className="form-control" name="nameRussia"
                            value={formData.nameRussia}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Category Name (In Japan)</label>
                        <input type="text" className="form-control" name="nameJapan"
                            value={formData.nameJapan}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Title Tag</label>
                        <input type="text" className="form-control" name="titleTag"
                            value={formData.titleTag}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Keyword Tag</label>
                        <input type="text" className="form-control" name="keywordTag"
                            value={formData.keywordTag}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Status</label>
                        <select className="form-control" name="cActive"
                            value={formData.cActive}
                            onChange={handleChange}>
                            <option value={1}>Active</option>
                            <option value={0}>De-Active</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label className="form-label">Description</label>
                        <textarea className="form-control" rows="2" name="descriptionTag"
                            value={formData.descriptionTag}
                            onChange={handleChange}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100 mt-4">
                        {isEdit ? "Update Sub Category" : "Add Sub Category"}
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
                                <h6 className="mb-0 fw-400">Are you sure you want to delete this sub category?</h6>
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
  )
}

export default SubCategory
