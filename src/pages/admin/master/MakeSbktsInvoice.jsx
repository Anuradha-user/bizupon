import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Select from 'react-select'

function MakeSbktsInvoice() {

    const [shipList, setShipList] = useState([]);
    const [sbktsList, setSbktsList] = useState([]);

    const [selectedShip, setSelectedShip] = useState(null);
    const [selectedSbkts, setSelectedSbkts] = useState(null);

    //Fetch Ship Dropdown
    const fetchShipNameData = async() => {
        try{
            const res = await axios.get('https://jaishriganesha.com/bizupon-master/api/Port/GetddlShip')
            const data = (res.data.data || []).map(item => ({
                value: item.id,
                label: item.name
            }));

            setShipList(data);

        } catch(error){
            console.error("error fetching data", error);
        }
    };

    //Fetch SBKTS Dropdown
    const fetchSBKTSData = async() => {
        try{
            const res = await axios.get('https://jaishriganesha.com/bizupon-master/api/financial/GetddlSBKTS')
            const data = (res.data.data || []).map(item => ({
                value: item.id,
                label: item.name
            }));
            
            setSbktsList(data);

        } catch(error){
            console.error("error fetching data", error);
        }
    };

    useEffect(() => {
        fetchShipNameData();
        fetchSBKTSData();
    }, []);

    //Convert to react-select format
    const shipOptions = shipList.map(item => ({
        value: item.id,
        label: item.name
    }));

    const sbktsOptions = sbktsList.map(item => ({
        value: item.id,
        label: item.name
    }));

  return (
    <div className="row">
        <div className="col-lg-12 col-12">
            <div className="card">
                <div className="card-header">
                    <h5 className="title">Make SBKTS Invoice</h5>
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-lg-4 col-md-12 col-12">
                            <div className="form-group">
                                <label className="form-label">Select Ship Name</label>
                                <Select
                                    options={shipList}
                                    value={selectedShip}
                                    onChange={setSelectedShip}
                                    placeholder="Select Ship Name"
                                />
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-12 col-12">
                            <div className="form-group">
                                <label className="form-label">Select SBKTS </label>
                                <Select
                                    options={sbktsList}
                                    value={selectedSbkts}
                                    onChange={setSelectedSbkts}
                                    placeholder="Select SBKTS"
                                />
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-12 col-12">
                            <div className="form-group">
                                <label className="form-label">Chassis No.</label>
                                <input type="text" className="form-control" id="" />
                            </div>
                        </div>
                        <div className="col-lg-12 col-md-12 col-12">
                            <div className="form-group">
                                <label className="form-label">All Chassis No.</label>
                                <textarea rows="4" className="form-control" id="" />
                            </div>
                        </div>
                        <div className="col-lg-12 col-md-12 col-12">
                            <button className="btn btn-md btn-primary float-end">Filter</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="card table-card overflow-hidden">
                <div className="card-body">
                    <div className="card-header">
                        <h6 className="badge bg-success">Total Records : </h6>
                        <div className="d-flex gap-2">
                            <select defaultValue="0" className="form-control">
                                <option value="0">Select Invoice Status</option>
                                <option value="2">Paid</option>
                                <option value="3">Unpaid</option>
                            </select>
                            <button className="btn btn-sm btn-primary w-100">
                                Make Invoice
                            </button>
                        </div>
                    </div>
                    <div className="table-responsive">
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th><input type="checkbox" className="form-check-input" /></th>
                                    <th>Serial No.</th>
                                    <th>Chassis No.</th>
                                    <th>SBKTS Name</th>
                                    <th>Price</th>
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

export default MakeSbktsInvoice
