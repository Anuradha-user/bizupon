import { IconPencil, IconTrash, IconCheck, IconArrowLeft, IconCirclePlusFilled, IconX } from '@tabler/icons-react';
import React, { useEffect, useState } from 'react';
import Select from "react-select";
import { Link } from 'react-router-dom';
import axios from 'axios';

function AdditionalInfo() {

  const [additionalData, setAdditionalData] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectCategories, setSelectCategories] = useState(null);

  

  useEffect(() => {
      fetchAdditionalInfo();
      fetchCategoriesData();
  }, []);

  const fetchAdditionalInfo = async () => {
    try {
      const res = await fetch("https://jaishriganesha.com/bizupon-master/api/Port/view-additional-Info?Categoryid=1&InfoType=1");
      const result = await res.json();

      console.log(result.data);

      setAdditionalData(result.data || []);
    } catch (error) {
      console.error(error);
      setAdditionalData([]);
    }
  };

  const fetchCategoriesData = async() => {
      try{
          const res = await axios.get('https://jaishriganesha.com/bizupon-master/api/master/view-categories')
          const data = (res.data.data || []).map(item => ({
              value: item.id,
              label: item.name
          }))
          .reverse();
          setCategories(data);

      }catch(err){
          console.error(err);
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
          const allIds = additionalData.map(item => item.id); // id field check karo API me
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
  }, [additionalData]);

  return (
    <>
      <div className="row">
        <div className="col-lg-12 col-12">
          <div className="card table-card overflow-hidden">
            <div className="card-header">
              <h5 className="title">Additional Info</h5>
              <button className="btn btn-sm btn-primary" onClick={() => setShowModal(true)}><IconCirclePlusFilled /> Add Additional Info</button>
            </div>
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>
                      <input type="checkbox" className="form-check-input" 
                          onChange={handleSelectAll}
                          checked={selectedIds.length === additionalData.length && additionalData.length > 0} 
                      />
                    </th>
                    <th>Info Type</th>
                    <th>Order By</th>
                    <th>Auction Name</th>
                    <th>Japan</th>
                    <th>Russia</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                  <tbody>
                    {additionalData.length > 0 ? (
                      additionalData.map((item) => (
                        <tr key={item.id}>
                          <td>
                            <input type="checkbox" className="form-check-input"
                                checked={selectedIds.includes(item.id)}
                                onChange={() => handleCheckboxChange(item.id)}
                            />
                          </td>
                          <td>{item.infoTypeName}</td>
                          <td>
                            <input
                              type="number"
                              value={item.ordid || ""}
                              onChange={(e) => {
                                const updated = additionalData.map(row =>
                                  row.id === item.id
                                    ? { ...row, ordid: e.target.value }
                                    : row
                                );
                                setAdditionalData(updated);
                              }}
                              className="editable-control"
                            />
                          </td>
                          <td>{item.additinalInfo}</td>
                          <td>
                            <input type="text" name="nameJapan"
                                value={item.nameJapan || ""}
                                onChange={(e) => {
                                const updated = maker.map(cat =>
                                    cat.id === item.id
                                    ? { ...cat, nameJapan: e.target.value }
                                    : cat
                                );
                                setMaker(updated);
                                }}
                                className="editable-control"
                            />
                          </td>
                          <td>
                            <input type="text" name="nameRussia"
                                value={item.nameRussia || ""}
                                onChange={(e) => {
                                const updated = maker.map(cat =>
                                    cat.id === item.id
                                    ? { ...cat, nameRussia: e.target.value }
                                    : cat
                                );
                                setMaker(updated);
                                }}
                                className="editable-control"
                            />
                          </td>
                          <td>
                            <span className={`badge ${item.active === "Active" ? "bg-success" : "bg-danger"}`}>
                              {item.active}
                            </span>
                          </td>
                          <td>
                            <div className="text-end">
                              <Link to="#" className="avtar edit" data-bs-toggle="tooltip" data-bs-placement="top" title="Edit"><IconPencil /></Link>
                              <Link to="#" className="avtar delete" data-bs-toggle="tooltip" data-bs-placement="top" title="Delete"><IconTrash /></Link>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="7" className="text-center">
                          No Data Found
                        </td>
                      </tr>
                    )}
                </tbody>
              </table>
            </div>
            <div className={`actionModal ${selectedIds.length > 0 ? "" : "d-none"}`}>
              <div className="selectedItem">
                  {selectedIds.length} Selected from {additionalData.length}
              </div>
              <div className="actionButtonArea">
                <button className="btn btn-xs btn-primary"><IconCheck /> Active</button>
                <button className="btn btn-xs btn-warning"><IconX /> De-Active</button>
                <button className="btn btn-xs btn-primary"><IconCheck /> Update</button>
                <button className="btn btn-xs btn-danger"><IconTrash /> Delete</button>
                <button className="btn btn-xs btn-light" onClick={() => setSelectedIds([])}><IconArrowLeft /> Cancel</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Right Slide Drawer */}
      <div className={`custom-drawer ${showModal ? "open" : ""}`}>
        <div className="drawer-header">
          <h5>Add Additional Info</h5>
          <button className="btn-close" onClick={() => setShowModal(false)}></button>
        </div>

        <div className="drawer-body">
          <form>
            <div className="form-group">
              <label className="form-label">Category Name</label>
              <Select 
                options={categories}
                value={selectCategories}
                onChange={setSelectCategories}
                placeholder="Select Category Name"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Additinal Info</label>
              <input type="text" className="form-control" />
            </div>
            <div className="form-group">
              <label className="form-label">Additinal Info (In Japan)</label>
              <input type="text" className="form-control" />
            </div>
            <div className="form-group">
              <label className="form-label">Additinal Info (In Russia)</label>
              <input type="text" className="form-control" />
            </div>
            <div className="form-group">
              <label className="form-label">Info Type</label>
              <Select ></Select>
            </div>
            <div className="form-group">
              <label className="form-label">Status</label>
              <select id="" className="form-control">
                <option value="1">Select Status</option>
                <option value="2">Yes</option>
                <option value="3">No</option>
              </select>
            </div>
            <button type="submit" className="btn btn-primary w-100 mt-4">
              Add Additional Info
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

export default AdditionalInfo
