import React, { useState, useEffect } from 'react'
import Select from 'react-select'
import axios from 'axios'

function ReceiveFuzokuhin() {

    const [chassis, SetChassis] = useState([]);
    const [selectChassis, setSelectChassis] = useState(null);

    const fetchchassisData = async() => {
        try{
            const res = await axios.get('')
            const data = (res.data.data || []).map(item =>({
                value: item.id,
                value: item.name
            }))

            setSelectChassis(data);

        } catch (error) {
            console.error("error fetching data", error);
        }
    };

    useEffect(() => {
        fetchchassisData();
    }, []);
    
  return (
    <div className="row">
        <div className="col-lg-12 col-12">
            <div className="card">
                <div className="card-header">
                    <h5 classsName="title">Receive Fuzokuhin</h5>
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-lg-3 col-md-12 col-12">
                            <div className="form-group">
                                <label className="form-label">Chassis Number</label>
                                <input type="text" className="form-control" />
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-12 col-12">
                            <button type="submit" className="btn btn-primary mt-25">Filter</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="col-lg-6 col-12">
            <div className="card table-card overflow-hidden">
                <div className="card-body">
                    <div className="card-header">
                        <h5 className="title">Send From Japan</h5>
                    </div>
                    <div className="table-responsive">
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th>
                                        <input type="checkbox" className="form-check-input"/>
                                    </th>
                                    <th>#</th>
                                    <th>Product Name</th>
                                </tr>
                            </thead>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        <div className="col-lg-6 col-12">
            <div className="card table-card overflow-hidden">
                <div className="card-body">
                    <div className="card-header">
                        <h5 className="title">Send From Russia</h5>
                    </div>
                    <div className="table-responsive">
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th>
                                        <input type="checkbox" className="form-check-input"/>
                                    </th>
                                    <th>#</th>
                                    <th>Product Name</th>
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

export default ReceiveFuzokuhin
