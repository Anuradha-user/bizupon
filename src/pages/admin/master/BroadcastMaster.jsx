import { IconCirclePlusFilled, IconPencil } from '@tabler/icons-react'
import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function BroadcastMaster() {

    const [broadcastList, setBroadcastList] = useState([]);
    const [selectedIds, setSelectedIds] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [broadcastName, setBroadcastName] = useState("");
    const [editId, setEditId] = useState(0);

    useEffect(() => {
        fetchBroadcastData();
    }, []);

    // broadcast fetch data in table
    const fetchBroadcastData = async () => {
        try {
            const res = await axios.get('https://localhost:7244/api/master/view-broadcast?Id=0');
            console.log(res.data);
            setBroadcastList(res.data.data || []);
        } catch (error) {
            console.error("error fetching data", error);
        }
    };

    // add & update broadcast
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!broadcastName) {
            alert("Please enter broadcast name");
            return;
        }

        try {
            const payload = {
                id: editId,
                braodcastname: broadcastName,
                sessionUID: 1
            };

            await axios.post('https://localhost:7244/api/master/AddandUpdateBroadcast',payload);

            toast.success(
                editId === 0
                    ? "Broadcast Added Successfully"
                    : "Broadcast Updated Successfully"
            );

            // reset
            setBroadcastName("");
            setEditId(0);
            setShowModal(false);

            // refresh table
            fetchBroadcastData();

        } catch (error) {
            console.error("error saving broadcast", error);
            toast.error("Something went wrong");
        }
    };

    // edit broadcast
    const handleEdit = (item) => {
        setBroadcastName(item.braodcastname);
        setEditId(item.id);
        setShowModal(true);
    };

    // select single checkbox
    const handleCheckboxChange = (id) => {
        setSelectedIds(prev =>
            prev.includes(id)
                ? prev.filter(item => item !== id)
                : [...prev, id]
        );
    };

    // Tooltip init
    useEffect(() => {
        const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
        const tooltipList = [...tooltipTriggerList].map(
            (tooltipTriggerEl) => new window.bootstrap.Tooltip(tooltipTriggerEl)
        );
    }, [broadcastList]);

    return (
        <>
            <div className="row">
                <div className="col-lg-12 col-12">
                    <div className="card table-card overflow-hidden">
                        <div className="card-header">
                            <h5 className="title">Broadcast Master</h5>
                            <button className="btn btn-sm btn-primary" 
                                onClick={() => {
                                    setShowModal(true);
                                    setEditId(0);
                                    setBroadcastName("");
                                }}>
                                <IconCirclePlusFilled /> Add Broadcast Master
                            </button>
                        </div>
                        <div className="card-body">
                            <div className="table-responsive">
                                <table className="table table-hover">
                                    <thead>
                                        <tr>
                                            <th>
                                                <input type="checkbox" className="form-check-input" disabled />
                                            </th>
                                            <th>Broadcast Name</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {broadcastList.length > 0 ? (
                                            broadcastList.map((item) => (
                                                <tr key={item.id}>
                                                    <td>
                                                        <input type="checkbox" className="form-check-input"
                                                            checked={selectedIds.includes(item.id)}
                                                            onChange={() => handleCheckboxChange(item.id)}
                                                        />
                                                    </td>
                                                    <td>{item.braodcastname}</td>
                                                    <td>
                                                        <div className="text-end">
                                                            <Link to="#" className="avtar edit" data-bs-toggle="tooltip" title="Edit" onClick={() => handleEdit(item)}><IconPencil /></Link>
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
                        {editId === 0
                            ? "Add Broadcast Master"
                            : "Edit Broadcast Master"}
                    </h5>
                    <button className="btn-close"
                        onClick={() => {
                            setShowModal(false);
                            setBroadcastName("");
                            setEditId(0);
                        }}>
                    </button>
                </div>
                <div className="drawer-body">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label className="form-label">Broadcast Name</label>
                            <input type="text" className="form-control"
                                value={broadcastName}
                                onChange={(e) => setBroadcastName(e.target.value)}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary w-100 mt-4">
                            {editId === 0 ? "Submit" : "Update"}
                        </button>
                    </form>
                </div>
            </div>

            {/* Overlay */}
            {showModal && (
                <div className="drawer-overlay" 
                    onClick={() => {
                        setShowModal(false);
                        setBroadcastName("");
                        setEditId(0);
                    }}>
                </div>
            )}

            <ToastContainer position="top-right" autoClose={3000} />
        </>
    )
}

export default BroadcastMaster