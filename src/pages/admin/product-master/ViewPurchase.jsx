import React, { useState, useEffect } from 'react'
import DatePicker from "react-datepicker";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getViewPurchaseMasterList, getauctionYardData } from '../../../api/apiServices';
import SelectedField from '../../../base-components/SelectedField';
import apiLayout from '../../../api/ApiLayout';
import Table from '../../../web-components/Table';
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
    IconLetterI
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

const displayValue = (value) => value === null || value === undefined || value === '' ? 'N/A' : value;

const purchaseTableColumns = [
    {
        header: <input type="checkbox" className="form-check-input" />,
        key: 'select',
        headerClassName: 'text-center',
        style: { width: '38px' },
        className: 'text-center',
        render: () => <input type="checkbox" className="form-check-input" />,
    },
    {
        header: 'S.NO.',
        key: 'serialNumber',
        style: { width: '45px' },
        render: (_item, _index, absoluteIndex) => absoluteIndex + 1,
    },
    {
        header: 'UID',
        key: 'uid',
        style: { minWidth: '180px', maxWidth: '230px' },
        className: 'fw-normal text-wrap',
        tdStyle: { wordBreak: 'break-word', lineHeight: '1.3' },
        render: (item) => displayValue(item.uid),
    },
    {
        header: 'PRODUCT',
        key: 'productName',
        style: { minWidth: '110px' },
        className: 'fw-bold text-dark',
        render: (item) => displayValue(item.productName),
    },
    {
        header: 'CHASSIS',
        key: 'chassisNo',
        style: { minWidth: '120px' },
        className: 'fw-bold',
        tdStyle: { color: '#5cb85c' },
        render: (item) => displayValue(item.chassisNo),
    },
    {
        header: 'SOLD',
        key: 'saleCountry',
        style: { minWidth: '80px' },
        className: 'text-uppercase',
        render: (item) => displayValue(item.saleCountry),
    },
    {
        header: 'URGENT',
        key: 'urgent',
        style: { minWidth: '70px' },
        render: (item) => (
            <>
                <div className="fw-semibold">{displayValue(item.urgent)}</div>
                <div className="text-primary small" style={{ fontSize: '11px' }}>{displayValue(item.proGradeductName)}</div>
            </>
        ),
    },
    {
        header: 'P_I',
        key: 'pItype',
        style: { minWidth: '80px' },
        render: (item) => (
            <>
                <div className="fw-bold text-dark">{displayValue(item.pItype)}</div>
                <div className="text-muted" style={{ fontSize: '11px' }}>
                    {[displayValue(item.cc), displayValue(item.ctype)].join('/')}
                </div>
            </>
        ),
    },
    {
        header: 'R DATE',
        key: 'rgdate',
        style: { minWidth: '90px' },
        className: 'text-nowrap',
        render: (item) => displayValue(item.rgdate || item.rDate),
    },
    {
        header: 'M DATE',
        key: 'mdate',
        style: { minWidth: '90px' },
        className: 'text-nowrap',
        render: (item) => displayValue(item.mdate || item.mDate),
    },
    {
        header: 'STATUS',
        key: 'status',
        style: { minWidth: '90px' },
        render: (item) => (
            <span className="py-1" style={{ fontSize: '11px' }}>
                {displayValue(item.status)}
            </span>
        ),
    },
    {
        header: 'ACTION',
        key: 'actions',
        headerClassName: 'text-center',
        style: { width: '125px' },
        className: 'px-2',
        render: () => (
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
        ),
    },
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
                        <Table
                            columns={purchaseTableColumns}
                            data={tableData}
                            loading={loading}
                            itemsPerPage={5}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewPurchase
