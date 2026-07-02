import axios from 'axios';
import React, {useState, useEffect, use} from 'react'
import Select from 'react-select'
import DatePicker from "react-datepicker";

function UpdateVariant() {

    const [category, setCategory] = useState([]);
    const [selectCategory, setSelectCategory] = useState(null);

    const [productList, setProductList] = useState([]);
    const [selectProduct, setSelectProduct] = useState(null);

    const [modelCode, setModelCode] = useState([]);
    const [selectModelCode, setSelectModelCode] = useState(null);

    const [auctionHouse, setAuctionHouse] = useState([]);
    const [selectAuctionHouse, setSelectAuctionHouse] = useState(null);

    const [auctionDate, setAuctionDate] = useState(null);

    const [productType, setProductType] = useState([
        {
            value: "normal",
            label: "Normal"
        },
        {
            value: "promotional",
            label: "Promotional"
        }
    ]);
    const [selectProductType, setSelectProductType] = useState(null);

    // fetch category dropdown data
    const fetchCategoryData = async () => {
        try {

            const res = await axios.get('https://localhost:7069/api/Product/GetMaster');

            const data = (res.data.data.lstSubCategory || []).map(item => ({
                value: item.id,
                label: item.name
            }));

            setCategory(data);

        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    // fetch product dropdown data
    const fetchProductData = async () => {
        try {

            const res = await axios.get('https://localhost:7069/api/Product/GetMaster');

            const data = (res.data.data.lstProductMaster || []).map(item => ({
                value: item.id,
                label: item.name
            }));

            setProductList(data);

        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    // fetch model code dropdown data
    const fetchModelCodeData = async () => {
        try {

            const res = await axios.get('https://localhost:7069/api/Product/GetMaster');

            const data = (res.data.data.lstModelCodes || []).map(item => ({
                value: item,
                label: item
            }));

            setModelCode(data);

        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    // fetch auction house dropdown data
    const fetchAuctionHouseData = async () => {
        try {

            const res = await axios.get('https://localhost:7069/api/Product/GetMaster');

            const data = (res.data.data.lstAuction || []).map(item => ({
                value: item.id,
                label: item.name
            }));

            setAuctionHouse(data);

        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchCategoryData();
        fetchProductData();
        fetchModelCodeData();
        fetchAuctionHouseData();
    }, []);

  return (
    <div className="row">
        <div className="col-lg-12 col-12">
            <div className="card">
                <div className="card-header">
                    <h5 className="title">Update Variant</h5>
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-lg-3 col-md-12 col-12">
                            <div className="form-group">
                                <label className="form-label">Category</label>
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
                                <label className="form-label">Select Product</label>
                                <Select 
                                    options={productList}
                                    value={selectProduct}
                                    onChange={setSelectProduct}
                                    placeholder="Select Product"
                                />
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-12 col-12">
                            <div className="form-group">
                                <label className="form-label">Select Model Code</label>
                                <Select 
                                    options={modelCode}
                                    value={selectModelCode}
                                    onChange={setSelectModelCode}
                                    placeholder="Select Model Code"
                                />
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-12 col-12">
                            <div className="form-group">
                                <label className="form-label">Auction Houses</label>
                                <Select 
                                    options={auctionHouse}
                                    value={selectAuctionHouse}
                                    onChange={setSelectAuctionHouse}
                                    placeholder="Select Auction Houses"
                                />
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
                            <div className="form-group">
                                <label className="form-label">Product Type</label>
                                <Select
                                    options={productType}
                                    value={selectProductType}
                                    onChange={setSelectProductType}
                                    placeholder="Select Product Type"
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Chassis Number</label>
                                <input type="text" className="form-control" />
                            </div>
                        </div>
                        <div className="col-lg-9 col-md-12 col-12">
                            <div className="form-group">
                                <label className="form-label">All Chassis Number</label>
                                <textarea id="allNumber" rows="9" className="form-control" />
                            </div>
                        </div>
                        <div className="col-lg-12 col-md-12 col-12">
                            <button className="btn btn-md btn-primary mt-2 float-end">Filter</button>
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
                                    <th>Product Name</th>
                                    <th>Chassis Number</th>
                                    <th>Variant Details</th>
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

export default UpdateVariant
