import { IconArrowLeft, IconChecks, IconChevronLeft, IconChevronRight, IconCirclePlus, IconCirclePlusFilled, IconCoinRupee, IconPencil, IconSend, IconTrash, IconX } from '@tabler/icons-react'
import React, {useState, useEffect} from 'react'
import axios from 'axios';
import Select from 'react-select';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Shipping() {

    const [showModal, setShowModal] = useState(false);
    const [country, setCountry] = useState([]);
    const [selectCountry, setSelectCountry] = useState(null);
    const [shippingList, setShippingList] = useState([])
    const [selectedIds, setSelectedIds] = useState([]);

    const [deleteId, setDeleteId] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const [isEdit, setIsEdit] = useState(false);
    const [editId, setEditId] = useState(null);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const totalItems = shippingList.length;

    const totalPages = Math.ceil(
        totalItems / itemsPerPage
    );

    const startIndex =
        (currentPage - 1) * itemsPerPage;

    const currentItems = shippingList.slice(
        startIndex,
        startIndex + itemsPerPage
    );

    // fetch county data
    const fetchcountrydata = async () => {
        try{
            const res = await axios.get('https://jaishriganesha.com/bizupon-master/api/master/view-Countries')
            let countryOptions = res.data.data.map(item => ({
                value: item.cid,
                label: item.name
            }))
            .reverse();
            setCountry(countryOptions)

        } catch (error) {
            console.log("error", error);
        }
    }

    // fetch table data
    const fetchShippingList = async() => {
        try{
            const res = await axios.get('https://localhost:7244/api/Port/view-shipping')

            setShippingList(res.data.data)

        } catch (error){
            console.error("fatching error data", error);
        }
    }

    useEffect(() => {
        fetchcountrydata();
        fetchShippingList();
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
            const allIds = shippingList.map(item => item.id);
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
    }, [shippingList]);

    // form state
    const [formData, setFormData] = useState({
        id: 0,
        cid: 0,
        shippingName: "",
        email: "",
        contactNo: "",
        faxNo: "",
        sActive: 1,
        shippingRate: 0,
        cC_Email: "",
        headOfficeAddress: "",
        branchOfficeAddress: "",
        personInCharge: ""
    });

    // handle input change
    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]:
                name === "shippingRate" ||
                name === "sActive"
                    ? Number(value)
                    : value
        }));
    };

    // add and edit shipping
    const handleSubmit = async (e) => {

        e.preventDefault();

        try {
            const payload = {
                id: isEdit ? editId : 0,
                cid: selectCountry?.value || 0,
                shippingName: formData.shippingName,
                email: formData.email,
                contactNo: formData.contactNo,
                faxNo: formData.faxNo,
                sActive: Number(formData.sActive),
                shippingRate: Number(formData.shippingRate),
                cC_Email: formData.cC_Email,
                headOfficeAddress:
                    formData.headOfficeAddress,
                branchOfficeAddress:
                    formData.branchOfficeAddress,
                personInCharge:
                    formData.personInCharge
            };

            console.log(payload);

            if (isEdit) {
                await axios.put(
                    "https://localhost:7244/api/Port/update-shipping",
                    payload
                );

                toast.success(
                    "Shipping Updated Successfully"
                );

            } else {
                await axios.post(
                    "https://localhost:7244/api/Port/add-shipping",
                    payload
                );

                toast.success(
                    "Shipping Added Successfully"
                );
            }

            fetchShippingList();
            setShowModal(false);
            setIsEdit(false);
            setEditId(null);

            // reset form
            setFormData({
                id: 0,
                cid: 0,
                shippingName: "",
                email: "",
                contactNo: "",
                faxNo: "",
                sActive: 1,
                shippingRate: 0,
                cC_Email: "",
                headOfficeAddress: "",
                branchOfficeAddress: "",
                personInCharge: ""
            });

            setSelectCountry(null);

        } catch (error) {
            console.log(
                error.response?.data || error
            );
            toast.error(
                isEdit
                    ? "Failed To Update Shipping"
                    : "Failed To Add Shipping"
            );
        }
    };

    // delete shipping function
    const handleDelete = async () => {
        try {
            const payload = [
                {
                    id: Number(deleteId)
                }
            ];
            await axios({
                method: "delete",
                url: "https://localhost:7244/api/Port/delete-shipping",
                data: payload,
                headers: {
                    "Content-Type": "application/json"
                }
            });

            toast.success("Shipping Deleted Successfully");

            fetchShippingList();
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

  return (
    <>
        <div className="row">
            <div className="col-lg-12 col-12">
                <div className="card table-card overflow-hidden">
                    <div className="card-header">
                        <h5 className="title">Shipping</h5>
                        <button className="btn btn-sm btn-primary" onClick={() => setShowModal(true)}><IconCirclePlusFilled /> Add Shipping</button>
                    </div>
                    <div className="card-body">
                        <div className="table-responsive">
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th>
                                            <input type="checkbox" className="form-check-input" 
                                                onChange={handleSelectAll}
                                                checked={selectedIds.length === shippingList.length && shippingList.length > 0}
                                            />
                                        </th>
                                        <th>Shipping Name</th>
                                        <th>Email ID</th>
                                        <th>Pin Code</th>
                                        <th>Contact</th>
                                        <th><abbr data-title="Shipping Rate">S Rate</abbr></th>
                                        <th><abbr data-title="Opening Balance">O Balance</abbr></th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {shippingList.length > 0 ? (
                                        currentItems.map((item, index) => (
                                            <tr key={item.id}>
                                                <td>
                                                    <input type="checkbox" className="form-check-input"
                                                        checked={selectedIds.includes(item.id)}
                                                        onChange={() => handleCheckboxChange(item.id)}
                                                    />
                                                </td>
                                                <td>{item.shippingName}</td>
                                                <td>{item.email}</td>
                                                <td>{item.password}</td>
                                                <td>{item.contactNo}</td>
                                                <td>
                                                    <input type="number"
                                                        value={item.shippingRate || 0}
                                                        onChange={(e) => {
                                                            const updated = shippingList.map(row =>
                                                                row.id === item.id
                                                                    ? {
                                                                        ...row,
                                                                        shippingRate: e.target.value
                                                                    }
                                                                    : row
                                                            );
                                                            setShippingList(updated);
                                                        }}
                                                        className="editable-control w-75"
                                                    />
                                                </td>
                                                <td>
                                                    <input type="number"
                                                        value={item.obalance || 0}
                                                        onChange={(e) => {
                                                            const updated = shippingList.map(row =>
                                                                row.id === item.id
                                                                    ? {
                                                                        ...row,
                                                                        obalance: e.target.value
                                                                    }
                                                                    : row
                                                            );
                                                            setShippingList(updated);
                                                        }}
                                                        className="editable-control w-75"
                                                    />
                                                </td>
                                                <td>
                                                    <span className={`badge ${item.sActive === "Active" ? "bg-success" : "bg-danger"}`}>
                                                        {item.sActive}
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
                                                                    shippingName: item.shippingName || "",
                                                                    email: item.email || "",
                                                                    contactNo: item.contactNo || "",
                                                                    faxNo: item.faxNo || "",
                                                                    sActive:
                                                                        item.sActive === "Active" ||
                                                                        item.sActive === 1
                                                                            ? 1
                                                                            : 0,
                                                                    shippingRate: item.shippingRate || 0,
                                                                    cC_Email: item.cC_Email || "",
                                                                    headOfficeAddress:
                                                                        item.headOfficeAddress || "",
                                                                    branchOfficeAddress:
                                                                        item.branchOfficeAddress || "",
                                                                    personInCharge:
                                                                        item.personInCharge || ""
                                                                });

                                                                // set selected country
                                                                const selectedCountryOption = country.find(
                                                                    c => c.value === item.cid
                                                                );
                                                                setSelectCountry(selectedCountryOption || null);
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
                                            <td colSpan="9" className="text-center">
                                                No Data Found
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        <div className={`actionModal ${selectedIds.length > 0 ? "" : "d-none"}`}>
                            <div className="selectedItem">
                                {selectedIds.length} Selected from {shippingList.length}
                            </div>
                            <div className="actionButtonArea">
                                <button className="btn btn-xs btn-light"><IconSend /> Send Password</button>
                                <button className="btn btn-xs btn-light"><IconCirclePlus /> Add Shipping Rate</button>
                                <button className="btn btn-xs btn-light"><IconCoinRupee /> Opening Balance</button>
                                <button className="btn btn-xs btn-primary"><IconChecks /> Active</button>
                                <button className="btn btn-xs btn-warning"><IconX /> De-Active</button>
                                <button className="btn btn-xs btn-danger"><IconTrash /> Delete</button>
                                <button className="btn btn-xs btn-light" onClick={() => setSelectedIds([])}><IconX /> Cancel</button>
                            </div>
                        </div>

                        {/* pagination */}
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
                <h5>{isEdit ? "Edit Shipping" : "Add Shipping"}</h5>
                <button className="btn-close" 
                    onClick={() => {
                        setShowModal(false);
                        setIsEdit(false);
                        setEditId(null);

                        setFormData({
                            id: 0,
                            cid: 0,
                            shippingName: "",
                            email: "",
                            contactNo: "",
                            faxNo: "",
                            sActive: 1,
                            shippingRate: 0,
                            cC_Email: "",
                            headOfficeAddress: "",
                            branchOfficeAddress: "",
                            personInCharge: ""
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
                            value={selectCountry}
                            onChange={setSelectCountry}
                            placeholder="Select Country Name"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Shipping Name </label>
                        <input type="text" name="shippingName"
                            value={formData.shippingName}
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
                    <div className="d-flex gap-2 flex-wrap justify-content-between">
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
                            />
                        </div>
                    </div>
                    
                    <div className="form-group">
                        <label className="form-label">Head Office Address</label>
                        <input type="text" name="headOfficeAddress"
                            value={formData.headOfficeAddress}
                            onChange={handleChange}
                            className="form-control"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Branch Office Address</label>
                        <input type="text" name="branchOfficeAddress"
                            value={formData.branchOfficeAddress}
                            onChange={handleChange}
                            className="form-control"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Person In Charge</label>
                        <input type="text" name="personInCharge"
                            value={formData.personInCharge}
                            onChange={handleChange}
                            className="form-control"
                        />
                    </div>
                    <div className="d-flex gap-2 flex-wrap justify-content-between">
                        <div className="form-group">
                            <label className="form-label">Shipping Rate</label>
                            <input type="number" name="shippingRate"
                                value={formData.shippingRate}
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
                                <option value={1}>Active</option>
                                <option value={0}>De-Active</option>
                            </select>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="form-label">CC Email</label>
                        <textarea rows="2" name="cC_Email"
                            value={formData.cC_Email}
                            onChange={handleChange}
                            className="form-control"
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

        {showDeleteModal && (
            <>
                <div className="modal fade show d-block" tabIndex="-1" style={{ background: "rgba(0,0,0,.5)" }}>
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
                                <h6>Are you sure you want to delete this shipping?</h6>
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
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick
            pauseOnHover
        />
    </>
  );
}

export default Shipping
