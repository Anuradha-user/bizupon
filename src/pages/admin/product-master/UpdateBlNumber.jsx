import React, {useState, useEffect} from 'react'
import Select from 'react-select'
import DatePicker from "react-datepicker";
import axios from 'axios';

function UpdateBlNumber() {

    const [category, setCategory] = useState([]);
    const [selectCategory, setSelectCategory] = useState(null);
    const [shipName, setShipName] = useState([]);
    const [selectShip, setSelectShip] = useState(null);
    const [shipping, setShipping] = useState([]);
    const [selectShipping, setSelectShipping] = useState(null);
    const [port, setPort] = useState([]);
    const [selectPort, setSelectPort] = useState(null);
    const [loadingPort, setLoadingPort] = useState(false);

    // fetch category dropdown data
    const fetchCategoriesData = async() => {
        try{
            const res = await axios.get('https://jaishriganesha.com/bizupon-master/api/master/view-subcategories')
            const data = (res.data.data || res.data).map(item => ({
                value: item.id,
                label: item.name
            }))
            setCategory(data);
        } catch (error) {
            console.error("Error fetching data", error);
        }
    }

    // fetch ship name dropdown data
    const fetchShipNameData = async() => {
        try{
            const res = await axios.get('https://jaishriganesha.com/bizupon-master/api/Port/GetddlShip')
            const data = (res.data.data || res.data).map(item => ({
                value: item.id,
                label: item.name
            }))
            setShipName(data);
        } catch (error) {
            console.error("Error fetching data", error);
        }
    }

    // fetch shipping dropdown data
    const fetchShippingData = async() => {
        try{
            const res = await axios.get('https://jaishriganesha.com/bizupon-master/api/Port/GetddlShipping')
            const data = (res.data.data || res.data).map(item => ({
                value: item.id,
                label: item.name
            }))
            setShipping(data);
        } catch (error) {
            console.error("Error fetching data", error);
        }
    }

    // fetch port dropdown data
    const fetchPortData = async() => {
        try{
            const res = await axios.get('https://localhost:7244/api/Port/GetddlPort')
            const data = (res.data.data || res.data).map(item => ({
                value: item.id,
                label: item.name
            }))
            setPort(data);
        } catch (error) {
            console.error("Error fetching data", error);
        }
    }

    useEffect(() => {
        fetchCategoriesData();
        fetchShipNameData();
        fetchShippingData();
        fetchPortData();
    }, []);

    const handleShipChange = (selected) => {
        setSelectShip(selected);
        setSelectPort(null);
    };

  return (
    <div className="row">
        <div className="col-lg-12 col-12">
            <div className="card">
                <div className="card-header">
                    <h5 className="title">Update BL Number</h5>
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
                                <label className="form-label">Shipping Company</label>
                                <Select 
                                    options={shipping}
                                    value={selectShipping}
                                    onChange={setSelectShipping}
                                    placeholder="Select Shipping Company"
                                />
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-12 col-12">
                            <div className="form-group">
                                <label className="form-label">Ship Name</label>
                                <Select 
                                    options={shipName}
                                    value={selectShip}
                                    onChange={handleShipChange}
                                    placeholder="Select Ship Name"
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
                                    isDisabled={!selectShip}
                                    isLoading={loadingPort}
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
                                    <th>Product Name</th>
                                    <th>Sale Country</th>
                                    <th>Client Name</th>
                                    <th>BL Number</th>
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

export default UpdateBlNumber
