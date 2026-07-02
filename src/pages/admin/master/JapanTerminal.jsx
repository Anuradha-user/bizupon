import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Select from 'react-select'

export default function JapanTerminal() {

    const [port, setPort] = useState([]);
    const [selectPort, setSelectedPort] = ([null]);

    const fetchPortData = async() => {
        try{
            const res = await axios.get('https://jaishriganesha.com/bizupon-master/api/Port/GetddlPort')
            const data = (res.data.data || []).map(item => ({
                value: item.id,
                label: item.name
            }))
            setPort(data);
        } catch(error){
            console.error("error fetching data", error);
        }
    };

    useEffect(()=>{
        fetchPortData();
    }, []);

  return (
    <div className="row">
        <div className="col-lg-12 col-12">
            <div className="card">
                <div className="card-header">
                    <h5 className="title">Japan Terminal</h5>
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-lg-3 col-md 12 col-12">
                            <div className="form-group">
                                <label className="form-label">Select Port Name</label>
                                <Select
                                    options={port}
                                    value={selectPort}
                                    onChange={setSelectedPort}
                                    placeholder="Select Port Name"
                                />
                            </div>
                        </div>
                        <div className="col-lg-3 col-md 12 col-12">
                            <div className="form-group">
                                <label className="form-label">Select Company Name</label>
                                <Select />
                            </div>
                        </div>
                        <div className="col-lg-3 col-md 12 col-12">
                            <div className="form-group">
                                <label className="form-label">Terminal Name</label>
                                <input type="text" className="form-control" />
                            </div>
                        </div>
                        <div className="col-lg-3 col-md 12 col-12">
                            <div className="form-group">
                                <label className="form-label">Contact Person</label>
                                <input type="text" className="form-control" />
                            </div>
                        </div>
                        <div className="col-lg-3 col-md 12 col-12">
                            <div className="form-group">
                                <label className="form-label">Contact Number</label>
                                <input type="text" className="form-control" />
                            </div>
                        </div>
                        <div className="col-lg-3 col-md 12 col-12">
                            <div className="form-group">
                                <label className="form-label">Price</label>
                                <input type="text" className="form-control" />
                            </div>
                        </div>
                        <div className="col-lg-6 col-md 12 col-12">
                            <div className="form-group">
                                <label className="form-label">Terminal Address</label>
                                <input type="text" className="form-control" />
                            </div>
                        </div>
                        <div className="col-lg-12 col-md-12 col-12">
                            <button type="submit" className="btn btn-primary mt-2 float-end">Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
