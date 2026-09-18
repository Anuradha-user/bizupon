import React, { useState, useEffect } from 'react'
import Select from 'react-select'
import DatePicker from "react-datepicker";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getViewPurchaseMasterList, getauctionYardData } from '../../../api/apiServices';
import SelectedField from '../../../base-components/SelectedField';
import apiLayout from '../../../api/apiLayout';
import {
    IconCirclePlusFilled,
    IconEdit,
    IconCurrencyYen,
    IconCurrencyDollar,
    IconSend,
    IconTrash,
    IconBell,
    IconHistory,
    IconLetterT,
    IconLetterI,
    IconChevronLeft,
    IconChevronRight
} from '@tabler/icons-react';

const productTypeTwoOptions = [
    { id: 'A', name: 'Real' },
    { id: 'D', name: 'Duplicate' }
];

const statusType = [
    { id: '1', name: 'Active' },
    { id: '0', name: 'De Active' }
];

const urgentOptions = [
    { id: '1', name: 'Yes' },
    { id: '0', name: 'No' }
];

const carStatusOptions = [
    { id: '100', name: 'All' },
    { id: '0', name: 'Unsold' },
    { id: '1', name: 'Unsold Ship' },
    { id: '2', name: 'Ship Back' },
    { id: '4', name: 'Reserved' },
    { id: '5', name: 'Sold' },
    { id: '3', name: 'Cancel By Client' },
    { id: '6', name: 'Client Changed' },
    { id: '7', name: 'Shipped' },
    { id: '8', name: 'Delivered' },
    { id: '9', name: 'Auction Cancel' }
];




