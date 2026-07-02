import React, { useState, useEffect } from 'react';
import { IconPencil, IconTrash, IconChevronRight, IconChevronLeft, IconCirclePlus, IconCirclePlusFilled, IconArrowLeft, IconReload, IconChecks, IconCancel } from '@tabler/icons-react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import flag from '../../../admin-images/port-images.png';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Categories() {

  const [showModal, setShowModal] = useState(false);

  const [categories, setCategories] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);

  const [isEdit, setIsEdit] = useState(false);
  const [editCategoryId, setEditCategoryId] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const totalItems = categories.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = categories.slice(startIndex, startIndex + itemsPerPage);

  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({
    nameRussia: "",
    nameJapan: ""
  });

  const handleSave = (id) => {
    const updated = categories.map(item =>
      item.id === id ? { ...item, ...editData } : item
    );
    setCategories(updated);
    setEditId(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id)
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      const allIds = categories.map(item => item.id);
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
  }, [categories]); // re-run after data load

  // fetch data in table
  const fetchcategorydata = async () => {
    try{
      const res = await axios.get('https://localhost:7244/api/master/view-categories')
      setCategories(res.data.data || res.data)
    }
    catch (error) {
      console.error("Error fetching data:", error)
    }
  }

  useEffect(() => {
    fetchcategorydata()
  }, []);

  // add category
  const [formData, setFormData] = useState({
    name: "",
    flag: null,
    sActive: 1,
    titleTag: "",
    keywordTag: "",
    descriptionTag: "",
    nameRussia: "",
    nameJapan: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      flag: e.target.files[0]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      // Add
      if (!isEdit) {

        const addPayload = {
          name: formData.name,
          flag: formData.flag?.name || "",
          sActive: Number(formData.sActive),
          titleTag: formData.titleTag,
          keywordTag: formData.keywordTag,
          descriptionTag: formData.descriptionTag,
          nameRussia: formData.nameRussia,
          nameJapan: formData.nameJapan
        };

        await axios.post(
          "https://localhost:7244/api/master/add-category",
          addPayload
        );

        toast.success("Category Added");
      }

      // Edit
      else {

        const updatePayload = {
          name: formData.name,
          flag: formData.flag?.name || "",
          sActive: Number(formData.sActive),
          titleTag: formData.titleTag,
          keywordTag: formData.keywordTag,
          descriptionTag: formData.descriptionTag,
          nameRussia: formData.nameRussia,
          nameJapan: formData.nameJapan,

          catID: editCategoryId, // IMPORTANT
          id: 0
        };

        console.log(updatePayload);

        await axios.put(
          "https://localhost:7244/api/master/update-category",
          updatePayload
        );

        toast.success("Category Updated");
      }

      setShowModal(false);

      setIsEdit(false);

      setEditCategoryId(null);

      setFormData({
        name: "",
        flag: null,
        sActive: 1,
        titleTag: "",
        keywordTag: "",
        descriptionTag: "",
        nameRussia: "",
        nameJapan: ""
      });

      fetchcategorydata();

    } catch (error) {

      console.log(error?.response?.data);

      toast.error(
        error?.response?.data?.message ||
        "Operation Failed"
      );
    }
  };

  // edit category
  const handleEdit = (item) => {
    console.log(item); // id aa raha hai ya catID dekh lo
    setIsEdit(true);
    setEditCategoryId(item.catID || item.id);
    setFormData({
      name: item.name || "",
      flag: null,
      sActive: item.sActive || 1,
      titleTag: item.titleTag || "",
      keywordTag: item.keywordTag || "",
      descriptionTag: item.descriptionTag || "",
      nameRussia: item.nameRussia || "",
      nameJapan: item.nameJapan || ""
    });
    setShowModal(true);
  };

  // delete category
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this category?")) return;

    try {

      await axios.delete(
        "https://localhost:7244/api/master/delete-category",
        {
          data: [
            {
              id: id
            }
          ]
        }
      );

      toast.success("Deleted Successfully");

      fetchcategorydata();

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
        <div className="col-lg-12 col-md-12 col-12">
            <div className="card table-card overflow-hidden">
                <div className="card-header">
                  <h5>Categories</h5>
                  <button type="submit" className="btn btn-sm btn-primary" onClick={() => setShowModal(true)}><IconCirclePlusFilled /> Add Categories</button>
                </div>
                <div className="card-body">
                  <div className="table-responsive">
                      <table className="table table-hover" id="pc-dt-simple">
                          <thead>
                              <tr>
                                  <th>
                                    <input type="checkbox" className="form-check-input"
                                      onChange={handleSelectAll}
                                      checked={categories.length > 0 && selectedIds.length === categories.length}
                                    />
                                  </th>
                                  <th>Category Name</th>
                                  <th>Russia</th>
                                  <th>Japan</th>
                                  <th>Flag</th>
                                  <th>Status</th>
                                  <th>Title</th>
                                  <th>Keyword</th>
                                  <th>Description</th>
                                  <th>Action</th>
                              </tr>
                          </thead>
                          <tbody>
                              {categories && categories.length > 0 ? (
                                currentData.map((item) => (
                                  <tr key={item.id}>
                                    <td>
                                      <input type="checkbox" className="form-check-input"
                                        checked={selectedIds.includes(item.id)}  // ✅ MUST
                                        onChange={() => handleCheckboxChange(item.id)} // ✅ MUST
                                      />
                                    </td>
                                    <td>{item.name}</td>
                                    <td>
                                      <input type="text" name="nameRussia"
                                        value={item.nameRussia || ""}
                                        onChange={(e) => {
                                          const updated = categories.map(cat =>
                                            cat.id === item.id
                                              ? { ...cat, nameRussia: e.target.value }
                                              : cat
                                          );
                                          setCategories(updated);
                                        }}
                                        className="editable-control"
                                      />
                                    </td>
                                    <td>
                                      <input type="text" name="nameJapan"
                                        value={item.nameJapan || ""}
                                        onChange={(e) => {
                                          const updated = categories.map(cat =>
                                            cat.id === item.id
                                              ? { ...cat, nameJapan: e.target.value }
                                              : cat
                                          );
                                          setCategories(updated);
                                        }}
                                        className="editable-control"
                                      />
                                    </td>
                                    <td>
                                      <img src={
                                          item.flag
                                            ? `https://www.bizupon.com/Categoryimage/${item.flag}`
                                            : flag
                                        }
                                        alt="flag"  width="40" height="40"
                                        onError={(e) => {
                                          e.target.src = flag;
                                        }}
                                      />
                                    </td>
                                    <td>
                                      <span className={`badge ${item.cActive === "Active" ? "bg-success" : "bg-danger"}`}>
                                        {item.cActive}
                                      </span>
                                    </td>
                                    <td>{item.titleTag}</td>
                                    <td>{item.keywordTag}</td>
                                    <td>{item.descriptionTag}</td>
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
                                  <td colSpan="10" className="text-center">No Data Found</td>
                                </tr>
                              )}
                          </tbody>
                      </table>
                      <div className={`actionModal ${selectedIds.length > 0 ? "" : "d-none"}`}>
                        <div className="selectedItem">
                          {selectedIds.length} Selected from {categories.length}
                        </div>
                        <div className="actionButtonArea">
                          <button className="btn btn-xs btn-primary"><IconReload /> Update</button>
                          <button className="btn btn-xs btn-success"><IconChecks /> Active</button>
                          <button className="btn btn-xs btn-warning"><IconCancel /> De-Active</button>
                          <button className="btn btn-xs btn-danger"><IconTrash /> Delete</button>
                          <button className="btn btn-xs btn-light" onClick={() => setSelectedIds([])}><IconArrowLeft /> Cancel</button>
                        </div>
                      </div>
                    </div>
                  <div className="paginationBlock d-flex justify-content-between align-items-center p-3">
                    {/* Left Side Info */}
                    <div>
                      {startIndex + 1} - {Math.min(startIndex + itemsPerPage, totalItems)} of {totalItems} entries
                    </div>

                    {/* Right Side Pagination */}
                    <ul className="pagination mb-0">

                      {/* Prev */}
                      <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                        <button className="page-link" onClick={() => setCurrentPage(currentPage - 1)}>
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
                        <button className="page-link" onClick={() => setCurrentPage(currentPage + 1)}>
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
          <h5>{isEdit ? "Edit Category" : "Add Category"}</h5>
          <button className="btn-close" onClick={() => setShowModal(false)}></button>
        </div>

        <div className="drawer-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Category Name</label>
              <input type="text" className="form-control" name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Russia Name</label>
              <input type="text" className="form-control" name="nameRussia"
                value={formData.nameRussia}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Japan Name</label>
              <input type="text" className="form-control" name="nameJapan"
                value={formData.nameJapan}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Title</label>
              <input type="text" className="form-control" name="titleTag"
                value={formData.titleTag}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Keyword</label>
              <input type="text" className="form-control" name="keywordTag"
                value={formData.keywordTag}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Description</label>
              <textarea className="form-control" name="descriptionTag"
                value={formData.descriptionTag}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Upload Flag</label>
              <input type="file" className="form-control"
                onChange={handleFileChange}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Status</label>
              <select className="form-control" name="sActive"
                value={formData.sActive}
                onChange={handleChange}>
                <option value={1}>Active</option>
                <option value={0}>De-Active</option>
              </select>
            </div>
            <button type="submit" className="btn btn-primary w-100 mt-5">
              {isEdit ? "Update Category" : "Save Category"}
            </button>
          </form>
        </div>
      </div>

      {/* Overlay */}
      {showModal && (
        <div className="drawer-overlay" onClick={() => setShowModal(false)}></div>
      )}

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        theme="light"
      />

    </>
  )
}

export default Categories;
