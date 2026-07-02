import React, {useState, useEffect} from 'react'
import Select from 'react-select'
import DatePicker from "react-datepicker";
import axios from 'axios';

function UpdateBroker() {

    const [category, setCategory] = useState([]);
    const [selectCategory, setSelectCategory] = useState(null);
    const [auctionHouse, setAuctionHouse] = useState([]);
    const [selectAuction, setSelectAuction] = useState(null);
    const [auctionDate, setAuctionDate] = useState(null);
    const [client, setClient] = useState([]);
    const [selectClient, setSelectClient] = useState(null);
    const [shipName, setShipName] = useState([]);
    const [selectShip, setSelectShip] = useState(null);
    const [brokerData, setBrokerData] = useState([]);

    // fetch table data
    const fetchUpdateBrokerData = async (categoryId = 0) => {
        try {
            const res = await axios.get(`https://localhost:7069/api/Product/GetUpdateBrokerDetails?SubCategoryId=${categoryId}`);

            setBrokerData(res.data.data.items || []);

        } catch (error) {
            console.error("error fetching data", error);
        }
    };

    // fetch category dropdown data
    const fetchSubcategoriesData = async() => {
        try{
            const res = await axios.get('https://localhost:7244/api/master/view-subcategories')
            const data = (res.data.data || res.data).map(item => ({
                value: item.id,
                label: item.name
            }))
            setCategory(data);
        } catch (error) {
            console.error("Error fetching data", error);
        }
    }

    // fetch auction house dropdown data
    const fetchAuctionHouseData = async() => {
        try{
            const res = await axios.get('https://localhost:7244/api/Port/view-auction?CID=0&AcutionName=0')
            const data = (res.data.data || res.data).map(item => ({
                value: item.id,
                label: item.name
            }))
            setAuctionHouse(data);
        } catch (error) {
            console.error("Error fetching data", error);
        }
    }

    // fetch client dropdown data
    const fetchClientNameData = async() => {
        try{
            const res = await axios.get('https://localhost:7244/api/master/GetClient')
            const data = (res.data.data || res.data).map(item => ({
                value: item.id,
                label: item.name
            }))
            setClient(data);
        } catch (error) {
            console.error("Error fetching data", error);
        }
    }

    // fetch ship name dropdown data
    const fetchShipNameData = async() => {
        try{
            const res = await axios.get('https://localhost:7244/api/Port/GetddlShipping')
            const data = (res.data.data || res.data).map(item => ({
                value: item.id,
                label: item.name
            }))
            setShipName(data);
        } catch (error) {
            console.error("Error fetching data", error);
        }
    }

    useEffect(() => {
        fetchUpdateBrokerData();
        fetchSubcategoriesData();
        fetchAuctionHouseData();
        fetchClientNameData();
        fetchShipNameData();
    }, []);

    // filter button click
    const handleFilter = () => {
        const categoryId = selectCategory?.value || 0;
        fetchUpdateBrokerData(categoryId);
    };

  return (
    <div className="row">
        <div className="col-lg-12 col-12">
            <div className="card">
                <div className="card-header">
                    <h5 className="title">Update Broker</h5>
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
                                <label className="form-label">Auction House</label>
                                <Select 
                                    options={auctionHouse}
                                    value={selectAuction}
                                    onChange={setSelectAuction}
                                    placeholder="Select Auction House"
                                />
                            </div>
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
                                <textarea id="allNumber" rows="9" className="form-control" />
                            </div>
                        </div>
                        <div className="col-lg-12 col-md-12 col-12">
                            <button className="btn btn-md btn-primary mt-2 float-end"  onClick={handleFilter}>Filter</button>
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
                                    <th>Broker Details Name</th>
                                </tr>
                            </thead>
                            <tbody>
                                {brokerData.length > 0 ? (
                                    brokerData.map((item, index) => (
                                        <tr key={index}>
                                            <td>
                                                <input type="checkbox" className="form-check-input" />
                                            </td>
                                            <td>{item.RowNum}</td>
                                            <td>{item.chessisNo}</td>
                                            <td>{item.clientName}</td>
                                            <td>{item.brokerDetailsName}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="text-center">
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
  )
}

export default UpdateBroker
