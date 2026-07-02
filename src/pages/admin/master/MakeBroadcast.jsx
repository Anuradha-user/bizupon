import { IconEye, IconChevronLeft, IconChevronRight, IconTrash } from '@tabler/icons-react';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Select from 'react-select'
import axios from 'axios';

function MakeBroadcast() {

    const [clientList, setClientList] = useState([]);
    const [selectedClient, setSelectedClient] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [groupDetails, setGroupDetails] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null);

    const [broadcastList, setBroadcastList] = useState([]);
    const [selectedBroadcast, setSelectedBroadcast] = useState(null);
    const [broadcastLoading, setBroadcastLoading] = useState(false);
    const [clientOptions, setClientOptions] = useState([]);

    const [clientData, setClientData] = useState([]);
    const [allClientData, setAllClientData] = useState([]);

    const [selectedIds, setSelectedIds] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 100;

    const totalItems = clientData.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentData = clientData.slice(startIndex, startIndex + itemsPerPage);

    const pagesToShow = 10;

    const startPage = Math.floor((currentPage - 1) / pagesToShow) * pagesToShow + 1;
    const endPage = Math.min(startPage + pagesToShow - 1, totalPages);

    const pageNumbers = [];
    for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
    }

    const fetchClientNameData = async () => {
        try {
            const res = await axios.get('https://jaishriganesha.com/bizupon-master/api/master/GetClientandBroadcast?CountryID=0')
            let data = res.data.data.client?.map((item) => {
                return {
                    value: item.id,
                    label: item.name,
                }
            })
            setClientList(data);
            setBroadcastLoading(false);


        } catch (err) {
            console.error(err);
        }
    };

    // fetch broadcast data in dropdown
    useEffect(() => {
        setBroadcastLoading(true);

        fetch('https://jaishriganesha.com/bizupon-master/api/master/view-broadcast?Id=0')
            .then(res => res.json())
            .then(res => {
                setBroadcastList(res.data || []);
                setBroadcastLoading(false);
            })
            .catch(() => {
                setBroadcastList([]);
                setBroadcastLoading(false);
            });
    }, []);

    // fetch table
    const fetchClientData = async () => {
        setLoading(true);
        try {
            const res = await axios.get('https://jaishriganesha.com/bizupon-master/api/master/GetClient')
            setClientData(res.data.data || res.data);
            setLoading(false);

        }
        catch (error) {
            console.error("error fetching data", error);
            setLoading(false);

        }
    };

    useEffect(() => {
        fetchClientData();
        fetchClientNameData();
    }, [])

    // reset selection on page change
    useEffect(() => {
        setSelectedIds([]);
    }, [currentPage]);

    const broadcastOptions = broadcastList
        .filter(item => item.braodcastname?.trim())
        .map(item => ({
            value: item.id,
            label: item.braodcastname
        }));

    // fetch details 
    const handleView = async (id) => {
        setShowModal(true);

        try {
            const res = await axios.get(`https://jaishriganesha.com/bizupon-master/api/master/StaffGroupDetailsById?Id=${id}`);
            
            console.log(res.data);

            setGroupDetails(res.data?.data?.[0] || null);

        } catch (error) {
            console.error(error);
            setGroupDetails(null);
        }
    };

    // filter
    const handleFilter = () => {
        const clientId = selectedClient?.value || 0;

        if (clientId === 0) {
            setClientData(allClientData);
        } else {
            setClientData(allClientData.filter(item => item.id === clientId));
        }

        setCurrentPage(1);
    };

    // checkbox
    const handleCheckboxChange = (id) => {
        setSelectedIds(prev =>
            prev.includes(id)
                ? prev.filter(item => item !== id)
                : [...prev, id]
        );
    };

    const handleSelectAll = (e) => {
        if (e.target.checked) {
            const newIds = currentData.map(item => item.id);
            setSelectedIds(prev => [...new Set([...prev, ...newIds])]);
        } else {
            const newIds = currentData.map(item => item.id);
            setSelectedIds(prev => prev.filter(id => !newIds.includes(id)));
        }
    };

    // Tooltip init
    useEffect(() => {
        const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
        const tooltipList = [...tooltipTriggerList].map(
            (tooltipTriggerEl) => new window.bootstrap.Tooltip(tooltipTriggerEl)
        );
    }, [clientList]);

    return (
        <>
            <div className="row">
                <div className="col-lg-12">

                    {/* Filter */}
                    <div className="card">
                        <div className="card-header">
                            <h5 className="title">Make Broadcast</h5>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-lg-4">
                                    <label>Client Name</label>
                                    <Select
                                        options={clientList}
                                        value={selectedClient}
                                        onChange={setSelectedClient}
                                        placeholder="Select Client Name"
                                        isClearable
                                        isLoading={loading}
                                    />
                                </div>
                                <div className="col-lg-3 mt-4">
                                    <button className="btn btn-primary" onClick={handleFilter}>
                                        Filter
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Table */}
                    <div className="card table-card overflow-hidden">
                        <div className="card-header">
                            <h5 className="badge bg-success">Total Records : {clientData.length}</h5>

                            <div className="d-flex gap-2">
                                <Select
                                    options={broadcastOptions}
                                    value={selectedBroadcast}
                                    onChange={setSelectedBroadcast}
                                    placeholder="Select Broadcast"
                                    isLoading={broadcastLoading}
                                    isClearable
                                />
                                <button className="btn btn-sm btn-primary">
                                    Add in Broadcast
                                </button>
                            </div>
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
                                                        currentData.length > 0 &&
                                                        currentData.every(item => selectedIds.includes(item.id))
                                                    }
                                                />
                                            </th>
                                            <th>#</th>
                                            <th>Client Name</th>
                                            <th>Device ID</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {currentData.map((item, index) => (
                                            <tr key={item.id}>
                                                <td>
                                                    <input type="checkbox" className="form-check-input"
                                                        checked={selectedIds.includes(item.id)}
                                                        onChange={() => handleCheckboxChange(item.id)}
                                                    />
                                                </td>
                                                <td>{startIndex + index + 1}</td>
                                                <td>{item.name}</td>
                                                <td>-</td>
                                                <td>
                                                    <div className="text-end">
                                                        <Link to="#" className="avtar view" data-bs-toggle="tooltip" title="My Broadcasat"
                                                            onClick={() => handleView(item.id)}><IconEye />
                                                        </Link>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination */}
                            <div className="d-flex justify-content-between p-3">
                                <div>
                                    {startIndex + 1} - {Math.min(startIndex + itemsPerPage, totalItems)} of {totalItems}
                                </div>

                                <ul className="pagination">
                                    <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                                        <button className="page-link" onClick={() => setCurrentPage(currentPage - 1)}>
                                            <IconChevronLeft />
                                        </button>
                                    </li>

                                    {pageNumbers.map(page => (
                                        <li key={page} className={`page-item ${currentPage === page ? "active" : ""}`}>
                                            <button className="page-link" onClick={() => setCurrentPage(page)}>
                                                {page}
                                            </button>
                                        </li>
                                    ))}

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
                    <h5>User Group Details</h5>
                    <button className="btn-close" onClick={() => setShowModal(false)}></button>
                </div>
                <div className="drawer-body">
                    {groupDetails ? (<div className="card table-card overflow-hidden">
                        <div clasName="table-responsive">
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th>Broadcast</th>
                                        <th>Added On</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{groupDetails.name}</td>
                                        <td>{groupDetails.adate}</td>
                                        <td>
                                            <div className="text-end">
                                                <Link to="#" className="avtar delete" data-bs-toggle="tooltip" title="Delete" onClick={() => handleView(groupDetails.id)}><IconTrash /></Link>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>) : (
                        <p>No record found</p>
                    )}
                </div>
            </div>

            {/* Overlay */}
            {showModal && (
                <div className="drawer-overlay" onClick={() => setShowModal(false)}></div>
            )}
        </>
    )
}

export default MakeBroadcast;