import { IconCirclePlusFilled, IconPencil, IconRefresh, IconTrash } from '@tabler/icons-react';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
const baseUrl = "https://www.bizupon.com/";

function CompanyMaster() {

    const [companyList, setCompanyList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedIds, setSelectedIds] = useState([]);
    const[showModal, setShowModal] = useState(false);

    useEffect(() => {
        fetchCompanyData();
    }, []);

    const fetchCompanyData = async () => {
        try {
            setLoading(true);

            const res = await axios.get(
                'https://jaishriganesha.com/bizupon-master/api/master/view-company'
            );

            console.log(res.data);

            setCompanyList(res.data?.data?.lstCompany || []);

        } catch (error) {
            console.error("error fetching data", error);

        } finally {
            setLoading(false);
        }
    };

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
            const allIds = companyList.map(item => item.compId);
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
    }, [companyList]);

    return (
        <>
            <div className="row">
                <div className="col-lg-12 col-12">
                    <div className="card table-card overflow-hidden">
                        <div className="card-header">
                            <h5 className="title">Company Master</h5>
                            <button className="btn btn-sm btn-primary" onClick={() => setShowModal(true)}><IconCirclePlusFilled /> Add Company</button>
                        </div>
                        <div className="card-body">
                            <div className="table-responsive">
                                <table className="table table-hover">
                                    <thead>
                                        <tr>
                                            <th>
                                                <input type="checkbox" className="form-check-input" 
                                                    onChange={handleSelectAll}
                                                    checked={companyList.length > 0 && selectedIds.length === companyList.length}
                                                />
                                            </th>
                                            <th>Serial No.</th>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Contact</th>
                                            <th>Currency</th>
                                            <th>Rate</th>
                                            <th>Logo</th>
                                            <th>Signature</th>
                                            <th>DOE</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {companyList.length > 0 ? (
                                            companyList.map((item, index) => (
                                                <tr key={item.compId}>
                                                    <td>
                                                        <input type="checkbox" className="form-check-input"
                                                            checked={selectedIds.includes(item.compId)}
                                                            onChange={() => handleCheckboxChange(item.compId)}
                                                        />
                                                    </td>
                                                    <td>{index + 1}</td>
                                                    <td>{item.compName}</td>
                                                    <td>{item.email}</td>
                                                    <td>{item.contact}</td>
                                                    <td>{item.currencyType}</td>
                                                    <td>{item.rowNum}</td>
                                                    <td>
                                                        <img src={baseUrl + item.compLogo} alt="logo" width="40" />
                                                    </td>
                                                    <td>
                                                        <img src={baseUrl + item.compSign} alt="sign" width="40" />
                                                    </td>
                                                    <td>{item.doe}</td>
                                                    <td>
                                                        <div className="text-end">
                                                            <Link to="#" className="avtar edit" data-bs-toggle="tooltip" data-bs-placement="top" title="Edit"><IconPencil /></Link>
                                                            <Link to="#" className="avtar update" data-bs-toggle="tooltip" data-bs-placement="top" title="Update Rate"><IconRefresh /></Link>
                                                            <Link to="#" className="avtar delete" data-bs-toggle="tooltip" data-bs-placement="top" title="Delete"><IconTrash /></Link>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="11" className="text-center">No Data Found</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Right Slide Drawer */}
            <div className={`custom-drawer ${showModal ? "open" : ""}`}>
                <div className="drawer-header">
                    <h5>Add Company</h5>
                    <button className="btn-close" onClick={() => setShowModal(false)}></button>
                </div>

                <div className="drawer-body">
                    <form>
                        <div className="form-group">
                            <label className="form-label">Company Name</label>
                            <input type="text" className="form-control" />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Company Email</label>
                            <input type="text" className="form-control" />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Contact No.</label>
                            <input type="text" className="form-control" />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Company Address</label>
                            <input type="text" className="form-control" />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Company Logo</label>
                            <input type="file" className="form-control" />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Company Signature</label>
                            <input type="file" className="form-control" />
                        </div>
                        <div className="form-group w-100">
                            <label className="form-label">Currency Type</label>
                            <select className="form-control">
                                <option>Yen</option>
                                <option>Dollar</option>
                                <option>AED</option>
                                <option>CN</option>
                                <option>Ruble</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label className="form-label">Rate</label>
                            <input type="text" className="form-control" />
                        </div>
                        <button type="submit" className="btn btn-primary w-100 mt-4">
                            Add Company
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

export default CompanyMaster;