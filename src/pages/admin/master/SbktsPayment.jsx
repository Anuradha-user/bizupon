import { IconEye } from '@tabler/icons-react';
import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { Link } from 'react-router-dom';
import axios from 'axios';

function SbktsPayment() {

    const [sbktsList, setSbktsList] = useState([]);
    const [selectedSbkts, setSelectedSbkts] = useState(null);
    const [sbktsData, setSbktsData] = useState([]);
    const [totalRecords, setTotalRecords] = useState(0);
    const [selectedIds, setSelectedIds] = useState([]);

    // FIX: Added missing state
    const [bankBrokerList, setBankBrokerList] = useState([]);
    const [selectedBankBroker, setSelectedBankBroker] = useState(null);

    // Fetch SBKTS Dropdown
    const fetchsbktsData = async() => {
        try{
            const res = await axios.get('https://localhost:7244/api/financial/GetddlSBKTS')
            const data = (res.data.data || []).map(item => ({
                value: item.id,
                label: item.name
            }))

            setSbktsList(data);

            if (data.length > 0) {
                setSelectedSbkts(data[0]);
            }

        } catch(error){
            console.error("error fetching data", error);
        }
    };

    // Fetch Table Data
    const handleFilter = async () => {
        try {
            const res = await axios.get(
                "https://localhost:7244/api/financial/GetBKTSPaymentDetails",
                {
                    params: {
                        SBKTSID: selectedSbkts?.value || 0,
                        PageIndex: 1,
                        PageSize: 50
                    }
                }
            );

            console.log(res.data);

            setSbktsData(res.data.data.sbkts_Invoices || []);
            setTotalRecords(res.data.data.totalRecords || 0);

        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchBankBrokerData();
        fetchsbktsData();
    }, []);


    // Fetch Bank Broker Dropdown
    const fetchBankBrokerData = async() => {
        try{
            const res = await axios.get('https://localhost:7244/api/financial/ddlBankBroker')
            const data = (res.data.data || []).map(item => ({
                value: item.id,
                label: item.name
            }))
            setBankBrokerList(data);
        } catch(error){
            console.error("error fetching data", error);
        }
    };

    // select all checkbox
    const handleSelectAll = (e) => {
        if (e.target.checked) {
            const allIds = sbktsData.map(item => item.sB_Ref_ID);
            setSelectedIds(allIds);
        } else {
            setSelectedIds([]);
        }
    };

    // single checkbox
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
    }, [sbktsData]);

    return (
        <div className="row">
            <div className="col-lg-12">
                <div className="card">
                    <div className="card-header">
                        <h5 className="title">SBKTS Payment</h5>
                    </div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-lg-3 col-md-6 col-12">
                                <div className="form-group">
                                    <label className="form-label">Select SBKTS</label>
                                    <Select
                                        options={sbktsList}
                                        value={selectedSbkts}
                                        onChange={setSelectedSbkts}
                                        placeholder="Select SBKTS"
                                        isClearable
                                    />
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6 col-12">
                                <div className="form-group">
                                    <button type="button"
                                        className="btn btn-md btn-primary mt-25"
                                        onClick={handleFilter}>
                                        Filter
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Table */}
                <div className="card table-card overflow-hidden">
                    <div className="card-header d-flex justify-content-between align-items-center">
                        <h5 className="badge bg-success p-2">
                            Total Records : {totalRecords}
                        </h5>
                        <div className="d-flex gap-2 w-25">
                            <Select
                                options={bankBrokerList}
                                value={selectedBankBroker}
                                onChange={setSelectedBankBroker}
                                placeholder="Select Bank Broker"
                                className="w-100"
                                isClearable
                            />
                            <button className="btn btn-sm btn-primary">Send</button>
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
                                                checked={selectedIds.length === sbktsData.length && sbktsData.length > 0}
                                            />
                                        </th>
                                        <th>Serial No.</th>
                                        <th>SBKTS Name</th>
                                        <th>Invoice No.</th>
                                        <th>Total Cars</th>
                                        <th>Invoice Date</th>
                                        <th>Payment Status</th>
                                        <th>Amount</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {sbktsData.length > 0 ? (
                                        sbktsData.map((item, index) => (
                                            <tr key={index}>
                                                <td>
                                                    <input type="checkbox" className="form-check-input"
                                                        checked={selectedIds.includes(item.sB_Ref_ID)}
                                                        onChange={() => handleCheckboxChange(item.sB_Ref_ID)}
                                                    />
                                                </td>
                                                <td>{index + 1}</td>
                                                <td>{item.sbktsName}</td>
                                                <td>{item.invNo}</td>
                                                <td>{item.totalCars}</td>
                                                <td>
                                                    {new Date(item.invDate).toLocaleDateString()}
                                                </td>
                                                <td>
                                                    <span className={`badge ${item.invStatus === 'Paid' ? 'bg-success' : 'bg-warning'}`}>
                                                        {item.invStatus}
                                                    </span>
                                                </td>
                                                <td>
                                                    <input type="text" className="editable-control"
                                                        value={item.amt || ""}
                                                        onChange={(e) => {
                                                            const updated = sbktsData.map(cat =>
                                                                cat.sB_Ref_ID === item.sB_Ref_ID
                                                                    ? { ...cat, amt: e.target.value }
                                                                    : cat
                                                            );
                                                            setSbktsData(updated);
                                                        }}
                                                    />
                                                </td>
                                                <td>
                                                    <div className="text-end">
                                                        <Link to="#" className="avtar view" data-bs-toggle="tooltip" data-bs-placement="top" title="Invoice Details"><IconEye /></Link>
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
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SbktsPayment;