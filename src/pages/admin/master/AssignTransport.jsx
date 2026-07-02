import { IconPencil, IconTrash, IconCheck, IconArrowLeft } from '@tabler/icons-react'
import axios from 'axios';
import Select from 'react-select';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function AssignTransport() {

    const [city, setCity] = useState([]);
    const [selectedIds, setSelectedIds] = useState([]);
    const [transport, setTransport] = useState([]);
    const [selectTransport, setSelectTransport] = useState(null);

    useEffect(() => {
        fetchRegionsData();
        fetchTransportData();
    }, []);

    const fetchRegionsData = async() => {
        try{
            const res = await axios.get('https://jaishriganesha.com/bizupon-master/api/master/view-regions?CID=1')
            setCity(res.data.data || res.data)
        }
        catch(error){
            console.error("error fetching data", error)
        }
    };

    const fetchTransportData = async() => {
        try{
            const res = await axios.get('https://jaishriganesha.com/bizupon-master/api/Port/GetddlTransport')
            const data = (res.data.data || []).map(item => ({
                value: item.id,
                label: item.name
            }));

            setTransport(data);

        }catch(err){
            console.err(err);
        }
    };

    // select single checkbox
    const handleCheckboxChange = (cid) => {
        if (selectedIds.includes(cid)) {
            setSelectedIds(selectedIds.filter(item => item !== cid));
        } else {
            setSelectedIds([...selectedIds, cid]);
        }
    };
    // select all checkboxes
    const handleSelectAll = (e) => {
        if (e.target.checked) {
            const allIds = city.map(item => item.sid);
            setSelectedIds(allIds);
        } else {
            setSelectedIds([]);
        }
    };

    // Tooltip init
    useEffect(() => {
        const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
        const tooltipList = [...tooltipTriggerList].map(
            (tooltipTriggerEl) => new window.bootstrap.Tooltip(tooltipTriggerEl)
        );
    }, [city]); // re-run after data load

  return (
    <div className="row">
        <div className="col-lg-12 col-12">
            <div className="card">
                <div className="card-header">
                    <h5 className="title">Assign Transport</h5>
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-lg-3 col-md-6 col-12">
                            <div className="form-group">
                                <label className="form-label">Select Transport Name</label>
                                <Select 
                                    options={transport}
                                    value={selectTransport}
                                    onChange={setSelectTransport}
                                    placeholder="Select Transport Name"
                                />
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-12">
                            <div className="form-group">
                                <button className="btn btn-md btn-primary mt-25">Filter</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="col-lg-12 col-12">
            <div className="card table-card overflow-hidden">
                <div className="table-responsive">
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th>
                                    <input type="checkbox" className="form-check-input" onChange={handleSelectAll}
                                        checked={selectedIds.length === city.length && city.length > 0} 
                                    />
                                </th>
                                <th>City Name</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {city.map(item => (
                                <tr key={item.sid}>
                                    <td>
                                        <input type="checkbox" className="form-check-input"
                                            checked={selectedIds.includes(item.sid)}
                                            onChange={() => handleCheckboxChange(item.sid)}
                                        />
                                    </td>
                                    <td>{item.stateName}</td>
                                    <td>
                                        <div className="text-end">
                                            <Link to="#" className="avtar edit" data-bs-toggle="tooltip" data-bs-placement="top" title="Edit"><IconPencil /></Link>
                                            <Link to="#" className="avtar delete" data-bs-toggle="tooltip" data-bs-placement="top" title="Delete"><IconTrash /></Link>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className={`actionModal ${selectedIds.length > 0 ? "" : "d-none"}`} style={{top: "0px"}}>
                    <div className="selectedItem">
                        {selectedIds.length} Selected from {city.length}
                    </div>
                    <div className="actionButtonArea">
                        <button className="btn btn-xs btn-primary"><IconCheck /> Assign Transport City</button>
                        <button className="btn btn-xs btn-light" onClick={() => setSelectedIds([])}><IconArrowLeft /> Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default AssignTransport
