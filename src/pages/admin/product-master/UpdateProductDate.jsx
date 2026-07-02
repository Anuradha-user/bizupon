import React, {useState, useEffect} from 'react'
import Select from 'react-select'
import DatePicker from "react-datepicker";
import axios from 'axios';

function UpdateProductDate() {

    const [category, setCategory] = useState([]);
    const [selectCategory, setSelectCategory] = useState(null);
    const [auctionHouse, setAuctionHouse] = useState([]);
    const [selectAuction, setSelectAuction] = useState(null);
    const [auctionDate, setAuctionDate] = useState(null);


    // fetch category dropdown data
    const fetchCategoriesData = async () => {
        try {

            const res = await axios.get('https://jaishriganesha.com/bizupon-master/api/master/view-subcategories');
            const data = (res.data.data || []).map(item => ({
                value: item.id,
                label: item.name
            }));
            setCategory(data);
        } catch (error) {
            console.error("Error fetching category data", error);
        }
    };

    const fetchAuctionHouseData = async () => {
        try {

            const res = await axios.get('https://jaishriganesha.com/bizupon-master/api/Port/view-auction?CID=0&AcutionName=0');
            const data = (res.data.data || []).map(item => ({
                value: item.id,
                label: item.name
            }));
            setAuctionHouse(data);
        } catch (error) {
            console.error("Error fetching auction house data", error);
        }
    };

    useEffect(() => {
        fetchCategoriesData();
        fetchAuctionHouseData();
    }, []);

  return (
    <div className="row">
        <div className="col-lg-12 col-12">
            <div className="card">
                <div className="card-header">
                    <h5 className="title">Update Product Date</h5>
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
                                <Select />
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
                                <label className="form-label">Chassis Number</label>
                                <input type="text" className="form-control" />
                            </div>
                        </div>
                        <div className="col-lg-9 col-md-12 col-12">
                            <div className="form-group">
                                <label className="form-label">All Chassis Number</label>
                                <textarea id="allNumber" rows="1" className="form-control" />
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
                                    <th>Chassis No.</th>
                                    <th>Product Name</th>
                                    <th><abbr data-title="Document Received Date">D. R. Date</abbr></th>
                                    <th>D-I-Date</th>
                                    <th>Wish D-I-Date</th>
                                    <th>D-S-Date</th>
                                    <th>Product In</th>
                                    <th>Wish Product In</th>
                                    <th><abbr data-title="Wish Ship Date">W. S. Date</abbr></th>
                                    <th><abbr data-title="Wish Arrival Date">W. A. Date</abbr></th>
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

export default UpdateProductDate
