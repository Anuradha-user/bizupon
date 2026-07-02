import React, {useState, useEffect} from 'react'
import Select from 'react-select'
import DatePicker from "react-datepicker";

function UpdateRemark() {

    const [category, setCategory] = useState([]);
    const [selectCategory, setSelectCategory] = useState([null]);
    const [auctionHouse, setAuctionHouse] = useState([]);
    const [selectAuction, setSelectAuction] = useState([null]);
    const [auctionDate, setAuctionDate] = useState(null);
    const [transport, setTransport] = useState([]);
    const [selectTransport, setSelectTransport] = useState([null]);

    // fetch category dropdown data
    useEffect(() => {
        fetch('https://jaishriganesha.com/bizupon-master/api/master/view-subcategories')
        .then(res => res.json())
        .then(res => {
            setCategory(res.data || []);
        });
    }, []);

    const categoryOptions = category.map(item => ({
        value: item.id,
        label: item.name
    }));

    // fetch auction house dropdown data
    useEffect(() => {
        fetch('https://jaishriganesha.com/bizupon-master/api/Port/view-auction?CID=0&AcutionName=0')
        .then(res => res.json())
        .then(res => {
            setAuctionHouse(res.data || []);
        });
    }, []);

    const auctionOptions = auctionHouse.map(item => ({
        value: item.id,
        label: item.name
    }));

    // fetch transport dropdown data
    useEffect(() => {
        fetch('https://jaishriganesha.com/bizupon-master/api/Port/GetddlTransport')
        .then(res => res.json())
        .then(res => {
            setTransport(res.data || []);
        });
    }, []);

    const transportOptions = transport.map(item => ({
        value: item.id,
        label: item.name
    }));

  return (
    <div className="row">
        <div className="col-lg-12 col-12">
            <div className="card">
                <div className="card-header">
                    <h5 className="title">Update Remark</h5>
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-lg-3 col-md-12 col-12">
                            <div className="form-group">
                                <label className="form-label">Category</label>
                                <Select 
                                    options={categoryOptions}
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
                                    options={auctionOptions}
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
                                <label className="form-label">Transport</label>
                                <Select
                                    options={transportOptions}
                                    value={selectTransport}
                                    onChange={setSelectTransport}
                                    placeholder="Select Transport"
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
                                <textarea id="allNumber" rows="5" className="form-control" />
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
                                    <th>Auction Remark</th>
                                    <th>Rikshaw Remark</th>
                                    <th>Port Remark</th>
                                    <th>No. Plate</th>
                                    <th>No. Plate Remark</th>
                                    <th>O Remark</th>
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

export default UpdateRemark
