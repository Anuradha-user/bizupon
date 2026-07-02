import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import Select from "react-select";
import { IconCirclePlusFilled } from "@tabler/icons-react";

function Bills() {

    const [fromDate, setFromDate] = useState(null);
    const [toDate, setToDate] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [selectDocument, setSelectDocument] = useState(null);

    const documentOptions = [
        { value: "Auction Bill", label: "Auction Bill" },
        { value: "Shipping Bill", label: "Shipping Bill" },
        { value: "Transport Bill", label: "Transport Bill" }
    ];

  return (
    <>
        <div className="row">
            <div className="col-lg-12 col-12">
                <div className="card">
                    <div className="card-header">
                        <h5 className="title">Bills</h5>
                    </div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-lg-3 col-md-6 col-12">
                                <div className="form-group">
                                    <label className="form-label">Select Document</label>
                                    <Select 
                                        options={documentOptions}
                                        value={selectDocument}
                                        onChange={setSelectDocument}
                                        placeholder="Select Document"
                                    />
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6 col-12">
                                <div className="form-group">
                                    <label className="form-label">Bill Date From</label>
                                    <DatePicker selected={fromDate}
                                        onChange={(date) => setFromDate(date)}
                                        className="form-control"
                                        placeholderText="Select From Date"
                                        dateFormat="dd/MM/yyyy"
                                    />
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6 col-12">
                                <div className="form-group">
                                    <label className="form-label">Bill Date To</label>
                                    <DatePicker selected={toDate}
                                        onChange={(date) => setToDate(date)}
                                        className="form-control"
                                        placeholderText="Select To Date"
                                        dateFormat="dd/MM/yyyy"
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
                    <div className="card-header justify-content-end">
                        <button className="btn btn-sm btn-primary" onClick={() => setShowModal(true)}><IconCirclePlusFilled /> Upload Bills</button>
                    </div>
                    <div className="table-responsive">
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th>
                                        <input type="checkbox" className="form-check-input" />
                                    </th>
                                    <th>A/S/T Name</th>
                                    <th>Bill Date</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        {/* Right Slide Drawer */}
        <div className={`custom-drawer ${showModal ? "open" : ""}`}>
        <div className="drawer-header">
            <h5>Upload Bills</h5>
            <button className="btn-close" onClick={() => setShowModal(false)}></button>
        </div>

        <div className="drawer-body">
            <form>
                <div className="form-group">
                    <label className="form-label">Select Document</label>
                    <Select 
                        options={documentOptions}
                        value={selectDocument}
                        onChange={setSelectDocument}
                        placeholder="Select Document"
                    />
                </div>
                <div className="form-group">
                    <label className="form-label">Bill Date</label>
                    <DatePicker selected={fromDate}
                        onChange={(date) => setFromDate(date)}
                        className="form-control"
                        placeholderText="Select From Date"
                        dateFormat="dd/MM/yyyy"
                    />
                </div>
                <div className="form-group">
                    <label className="form-label">Browse Document</label>
                    <input type="file" className="form-control" />
                </div>
                <button type="submit" className="btn btn-primary w-100 mt-4">
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

export default Bills
