import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import axios from 'axios';

function AssignBankBrokerPRR() {

    const [shipList, setShipList] = useState([]);
    const [selectShip, setSelectShip] = useState([null]);

    const [brokerList, setBrokerList] = useState([]);
    const [selectBroker, setSelectBroker] = useState([null])

    // Fetch Ship Dropdown
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

    const fetchBankBrokerData = async() => {
        try{
            const res = await axios.get('https://jaishriganesha.com/bizupon-master/api/financial/ddlBankBroker')
            const data = (res.data.data || []).map(item => ({
                value: item.id,
                label: item.name
            }));

            setBrokerList(data);

        } catch(error){
            console.error("error fetching data", error);
        }
    };

    useEffect(()=>{
        fetchShipNameData();
        fetchBankBrokerData();
    }, []);


  return (
    <div className="row">
        <div className="col-lg-12 col-12">
            <div className="card">
                <div className="card-header">
                    <h5 className="title">Assign Bank Broker For PRR</h5>
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-lg-3 col-md-12 col-12">
                            <div className="form-group">
                                <label className="form-label">Ship Name</label>
                                <Select 
                                    options={shipList}
                                    value={selectShip}
                                    onChange={setSelectShip}
                                    placeholder="Select Ship Name"
                                ></Select>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-12 col-12">
                            <div className="form-group">
                                <button className="btn btn-md btn-primary mt-25">Submit</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="card table-card">
                <div className="card-header">
                    <h6 className="badge bg-success">Total Records : <span></span></h6>
                    <div className="d-flex gap-2">
                        <Select className="w-250"
                            options={brokerList}
                            value={selectBroker}
                            onChange={setSelectBroker}
                            placeholder="Select Broker"
                        />
                        <button className="btn btn-sm btn-primary">Save</button>
                    </div>
                </div>
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th><input type="checkbox" className="form-check-input" /></th>
                                    <th>Serial No.</th>
                                    <th>Chassis No.</th>
                                    <th>Terminal Name</th>
                                    <th>Amount</th>
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

export default AssignBankBrokerPRR;