function ViewPurchase() {
    const [masterformValue, setMasterformValue] = useState({
        "chassis": "",
        "urgent": 0,
        "clientid": 0,
        "countryId": 0,
        "subCatId": 0,
        "productMasterId": 0,
        "brandId": 0,
        "auctionId": 0,
        "auctionYardId": 0,
        "auctionDate": "",
        "registrationYear": 0,
        "manufactureDate": "",
        "statusId": 3,
        "carstatus": 0,
        "productTypeII": "A",
        "sessionUID": 0,
        "sessionLID": 1,
        "pageNo": 1,
        "pagesize": 50
    });


    const navigate = useNavigate();
    const [tableData, setTableData] = useState([]);
    const [isSubmit, setIsSubmit] = useState(false);

    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;




    const [masterListFormData, setMasterListFormData] = useState({
        country: null,
        subCategory: null,
        maker: null,
        auctions: null,
        companies: null,
        client: null,
        model: null,


    });
    const fetchViewPurchase = async () => {
        try {
            const response = await getViewPurchaseMasterList();
            (setMasterListFormData({
                country: response?.data?.data?.countries || null,
                subCategory: response?.data?.data?.subCategories || null,
                maker: response?.data?.data?.makers || null,
                auctions: response?.data?.data?.auctions || null,
                companies: response?.data?.data?.companies || null,
                client: response?.data?.data?.customers || null,
                model: response?.data?.data?.products || null,
            }));
        } catch (error) {
            console.error("Error fetching view purchase data:", error);
        }
    };


    const fetchAuctionYard = async (id) => {
        try {
            const response = await getauctionYardData(id);

            (setMasterListFormData({
                ...masterListFormData,
                auctionYard: response?.data?.data || null,

            }));

        } catch (error) {
            console.error("Error fetching view purchase data:", error);
        }
    };
    useEffect(() => {


        fetchViewPurchase();
    }, []);

    const clearFilter = () => {
        setMasterformValue({
            "chassis": "",
            "urgent": 0,
            "clientid": 0,
            "countryId": 0,
            "subCatId": 0,
            "productMasterId": 0,
            "brandId": 0,
            "auctionId": 0,
            "auctionYardId": 0,
            "auctionDate": "",
            "registrationYear": 0,
            "manufactureDate": "",
            "statusId": 3,
            "carstatus": 0,
            "productTypeII": "A",
            "sessionUID": 0,
            "sessionLID": 1,
            "pageNo": 1,
            "pagesize": 20
        });
        setTableData([])

    }

  

    // Pagination calculations
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = tableData.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(tableData.length / itemsPerPage);

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

      const fetchTableData = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('accessToken');
            const payload = masterformValue

            const res = await axios.post(apiLayout.viewPurchase, payload, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (res.data && res.data.isSuccess) {
                setTableData(res.data.data.lstProduct || []);
                setIsSubmit(true)
            } else if (res.data && res.data.data && Array.isArray(res.data.data)) {
                setTableData(res.data.data);
            }
        } catch (error) {
            console.error("Error fetching purchase table data", error);
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="row">
            <div className="col-lg-12 col-12">
                <div className="card">
                    <div className="card-header">
                        <h5 className="title">View Purchase</h5>
                        <button className="btn btn-sm btn-primary" onClick={() => navigate('/admin/product-master/add-purchase')}><IconCirclePlusFilled /> Add Purchase</button>
                    </div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-lg-3 col-md-12 col-12">
                                <SelectedField
                                    masterLebel="Country"
                                    value={masterformValue?.countryId || ""}
                                    label="Select Country"
                                    list={masterListFormData?.country}
                                    onSelect={(value) =>
                                        setMasterformValue((prev) => ({
                                            ...prev,
                                            countryId: Number(value),
                                        }))
                                    }
                                />


                            </div>
                            <div className="col-lg-3 col-md-12 col-12">

                                <SelectedField
                                    masterLebel="Category"
                                    value={masterformValue?.subCatId || ""}
                                    label="Select Category"
                                    list={masterListFormData?.subCategory}
                                    onSelect={(value) => setMasterformValue((prev) => ({
                                        ...prev,
                                        subCatId: Number(value),
                                    }))}
                                />

                            </div>

                            <div className="col-lg-3 col-md-12 col-12">
                                <SelectedField
                                    masterLebel="Maker"
                                    value={masterformValue?.makerId || ""}
                                    label="Select Maker"
                                    list={masterListFormData?.maker}
                                    onSelect={(value) => setMasterformValue((prev) => ({
                                        ...prev,
                                        makerId: Number(value),
                                    }))}
                                />



                            </div>
                            <div className="col-lg-3 col-md-12 col-12">

                                <SelectedField
                                    masterLebel="Model"
                                    value={masterformValue?.modelId || ""}
                                    label="Select Model"
                                    list={masterListFormData?.model}
                                    onSelect={(value) => setMasterformValue((prev) => ({
                                        ...prev,
                                        modelId: Number(value),
                                    }))}
                                />
                            </div>

                            <div className="col-lg-3 col-md-12 col-12">
                                <SelectedField
                                    masterLebel="Client Name"
                                    value={masterformValue?.clientid || ""}
                                    label="Select Client"
                                    list={masterListFormData?.client}
                                    onSelect={(value) => setMasterformValue((prev) => ({
                                        ...prev,
                                        clientid: Number(value),
                                    }))}
                                />
                            </div>
                            <div className="col-lg-3 col-md-12 col-12">
                                <SelectedField
                                    masterLebel="Auction House"
                                    value={masterformValue?.auctionId || ""}
                                    label="Select Auction House"
                                    list={masterListFormData?.auctions}
                                    onSelect={(value) => {
                                        const auctionId = Number(value);
                                        setMasterformValue((prev) => ({
                                            ...prev,
                                            auctionId,
                                            auctionYardId: 0, // clear previous yard
                                        }));

                                        if (auctionId) {
                                            fetchAuctionYard(auctionId);
                                        }
                                    }}
                                />

                            </div>
                            <div className="col-lg-3 col-md-12 col-12">
                                <SelectedField
                                    masterLebel="Auction Yard"
                                    value={masterformValue?.auctionYardId || ""}
                                    label="Select Auction Yard"
                                    list={masterListFormData?.auctionYard}
                                    onSelect={(value) => setMasterformValue((prev) => ({
                                        ...prev,
                                        auctionYardId: Number(value),
                                    }))}
                                />
                            </div>
                            <div className="col-lg-3 col-md-12 col-12">
                                <div className="form-group">
                                    <label className="form-label">Auction Date</label>
                                    <DatePicker
                                        selected={masterformValue?.auctionDate}
                                        onChange={(date) => setMasterformValue((prev) => ({
                                            ...prev,
                                            auctionDate: date,
                                        }))}
                                        className="form-control"
                                        placeholderText="DD/MM/YYYY"
                                        dateFormat="dd/MM/yyyy"
                                    />
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-12 col-12">
                                <div className="form-group">
                                    <label className="form-label">Registration Year</label>
                                    <input type="number"
                                        className="form-control"
                                        value={masterformValue?.registrationYear || ""}
                                        onChange={(e) => setMasterformValue((prev) => ({
                                            ...prev,
                                            registrationYear: Number(e.target.value),
                                        }))}
                                    />
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-12 col-12">
                                <div className="form-group">
                                    <label className="form-label">Manufacture Date</label>
                                    <DatePicker
                                        selected={masterformValue?.manufactureDate}
                                        onChange={(date) => setMasterformValue((prev) => ({
                                            ...prev,
                                            manufactureDate: date,
                                        }))}
                                        className="form-control"
                                        placeholderText="DD/MM/YYYY"
                                        dateFormat="dd/MM/yyyy"
                                    />
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-12 col-12">
                                <SelectedField
                                    masterLebel="Product Type II"
                                    value={masterformValue?.productTypeII || ""}
                                    label="Select Product Type II"
                                    list={productTypeTwoOptions}
                                    onSelect={(value) => setMasterformValue((prev) => ({
                                        ...prev,
                                        productTypeII: value,
                                    }))}
                                />
                            </div>

                            <div className="col-lg-3 col-md-12 col-12">
                                <SelectedField
                                    masterLebel="Status"
                                    value={masterformValue?.statusId || ""}
                                    label="Select Status"
                                    list={statusType}
                                    onSelect={(value) => setMasterformValue((prev) => ({
                                        ...prev,
                                        statusId: Number(value),
                                    }))}
                                />

                            </div>
                            <div className="col-lg-3 col-md-12 col-12">
                                <div className="form-group">
                                    <label className="form-label">Chassis Number</label>
                                    <input type="text"
                                        value={masterformValue?.chassis || ""}
                                        onChange={(e) => setMasterformValue((prev) => ({
                                            ...prev,
                                            chassis: e.target.value,
                                        }))}
                                        className="form-control" />
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-12 col-12">
                                <SelectedField
                                    masterLebel="Urgent"
                                    value={masterformValue?.urgent || ""}
                                    label="Select Urgent"
                                    list={urgentOptions}
                                    onSelect={(value) => setMasterformValue((prev) => ({
                                        ...prev,
                                        urgent: Number(value),
                                    }))}
                                />
                            </div>
                            <div className="col-lg-3 col-md-12 col-12">
                                <SelectedField
                                    masterLebel="Car Status"
                                    value={masterformValue?.carstatus || ""}
                                    label="Select Car Status"
                                    list={carStatusOptions}
                                    onSelect={(value) => setMasterformValue((prev) => ({
                                        ...prev,
                                        carstatus: Number(value),
                                    }))}
                                />
                            </div>
                            <div className="col-lg-12 col-md-12 col-12">
                                {isSubmit &&
                                    <button className="btn btn-md btn-danger float-end " style={{ marginLeft: "10px" }} onClick={clearFilter}>Clear</button>

                                }&nbsp;
                                <button className="btn btn-md btn-primary float-end" onClick={() => fetchTableData()}>Search</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card table-card overflow-hidden">
                    <div className="card-body">
                        <div className="table-responsive">
                            <table className="table table-bordered border-bottom align-middle mb-0" style={{ fontSize: '13px' }}>
                                <thead style={{ backgroundColor: '#fdfdfd', color: '#070707', fontSize: '11px', letterSpacing: '0.5px' }}>
                                    <tr>
                                        <th className="text-center" style={{ width: '38px' }}><input type="checkbox" className="form-check-input" /></th>
                                        <th style={{ width: '45px' }}>S.NO.</th>
                                        <th style={{ minWidth: '180px', maxWidth: '230px' }}>UID</th>
                                        <th style={{ minWidth: '110px' }}>PRODUCT</th>
                                        <th style={{ minWidth: '120px' }}>CHASSIS</th>
                                        <th style={{ minWidth: '80px' }}>SOLD</th>
                                        <th style={{ minWidth: '70px' }}>URGENT</th>
                                        <th style={{ minWidth: '80px' }}>P_I</th>
                                        <th style={{ minWidth: '90px' }}>R DATE</th>
                                        <th style={{ minWidth: '90px' }}>M DATE</th>
                                        <th style={{ minWidth: '90px' }}>STATUS</th>
                                        <th className="text-center" style={{ width: '125px' }}>ACTION</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {loading ? (
                                        <tr>
                                            <td colSpan="12" className="text-center py-4">
                                                <div className="spinner-border spinner-border-sm text-primary me-2" role="status"></div>
                                                Loading...
                                            </td>
                                        </tr>
                                    ) : currentItems.length > 0 ? (
                                        currentItems.map((item, index) => (
                                            <tr key={item.id || index}>
                                                <td className="text-center"><input type="checkbox" className="form-check-input" /></td>
                                                <td>{indexOfFirstItem + index + 1}</td>
                                                <td className="fw-normal text-wrap" style={{ wordBreak: 'break-word', lineHeight: '1.3' }}>
                                                    {item.uid || 'N/A'}
                                                </td>
                                                <td className="fw-bold text-dark">{item.productName || 'N/A'}</td>
                                                <td className="fw-bold" style={{ color: '#5cb85c' }}>{item.chassisNo || 'N/A'}</td>
                                                <td className="text-uppercase">{item.saleCountry || 'N/A'}</td>
                                                <td>
                                                    <div className="fw-semibold">{item.urgent || 'N/A'}</div>
                                                    <div className="text-primary small" style={{ fontSize: '11px' }}>{item.proGradeductName || 'N/A'}</div>
                                                </td>
                                                <td>
                                                    <div className="fw-bold text-dark">{item.pItype || 'N/A'}</div>
                                                    <div className="text-muted" style={{ fontSize: '11px' }}>
                                                        {[item.cc || 'N/A', item.ctype || 'N/A'].filter(Boolean).join('/')}
                                                    </div>
                                                </td>
                                                <td className="text-nowrap">{item.rgdate || item.rDate || '2023-03-16'}</td>
                                                <td className="text-nowrap">{item.mdate || item.mDate || '2023-03-15'}</td>
                                                <td>
                                                    <span className="   py-1" style={{ fontSize: '11px' }}>
                                                        {item.status || 'DE-Active'}
                                                    </span>
                                                </td>
                                                <td className="px-2">
                                                    {/* 2-Line Action Icons Layout */}
                                                    <div className="d-flex flex-column gap-1 align-items-center">
                                                        <div className="d-flex align-items-center gap-2">
                                                            <button title="Edit" className="btn btn-link p-0 text-warning"><IconEdit size={16} /></button>
                                                            <button title="Yen" className="btn btn-link p-0 text-success"><IconCurrencyYen size={16} /></button>
                                                            <button title="Dollar" className="btn btn-link p-0 text-success"><IconCurrencyDollar size={16} /></button>
                                                            <button title="Send" className="btn btn-link p-0 text-primary"><IconSend size={16} /></button>
                                                            <button title="Delete" className="btn btn-link p-0 text-danger"><IconTrash size={16} /></button>
                                                        </div>
                                                        <div className="d-flex align-items-center gap-2">
                                                            <button title="Notification" className="btn btn-link p-0 text-info"><IconBell size={16} /></button>
                                                            <button title="History" className="btn btn-link p-0 text-danger"><IconHistory size={16} /></button>
                                                            <button title="Inspection" className="btn btn-link p-0 text-success"><IconLetterT size={16} /></button>
                                                            <button title="Images" className="btn btn-link p-0 text-primary"><IconLetterI size={16} /></button>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="12" className="text-center py-4 text-muted">No Data Found</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                        {!loading && tableData.length > 0 && (
                            <div className="d-flex justify-content-between align-items-center p-3 border-top bg-light">
                                <small className="text-muted">
                                    Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, tableData.length)} of {tableData.length} entries
                                </small>
                                <ul className="pagination pagination-sm mb-0">
                                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                        <button className="page-link border-0" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                                            <IconChevronLeft size={16} />
                                        </button>
                                    </li>
                                    {[...Array(totalPages)].map((_, i) => (
                                        <li key={i} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                                            <button
                                                className={`page-link mx-1 rounded ${currentPage === i + 1 ? 'bg-primary text-white' : 'text-dark'}`}
                                                onClick={() => handlePageChange(i + 1)}
                                            >
                                                {i + 1}
                                            </button>
                                        </li>
                                    ))}
                                    <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                                        <button className="page-link border-0" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                                            <IconChevronRight size={16} />
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewPurchase
