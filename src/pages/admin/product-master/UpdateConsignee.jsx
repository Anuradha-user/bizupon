import React, {useState, useEffect} from 'react'
import Select from 'react-select'
import DatePicker from "react-datepicker";

function UpdateConsignee() {

    const [category, setCategory] = useState([]);
    const [selectCategory, setSelectCategory] = useState([null]);
    const [auctionHouse, setAuctionHouse] = useState([]);
    const [selectAuction, setSelectAuction] = useState([null]);
    const [auctionDate, setAuctionDate] = useState(null);
    const [client, setClient] = useState([]);
    const [selectClient, setSelectClient] = useState([null]);

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

    // fetch client dropdown data
    useEffect(() => {
        fetch('https://jaishriganesha.com/bizupon-master/api/master/GetClient')
        .then(res => res.json())
        .then(res => {
            setClient(res.data || []);
        });
    }, []);

    const clientOptions = client.map(item => ({
        value: item.id,
        label: item.name
    }));
    
  return (
    <div className="row">
        <div className="col-lg-12 col-12">
            <div className="card">
                <div className="card-header">
                    <h5 className="title">Update Consignee</h5>
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
                                <label className="form-label">Client Name</label>
                                <Select 
                                    options={clientOptions}
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
                                    <th>Client Name</th>
                                    <th>Consignee name</th>
                                    <th>Contact</th>
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

export default UpdateConsignee
