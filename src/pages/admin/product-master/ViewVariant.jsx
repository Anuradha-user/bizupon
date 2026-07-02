import { IconBellPlusFilled, IconChevronLeft, IconChevronRight, IconCirclePlusFilled, IconPencil, IconTrash } from '@tabler/icons-react'
import React, { useState, useEffect } from 'react'
import Select from 'react-select'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Link } from 'react-router-dom'

function ViewVariant() {

    const navigate = useNavigate();

    const [bodyType, setBodyType] = useState([]);
    const [productList, setProductList] = useState([]);

    const [selectBodyType, setSelectBodyType] = useState(null);
    const [selectProduct, setSelectProduct] = useState(null);

    const [selectedIds, setSelectedIds] = useState([]);
    const [tableData, setTableData] = useState([]);

    const [page, setPage] = useState(1);

    const perPage = 100;

    const [skip, setSkip] = useState(0);
    const [take] = useState(1000);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);

    // fetch table data
    const fetchTableData = async (currentSkip = 0) => {
        try {
            setLoading(true);
            const res = await axios.get(
                `https://localhost:7069/api/Product/view-Variant?skip=${currentSkip}&take=${take}`,
                {
                    timeout: 10000
                }
            );

            const newData = res.data.data || [];

            if (newData.length < take) {
                setHasMore(false);
            }

            if (currentSkip === 0) {
                setTableData(newData);
            } else {
                setTableData(prev => [...prev, ...newData]);
            }

        } catch (error) {

            console.error("error fetching data", error);

        } finally {

            setLoading(false);

        }
    };
    
    // fetch data in bodytype select dropdown
    const fetchBodyTypeData = async () => {
        try{
            const res = await axios.get('https://localhost:7069/api/Product/GetBodyType')
            const data = (res.data.data || [res.data]).map(item => ({
                value: item.ID,
                label: item.Name
            }))

            setBodyType(data.reverse())
            
        } catch (error) {
            console.error("Error fetching data", error);
        }
    };

    useEffect(()=>{
        fetchTableData(0);
        fetchBodyTypeData();
    }, [])

    // selct all checkboxes
    const handleSelectAll = (e) => {
        if (e.target.checked) {
            setSelectedIds(tableData.map(item => item.ID));
        } else {
            setSelectedIds([]);
        }
    };
    
    // selct single checkbox
    const handleCheckboxChange = (id) => {
        if (selectedIds.includes(id)) {
            setSelectedIds(selectedIds.filter(item => item !== id));
        } else {
            setSelectedIds([...selectedIds, id]);
        }
    };

    // Tooltip init
    useEffect(() => {
        const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
        const tooltipList = [...tooltipTriggerList].map(
            (tooltipTriggerEl) => new window.bootstrap.Tooltip(tooltipTriggerEl)
        );
    }, [tableData]);

    // Pagination
    const total = tableData.length;
    const pages = Math.ceil(total / perPage);

    const data = tableData.slice(
        (page - 1) * perPage,
        page * perPage
    );

    // Only 10 page buttons show
    const pageGroup = Math.floor((page - 1) / 10);
    const startPage = pageGroup * 10 + 1;
    const endPage = Math.min(startPage + 9, pages);

  return (
    <div className="row">
        <div className="col-lg-12 col-12">
            <div className="card">
                <div className="card-header">
                    <h5 className="title">View Variant</h5>
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-lg-3 col-md-12 col-12">
                            <div className="form-group">
                                <label className="form-label">Select Product</label>
                                <Select />
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-12 col-12">
                            <div className="form-group">
                                <label className="form-label">Select Body Type</label>
                                <Select
                                    options={bodyType}
                                    value={selectBodyType}
                                    onChange={setSelectBodyType}
                                    placeholder="Select Body Type"
                                />
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-12 col-12">
                            <div className="form-group">
                                <label className="form-label">Model Code</label>
                                <input type="text" className="form-control" />
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-12 col-12">
                            <div className="form-group">
                                <label className="form-label">Manufacture Year</label>
                                <input type="text" className="form-control" />
                            </div>
                        </div>
                        <div className="col-lg-12 col-md-12 col-12">
                            <button className="btn btn-md btn-primary mt-2 float-end">Filter</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="card table-card overflow-hidden">
                <div className="card-body">
                    <div className="card-header justify-content-end">
                        <button className="btn btn-sm btn-primary" onClick={() => navigate('/admin/product-master/add-variant')}><IconCirclePlusFilled /> Add Variant</button>
                    </div>
                    <div className="table-responsive">
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th>
                                        <input type="checkbox" className="form-check-input"
                                            onChange={handleSelectAll}
                                            checked={
                                                data.length > 0 &&
                                                data.every(item =>
                                                    selectedIds.includes(item.ID)
                                                )
                                            }
                                        />
                                    </th>
                                    <th>Product Name</th>
                                    <th>Variant</th>
                                    <th><abbr data-title="Model Code">M Code</abbr></th>
                                    <th>Drive</th>
                                    <th>Transmission</th>
                                    <th>CC</th>
                                    <th>Weight</th>
                                    <th>Length</th>
                                    <th>Width</th>
                                    <th>Height</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tableData.length > 0 ? (
                                    data.map((item, index) => (
                                        <tr key={index}>
                                            <td>
                                                <input type="checkbox" className="form-check-input"
                                                    checked={selectedIds.includes(item.ID)}
                                                    onChange={() =>
                                                        handleCheckboxChange(item.ID)
                                                    }
                                                />
                                            </td>
                                            <td>{item.productName}</td>
                                            <td>{item.variant}</td>
                                            <td>{item.modelCode}</td>
                                            <td>{item.drive}</td>
                                            <td>{item.transmission}</td>
                                            <td>{item.cc}</td>
                                            <td>{item.weight}</td>
                                            <td>{item.length}</td>
                                            <td>{item.width}</td>
                                            <td>{item.height}</td>
                                            <td>
                                                <div className="text-end">
                                                    <Link to="#" className="avtar edit" data-bs-toggle="tooltip" title="Edit"><IconPencil /></Link>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="12" className="text-center">
                                            No Data Found
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="paginationBlock d-flex justify-content-between align-items-center p-3">
                        <div>
                            Showing {(page - 1) * perPage + 1}
                            {" "}to{" "}
                            {Math.min(page * perPage, total)}
                            {" "}of {total}
                        </div>
                        <ul className="pagination mb-0">
                            <button className="page-link"
                                onClick={() => {
                                    if (page > 1) {
                                        setPage(page - 1);
                                    }
                                }}
                                disabled={page === 1}>
                                <IconChevronLeft />
                            </button>
                            {[...Array(endPage - startPage + 1)].map((_, i) => {
                                const pageNumber = startPage + i;
                                return (
                                    <li key={pageNumber}
                                        className={`page-item ${page === pageNumber ? "active" : ""}`}>
                                        <button className="page-link"
                                            onClick={() => setPage(pageNumber)}>
                                            {pageNumber}
                                        </button>
                                    </li>
                                );
                            })}
                            <button className="page-link"
                                onClick={async () => {
                                    const nextPage = page + 1;
                                    // Need more data from API
                                    if (
                                        nextPage > pages &&
                                        hasMore &&
                                        !loading
                                    ) {
                                        const newSkip = skip + take;
                                        setSkip(newSkip);
                                        await fetchTableData(newSkip);
                                    }
                                    setPage(nextPage);
                                }}
                                disabled={
                                    loading ||
                                    (!hasMore && page >= pages)
                                }>
                                <IconChevronRight />
                            </button>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ViewVariant
