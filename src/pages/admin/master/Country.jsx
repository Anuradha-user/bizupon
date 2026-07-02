import { IconCirclePlusFilled, IconPencil, IconTrash, IconChevronLeft, IconChevronRight, IconCheck, IconArrowLeft, IconX } from '@tabler/icons-react'
import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Country() {

    const [countryList, setCountryList] = useState([]);
    const [selectedIds, setSelectedIds] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // Pagination based on countryList
    const totalItems = countryList.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentItems = countryList.slice(startIndex, startIndex + itemsPerPage);

    // fetch table data
    const fetchCountryData = async() => {
        try{
            const res = await axios.get('https://localhost:7244/api/master/view-Countries')
            setCountryList(res.data.data || []);
            return res.data.data;
        } catch (error){
            console.error("error fetching data", error)
        }
    }

    useEffect(() => {
        fetchCountryData();
    }, []);

    // select single checkbox
    const handleCheckboxChange = (cid) => {
        if (selectedIds.includes(cid)) {
            setSelectedIds(selectedIds.filter(item => item !== cid));
        } else {
            setSelectedIds([...selectedIds, cid]);
        }
    };

    // select all
    const handleSelectAll = (e) => {
        if (e.target.checked) {
            const allIds = currentItems.map(item => item.cid); //only current page
            setSelectedIds(allIds);
        } else {
            setSelectedIds([]);
        }
    };

    // Tooltip init
    useEffect(() => {
        const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
        [...tooltipTriggerList].forEach(
            (el) => new window.bootstrap.Tooltip(el)
        );
    }, [currentItems]);

    // add country
    const [formData, setFormData] = useState({
        name: "",
        countryCode: "",
        unitPrice: 0,
        flag: null,
        sActive: 1
    })

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const payload = formData


            const res = await axios.post('https://localhost:7244/api/master/add-country',
                payload
            );

            if (res.status === 200) {
                toast.success(
                    res.data.message || "Country added successfully"
                );

               await fetchCountryData();

                setShowModal(false);

                setFormData({
                    name: "",
                    countryCode: "",
                    unitPrice: 0,
                    flag: "",
                    sActive: 1
                });
            } else {
                toast.warning(res.data.message || "Country could not be added");
            }

        } catch (error) {
            console.error(error);

            if (error.response?.status === 400) {
                toast.error("Validation failed");
            } else if (error.response?.status === 404) {
                toast.error("API not found");
            } else if (error.response?.status === 500) {
                toast.error("Server error");
            } else {
                toast.error(
                    error.response?.data?.message ||
                    "Something went wrong"
                );
            }
        }
    };

    // delete country
    const handleDelete = async (id) => {
        try {
            const payload = [{ id }];

            const res = await axios.delete("https://localhost:7244/api/master/delete-country",
                {
                    data: payload
                }
            );

            if (res.data.success) {
                toast.success("Country deleted successfully");
                await fetchCountryData();
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            toast.error("Something went wrong");
        } finally {
            setShowDeleteModal(false);
            setDeleteId(null);
        }
    };

   const handleFileUpload = (e) => {
    const file = e.target.files[0];
console.log("file",file);

    if (file) {

        setFormData({
            ...formData,
            flag: file?.name,          // API upload ke liye
        });
    }
};
  return (
    <>
        <div className="row">
            <div className="col-lg-12 col-12">
                <div className="card table-card overflow-hidden">
                    <div className="card-header d-flex justify-content-between align-items-center">
                        <h5>Country</h5>
                        <button className="btn btn-sm btn-primary" onClick={() => setShowModal(true)}>
                            <IconCirclePlusFilled /> Add Country
                        </button>
                    </div>

                    <div className="card-body">
                        <div className="table-responsive">
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th>
                                            <input 
                                                type="checkbox" 
                                                className="form-check-input" 
                                                onChange={handleSelectAll}
                                                checked={
                                                    currentItems.length > 0 &&
                                                    currentItems.every(item => selectedIds.includes(item.cid))
                                                }
                                            />
                                        </th>
                                        <th>Country Name</th>
                                        <th>Country Code</th>
                                        <th>Unit Price</th>
                                        <th>Flag</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {currentItems.length > 0 ? (
                                        currentItems.map((item, index) => (
                                            <tr key={index}>
                                                <td>
                                                    <input 
                                                        type="checkbox" 
                                                        className="form-check-input"
                                                        checked={selectedIds.includes(item.cid)}
                                                        onChange={() => handleCheckboxChange(item.cid)}
                                                    />
                                                </td>
                                                <td>{item.name}</td>
                                                <td>{item.countryCode}</td>
                                                <td>{item.unitPrice}</td>
                                                <td>
                                                    {item.flag ? (
                                                        <img 
                                                            src={`https://www.bizupon.com/Countryimage/${item.flag}`} 
                                                            alt="" 
                                                            width="40" 
                                                        />
                                                    ) : "-"}
                                                </td>
                                                <td>
                                                    <span className={`badge ${item.cStatus === "Active" ? "bg-success" : "bg-danger"}`}>
                                                        {item.cStatus}
                                                    </span>
                                                </td>
                                                <td>
                                                    <div className="text-end">
                                                        <Link to="#" className="avtar edit" data-bs-toggle="tooltip" title="Edit">
                                                            <IconPencil />
                                                        </Link>
                                                        <Link to="#" className="avtar delete" data-bs-toggle="tooltip" title="Delete" 
                                                            onClick={() => {
                                                                setDeleteId(item.cid);
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
                                            <td colSpan="7" className="text-center">
                                                No Data Found
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* ✅ Bulk Action */}
                        <div className={`actionModal ${selectedIds.length > 0 ? "" : "d-none"}`} style={{ top: 0 }}>
                            <div className="selectedItem">
                                {selectedIds.length} Selected from {countryList.length}
                            </div>
                            <div className="actionButtonArea">
                                <button className="btn btn-xs btn-primary"><IconCheck /> Active</button>
                                <button className="btn btn-xs btn-warning"><IconX /> De-Active</button>
                                <button className="btn btn-xs btn-danger"><IconTrash /> Delete</button>
                                <button className="btn btn-xs btn-light" onClick={() => setSelectedIds([])}>
                                    <IconArrowLeft /> Cancel
                                </button>
                            </div>
                        </div>

                        {/* ✅ Pagination */}
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

                                <li className={`page-item ${currentPage >= totalPages ? "disabled" : ""}`}>
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

        {/* Drawer */}
        <div className={`custom-drawer ${showModal ? "open" : ""}`}>
            <div className="drawer-header">
                <h5>Add Country</h5>
                <button className="btn-close" onClick={() => setShowModal(false)}></button>
            </div>

            <div className="drawer-body">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Country Name</label>
                        <input type="text" className="form-control" required
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
                        <label>Country Code</label>
                        <input type="number" className="form-control" required
                            value={formData.countryCode}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    countryCode: e.target.value
                                })
                            }
                        />
                    </div>
                    <div className="form-group">
                        <label>Unit Price</label>
                        <input type="number" className="form-control" required
                            value={formData.unitPrice}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    unitPrice: e.target.value
                                })
                            }
                        />
                    </div>
                    <div className="form-group">
                        <label>Flag</label>
                        <input type="file" className="form-control"
                            required
                            onChange={(e) =>handleFileUpload(e)
                                // setFormData({
                                //     ...formData,
                                //     flag: e.target.files[0]?.name || ""
                                // })
                            }
                        />
                    </div>
                    <div className="form-group">
                        <label>Status</label>
                        <select className="form-control" required
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
                    <button className="btn btn-primary w-100 mt-3">
                        Add Country
                    </button>
                </form>
            </div>
        </div>

        {showModal && (
            <div className="drawer-overlay" onClick={() => setShowModal(false)}></div>
        )}

        {showDeleteModal && (
        <>
            <div className="modal fade show" style={{ display: "block" }} tabIndex="-1">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header m-0">
                            <h5 className="modal-title">Confirm Delete</h5>
                            <button type="button" className="btn-close"
                                onClick={() => {
                                    setShowDeleteModal(false);
                                    setDeleteId(null);
                                }}>
                            </button>
                        </div>
                        <div className="modal-body m-0">
                            <h6>Are you sure you want to delete this country?</h6>
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-sm btn-secondary"
                                onClick={() => {
                                    setShowDeleteModal(false);
                                    setDeleteId(null);
                                }}>
                                Cancel
                            </button>
                            <button className="btn btn-sm btn-danger"
                                onClick={() => handleDelete(deleteId)}>
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal-backdrop fade show"
                onClick={() => {
                    setShowDeleteModal(false);
                    setDeleteId(null);
                }}
            ></div>
        </>
    )}

        <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            pauseOnHover
            theme="colored"
        />
    </>
  )
}

export default Country;