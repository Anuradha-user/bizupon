import { IconCirclePlusFilled, IconPencil, IconTrash, IconCheck, IconArrowLeft } from '@tabler/icons-react';
import axios from 'axios';
import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom';
import Select from "react-select";

function AuctionYard() {

    const [auctionList, setAuctionList] = useState([]);
    const [selectedAuction, setSelectedAuction] = useState(null);
    const [yards, setYards] = useState([]);
    const [selectedIds, setSelectedIds] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [region, setRegion] = useState([]);
    const [selectRegion, setSelectRegion] = useState(null);

    // form state
    const [formData, setFormData] = useState({
        ayname: "",
        aid: 0,
        lfrom: 0,
        lto: 0,
        uotdays: 0,
        outtime: "",
        address: "",
        email: "",
        contact: "",
        fax: "",
        uid: 0,
        status: 1
    });

    const fetchAuctions = async () => {
        try {
            const res = await fetch(`https://localhost:7244/api/Port/GetddlAuction`);
            const data = await res.json();

            const options = (data.data || []).map(item => ({
                value: item.id,
                label: item.name
            }));

            setAuctionList(options);

        } catch (err) {
            console.error(err);
        }
    };

    // fetch region data
    const fetchRegionData = async () => {
        try{
            const res = await axios.get('https://localhost:7244/api/master/view-regions?CID=1')
            let data = res.data.data.map(item => ({
                value: item.sid,
                label: item.stateName
            }))
            setRegion(data)
        } catch (error) {
            console.log("error", error);
        }
    }

    // fetch api data
    useEffect(() => {
        fetchAuctions();
        fetchRegionData();
    }, []);

    // filter
    const handleFilter = async () => {
        if (!selectedAuction) return;
        try {
            const res = await fetch(
                `https://localhost:7244/api/Port/view-auction-yard?AID=${selectedAuction.value}`
            );
            const data = await res.json();
            setYards(data.data || []);
            setSelectedIds([]); // reset selection
        } catch (err) {
            console.error(err);
        }
    };

    // input change
    const handleChange = (e) => {

        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]:
                name === "aid" ||
                name === "lfrom" ||
                name === "lto" ||
                name === "uotdays" ||
                name === "uid" ||
                name === "status"
                    ? Number(value)
                    : value
        }));
    };

    // add auction yard
    const handleSubmit = async (e) => {

        e.preventDefault();

        try {
            const payload = {
                ayname: formData.ayname,
                aid: selectedAuction?.value || 0,
                lfrom: Number(formData.lfrom),
                lto: Number(formData.lto),
                uotdays: Number(formData.uotdays),
                outtime: formData.outtime,
                address: formData.address,
                email: formData.email,
                contact: formData.contact,
                fax: formData.fax,
                uid: selectRegion?.value || 0,
                status: Number(formData.status)
            };

            console.log(payload);

            await axios.post(
                "https://localhost:7244/api/Port/add-auction-yard",
                payload
            );

            alert("Auction Yard Added Successfully");

            handleFilter();
            setShowModal(false);

            // reset form
            setFormData({
                ayname: "",
                aid: 0,
                lfrom: 0,
                lto: 0,
                uotdays: 0,
                outtime: "",
                address: "",
                email: "",
                contact: "",
                fax: "",
                uid: 0,
                status: 1
            });

            setSelectedAuction(null);
            setSelectRegion(null);

        } catch (error) {
            console.log(error.response?.data || error);
            alert("Failed To Add Auction Yard");
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
            const allIds = yards.map(item => item.id);
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
    }, [auctionList]); // re-run after data load


  return (
    <>
        <div className="row">
            <div className="col-lg-12 col-12">
                <div className="card">
                    <div className="card-header">
                        <h5 className="title">Auction Yard Filter</h5>
                    </div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-lg-3 col-md-6 col-12">
                                <div className="form-group">
                                    <label className="form-label">Select Auction Name</label>
                                    <Select
                                        options={auctionList}
                                        value={selectedAuction}
                                        onChange={setSelectedAuction}
                                        placeholder="Search Auction..."
                                        isClearable
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
            </div>
            <div className="col-lg-12 col-12">
                <div className="card table-card overflow-hidden">
                    <div className="card-header">
                        <h5 className="title">Auction Yard</h5>
                        <button className="btn btn-sm btn-primary" onClick={()=> setShowModal(true)}><IconCirclePlusFilled /> Add Auction Yard</button>
                    </div>
                    <div className="card-body">
                        <div className="table-responsive">
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th>
                                            <input type="checkbox" className="form-check-input" 
                                                onChange={handleSelectAll}
                                                checked={yards.length > 0 && selectedIds.length === yards.length}
                                            />
                                        </th>
                                        <th>Yard Name</th>
                                        <th>Lot Number</th>
                                        <th>Days & Time</th>
                                        <th>Email ID</th>
                                        <th>Contact</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {yards.length > 0 ? (
                                        yards.map((item) => (
                                            <tr key={item.id}>
                                                <td>
                                                    <input type="checkbox" className="form-check-input"
                                                        checked={selectedIds.includes(item.id)}
                                                        onChange={() => handleCheckboxChange(item.id)}
                                                    />
                                                </td>
                                                <td>{item.ayname || "-"}</td>
                                                <td>
                                                    {item.lfrom && item.lto
                                                        ? `${item.lfrom} - ${item.lto}`
                                                        : "-"}
                                                </td>
                                                <td>
                                                    {item.uotdays !== "0" ? item.uotdays : "-"}{" "}
                                                    {item.outtime?.trim()}
                                                </td>
                                                <td>{item.email || "-"}</td>
                                                <td>{item.contact || "-"}</td>
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
                                            <td colSpan="7" className="text-center text-muted">
                                                No Data Found
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                        <div className={`actionModal ${selectedIds.length > 0 ? "" : "d-none"}`} style={{ top: 0 }}>
                            <div className="selectedItem">
                                {selectedIds.length} Selected from {auctionList.length}
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

        {/* Right Slide Drawer */}
        <div className={`custom-drawer ${showModal ? "open" : ""}`}>
            <div className="drawer-header">
                <h5>Add Auction Yard</h5>
                <button className="btn-close" onClick={() => setShowModal(false)}></button>
            </div>

            <div className="drawer-body">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label">Auction Name</label>
                        <Select
                            options={auctionList}
                            value={selectedAuction}
                            onChange={setSelectedAuction}
                            placeholder="Search Auction..."
                            isClearable
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Region Name</label>
                        <Select 
                            options={region}
                            value={selectRegion}
                            onChange={setSelectRegion}
                            placeholder="Search Region Name"
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Auction Yard</label>
                        <input type="text" name="ayname"
                            value={formData.ayname}
                            onChange={handleChange}
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Address </label>
                        <input type="text" name="address"
                            value={formData.address}
                            onChange={handleChange}
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Email ID</label>
                        <input type="text" name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="form-control"
                        />
                    </div>
                    <div className="d-flex flex-wrap justify-content-between gap-2">
                        <div className="form-group">
                            <label className="form-label">Lot No. To</label>
                            <input type="number" name="lto"
                                value={formData.lto}
                                onChange={handleChange}
                                className="form-control"
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Lot No. From</label>
                            <input type="number" name="lto"
                                value={formData.lfrom}
                                onChange={handleChange}
                                className="form-control"
                            />
                        </div>
                    </div>
                    <div className="d-flex flex-wrap justify-content-between gap-2">
                        <div className="form-group">
                            <label className="form-label">Out Day</label>
                            <input type="number" name="uotdays"
                                value={formData.uotdays}
                                onChange={handleChange}
                                className="form-control"
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Out Time</label>
                            <input type="text" name="outtime"
                                value={formData.outtime}
                                onChange={handleChange}
                                className="form-control"
                            />
                        </div>
                    </div>
                    <div className="d-flex flex-wrap justify-content-between gap-2">
                        <div className="form-group">
                            <label className="form-label">Contacat No.</label>
                            <input type="text" name="contact"
                                value={formData.contact}
                                onChange={handleChange}
                                className="form-control"
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Fax No.</label>
                            <input type="text" name="fax"
                                value={formData.fax}
                                onChange={handleChange}
                                className="form-control"
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="form-label">Status</label>
                        <select  name="status"
                            value={formData.status}
                            onChange={handleChange}
                            className="form-control w-100">
                            <option value={1}>Active</option>
                            <option value={0}>De-Active</option>
                        </select>
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

export default AuctionYard
