import React, { useState } from 'react';
import Select from "react-select";

function AddPortImages() {

  const [documentStatus, setDocumentStatus] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);

  const options = [
    { value: "yes", label: "Yes" },
    { value: "no", label: "No" }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Document Status:", documentStatus);
  };

  return (
    <div className="row">
      <div className="col-lg-12 col-md-12 col-12">
          <div className="card">
              <div className="card-header">
                  <h5>Add Port Images</h5>
                  <button type="submit" className="btn btn-primary">Go To Yard Out</button>
              </div>
              <div className="card-body">
                  <form onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-xl-3 col-lg-4 col-md-6 col-12">
                        <div className="form-group">
                          <label className="form-label">Chassis Number</label>
                          <input type="text" className="form-control" placeholder="Enter Chassis Number" required="" />
                        </div>
                      </div>
                      <div className="col-xl-3 col-lg-4 col-md-6 col-12">
                        <div className="form-group">
                          <label className="form-label">Document Status</label>
                          <select className="form-control" value={documentStatus}
                            onChange={(e) => setDocumentStatus(e.target.value)} >
                            <option value="">Select Status</option>
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-xl-3 col-lg-4 col-md-6 col-12">
                        <div className="form-group">
                          <label className="form-label">Shipping Company</label>
                          <Select options={options} value={selectedOption}
                            onChange={setSelectedOption}
                            placeholder="Select Shipping Company" />
                        </div>
                      </div>
                      <div className="col-xl-3 col-lg-4 col-md-6 col-12">
                        <div className="form-group">
                          <label className="form-label">Chassis Number</label>
                          <input type="text" className="form-control" placeholder="Enter Chassis Number" required="" />
                        </div>
                      </div>
                    </div>
                  </form>
              </div>
          </div>
      </div>
    </div>
  )
}

export default AddPortImages
