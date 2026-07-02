import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { IconCheck, IconTrash, IconArrowLeft } from '@tabler/icons-react';
import axios from 'axios';

function FacilityMaster() {

    const [departentlist, setDeparmentList] = useState([]);
    const [selectDeparment, setSelectedDepartment] = useState(null);
    const [menuList, setMenuList] = useState([]);
    const [selectedIds, setSelectedIds] = useState([]);
    const [loadingDept, setLoadingDept] = useState(false);
    const [loadingTable, setLoadingTable] = useState(false);

    // fetch department dropdown data
    const fetchDepartmentData = async() => {
        try{
            const res = await axios.get('https://jaishriganesha.com/bizupon-master/api/master/ddl-Department')
            const data = (res.data.data || []).map(item => ({
                value: item.id,
                label: item.name
            }));

            setDeparmentList(data);

        }   catch(error){
                console.error("error fetching data", error);
        }   finally {
                setLoadingDept(false);
        }
    };

    // fetch data in table
    const fetchUserMenuData = async (departmentId = null) => {
        setLoadingTable(true);

        try {
            const res = await axios.get(
                'https://jaishriganesha.com/bizupon-master/api/master/GetUserMenu',
                {
                    params: { departmentId }
                }
            );

            setMenuList(res.data.data || res.data);

            setSelectedIds([]);

        } catch (error) {
            console.error(error);
        } finally {
            setLoadingTable(false);
        }
    };

    useEffect(() => {
        fetchDepartmentData();
        fetchUserMenuData();
    }, []);

    // select single checkbox
    const handleCheckboxChange = (id) => {
        setSelectedIds(prev =>
            prev.includes(id)
                ? prev.filter(item => item !== id)
                : [...prev, id]
        );
    };

    // select all checkboxes
    const handleSelectAll = (e) => {
        if (e.target.checked) {
            const allIds = menuList.map(item => item.id);
            setSelectedIds(allIds);
        } else {
            setSelectedIds([]);
        }
    };

    // filter
    const handleFilter = () => {
        if (!selectDeparment) return;

        const checkedIds = menuList
            .filter(item => item.departmentId === selectDeparment.value)
            .map(item => item.id);

        setSelectedIds(checkedIds);
    };

    return (
        <div className="row">
            <div className="col-lg-12 col-12">
                <div className="card">
                    <div className="card-header">
                        <h5>Facility Master</h5>
                    </div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-lg-3 col-md-6 col-12">
                                <div className="form-group">
                                    <label className="form-label">Select Department Name</label>
                                    <Select 
                                        options={departentlist}
                                        value={selectDeparment}
                                        onChange={setSelectedDepartment}
                                        placeholder={loadingDept ? "Loading..." : "Select Department Name"}
                                        isLoading={loadingDept}
                                    />
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6 col-12">
                                <div className="form-group d-flex">
                                    <button className="btn btn-md btn-primary mt-25" onClick={handleFilter} disabled={loadingTable}>
                                        {loadingTable ? "Loading..." : "Filter"}
                                    </button>
                                    <button className="btn btn-md btn-light mt-25 ms-2"
                                        onClick={() => {
                                            setSelectedDepartment(null);
                                            fetchUserMenuData();
                                            setSelectedIds([]);
                                        }}>
                                        Reset
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card table-card overflow-hidden">
                    <div className="card-body">
                        <div className="table-responsive">
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th>
                                            <input type="checkbox" className="form-check-input"
                                                onChange={handleSelectAll}
                                                checked={
                                                    selectedIds.length === menuList.length &&
                                                    menuList.length > 0
                                                }
                                            />
                                        </th>
                                        <th>Serial Number</th>
                                        <th>Menu Head</th>
                                        <th>Sub Menu</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {loadingTable ? (
                                        <tr>
                                            <td colSpan="4" className="text-center py-4">
                                                <div className="spinner-border text-primary" role="status">
                                                    <span className="visually-hidden">Loading...</span>
                                                </div>
                                            </td>
                                        </tr>
                                    ) : menuList.length > 0 ? (
                                        menuList.map((item, index) => (
                                            <tr key={item.id}>
                                                <td>
                                                    <input
                                                        type="checkbox"
                                                        className="form-check-input"
                                                        checked={selectedIds.includes(item.id)}
                                                        onChange={() => handleCheckboxChange(item.id)}
                                                    />
                                                </td>
                                                <td>{index + 1}</td>
                                                <td>{item.manuName}</td>
                                                <td>
                                                    <input
                                                        type="text"
                                                        name="subMenuName"
                                                        value={item.subMenuName || ""}
                                                        onChange={(e) => {
                                                            const updated = menuList.map(cat =>
                                                                cat.id === item.id
                                                                    ? { ...cat, subMenuName: e.target.value }
                                                                    : cat
                                                            );
                                                            setMenuList(updated);
                                                        }}
                                                        className="editable-control w-100"
                                                    />
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="4" className="text-center py-4">
                                                No Data Found
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                        <div className={`actionModal ${selectedIds.length > 0 ? "" : "d-none"}`}  style={{top: "0px"}}>
                            <div className="selectedItem">
                                {selectedIds.length} Selected from {menuList.length}
                            </div>
                            <div className="actionButtonArea">
                                <button className="btn btn-xs btn-primary"><IconCheck /> Active</button>
                                <button className="btn btn-xs btn-light" onClick={() => setSelectedIds([])}><IconArrowLeft /> Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FacilityMaster;