import Select from "react-select";
import { IconChevronLeft, IconChevronRight, IconArrowLeft, IconCirclePlus, IconPencil, IconTrash } from '@tabler/icons-react';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Region() {

  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [port, setPort] = useState([]);
  const [selectPort, setSelectPort] = useState(null);

  const { cid } = useParams();
  const [regions, setRegions] = useState([]);
  const [page, setPage] = useState(1);

  const perPage = 10;

  const [regionName, setRegionName] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteIds, setDeleteIds] = useState([]);

  const [editId, setEditId] = useState(null);

  const [errors, setErrors] = useState({
    country: false,
    regionName: false,
    status: false
  });

  // Fetch regions API
  const fetchRegions = async (countryId = 1) => {
    try {
      const res = await axios.get(
        `https://localhost:7244/api/master/view-regions?CID=${countryId}`
      );
      
      setRegions(res.data?.data || []);

    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchRegions(1);
    fetchCountries();
    fetchPortData();

    setSelectedIds([]);
    setPage(1);

  }, [cid]);

  // fetch country 
  const fetchCountries = async () => {
    try {
      const res = await fetch(
        "https://localhost:7244/api/master/AllCountries"
      );
      const data = await res.json();

      const formatted = data?.data
        ?.filter(item => item.name && item.name !== "string")
        .map(item => ({
          value: item.cid,
          label: item.name
        })) || [];

      setOptions(formatted);

    } catch (error) {
      console.error("Error:", error);
    }
  };

  // select all checkbox
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      const allIds = data.map(item => item.sid);
      setSelectedIds(allIds);
    } else {
      setSelectedIds([]);
    }
  };

  const handleCheckboxChange = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  };

  // Pagination
  const total = regions.length;
  const pages = Math.ceil(total / perPage);
  const data = regions.slice((page - 1) * perPage, page * perPage);

  // Tooltip
  useEffect(() => {
    document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach(
      el => new window.bootstrap.Tooltip(el)
    );
  }, [data]);

  // filter
  const handleFilter = () => {
    if (!selectedOption) {
      toast.error("Please select country");
      return;
    }

    fetchRegions(selectedOption.value);

    setPage(1);
    setSelectedIds([]);
  };

  // fetch port name data
  const fetchPortData = async() => {
    try{
      const res = await axios.get('https://localhost:7244/api/Port/GetddlJapaneesPort')
      const data = (res.data.data || []).map(item => ({
        value: item.id,
        label: item.name
      }));

      setPort(data)

    } catch (error) {
      console.error("error fetching data", error);
    }
  }

  // add region data
  const handleAddRegion = async (e) => {

    e.preventDefault();

    const newErrors = {
      country: !selectedCountry,
      regionName: !regionName.trim(),
      status: status === ""
    };

    setErrors(newErrors);

    if(
      newErrors.country ||
      newErrors.regionName ||
      newErrors.status
    ){
      return;
    }

    try {
      setLoading(true);
      const body = {
        sid: editId || 0,
        cid: selectedCountry.value,
        regionName: regionName,
        sActive: Number(status)
      };

      let res;

      if (editId) {
        res = await axios.put(
          "https://localhost:7244/api/master/update-region",
          body
        );
      } else {
        res = await axios.post(
          "https://localhost:7244/api/master/add-region",
          body
        );
      }

      if(res.status===200){

        toast.success(
          editId
          ? "Region updated successfully"
          : "Region added successfully"
        );

        setEditId(null);

        setRegionName("");
        setStatus("");
        setSelectedCountry(null);

        setShowModal(false);

        fetchRegions(
          selectedOption?.value || 1
        );
      }

    } catch(error){

      console.log(error);

      toast.error(
        editId
        ? "Update failed"
        : "Add failed"
      );

    } finally{
      setLoading(false);
    }
  };

  // edit region data
  const handleEdit = async (sid) => {
    try {

      const res = await axios.get(
        `https://localhost:7244/api/master/edit-regions?SID=${sid}`
      );

      const editData =
        res.data?.data?.[0];

      if (!editData) return;

      setEditId(editData.sid);

      setRegionName(
        editData.stateName || ""
      );

      setStatus(
        editData.sActive.toString()
      );

      setSelectedCountry({
        value: editData.cid,
        label: editData.countryName
      });

      setShowModal(true);

    } catch(error){

      console.log(error);

      toast.error(
        "Failed to load region"
      );
    }
  };

  // delete region
  const handleDelete = async () => {
    try {

      const body = deleteIds.map(id => ({
        id: id
      }));

      const res = await axios.delete(
        "https://localhost:7244/api/master/delete-region",
        {
          data: body,
          headers: {
            "Content-Type": "application/json"
          }
        }
      );

      if (res.status === 200) {

        toast.success(
          "Region deleted successfully"
        );

        setDeleteModal(false);
        setDeleteIds([]);
        setSelectedIds([]);

        fetchRegions(
          selectedOption?.value || 1
        );
      }

    } catch (error) {

      console.log(error);
      toast.error("Delete failed");

    }
    };

  useEffect(() => {
    setSelectedIds([]);
  }, [page]);


  return (
    <>
      <div className="row">
        <div className="col-lg-12 col-12">
          <div className="card">
            <div className="card-header">
              <h5>Region</h5>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-lg-3 col-12">
                  <Select
                    options={options}
                    value={selectedOption}
                    onChange={setSelectedOption}
                    placeholder="Select Country Name"
                    isSearchable={true}
                  />
                </div>
                <div className="col-lg-3 col-12">
                  <button className="btn btn-md btn-primary" onClick={handleFilter}>Filter</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-12 col-12">
          <div className="card table-card">
            <div className="card-header">
              <div className="cardHeaderLeft">
                <Select className="w-250"
                  options={port}
                  value={selectPort}
                  onChange={setSelectPort}
                  placeholder="Select Port Name"
                />
                <button className="btn btn-md btn-primary">Update Port</button>
              </div>
              <div className="cardHeaderRight">
                <button className="btn btn-md btn-primary" onClick={() => {
                  setEditId(null);
                  setRegionName("");
                  setStatus("");
                  setSelectedCountry(null);
                  setShowModal(true);
                  }}>
                  <IconCirclePlus /> Add Region
                </button>
              </div>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>
                        <input type="checkbox" className="form-check-input" onChange={handleSelectAll}
                          checked={data.length > 0 && selectedIds.length === data.length} 
                        />
                      </th>
                      <th>Region Name</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {data.length ? data.map(item => (
                      <tr key={item.sid}>
                        <td>
                          <input type="checkbox" className="form-check-input"
                            checked={selectedIds.includes(item.sid)}
                            onChange={() => handleCheckboxChange(item.sid)}
                          />
                        </td>
                        <td>{item.stateName || "N/A"}</td>
                        <td>
                          <span className={`badge ${item.sActive === 1 ? "bg-success" : "bg-danger" }`}>
                            {item.active}
                          </span>
                        </td>
                        <td className="text-end">
                          <Link to="#" className="avtar edit" data-bs-toggle="tooltip" title="Edit"
                            onClick={() => handleEdit(item.sid)}>
                            <IconPencil />
                          </Link>
                          <Link to="#" className="avtar delete" data-bs-toggle="tooltip" title="Delete" 
                            onClick={()=>{
                              setDeleteIds([item.sid]);
                              setDeleteModal(true);
                          }}>
                            <IconTrash />
                          </Link>
                        </td>
                      </tr>
                    )) : (
                      <tr><td colSpan="4" className="text-center">No Data Found</td></tr>
                    )}
                  </tbody>
                </table>
              </div>

              <div className={`actionModal ${selectedIds.length > 0 ? "" : "d-none"}`}>
                <div className="selectedItem">
                  {selectedIds.length} Selected from {regions.length}
                </div>
                <div className="actionButtonArea">
                  <button className="btn btn-xs btn-danger"
                    onClick={() => {
                        if(selectedIds.length===0){
                          toast.error("Please select region");
                          return;
                        }
                        setDeleteIds(selectedIds);
                        setDeleteModal(true);
                    }}>
                    <IconTrash/> Delete
                  </button>
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
                    <button className="page-link" onClick={() => page > 1 && setPage(page - 1)}>
                      <IconChevronLeft />
                    </button>
                  </li>
                  {[...Array(pages)]
                    .slice(
                      Math.max(0, page - 3),
                      Math.min(pages, page + 2)
                    )
                    .map((_, i) => {

                    const pageNo = Math.max(1, page - 2) + i;

                    return (
                      <li key={pageNo} className={`page-item ${page===pageNo?"active":""}`}>
                        <button
                          className="page-link" onClick={()=>setPage(pageNo)}>
                          {pageNo}
                        </button>
                      </li>
                    )
                  })}
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
      </div>

      {/* Right Slide Drawer */}
      <div className={`custom-drawer ${showModal ? "open" : ""}`}>
          <div className="drawer-header">
              <h5>{editId ? "Edit Region" : "Add Region"}</h5>
              <button className="btn-close"
                onClick={()=>{
                  setShowModal(false);

                  setEditId(null);

                  setRegionName("");
                  setStatus("");
                  setSelectedCountry(null);
                }}>
              </button>
          </div>

          <div className="drawer-body">
              <form onSubmit={handleAddRegion}>
                  <div className="form-group">
                      <label className="form-label">Country Name</label>
                      <Select required
                        options={options}
                        value={selectedCountry}
                        onChange={setSelectedCountry}
                        placeholder="Select Country Name"
                      />
                  </div>
                  <div className="form-group">
                      <label className="form-label">Region Name</label>
                      <input type="text" className="form-control" required
                        value={regionName}
                        onChange={(e)=>setRegionName(e.target.value)}
                      />
                  </div>
                  <div className="form-group">
                      <label className="form-label">Status</label>
                      <select className="form-control" required
                        value={status}
                        onChange={(e)=>setStatus(e.target.value)}>
                        <option value="">Select Status</option>
                        <option value="1">Active</option>
                        <option value="0">De-Active</option>
                      </select>
                  </div>
                  <button type="submit" className="btn btn-primary w-100 mt-4" disabled={loading}>
                      {
                        loading
                        ? "Saving..."
                        : editId
                        ? "Update"
                        : "Submit"
                        }
                  </button>
              </form>
          </div>
      </div>
      
      {/* Overlay */}
      {showModal && (
          <div className="drawer-overlay" onClick={() => setShowModal(false)}></div>
      )}

      {/* delete alert popup */}
      {deleteModal && (
        <>
          <div className="modal fade show d-block">
              <div className="modal-dialog modal-dialog-centered">
                  <div className="modal-content">
                      <div className="modal-header m-0">
                          <h5 className="modal-title">Delete Confirmation</h5>
                          <button className="btn-close"
                            onClick={()=>setDeleteModal(false)}
                          />
                      </div>
                      <div className="modal-body m-0">
                          Are you sure you want to delete this record?
                      </div>
                      <div className="modal-footer">
                          <button className="btn btn-light"
                            onClick={()=>setDeleteModal(false)}>
                              Cancel
                          </button>
                          <button className="btn btn-danger"
                            onClick={handleDelete}>
                              Delete
                          </button>
                      </div>
                  </div>
              </div>
          </div>
          {deleteModal && (
            <div className="modal-backdrop fade show"></div>
          )}
        </>
      )}

      <ToastContainer position="top-right" autoClose={3000}/>
    </>
  );
}

export default Region;