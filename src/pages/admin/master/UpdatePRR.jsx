import axios from 'axios';
import React, {useState, useEffect} from 'react'
import Select from 'react-select'

function UpdatePRR() {

    const [shipList, setShipList] = useState([]);
    const [selectedShip, setSelectedShip] = useState(null);

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

    useEffect(() => {
        fetchShipNameData();
    }, []);

  return (
    <div className="row">
        <div className="col-lg-12 col-12">
            <div className="card">
                <div className="card-header">
                    <h5 className="title">Update PRR</h5>
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
            <div className="card table-card overflow-hidden">
                <div className="card-header">
                    <h6 className="badge bg-success">Total Records : </h6>
                    <button className="btn btn-sm btn-primary">Save</button>
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

export default UpdatePRR
