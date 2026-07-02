import { IconRestore } from '@tabler/icons-react';
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';

function DeletedProduct() {

    const [productList, setProductList] = useState([]);

    const fetchProductListData = async() => {
        try{
            const res = await axios.get('https://localhost:7069/api/Product/GetDeletedProduct?SessionLID=1&PageNo=1&Pagesize=10')
            setProductList(res.data.data.lstProduct || [])
        }
        catch(error){
            console.error("error fetching data", error);
        }
    };

    useEffect(() => {
        fetchProductListData();
    }, []);

    // Tooltip init
    useEffect(() => {
        const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
        const tooltipList = [...tooltipTriggerList].map(
            (tooltipTriggerEl) => new window.bootstrap.Tooltip(tooltipTriggerEl)
        );
    }, [productList]);

  return (
    <div className="row">
        <div className="col-lg-12 col-12">
            <div className="card">
                <div className="card-header">
                    <h5 className="title">Deleted Product</h5>
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-lg-3 col-md-12 col-12">
                            <div className="form-group">
                                <label className="form-label">Chassis Number</label>
                                <input type="text" className="form-control" />
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-12 col-12">
                            <button className="btn btn-md btn-primary mt-25">Filter</button>
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
                                    <th>#</th>
                                    <th>UID</th>
                                    <th>Product</th>
                                    <th>Chassis Number</th>
                                    <th>Sale Country</th>
                                    <th><abbr data-title="Registration Date">R Date</abbr></th>
                                    <th><abbr data-title="Manufacture Date">M Date</abbr></th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {productList.length > 0 ? (
                                    productList.map((item, index) =>(
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{item.uid}</td>
                                            <td>{item.productName}</td>
                                            <td>{item.chassisNo}</td>
                                            <td>{item.saleCountry}</td>
                                            <td>{item.rgdate}</td>
                                            <td>{item.mdate}</td>
                                            <td>
                                                <div className="text-end">
                                                    <Link to="#" className="avtar edit" data-bs-toggle="tooltip" title="Restore"><IconRestore /></Link>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                    ) : (
                                    <tr>
                                        <td colSpan="8" className="text-center">
                                            No Data Found
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default DeletedProduct
