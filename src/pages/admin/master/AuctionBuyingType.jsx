import { IconCirclePlusFilled, IconPencil, IconTrash, IconArrowLeft } from '@tabler/icons-react'
import axios from 'axios';
import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AuctionBuyingType() {

    const [auctinBuyingType, setAuctionBuyingType] = useState([]);
    const [selectedIds, setSelectedIds] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    // fetch auction buy data
    const fetchAuctionBuyingData = async() => {
        try{
            const res = await axios.get('https://localhost:7244/api/financial/GetAuctionBuyType')
            setAuctionBuyingType(res.data.data || res.data)
        }
        catch(error){
            console.error("error fetching data", error);
        }
    };

    useEffect(()=>{
        fetchAuctionBuyingData();
    }, []);

    // add data
    const [formData, setFormData] = useState({
        "buyingName": "",
        "buyingJapanName": "",
        "uid": 1,
        "id": 0
    })

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const payload = {
                buyingName: formData.buyingName,
                buyingJapanName: formData.buyingJapanName,
                uid: formData.uid,
                id: formData.id
            };

            console.log("Payload:", payload);

            const res = await axios.post("https://localhost:7244/api/financial/AddAuctionBuyType",
                payload
            );

            console.log(res.data);

            toast.success("Auction Buying Type Added Successfully");

            setFormData({
                buyingName: "",
                buyingJapanName: "",
                uid: 1,
                id: 0
            });

            setShowModal(false);
            fetchAuctionBuyingData();

        } catch (error) {
            console.error(error);

            toast.error(
                error.response?.data?.message ||
                "Failed to add Auction Buying Type"
            );
        }
    };

    // delete data
    const handleDelete = async () => {
        if (selectedIds.length === 0) {
            toast.warning("Please select at least one record");
            return;
        }

        try {
            const payload = selectedIds.map(id => ({
                id: id,
                userId: 1
            }));

            console.log("Delete Payload:", payload);

            const res = await axios({
                method: "delete",
                url: "https://localhost:7244/api/financial/delete-AuctionBuyType",
                data: payload,
                headers: {
                    "Content-Type": "application/json"
                }
            });

            console.log("Response:", res.data);

            toast.success("Record(s) deleted successfully");

            setSelectedIds([]);
            fetchAuctionBuyingData();

        } catch (error) {
            console.log("Status:", error.response?.status);
            console.log("Data:", error.response?.data);

            toast.error(
                error.response?.data?.message ||
                "Failed to delete records"
            );
        }
    };

    // select single checkbox
    const handleCheckboxChange = (id) => {
        setSelectedIds(prev =>
            prev.includes(id)
                ? prev.filter(item => item !== id)
                : [...prev, id]
        );
    };
    // select all checkboxes
    const handleSelectAll = (e) => {
        if (e.target.checked) {
            const allIds = auctinBuyingType.map(item => item.id);
            setSelectedIds(allIds);
        } else {
            setSelectedIds([]);
        }
    };

  return (
    <>
        <div className="row">
            <div className="col-lg-12">
                <div className="card table-card overflow-hidden">
                    <div className="card-header">
                        <h5 className="title">Action Buying Type</h5>
                        <button className="btn btn-sm btn-primary" onClick={()=> setShowModal(true)}><IconCirclePlusFilled /> Add Action Buying Type</button>
                    </div>
                    <div className="card-body">
                        <div className="table-responsive">
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th>
                                            <input type="checkbox" className="form-check-input"
                                                onChange={handleSelectAll}
                                                checked={
                                                    selectedIds.length === auctinBuyingType.length &&
                                                    auctinBuyingType.length > 0
                                                }
                                            />
                                        </th>
                                        <th>Buying Name</th>
                                        <th>Buying Name (In japan)</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {auctinBuyingType.map(item => (
                                        <tr key={item.id}>
                                            <td>
                                                <input type="checkbox" className="form-check-input"
                                                    checked={selectedIds.includes(item.id)}
                                                    onChange={() => handleCheckboxChange(item.id)}
                                                />
                                            </td>
                                            <td>{item.buyingName}</td>
                                            <td>{item.buyingJapanName}</td>
                                            <td>
                                                <div className="text-end">
                                                    <Link to="#" className="avtar delete" data-bs-toggle="tooltip" data-bs-placement="top" title="Delete" onClick={() => setShowDeleteModal(true)}><IconTrash /></Link>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className={`actionModal ${selectedIds.length > 0 ? "" : "d-none"}`}  style={{top: "0px"}}>
                            <div className="selectedItem">
                                {selectedIds.length} Selected from {auctinBuyingType.length}
                            </div>
                            <div className="actionButtonArea">
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
                <h5>Add Category</h5>
                <button className="btn-close" onClick={() => setShowModal(false)}></button>
            </div>
            <div className="drawer-body">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label">Buying Name</label>
                        <input type="text" className="form-control"
                            value={formData.buyingName}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    buyingName:e.target.value
                                })
                            }
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Buying Name (In Japan)</label>
                        <input type="text" className="form-control"
                            value={formData.buyingJapanName}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    buyingJapanName:e.target.value
                                })
                            }
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100 mt-5">Submit</button>
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
                            <div className="modal-header m-0">
                                <h5 className="modal-title">Confirm Delete</h5>
                                <button type="button" className="btn-close"
                                    onClick={() => setShowDeleteModal(false)}>
                                </button>
                            </div>
                            <div className="modal-body mt-0">
                                Are you sure you want to delete
                                <strong> {selectedIds.length} </strong>
                                selected record(s)?
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-sm btn-light"
                                    onClick={() => setShowDeleteModal(false)}>
                                    Cancel
                                </button>
                                <button className="btn btn-sm btn-danger"
                                    onClick={async () => {
                                        setShowDeleteModal(false);
                                        await handleDelete();
                                    }}>
                                    Yes, Delete
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
        />

    </>

  )
}

export default AuctionBuyingType
