import { IconEye, IconTrash } from '@tabler/icons-react';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Select from 'react-select';

function AssignGroup() {

    const [groupList, setGroupList] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [departmentList, setDepartmentList] = useState([]);
    const [selectedDepartment, setSelectedDepartment] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null);
    const [groupDetails, setGroupDetails] = useState(null);
    const [selectedIds, setSelectedIds] = useState([]);

    // fetch data in table
    useEffect(()=>{
        fetchAssignGroupdata();
        fetchDepartmentdata();
    }, []);

    const fetchAssignGroupdata = async() => {
        try{
            const res = await axios.get('https://jaishriganesha.com/bizupon-master/api/master/GetStaffDetailsForAssignGroup')
            setGroupList(res.data.data || res.data);
            
        } catch(err){
            console.error(err);
        }
    };

    // fetch details
    const handleView = (id) => {
        setSelectedUser(id);
        setShowModal(true);

        fetch(`https://jaishriganesha.com/bizupon-master/api/master/StaffGroupDetailsById?Id=${id}`)
            .then(res => res.json())
            .then(res => {
                setGroupDetails(res.data?.[0] || null);
            });
    };

    // fetch deparment data
    const fetchDepartmentdata = async() => {
        try{
            const res = await axios.get('https://jaishriganesha.com/bizupon-master/api/master/view-department')
            const data = (res.data.data || []).map(item => ({
                value: item.id,
                label: item.departmentName
            }))

            setDepartmentList(data);
            
        } catch(err){
            console.error(err);
        }
    };


    // Tooltip init
    useEffect(() => {
        const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
        const tooltipList = [...tooltipTriggerList].map(
            (tooltipTriggerEl) => new window.bootstrap.Tooltip(tooltipTriggerEl)
        );
    }, [groupList]);

    // select all checkbox
    const handleSelectAll = (e) => {
        if (e.target.checked) {
        const allIds = groupList.map(item => item.id);
        setSelectedIds(allIds);
        } else {
        setSelectedIds([]);
        }
    };

    // select single checkbox
    const handleCheckboxChange = (id) => {
        setSelectedIds((prev) =>
        prev.includes(id)
            ? prev.filter(item => item !== id)
            : [...prev, id]
        );
    };

  return (
    <>
        <div className="row">
            <div className="col-lg-12 col-12">
                <div className="card table-card overflow-hidden">
                    <div className="card-header">
                        <h5 className="title">Assign Group</h5>
                        <div className="d-flex gap-2">
                            <Select
                                options={departmentList}
                                value={selectedDepartment}
                                onChange={setSelectedDepartment}
                                placeholder="Select Department"
                            />
                            <button className="btn btn-sm btn-primary">Assign</button>
                        </div>
                    </div>
                    <div className="card-body">
                        <div className="table-responsive">
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th>
                                            <input type="checkbox" className="form-check-input"
                                            onChange={handleSelectAll}
                                            checked={groupList.length > 0 && selectedIds.length === groupList.length}
                                            />
                                        </th>
                                        <th>Serial No.</th>
                                        <th>User Name</th>
                                        <th>Email Address</th>
                                        <th>Contact No.</th>
                                        <th>DOJ</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {groupList.length > 0 ? (
                                        groupList.map((item, index) => (
                                            <tr key={index}>
                                                <td>
                                                    <input type="checkbox" className="form-check-input"
                                                        checked={selectedIds.includes(item.id)}
                                                        onChange={() => handleCheckboxChange(item.id)}
                                                    />
                                                </td>
                                                <td>{index + 1}</td>
                                                <td>{item.name}</td>
                                                <td>{item.email}</td>
                                                <td>{item.mobile}</td>
                                                <td>{item.doj}</td>
                                                <td>{item.status}</td>
                                                <td>
                                                    <div className="text-end">
                                                        <Link to="#" className="avtar view" data-bs-toggle="tooltip" title="Group Details" onClick={() => handleView(item.id)}><IconEye /></Link>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))

                                        ) : (
                                            <tr>
                                                <td colSpan="8" className="text-center">No Data Found</td>
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
                <h5>User Group Details</h5>
                <button className="btn-close" onClick={() => setShowModal(false)}></button>
            </div>
            <div className="drawer-body">
                {groupDetails ? (
                    <div className="card table-card overflow-hidden">
                        <div clasName="table-responsive">
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th>Department</th>
                                        <th>Assign Date</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{groupDetails.name}</td>
                                        <td>{groupDetails.adate}</td>
                                        <td>
                                            <div className="text-end">
                                                <Link to="#" className="avtar delete" data-bs-toggle="tooltip" title="Delete" onClick={() => handleView(item.id)}><IconTrash /></Link>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                ) : (
                    <p>No record found</p>
                )}
            </div>
        </div>

        {/* Overlay */}
        {showModal && (
            <div className="drawer-overlay" onClick={() => setShowModal(false)}></div>
        )}
      </>
  )
}

export default AssignGroup
