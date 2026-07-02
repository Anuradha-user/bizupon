import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Select from 'react-select';

function UpdateFuzokuhin() {

    const [fuzukuhin, setFuzukuhin] = useState([]);
    const [selectedFuzokuhin, setSelectedFuzokuhin] = useState([]);

    const fetchFuzokuhinData = async() => {
         try{
            const res = await axios.get('https://jaishriganesha.com/bizupon-master/api/master/view-fuzokuhin')
            const data = (res.data.data || []).map(item => ({
                value: item.id,
                label: item.fuzokuhinName
            }));

            setFuzukuhin(data);

        } catch (error) {
            console.error("error fetching data", error);
        }
    };

    useEffect(() => {
        fetchFuzokuhinData();
    }, []);

  return (
    <div className="row">
        <div className="col-lg-12 col-12">
            <div className="card">
                <div className="card-header">
                    <h5 className="title">Update Fuzokuhin</h5>
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
                            <div className="form-group">
                                <label className="form-label">Browse Image</label>
                                <input type="file" className="form-control" />
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-12 col-12">
                            <div className="form-group">
                                <label className="form-label">Select Fuzukuhin</label>
                                <Select
                                    options={fuzukuhin}
                                    isMulti
                                    value={selectedFuzokuhin}
                                    onChange={setSelectedFuzokuhin}
                                    placeholder="Select Fuzukuhin"
                                />
                            </div>
                        </div>
                        <div className="col-lg-2 col-md-12 col-12">
                            <button className="btn btn-md btn-primary float-end mt-25">Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default UpdateFuzokuhin
