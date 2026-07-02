import React, {useState, useEffect} from 'react'
import Select from 'react-select'
import DatePicker from "react-datepicker";
import { useNavigate } from 'react-router-dom';
import { IconCirclePlusFilled, IconEyeFilled } from '@tabler/icons-react';
import axios from 'axios';

function ViewPurchase() {

    const [country, setCountry] = useState([]);
    const [selectCountry, setSelectCountry] = useState(null);
    const [category, setCategory] = useState([]);
    const [selectCategory, setSelectCategory] = useState(null);
    const [maker, setMaker] = useState([]);
    const [selectMaker, setSelectMaker] = useState(null);
    const [model, setModel] = useState([]);
    const [selectModel, setSelectModel] = useState(null);
    const [client, setClient] = useState([]);
    const [selectClient, setSelectClient] = useState(null);
    const [auctionHouse, setAuctionHouse] = useState([]);
    const [selectAuction, setSelectAuction] = useState([null]);
    const [auctionDate, setAuctionDate] = useState(null);
    const [manufactureDate, setManufactureDate] = useState(null);
    const navigate = useNavigate();
    const [productTwo, setProductTwo] = useState([
        {
            value: "Real",
            label: "Real"
        },
        {
            value: "Duplicate",
            label: "Duplicate"
        }
    ]);
    const [selectProductTwo, setSelectProductTwo] = useState(null);

    const [status, setStatus] = useState([
        {
            value: "Active",
            label: "Active"
        },
        {
            value: "De Active",
            label: "De Active"
        }
    ]);
    const [selectStatus, setSelectStatus] = useState(null);

    const [urgent, setUrgent] = useState([
        {
            value: "Yes",
            label: "Yes"
        },
        {
            value: "No",
            label: "No"
        }
    ]);
    const [selectUrgent, setselectUrgent] = useState(null);

    const [carStatus, setCarStatus] = useState([
        {
            value: "Unsold",
            label: "Unsold"
        },
        {
            value: "Unsold Ship",
            label: "Unsold Ship"
        },
        {
            value: "Ship Back",
            label: "Ship Back"
        },
        {
            value: "Reserved",
            label: "Reserved"
        },
        {
            value: "Sold",
            label: "Sold"
        },
        {
            value: "Cancel By Client",
            label: "Cancel By Client"
        },
        {
            value: "Client Changed",
            label: "Client Changed"
        },
        {
            value: "Shipped",
            label: "Shipped"
        },
        {
            value: "Delivered",
            label: "Delivered"
        },
        {
            value: "Auction Cancel",
            label: "Auction Cancel"
        },
        {
            value: "In Auction",
            label: "In Auction"
        },
        {
            value: "Auction Sold",
            label: "Auction Sold"
        },
        {
            value: "Local Sale",
            label: "Local Sale"
        }
    ]);
    const [selectCarStatus, setSelectCarStatus] = useState(null);

    // fetch country dropdown data
    const fetchCountriesData = async() => {
        try{
            const res = await axios.get('https://localhost:7010/api/Purchase/GetViewPurchaseMaster')
            const data = (res.data.data.countries || []).map(item => ({
                value: item.id,
                label: item.name
            }));

            setCountry(data);

        } catch (error) {
            console.error("error fetching data", error);
        }
    };

    // fetch category dropdown data
    const fetchCategoriesData = async() => {
        try{
            const res = await axios.get('https://localhost:7010/api/Purchase/GetViewPurchaseMaster')
            const data = (res.data.data.subCategories || []).map(item => ({
                value: item.id,
                label: item.name
            }));

            setCategory(data);

        } catch (error) {
            console.error("error fetching data", error);
        }
    };

    // fetch maker dropdown data
    const fetchMakerData = async() => {
        try{
            const res = await axios.get('https://localhost:7010/api/Purchase/GetViewPurchaseMaster')
            const data = (res.data.data.makers || []).map(item => ({
                value: item.id,
                label: item.name
            }));

            setMaker(data);

        } catch (error) {
            console.error("error fetching data", error);
        }
    };

    // fetch model dropdown data
    const fetchModelData = async() => {
        try{
            const res = await axios.get('https://localhost:7010/api/Purchase/GetViewPurchaseMaster')
            const data = (res.data.data.products || []).map(item => ({
                value: item.id,
                label: item.name
            }));

            setModel(data);

        } catch (error) {
            console.error("error fetching data", error);
        }
    };

    // fetch client dropdown data
    const fetchClientData = async() => {
        try{
            const res = await axios.get('https://localhost:7010/api/Purchase/GetViewPurchaseMaster')
            const data = (res.data.data.customers || []).map(item => ({
                value: item.id,
                label: item.name
            }));

            setClient(data);

        } catch (error) {
            console.error("error fetching data", error);
        }
    };

    // fetch auction dropdown data
    const fetchAuctionData = async() => {
        try{
            const res = await axios.get('https://localhost:7010/api/Purchase/GetViewPurchaseMaster')
            const data = (res.data.data.auctions || []).map(item => ({
                value: item.id,
                label: item.name
            }));

            setAuctionHouse(data);

        } catch (error) {
            console.error("error fetching data", error);
        }
    };

    useEffect(() => {
        fetchCountriesData();
        fetchCategoriesData();
        fetchMakerData();
        fetchModelData();
        fetchClientData();
        fetchAuctionData();
    }, []);


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
                            <div className="form-group">
                                <label className="form-label">Select Country</label>
                                <Select 
                                    options={country}
                                    value={selectCountry}
                                    onChange={setSelectCountry}
                                    placeholder="Select Country"
                                />
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-12 col-12">
                            <div className="form-group">
                                <label className="form-label">Select Category</label>
                                <Select 
                                    options={category}
                                    value={selectCategory}
                                    onChange={setSelectCategory}
                                    placeholder="Select Category"
                                />
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-12 col-12">
                            <div className="form-group">
                                <label className="form-label">Select Maker</label>
                                <Select
                                    options={maker}
                                    value={selectMaker}
                                    onChange={setSelectMaker}
                                    placeholder="Select Maker"
                                />
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-12 col-12">
                            <div className="form-group">
                                <label className="form-label">Select Model</label>
                                <Select
                                    options={model}
                                    value={selectModel}
                                    onChange={setSelectModel}
                                    placeholder="Select Model"
                                />
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-12 col-12">
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
                                <label className="form-label">Auction House</label>
                                <Select 
                                    options={auctionHouse}
                                    value={selectAuction}
                                    onChange={setSelectAuction}
                                    placeholder="Select Auction House"
                                />
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-12 col-12">
                            <div className="form-group">
                                <label className="form-label">Auction Yard</label>
                                <Select />
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-12 col-12">
                            <div className="form-group">
                                <label className="form-label">Auction Date</label>
                                <DatePicker
                                    selected={auctionDate}
                                    onChange={(date) => setAuctionDate(date)}
                                    className="form-control"
                                    placeholderText="DD/MM/YYYY"
                                    dateFormat="dd/MM/yyyy"
                                />
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-12 col-12">
                            <div className="form-group">
                                <label className="form-label">Registration Year</label>
                                <input type="number" className="form-control" />
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-12 col-12">
                            <div className="form-group">
                                <label className="form-label">Manufacture Date</label>
                                <DatePicker
                                    selected={manufactureDate}
                                    onChange={(date) => setManufactureDate(date)}
                                    className="form-control"
                                    placeholderText="DD/MM/YYYY"
                                    dateFormat="dd/MM/yyyy"
                                />
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-12 col-12">
                            <div className="form-group">
                                <label className="form-label">Product Type II</label>
                                <Select
                                    options={productTwo}
                                    value={selectProductTwo}
                                    onChange={setSelectProductTwo}
                                    placeholder="Select Product Type II"
                                />
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-12 col-12">
                            <div className="form-group">
                                <label className="form-label">Status</label>
                                <Select
                                    options={status}
                                    value={selectStatus}
                                    onChange={setSelectStatus}
                                    placeholder="Select Status"
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
                                <label className="form-label">Urgent</label>
                                <Select
                                    options={urgent}
                                    value={selectUrgent}
                                    onChange={setselectUrgent}
                                    placeholder="Select Urgent"
                                />
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-12 col-12">
                            <div className="form-group">
                                <label className="form-label">Car Status</label>
                                <Select
                                    options={carStatus}
                                    value={selectCarStatus}
                                    onChange={setSelectCarStatus}
                                    placeholder="Select Car Status"
                                />
                            </div>
                        </div>
                        <div className="col-lg-12 col-md-12 col-12">
                            <button className="btn btn-md btn-primary float-end">Submit</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="card table-card overflow-hidden">
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th><input type="checkbox" className="form-check-input" /></th>
                                    <th>#</th>
                                    <th>UID</th>
                                    <th>Product</th>
                                    <th>Chassis</th>
                                    <th>Sold</th>
                                    <th>Urgent</th>
                                    <th>P I</th>
                                    <th>R Date</th>
                                    <th><abbr data-title="Manufacture Date">M Date</abbr></th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ViewPurchase
