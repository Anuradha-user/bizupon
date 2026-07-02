import { IconCirclePlusFilled, IconPencil, IconTrash, IconCheck, IconArrowLeft } from "@tabler/icons-react";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function BodyType() {

  const [bodyTypes, setBodyTypes] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState("english");

  useEffect(() => {
    fetchBodyTypes();
  }, []);

  const fetchBodyTypes = async () => {
    try{
      const res = await fetch('https://jaishriganesha.com/bizupon-master/api/master/view-bodyType');

      if (!res.ok) throw new Error("API Error")

      const data = await res.json();
      console.log("Body Type:", data)

      setBodyTypes(data.data || []);
    } catch (err) {
      console.error("Error:", err);
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
          const allIds = bodyTypes.map(item => item.id);
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
  }, [bodyTypes]);

  return (
    <>
      <div className="row">
        <div className="col-lg-12 col-12">
          <div className="card table-card overflow-hidden">
            <div className="card-header">
              <h5 className="title">Body Type</h5>
              <button className="btn btn-sm btn-primary" onClick={() => setShowModal(true)}><IconCirclePlusFilled /> Add Body Type</button>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>
                        <input type="checkbox" className="form-check-input" 
                          onChange={handleSelectAll}
                          checked={selectedIds.length === bodyTypes.length && bodyTypes.length > 0}
                        />
                      </th>
                      <th>Body Name</th>
                      <th>Russia Name</th>
                      <th>Japan Name</th>
                      <th>Logo</th>
                      <th>Title</th>
                      <th>Keyword</th>
                      <th>Description</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bodyTypes.length > 0 ? (
                      bodyTypes.map((item,) => (
                        <tr key={item.id}>
                          <td>
                            <input type="checkbox" className="form-check-input"
                                checked={selectedIds.includes(item.id)}
                                onChange={() => handleCheckboxChange(item.id)}
                            />
                          </td>
                          <td>{item.name}</td>
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
                            {item.flag ? (
                              <img src={`https://www.bizupon.com/Bodyimage/${item.flag}`} alt="" width="40"
                                onError={(e) => (e.target.style.display = "none")}
                              />
                              ) : "-"}
                          </td>
                          <td>{item.titleTag}</td>
                          <td>{item.keywordTag}</td>
                          <td>{item.descriptionTag}</td>
                          <td>
                            <span className={`badge ${item.bactive === "Active" ? "bg-success" : "bg-danger"}`}>
                              {item.bactive}
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
                          <td colSpan="10" className="text-center">
                            No Data Found
                          </td>
                        </tr>
                      )}
                  </tbody>
                </table>
              </div>
              <div className={`actionModal ${selectedIds.length > 0 ? "" : "d-none"}`}>
                  <div className="selectedItem">
                      {selectedIds.length} Selected from {bodyTypes.length}
                  </div>
                  <div className="actionButtonArea">
                      <button className="btn btn-xs btn-primary"><IconCheck /> Update</button>
                      <button className="btn btn-xs btn-danger"><IconTrash /> Delete</button>
                      <button className="btn btn-xs btn-light" onClick={() => setSelectedIds([])}><IconArrowLeft /> Cancel</button>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Slide Drawer */}
      <div className={`custom-drawer ${showModal ? "open" : ""}`}>
          <div className="drawer-header">
              <h5>Add Body Type</h5>
              <button className="btn-close" onClick={() => setShowModal(false)}></button>
          </div>
          <div className="drawer-body">
            {/* Tabs Header */}
            <ul className="nav nav-tabs mb-3">
              <li className="nav-item">
                <button className={`nav-link ${activeTab === "english" ? "active" : ""}`}
                  onClick={() => setActiveTab("english")} >
                  Body Type Details (English)
                </button>
              </li>
              <li className="nav-item">
                <button className={`nav-link ${activeTab === "russia" ? "active" : ""}`}
                  onClick={() => setActiveTab("russia")} >
                  Body Type Details (Russia)
                </button>
              </li>
            </ul>
            {/* Tabs Content */}
            <div className="tab-content">
              {/* English Tab */}
              {activeTab === "english" && (
                <div className="tab-pane active">
                  <div className="form-group">
                    <label>Body Type Name</label>
                    <input type="text" className="form-control" />
                  </div>
                  <div className="form-group">
                    <label>Body Type Name (In Japan)</label>
                    <input type="text" className="form-control" />
                  </div>
                  <div className="form-group">
                    <label>Title Tag</label>
                    <input type="text" className="form-control" />
                  </div>
                  <div className="form-group">
                    <label>Keyword Tag</label>
                    <input type="text" className="form-control" />
                  </div>
                  <div className="form-group">
                    <label>Canonical Tag</label>
                    <input type="text" className="form-control" />
                  </div>
                  <div className="form-group">
                      <label className="form-label">Body Type Logo</label>
                      <input type="file" className="form-control" />
                  </div>
                  <div className="form-group w-100">
                    <label className="form-label">Status</label>
                    <select className="form-control">
                        <option>Active</option>
                        <option>De-Active</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Description</label>
                    <textarea className="form-control" rows="4"></textarea>
                  </div>
                  <button type="submit" className="btn btn-primary w-100 mt-4">
                    Submit
                  </button>
                </div>
              )}

              {/* Russia Tab */}
              {activeTab === "russia" && (
                <div className="tab-pane active">
                  <div className="form-group">
                    <label>Body Type Name (In Russia)</label>
                    <input type="text" className="form-control" />
                  </div>
                  <div className="form-group">
                    <label>Title Tag</label>
                    <input type="text" className="form-control" />
                  </div>
                  <div className="form-group">
                    <label>Keyword Tag</label>
                    <input type="text" className="form-control" />
                  </div>
                  <div className="form-group">
                    <label>Canonical Tag</label>
                    <input type="text" className="form-control" />
                  </div>
                  <div className="form-group">
                      <label className="form-label">Body Type Logo</label>
                      <input type="file" className="form-control" />
                  </div>
                  <div className="form-group w-100">
                    <label className="form-label">Status</label>
                    <select className="form-control">
                        <option>Active</option>
                        <option>De-Active</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Description</label>
                    <textarea className="form-control" rows="4"></textarea>
                  </div>
                  <button type="submit" className="btn btn-primary w-100 mt-4">
                    Submit
                  </button>
                </div>
              )}
            </div>
          </div>
      </div>
      {/* Overlay */}
      {showModal && (
        <div className="drawer-overlay" onClick={() => setShowModal(false)}></div>
      )}
    </>
  );
}

export default BodyType;