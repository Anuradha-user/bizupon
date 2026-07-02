import { IconArrowLeft, IconCheck, IconCirclePlusFilled, IconPencil, IconTrash } from '@tabler/icons-react'
import React, {useState, useEffect} from 'react'
import Select from 'react-select';
import axios from 'axios';
import { Link } from 'react-router-dom';

function PortPrice() {

    const [countries, setCountries] = useState([]);
    const [selectCountries, setSelectCountries] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [portPriceList, setPortPriceList] = useState([]);
    const [selectedIds, setSelectedIds] = useState([]);

    // fetch table data
    const fetchPortPriceList = async() => {
        try{
            const res = await axios.get('https://localhost:7244/api/financial/view-port-price')
            setPortPriceList(res.data.data || [])
        } catch (error){
            console.error("fetching error data", error);
        }
    }

    // fetch country data
    const fetchCountriesData = async () => {
        try {
            const res = await axios.get("https://localhost:7244/api/master/view-Countries")
            let data = res.data.data.map(item => ({
                value: item.cid,
                label: item.name
            }))
            .reverse();
            setCountries(data)
        } catch (error) {
            console.log("error", error);
        }
    }

    useEffect(() => {
        fetchCountriesData();
        fetchPortPriceList();
    }, []);

    // select single checkbox
    const handleCheckboxChange = (id) => {
        if (selectedIds.includes(id)) {
            setSelectedIds(selectedIds.filter(item => item !== id));
        } else {
            setSelectedIds([...selectedIds, id]);
        }
    };

    // select all checkboxes
    const handleSelectAll = (e) => {
        if (e.target.checked) {
            const allIds = portPriceList.map(item => item.id);
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
    }, [portPriceList]);

  return (
    <>
        <div className="row">
            <div className="col-lg-12 col-12">
                <div className="card table-card overflow-hidden">
                    <div className="card-header">
                        <h5 className="title">Port Price</h5>
                        <button className="btn btn-sm btn-primary" onClick={() => setShowModal(true)}><IconCirclePlusFilled /> Add Port Price</button>
                    </div>
                    <div className="card-body">
                        <div className="table-responsive">
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th>
                                            <input type="checkbox" className="form-check-input" 
                                                onChange={handleSelectAll}
                                                checked={portPriceList.length > 0 && selectedIds.length === portPriceList.length}
                                            />
                                        </th>
                                        <th>Country Name</th>
                                        <th>Port Name</th>
                                        <th>Insurance</th>
                                        <th>Inspection</th>
                                        <th>Radiation</th>
                                        <th>Port Price</th>
                                        <th>Misc</th>
                                        <th>Vanning</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {portPriceList.length > 0 ? (
                                        portPriceList.map((item, index) => (
                                            <tr key={index}>
                                                <td>
                                                    <input type="checkbox" className="form-check-input"
                                                        checked={selectedIds.includes(item.id)}
                                                        onChange={() => handleCheckboxChange(item.id)}
                                                    />
                                                </td>
                                                <td>{item.countryFrom}</td>
                                                <td>{item.countryName}</td>
                                                <td>{item.insurancePrice}</td>
                                                <td>{item.inspectionPrice}</td>
                                                <td>{item.radiationPrice}</td>
                                                <td>{item.portPrice}</td>
                                                <td>{item.miscPrice}</td>
                                                <td>{item.vanningPrice}</td>
                                                <td>
                                                    <div className="text-end">
                                                        <Link to="#" className="avtar edit" data-bs-toggle="tooltip" data-bs-placement="top">
                                                            <IconPencil />
                                                        </Link>
                                                        <Link to="#" className="avtar delete" data-bs-toggle="tooltip" data-bs-placement="top" title="Delete">
                                                            <IconTrash />
                                                        </Link>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="10" className="text-center">
                                                No data found
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        <div className={`actionModal ${selectedIds.length > 0 ? "" : "d-none"}`} style={{ top: 0 }}>
                            <div className="selectedItem">
                                {selectedIds.length} Selected from {portPriceList.length}
                            </div>
                            <div className="actionButtonArea">
                                <button className="btn btn-xs btn-primary"><IconCheck /> Active</button>
                                <button className="btn btn-xs btn-warning"><IconCheck /> De-Active</button>
                                <button className="btn btn-xs btn-danger"><IconTrash /> Delete</button>
                                <button className="btn btn-xs btn-light" onClick={() => setSelectedIds([])}><IconArrowLeft /> Cancel</button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
        <div className={`custom-drawer ${showModal ? "open" : ""}`}>
            <div className="drawer-header">
                <h5>Add Fuzokuhin</h5>
                <button className="btn-close" onClick={() => setShowModal(false)}></button>
            </div>

            <div className="drawer-body">
                <form>
                    <div className="form-group">
                        <label className="form-label">Select Country From</label>
                        <Select 
                            options={countries}
                            value={setCountries}
                            onChange={setSelectCountries}
                            placeholder="Select Country From"
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Select Country To</label>
                        <Select />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Insurance Price</label>
                        <input type="text" className="form-control" />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Radiation Price</label>
                        <input type="text" className="form-control" />
                    </div>
                    <div className="row">
                        <div className="col-lg-6 col-12">
                            <div className="form-group">
                                <label className="form-label">Inspection Price</label>
                                <input type="text" className="form-control" />
                            </div>
                        </div>
                        <div className="col-lg-6 col-12">
                            <div className="form-group">
                                <label className="form-label">Port Price</label>
                                <input type="text" className="form-control" />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-6 col-12">
                            <div className="form-group">
                                <label className="form-label">Vanning Price</label>
                                <input type="text" className="form-control" />
                            </div>
                        </div>
                        <div className="col-lg-6 col-12">
                            <div className="form-group">
                                <label className="form-label">Misc Price</label>
                                <input type="text" className="form-control" />
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="form-label">Status</label>
                        <select className="form-control">
                            <option>Active</option>
                            <option>De-Active</option>
                        </select>
                    </div>
                    <button type="submit" className="btn btn-primary w-100 mt-5">
                        Submit
                    </button>
                </form>
            </div>
        </div>

        {/* Overlay */}
        {showModal && (
            <div className="drawer-overlay" onClick={() => setShowModal(false)}></div>
        )}
    </>
  )
}

export default PortPrice
