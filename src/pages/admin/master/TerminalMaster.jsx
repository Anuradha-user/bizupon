import { IconCirclePlusFilled, IconPencil, IconTrash } from '@tabler/icons-react'
import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import { Link } from 'react-router-dom';
import axios from 'axios';

function TerminalMaster() {

    const [terminalList, setTerminalList] = useState([]);
    const [allTerminalList, setAllTerminalList] = useState([]);
    const [portList, setPortList] = useState([]);
    const [selectedPort, setSelectedPort] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [selectedIds, setSelectedIds] = useState([]);

    // Load Terminal Data
    const loadTerminalData = async (pid = 0) => {

        setLoading(true);

        try {

            const res = await fetch(
                `https://localhost:7244/api/Port/View-terminal?PID=${pid}`
            );

            const data = await res.json();

            setAllTerminalList(data.data || []);
            setTerminalList(data.data || []);

        } catch (err) {

            console.error("Error fetching terminal:", err);

        }

        setLoading(false);
    };

    // Load Port Dropdown
    const loadPortList = async () => {
        try {
            const res = await fetch('https://jaishriganesha.com/bizupon-master/api/Port/GetddlPort');
            const data = await res.json();
            setPortList(data.data || []);
        } catch (err) {
            console.error("Error fetching ports:", err);
        }
    };

    useEffect(() => {
        loadTerminalData(0);
        loadPortList();
    }, []);

    // Convert Dropdown Data
    const portOptions = portList.map(item => ({
        value: item.id,
        label: item.name
    }));

    // Filter Logic 
    const handleFilter = () => {
        if (!selectedPort) {
            loadTerminalData(0);
            return;
        }
        loadTerminalData(selectedPort.value);
    };

    // selct all checkboxes
    const handleSelectAll = (e) => {
        if (e.target.checked) {
            setSelectedIds(terminalList.map(item => item.id));
        } else {
            setSelectedIds([]);
        }
    };
    
    // selct single checkbox
    const handleCheckboxChange = (id) => {
        if (selectedIds.includes(id)) {
            setSelectedIds(selectedIds.filter(item => item !== id));
        } else {
            setSelectedIds([...selectedIds, id]);
        }
    };

    // Tooltip init
    useEffect(() => {
        const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
        const tooltipList = [...tooltipTriggerList].map(
            (tooltipTriggerEl) => new window.bootstrap.Tooltip(tooltipTriggerEl)
        );
    }, [terminalList]);

    return (
        <>
            <div className="row">
                <div className="col-lg-12 col-12">
                    <div className="card">
                        <div className="card-header">
                            <h5 className="title">Terminal Master</h5>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-lg-3 col-md-6 col-12">
                                    <div className="form-group">
                                        <label className="form-label">Port Name</label>
                                        <Select
                                            options={portOptions}
                                            value={selectedPort}
                                            onChange={setSelectedPort}
                                            placeholder="Select Port"
                                            isClearable
                                        />
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-6 col-12">
                                    <div className="form-group">
                                        <button className="btn btn-primary mt-25" onClick={handleFilter} >
                                            Filter
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="card table-card overflow-hidden">
                        <div className="card-header justify-content-end">
                            <button className="btn btn-sm btn-primary" onClick={() => setShowModal(true)}>
                                <IconCirclePlusFilled /> Add Terminal
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
                                                    checked={terminalList.length > 0 &&
                                                    terminalList.every((item) => selectedIds.includes(item.id))}
                                                />
                                            </th>
                                            <th>Terminal Name</th>
                                            <th>Contact</th>
                                            <th>Price</th>
                                            <th>Address</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {loading ? (
                                            <tr>
                                                <td colSpan="6" className="text-center">
                                                    Loading...
                                                </td>
                                            </tr>
                                        ) : terminalList.length > 0 ? (
                                            terminalList.map(item => (
                                                <tr key={item.id}>
                                                    <td>
                                                        <input type="checkbox" className="form-check-input"
                                                            checked={selectedIds.includes(item.id)}
                                                            onChange={() => handleCheckboxChange(item.id)}
                                                        />
                                                    </td>
                                                    <td>{item.terminalName}</td>
                                                    <td>{item.contactNo || "-"}</td>
                                                    <td>{item.price}</td>
                                                    <td>{item.taddress}</td>
                                                    <td>
                                                        <div className="text-end">
                                                            <Link to="#" className="avtar edit" data-bs-toggle="tooltip" data-bs-placement="top" title="Edit">
                                                                <IconPencil />
                                                            </Link>
                                                            <Link to="#" className="avtar delete" data-bs-toggle="tooltip" data-bs-placement="top" title="Delete">
                                                                <IconTrash />
                                                            </Link>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="6" className="text-center">
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
                    <h5>Add Terminal Master</h5>
                    <button className="btn-close" onClick={() => setShowModal(false)}></button>
                </div>

                <div className="drawer-body">
                    <form>
                        <div className="form-group">
                            <label className="form-label">Port Name</label>
                            <Select
                                options={portOptions}
                                value={selectedPort}
                                onChange={setSelectedPort}
                                placeholder="Select Port"
                                isClearable
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Terminal Company Name</label>
                            <input type="text" className="form-control" />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Terminal Name </label>
                            <input type="text" className="form-control" />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Contact Person</label>
                            <input type="text" className="form-control" />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Contact Number </label>
                            <input type="text" className="form-control" />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Price</label>
                            <input type="text" className="form-control" />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Terminal Address</label>
                            <textarea className="form-control" colSpan="5" />
                        </div>
                        <button type="submit" className="btn btn-primary w-100 mt-4">
                            Submit
                        </button>
                    </form>
                </div>
            </div>

            {/* Overlay */}
            {showModal && (
                <div className="drawer-overlay" onClick={() => setShowModal(false)}></div>
            )}
        </>
    )
}

export default TerminalMaster;