import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import axios from 'axios';

function AssignSbktsCompany() {

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


  return (
    <div className="row">
        <div className="col-lg-12 col-12">
            <div className="card">
                <div className="card-header">
                    <h5 className="title">Assign SBKTS Company</h5>
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-lg-4 col-md-12 col-12">
                            <div className="form-group">
                                <label className="form-label">Ship Name</label>
                                <Select
                                    options={shipList}
                                    value={selectedShip}
                                    onChange={setSelectedShip}
                                    placeholder="Select Ship"
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Chassis No.</label>
                                <input type="text" className="form-control" />
                            </div>
                        </div>
                        <div className="col-lg-8 col-md-12 col-12">
                            <div className="form-group">
                                <label className="form-label">All Chassis No.</label>
                                <textarea rows="5" className="form-control" id="" />
                            </div>
                        </div>
                        <div className="col-lg-12 col-md-12 col-12">
                            <div className="form-group">
                                <button className="btn btn-md btn-primary float-end">Filter</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="card table-card">
                <div className="card-header">
                    <h6 className="badge bg-success">Total Records : </h6>
                    <div className="d-flex gap-2">
                        <Select
                            options={sbktsList}
                            value={selectedSbkts}
                            onChange={setSelectedSbkts}
                            placeholder="Select SBKTS"
                        />
                        <button className="btn btn-sm btn-primary">Assign</button>
                    </div>
                </div>
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th><input type="checkbox" className="form-check-input" /></th>
                                    <th>#</th>
                                    <th>Chassis No.</th>
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

export default AssignSbktsCompany
