import { IconCirclePlusFilled, IconPencil, IconTrash, IconPlus, IconArrowLeft, IconCheck, IconX, IconChevronLeft, IconChevronRight  } from '@tabler/icons-react'
import React, { useState, useEffect} from 'react'
import Select from 'react-select';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Link } from 'react-router-dom';

function ShipMaster() {

    const [options, setOptions] = useState([]);
    const [selectedOption, setSelectedOption] = useState(null);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [shipList, setShipList] = useState([]);
    const [selectedIds, setSelectedIds] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [departuredate, setDeparturedate] = useState()
    const [arrivalDate, setArrivalDate] = useState()

    const [page, setPage] = useState(1);
    const perPage = 50;

    const fetchCompanies = async () => {
        try {
            const res = await fetch('https://localhost:7244/api/Port/view-shipping');

            if (!res.ok) {
                console.error("Server Error:", res.status);
                return;
            }

            const data = await res.json();
            console.log("API RESPONSE:", data);

            // ✅ safe extraction
            const list = Array.isArray(data?.data)
                ? data.data
                : Array.isArray(data)
                ? data
                : [];

            // ✅ correct mapping (guess based on shipping API)
            const formattedOptions = list.map((item) => ({
                label: item.shippingName || item.name || "No Name",
                value: item.shippingId || item.id || item.sid
            }));

            setOptions(formattedOptions);

        } catch (error) {
            console.error("Error fetching companies:", error);
        }
    };

    // fetch data in table
    const fetchShips = async (sid = 0) => {
        try {
            const res = await fetch(`https://localhost:7244/api/Port/view-Ship?SID=${sid}`);
            const data = await res.json();

            console.log("SHIP API:", data);

            setShipList(data?.data || []);
            setPage(1); // reset page after filter
        } catch (error) {
            console.error("Error fetching ships:", error);
        }
    };

    useEffect(() => {
        fetchCompanies();
        fetchShips(); 
    }, []);

    // filer button logic
    const handleFilter = () => {
        const sid = selectedOption ? selectedOption.value : 0;
        console.log("Selected SID:", sid);
        fetchShips(sid);
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
            const pageIds = data.map(item => item.id);
            setSelectedIds(pageIds);
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
    }, [shipList]);

    // Pagination
    const total = shipList.length;
    const pages = Math.ceil(total / perPage);
    const data = shipList.slice((page - 1) * perPage, page * perPage);


  return (
    <>
        <div className="row">
            <div className="col-lg-12 col-md-12 col-12">
                <div className="card table-card">
                    <div className="card-header">
                        <h5>Ship Master</h5>
                    </div>
                    <div className="card-body p-3">
                        <div className="row">
                            <div className="col-lg-3 col-md-6 col-12">
                                <div className="form-group">
                                    <label className="form-label">Shipping Company</label>
                                    <Select options={options}
                                        value={selectedOption}
                                        onChange={setSelectedOption}
                                        placeholder="Select Shipping Company"
                                        isSearchable={true}
                                    />
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6 col-12">
                                <div className="form-group">
                                    <label className="form-label">Departure Date From</label>
                                    <DatePicker selected={startDate}
                                        onChange={(date) => setStartDate(date)}
                                        className="form-control"
                                        placeholderText="DD/MM/YYYY"
                                        dateFormat="dd/MM/yyyy"
                                    />
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6 col-12">
                                <div className="form-group">
                                    <label className="form-label">Departure Date To</label>
                                    <DatePicker selected={endDate}
                                        onChange={(date) => setEndDate(date)}
                                        className="form-control"
                                        placeholderText="DD/MM/YYYY"
                                        dateFormat="dd/MM/yyyy"
                                    />
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6 col-12">
                                <div className="form-group">
                                    <button className="btn btn-md btn-primary mt-25" onClick={handleFilter}>Filter</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card">
                    <div className="card-header justify-content-end">
                    <button type="submit" className="btn btn-sm btn-primary" onClick={() => setShowModal(true)}><IconCirclePlusFilled /> Add Ship Master</button>
                    </div>
                    <div className="table-responsive">
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th>
                                        <input type="checkbox" className="form-check-input" 
                                            onChange={handleSelectAll}
                                            checked={shipList.length > 0 && selectedIds.length === shipList.length}
                                        />
                                    </th>
                                    <th>Shipping Company</th>
                                    <th>Ship Name</th>
                                    <th>Voyege No.</th>
                                    <th>Ship Type</th>
                                    <th><abbr data-title="Departure Date">D Date</abbr></th>
                                    <th><abbr data-title="Arrival Date">A Date</abbr></th>
                                    <th>Freight</th>
                                    <th><abbr data-title="Loading Capacity">L Capacity</abbr></th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.length > 0 ? (
                                    data.map((item, index) => (
                                    <tr key={item.id || index}>
                                        <td>
                                            <input
                                                type="checkbox"
                                                className="form-check-input"
                                                checked={selectedIds.includes(item.id)}
                                                onChange={() => handleCheckboxChange(item.id)}
                                            />
                                        </td>
                                        <td>{item.shippingcompany || "N/A"}</td>
                                        <td>{item.shipname || "N/A"}</td>
                                        <td>{item.voyageNo || "N/A"}</td>
                                        <td>{item.shipType || "N/A"}</td>
                                        <td>{item.departuredate || "N/A"}</td>
                                        <td>{item.arrivaldate || "N/A"}</td>
                                        <td>{item.shipFreight || "N/A"}</td>
                                        <td>{item.loadingCapacity || "N/A"}</td>
                                        <td>
                                            <div className="text-end">
                                                <Link to="#" className="avtar edit" data-bs-toggle="tooltip" data-bs-placement="top" title="Edit"><IconPencil /></Link>
                                                <Link to="#" className="avtar success" data-bs-toggle="tooltip" data-bs-placement="top" title="Ship Route"><IconPlus /></Link>
                                                <Link to="#" className="avtar delete" data-bs-toggle="tooltip" data-bs-placement="top" title="Delete"><IconTrash /></Link>
                                            </div>
                                        </td>
                                    </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="10" className="text-center">No Data Found</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    <div className={`actionModal ${selectedIds.length > 0 ? "" : "d-none"}`}>
                        <div className="selectedItem">
                            {selectedIds.length} Selected from {shipList.length}
                        </div>
                        <div className="actionButtonArea">
                            <button className="btn btn-xs btn-primary"><IconCheck /> Active</button>
                            <button className="btn btn-xs btn-warning"><IconX /> De-Active</button>
                            <button className="btn btn-xs btn-danger"><IconTrash /> Delete</button>
                            <button className="btn btn-xs btn-light" onClick={() => setSelectedIds([])}><IconArrowLeft /> Cancel</button>
                        </div>
                    </div>

                    {/* Pagination */}
                    <div className="paginationBlock d-flex justify-content-between align-items-center p-3">
                        <div>
                            Showing {(page - 1) * perPage + 1} to {Math.min(page * perPage, total)} of {total}
                        </div>
                        <ul className="pagination mb-0">
                        <li className={`page-item ${page === 1 && "disabled"}`}>
                            <button className="page-link" onClick={() => setPage(p => p - 1)}>
                                <IconChevronLeft />
                            </button>
                        </li>
                        {[...Array(pages)].map((_, i) => (
                            <li key={i} className={`page-item ${page === i + 1 && "active"}`}>
                                <button className="page-link" onClick={() => setPage(i + 1)}>
                                    {i + 1}
                                </button>
                            </li>
                        ))}
                        <li className={`page-item ${page === pages && "disabled"}`}>
                            <button className="page-link" onClick={() => setPage(p => p + 1)}>
                                <IconChevronRight />
                            </button>
                        </li>
                        </ul>
                    </div>

                </div>
            </div>
        </div>

        {/* Right Slide Drawer */}
        <div className={`custom-drawer ${showModal ? "open" : ""}`}>
            <div className="drawer-header">
                <h5>Add Ship Master</h5>
                <button className="btn-close"
                    onClick={()=>{setShowModal(false);}}>
                </button>
            </div>
            <div className="drawer-body">
                <form>
                    <div className="form-group">
                        <label className="form-label">Shipping Company</label>
                        <Select />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Port From</label>
                        <Select />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Terminal Name</label>
                        <Select />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Country Name</label>
                        <Select />
                    </div>
                    <div className="d-flex justify-content-between gap-3">
                        <div className="form-group w-100">
                            <label className="form-label">Ship Type</label>
                            <Select />
                        </div>
                        <div className="form-group w-100">
                            <label className="form-label">Enter Ship Name</label>
                            <input className="form-control" type="text" />
                        </div>
                    </div>
                    <div className="d-flex justify-content-between gap-3">
                        <div className="form-group w-100">
                            <label className="form-label">Departure Date</label>
                            <DatePicker selected={departuredate}
                                onChange={(date) => setDeparturedate(date)}
                                className="form-control"
                                placeholderText="DD/MM/YYYY"
                                dateFormat="DD/MM/yyyy"
                            />
                        </div>
                        <div className="form-group w-100">
                            <label className="form-label">Arrival Date</label>
                            <input className="form-control" type="text" />
                        </div>
                    </div>
                    <div className="d-flex justify-content-between gap-3">
                        <div className="form-group w-100">
                            <label className="form-label">Ship Freight </label>
                            <input className="form-control" type="text" />
                        </div>
                        <div className="form-group w-100">
                            <label className="form-label">Loading Capacity</label>
                            <input className="form-control" type="text" />
                        </div>
                    </div>
                    <div className="d-flex justify-content-between gap-3">
                        <div className="form-group w-100">
                            <label className="form-label">Enter Voyege No.</label>
                            <input className="form-control" type="text" />
                        </div>
                        <div className="form-group w-100">
                            <label className="form-label">Ship Use</label>
                            <Select />
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary w-100 mt-3">
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
  );
}

export default ShipMaster
