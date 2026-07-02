import { IconCloudDownload, IconDownload, IconTrash, IconArrowLeft, IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
import axios from 'axios';
import React, { useState, useEffect } from 'react'
import Select from 'react-select'

function UpdateLoadingSurrender() {

    const [shipping, setShipping] = useState([]);
    const [selectShippng, setSelectShipping] = useState(null);
    const [client, setClient] = useState([]);
    const [selectClient, setSelectClient] = useState(null);
    const [port, setPort] = useState([]);
    const [selectPort, setSelectPort] = useState(null);
    const [shipName, setShipName] = useState([]);
    const [selectShip, setSelectShip] = useState(null);
    const [broker, setbroker] = useState([]);
    const [selectBroker, setSelectBroker] = useState(null);
    const [tableData, setTableData] = useState([]);
    const [selectedIds, setSelectedIds] = useState([]);
    
    const [currentPage, setCurrentPage] = useState(1);
    const [totalRecords, setTotalRecords] = useState(0);

    const pageSize = 100;
    const totalPages = Math.ceil(totalRecords / pageSize);

    const [surrender, setSurrender] = useState([
        {
            value: "Yes",
            label: "Yes"
        },
        {
            value: "No",
            label: "No"
        }
    ]);
    const [selectSurrender, setSelectSurrender] = useState(null);

    // fetch client name dropdown data
    const fetchClinetData = async () => {
        try {
            const response = await axios.get("https://localhost:7069/api/Product/GetMasterForLoadingSurrenderMaster")
            const data = (response.data.data.client || []).map(item => ({
                value: item.id,
                label: item.name
            }));

            setClient(data)

        } catch (error) {
            console.log("error", error);

        }
    }

    // fetch shipping dropdown data
    const fetchShippingData = async () => {
        try {
            const response = await axios.get("https://localhost:7069/api/Product/GetMasterForLoadingSurrenderMaster")
            const data = (response.data.data.shipping || []).map(item => ({
                value: item.id,
                label: item.name
            }));

            setShipping(data)

        } catch (error) {
            console.log("error", error);

        }
    }

    // fetch port name dropdown data
    const fetchportData = async () => {
        try {
            const response = await axios.get("https://localhost:7069/api/Product/GetMasterForLoadingSurrenderMaster")
            const data = (response.data.data.port || []).map(item => ({
                value: item.id,
                label: item.name
            }));

            setPort(data)

        } catch (error) {
            console.log("error", error);

        }
    }

    // fetch ship name dropdown data
    const fetchShipNameData = async () => {
        try {
            const response = await axios.get("https://localhost:7069/api/Product/GetMasterForLoadingSurrenderMaster")
            const data = (response.data.data.shipname || []).map(item => ({
                value: item.id,
                label: item.name
            }));

            setShipName(data)

        } catch (error) {
            console.log("error", error);

        }
    }

    // fetch broker data dropdown data
    const fetchBrokerData = async () => {
        try {
            const response = await axios.get("https://localhost:7069/api/Product/GetMasterForLoadingSurrenderMaster")
            const data = (response.data.data.broker || []).map(item => ({
                value: item.id,
                label: item.name
            }));

            setbroker(data)

        } catch (error) {
            console.log("error", error);

        }
    }

    // fetch table data
    const fetchTableData = async (page = 1) => {
        try {
            let body = {
                chassisNo: "",
                shipingid: 0,
                shipId: 0,
                clientId: 0,
                portId: 0,
                surrenderValue: "",
                brokerId: 0,
                sessionLID: 1,
                pageNo: page,
                pagesize: pageSize
            }

            const res = await axios.post(
                "https://localhost:7069/api/Product/GetUpdateLoadingSurrenderDetails",
                body
            );

            setTableData(res.data.data.lst || []);
            setTotalRecords(res.data.data.total || 0);
            setCurrentPage(page);

            // page change par checkbox clear
            setSelectedIds([]);

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchClinetData();
        fetchShippingData();
        fetchportData();
        fetchShipNameData();
        fetchBrokerData();
    }, []);

    useEffect(() => {
        fetchTableData(currentPage);
    }, [currentPage]);

    // select all checkboxes
    const handleSelectAll = (e) => {
        if (e.target.checked) {
            const allIds = tableData.map(item => item.productId);
            setSelectedIds(allIds);
        } else {
            setSelectedIds([]);
        }
    };

    // select single checkbox
    const handleCheckboxChange = (id) => {
        if (selectedIds.includes(id)) {
            setSelectedIds(selectedIds.filter(item => item !== id));
        } else {
            setSelectedIds([...selectedIds, id]);
        }
    };

    return (
        <div className="row">
            <div className="col-lg-12 col-12">
                <div className="card">
                    <div className="card-header">
                        <h5 className="title">Update Loading Surrender</h5>
                    </div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-lg-3 col-md-12 col-12">
                                <div className="form-group">
                                    <label className="form-label">Shipping Company</label>
                                    <Select
                                        options={shipping}
                                        value={selectShippng}
                                        onChange={setSelectShipping}
                                        placeholder="Select Shipping"
                                    />
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-12 col-12">
                                <div className="form-group">
                                    <label className="form-label">Client Name</label>
                                    <Select
                                        options={client}
                                        value={selectClient}
                                        onChange={setSelectClient}
                                        placeholder="Select Client Name"
                                    />
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-12 col-12">
                                <div className="form-group">
                                    <label className="form-label">Port Name</label>
                                    <Select
                                        options={port}
                                        value={selectPort}
                                        onChange={setSelectPort}
                                        placeholder="Select Port Name"
                                    />
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-12 col-12">
                                <div className="form-group">
                                    <label className="form-label">Ship Name</label>
                                    <Select
                                        options={shipName}
                                        value={selectShip}
                                        onChange={setSelectShip}
                                        placeholder="Select Ship Name"
                                    />
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-12 col-12">
                                <div className="form-group">
                                    <label className="form-label">Chassis Number</label>
                                    <input type="text" className="form-control" />
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-12 col-12">
                                <div className="form-group">
                                    <label className="form-label">Broker</label>
                                    <Select
                                        options={broker}
                                        value={selectBroker}
                                        onChange={setSelectBroker}
                                        placeholder="Select Broker"
                                    />
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-12 col-12">
                                <div className="form-group">
                                    <label className="form-label">Surrender</label>
                                    <Select
                                        options={surrender}
                                        value={selectSurrender}
                                        onChange={setSelectSurrender}
                                        placeholder="Select Surrender"
                                    />
                                </div>
                            </div>
                            <div className="col-lg-12 col-md-12 col-12">
                                <button className="btn btn-md btn-primary float-end">Filtar</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card table-card overflow-hidden">
                    <div className="card-body">
                        <div className="card-header justify-content-end">
                            <button className="btn btn-sm btn-primary"><IconCloudDownload /> Download</button>
                        </div>
                        <div className="table-responsive">
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th>
                                            <input type="checkbox" className="form-check-input" onChange={handleSelectAll}
                                                checked={tableData.length > 0 && selectedIds.length === tableData.length} 
                                            />
                                        </th>
                                        <th>#</th>
                                        <th>Auction Date</th>
                                        <th>Chassis Number</th>
                                        <th>Surrender</th>
                                        <th>Loading</th>
                                        <th>Car Name</th>
                                        <th>Client Name</th>
                                        <th>Transport</th>
                                        <th>Period</th>
                                        <th>D Send Date</th>
                                        <th>Year</th>
                                        <th>Product In</th>
                                        <th>Loading Date</th>
                                        <th>Ship Name</th>
                                        <th>Port Name</th>
                                        <th>B/L No</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tableData.length > 0 ? (
                                        tableData.map((item, index) => (
                                            <tr key={item.productId}>
                                                <td>
                                                    <input
                                                        type="checkbox"
                                                        className="form-check-input"
                                                        checked={selectedIds.includes(item.productId)}
                                                        onChange={() =>
                                                            handleCheckboxChange(item.productId)
                                                        }
                                                    />
                                                </td>
                                                <td>{(currentPage - 1) * pageSize + index + 1}</td>
                                                <td>{item.auctiondate}</td>
                                                <td>{item.chassisNo}</td>
                                                <td>{item.surrender}</td>
                                                <td>{item.loading}</td>
                                                <td>{item.productName}</td>
                                                <td>{item.clientName}</td>
                                                <td>{item.transport}</td>
                                                <td>{item.period}</td>
                                                <td>{item.dSendDate}</td>
                                                <td>{item.mdate}</td>
                                                <td>{item.productIn}</td>
                                                <td>{item.loadingDate}</td>
                                                <td>{item.shipname}</td>
                                                <td>{item.portName}</td>
                                                <td>{item.bLno}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="17" className="text-center">
                                                No Data Found
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                        <div className={`actionModal ${selectedIds.length > 0 ? "" : "d-none"}`}>
                            <div className="selectedItem">
                                {selectedIds.length} Selected from {tableData.length}
                            </div>
                            <div className="actionButtonArea">
                                <div class="btn-group" role="group" aria-label="Basic Buttons">
                                    <button type="button" class="btn btn-xs btn-success">Surrender Yes</button>
                                    <button type="button" class="btn btn-xs btn-danger">Surrender No</button>
                                </div>
                                <div class="btn-group" role="group" aria-label="Basic Buttons">
                                    <button type="button" class="btn btn-xs btn-success">Loading Yes</button>
                                    <button type="button" class="btn btn-xs btn-danger">Loading No</button>
                                </div>
                                <button className="btn btn-xs btn-light" onClick={() => setSelectedIds([])}><IconArrowLeft /> Cancel</button>
                            </div>
                        </div>

                        {/* Pagination */}
                        <div className="paginationBlock d-flex justify-content-between align-items-center p-3">
                            <p>
                                Showing {(currentPage - 1) * pageSize + 1}
                                {" "}to{" "}
                                {Math.min(currentPage * pageSize, totalRecords)}
                                {" "}of {totalRecords}
                            </p>

                            <ul className="pagination mb-0">
                                <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                                    <button className="page-link"
                                        onClick={() => setCurrentPage(prev => prev - 1)}>
                                        <IconChevronLeft size={18}/>
                                    </button>
                                </li>
                                {[...Array(totalPages)].slice(
                                    Math.max(0, currentPage - 3),
                                    Math.min(totalPages, currentPage + 2)
                                ).map((_, i) => {
                                    const pageNumber =
                                        Math.max(1, currentPage - 2) + i;
                                    return (
                                        <li key={pageNumber}
                                            className={`page-item ${
                                                currentPage === pageNumber
                                                    ? "active"
                                                    : ""
                                            }`}>
                                            <button className="page-link"
                                                onClick={() =>
                                                    setCurrentPage(pageNumber)
                                                }>
                                                {pageNumber}
                                            </button>
                                        </li>
                                    );
                                })}
                                <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                                    <button className="page-link"
                                        onClick={() =>
                                            setCurrentPage(prev => prev + 1)
                                        }>
                                        <IconChevronRight size={18}/>
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UpdateLoadingSurrender
