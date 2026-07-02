import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import { IconBriefcase, IconFile, IconVideo, IconPhoto, IconCloudUpload, IconEyeFilled } from "@tabler/icons-react";
import Select from "react-select";
import DatePicker from "react-datepicker";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

function AddPurchase() {
    const tabRefs = useRef([]);
    const [active, setActive] = useState(0);

    const [category, setCategory] = useState([]);
    const [selectCategory, setSelectCategory] = useState(null);
    const [productList, setProductList] = useState([]);
    const [selectProduct, setSelectProduct] = useState(null);
    const [productType, setProductType] = useState([
        {
            value: "normal",
            label: "Normal"
        },
        {
            value: "promotional",
            label: "Promotional"
        }
    ]);
    const [selectProductType, setSelectProductType] = useState(null);
    const [auctionDate, setAuctionDate] = useState(null);
    const [sendDate, setSendDate] = useState(null);
    const [manufactureDate, setManufactureDate] = useState(null);
    const [registrationDate, setRegistrationDate] = useState(null);
    const [auctionHouse, setAuctionHouse] = useState([]);
    const [selectAuction, setSelectAuction] = useState(null);
    const [sourceAuction, setSourceAuction] = useState([]);
    const [selectSourceAuction, setSelectSourceAuction] = useState(null);
    const [files, setFiles] = useState([]);
    const [shipping, setShipping] = useState([]);
    const [selectShipping, setSelectShipping] = useState(null);
    const [port, setPort] = useState([]);
    const [selectPort, setSelectPort] = useState(null);
    const navigate = useNavigate();
    const [urgent, setUrgent] = useState([
        {
            value: "Yes",
            label: "Yes"
        },
        {
            value: "No",
            label: "No"
        }
    ]);
    const [selectUrgent, setselectUrgent] = useState(null);
    const [carStatus, setCarStatus] = useState([
        {
            value: "Unsold",
            label: "Unsold"
        },
        {
            value: "Unsold Ship",
            label: "Unsold Ship"
        },
        {
            value: "Ship Back",
            label: "Ship Back"
        },
        {
            value: "Reserved",
            label: "Reserved"
        },
        {
            value: "Sold",
            label: "Sold"
        },
        {
            value: "Cancel By Client",
            label: "Cancel By Client"
        },
        {
            value: "Client Changed",
            label: "Client Changed"
        },
        {
            value: "Shipped",
            label: "Shipped"
        },
        {
            value: "Delivered",
            label: "Delivered"
        },
        {
            value: "Auction Cancel",
            label: "Auction Cancel"
        },
        {
            value: "In Auction",
            label: "In Auction"
        },
        {
            value: "Auction Sold",
            label: "Auction Sold"
        },
        {
            value: "Local Sale",
            label: "Local Sale"
        }
    ]);
    const [selectCarStatus, setSelectCarStatus] = useState(null);
    const [handle, setHandle] = useState([
        {
            value: "RHD",
            label: "RHD"
        },
        {
            value: "LHD",
            label: "LHD"
        },
        {
            value: "NHD",
            label: "NHD"
        }
    ]);
    const [selectHandle, setSelectHandle] = useState(null)

    const [productTwo, setProductTwo] = useState([
        {
            value: "Real",
            label: "Real"
        },
        {
            value: "Duplicate",
            label: "Duplicate"
        }
    ]);
    const [selectProductTwo, setSelectProductTwo] = useState(null)

    const [imgType, setImgType] = useState([
        {
            value: "Product Images",
            label: "Product Images"
        },
        {
            value: "Port Images",
            label: "Port Images"
        }
    ]);
    const [selectImgType, setSelectImgType] = useState(null)

    const [docType, setDocType] = useState([
        {
            value: "Original Certificate",
            label: "Original Certificate"
        },
        {
            value: "Inspection Certificate",
            label: "Inspection Certificate"
        },
        {
            value: "BL Copy",
            label: "BL Copy"
        },
        {
            value: "Last Certificate",
            label: "Last Certificate"
        }
    ]);
    const [selectDocType, setSelectDocType] = useState(null)

    // fetch category dropdown data
    const fetchCategoryData = async () => {
        try {

            const res = await axios.get('https://localhost:7010/api/Purchase/GetMaster');

            const data = (res.data.data.lstSubCategory || []).map(item => ({
                value: item.id,
                label: item.name
            }));

            setCategory(data);

        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    // fetch product dropdown data
    const fetchProductData = async () => {
        try {

            const res = await axios.get('https://localhost:7010/api/Purchase/GetMaster');

            const data = (res.data.data.lstProductMaster || []).map(item => ({
                value: item.id,
                label: item.name
            }));

            setProductList(data);

        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    // fetch auction house dropdown data
    const fetchAuctionHouseData = async () => {
        try {

            const res = await axios.get('https://localhost:7010/api/Purchase/GetMaster');

            const data = (res.data.data.lstAuction || []).map(item => ({
                value: item.id,
                label: item.name
            }));

            setAuctionHouse(data);

        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    // fetch source auction dropdown data
    const fetchSourceAuctionData = async () => {
        try {

            const res = await axios.get('https://localhost:7010/api/Purchase/GetMaster');

            const data = (res.data.data.lstAuction || []).map(item => ({
                value: item.id,
                label: item.name
            }));

            setSourceAuction(data);

        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    // fetch car status dropdown data
    const fetchCarStatusData = async () => {
        try {

            const res = await axios.get('https://localhost:7010/api/Purchase/GetMaster');

            const data = (res.data.data.lstAuction || []).map(item => ({
                value: item.id,
                label: item.name
            }));

            setCarStatus(data);

        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    // fetch shipping dropdown data
    const fetchShippingData = async () => {
        try {

            const res = await axios.get('https://localhost:7010/api/Purchase/GetMaster');

            const data = (res.data.data.lstShipping || []).map(item => ({
                value: item.id,
                label: item.name
            }));

            setShipping(data);

        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    // fetch port from dropdown data
    const fetchPortFromData = async () => {
        try {

            const res = await axios.get('https://localhost:7010/api/Purchase/GetMaster');

            const data = (res.data.data.lstPortMaster || []).map(item => ({
                value: item.id,
                label: item.name
            }));

            setPort(data);

        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchCategoryData();
        fetchProductData();
        fetchAuctionHouseData();
        fetchSourceAuctionData();
        fetchCarStatusData();
        fetchShippingData();
        fetchPortFromData();
    }, []);

    
    // multiple image uploader
    const handleFiles = (selectedFiles) => {
    const newFiles = Array.from(selectedFiles).map((file) => ({
        file,
        name: file.name,
        size: file.size,
        preview: URL.createObjectURL(file),
        progress: 0,
        status: "uploading",
    }));

    setFiles((prev) => [...prev, ...newFiles]);

    // fake upload progress
    newFiles.forEach((f, i) => {
        let progress = 0;

        const interval = setInterval(() => {
        progress += 10;

        setFiles((prev) =>
            prev.map((item) =>
            item.name === f.name
                ? {
                    ...item,
                    progress,
                    status: progress >= 100 ? "done" : "uploading",
                }
                : item
            )
        );

        if (progress >= 100) clearInterval(interval);
        }, 200);
    });
    };

    const handleFileChange = (e) => {
    handleFiles(e.target.files);
    };

    const handleDrop = (e) => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
    };

    const removeFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    };

    // tab
    const [pillStyle, setPillStyle] = useState({
        opacity: 0,
    });

    const tabs = [
        { label: "Manage Purchase", icon: <IconBriefcase size={20} /> },
        { label: "Upload Images", icon: <IconPhoto size={20} /> },
        { label: "Upload Document", icon: <IconFile size={20} /> },
        { label: "Upload Auction & Video", icon: <IconVideo size={20} /> },
    ];

    const updatePill = () => {
        const currentTab = tabRefs.current[active];

        if (!currentTab) return;
        if (currentTab.offsetWidth > 1000) return;

        setPillStyle({
            width: currentTab.offsetWidth + "px",
            transform: `translateX(${currentTab.offsetLeft}px)`,
            opacity: 1,
        });
    };

    useLayoutEffect(() => {
        const timer = setTimeout(() => {
            updatePill();
        }, 0); // micro delay for DOM stability

        return () => clearTimeout(timer);
    }, [active]);

  return (
    <div className="row">
      <div className="col-lg-12 col-12">
        <div className="card">
            <div className="card-header">
                <h5 className="title">Add Purchase</h5>
                <button className="btn btn-sm btn-primary" onClick={() => navigate('/admin/product-master/view-purchase')}><IconEyeFilled /> View Purchase</button>
            </div>

            <div className="card-body">
                {/* Tabs */}
                <div className="tabs-container">
                    <div className="tabs-glass">
                        <div className="active-pill" style={pillStyle} />
                            {tabs.map((tab, i) => (
                                <div key={i}
                                    ref={(el) => (tabRefs.current[i] = el)}
                                    className={`tab-item ${active === i ? "active" : ""}`}
                                    onClick={() => setActive(i)} >
                                    <span className="icon">{tab.icon}</span>
                                    <span>{tab.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Content */}
                    <div className="mt-4">
                    {active === 0 && 
                        <div className="row">
                            <div className="col-lg-3 col-md-12 col-12">
                                <div className="form-group">
                                    <label className="form-label">Category</label>
                                    <Select 
                                        options={category}
                                        value={selectCategory}
                                        onChange={setSelectCategory}
                                        placeholder="Select Category"
                                    />
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-12 col-12">
                                <div className="form-group">
                                    <label className="form-label">Select Product</label>
                                    <Select 
                                        options={productList}
                                        value={selectProduct}
                                        onChange={setProductList}
                                        placeholder="Select Product"
                                    />
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-12 col-12">
                                <div className="form-group">
                                    <label className="form-label">Auction Date</label>
                                    <DatePicker
                                        selected={auctionDate}
                                        onChange={(date) => setAuctionDate(date)}
                                        className="form-control"
                                        placeholderText="DD/MM/YYYY"
                                        dateFormat="dd/MM/yyyy"
                                    />
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-12 col-12">
                                <div className="form-group">
                                    <label className="form-label">Product Type</label>
                                    <Select
                                        options={productType}
                                        value={selectProductType}
                                        onChange={setSelectProductType}
                                        placeholder="Select Product Type"
                                    />
                                </div>
                            </div>
                            <div className="col-lg-9 col-md-12 col-12">
                                <div className="form-group">
                                    <label className="form-label">Model Code</label>
                                    <Select />
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-12 col-12">
                                <div className="form-group">
                                    <label className="form-label">Chassis Number</label>
                                    <input type="text" className="form-control" />
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-12 col-12">
                                <div className="form-group">
                                    <label className="form-label">Manufacture Date</label>
                                    <DatePicker
                                        selected={manufactureDate}
                                        onChange={(date) => setManufactureDate(date)}
                                        className="form-control"
                                        placeholderText="DD/MM/YYYY"
                                        dateFormat="dd/MM/yyyy"
                                    />
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-12 col-12">
                                <div className="form-group">
                                    <label className="form-label">Auction House</label>
                                    <Select 
                                        options={auctionHouse}
                                        value={selectAuction}
                                        onChange={setSelectAuction}
                                        placeholder="Select Auction House"
                                    />
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-12 col-12">
                                <div className="form-group">
                                    <label className="form-label">Source of Auction</label>
                                    <Select 
                                        options={sourceAuction}
                                        value={selectSourceAuction}
                                        onChange={setSelectSourceAuction}
                                        placeholder="Select Source of Auction"
                                    />
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-12 col-12">
                                <div className="form-group">
                                    <label className="form-label">Lot Number</label>
                                    <input type="text" className="form-control" />
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-12 col-12">
                                <div className="form-group">
                                    <label className="form-label">Grade</label>
                                    <input type="text" className="form-control" />
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-12 col-12">
                                <div className="form-group">
                                    <label className="form-label">Registration Date</label>
                                    <DatePicker
                                        selected={registrationDate}
                                        onChange={(date) => setRegistrationDate(date)}
                                        className="form-control"
                                        placeholderText="DD/MM/YYYY"
                                        dateFormat="dd/MM/yyyy"
                                    />
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-12 col-12">
                                <div className="form-group">
                                    <label className="form-label">Urgent</label>
                                    <Select
                                        options={urgent}
                                        value={selectUrgent}
                                        onChange={setselectUrgent}
                                        placeholder="Select Urgent"
                                    />
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-12 col-12">
                                <div className="form-group">
                                    <label className="form-label">Mileage</label>
                                    <input type="text" className="form-control" />
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-12 col-12">
                                <div className="form-group">
                                    <label className="form-label">Car Status</label>
                                    <Select
                                        options={carStatus}
                                        value={selectCarStatus}
                                        onChange={setSelectCarStatus}
                                        placeholder="Select Car Status"
                                    />
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-12 col-12">
                                <div className="form-group">
                                    <label className="form-label">Handle</label>
                                    <Select
                                        options={handle}
                                        value={selectHandle}
                                        onChange={setSelectHandle}
                                        placeholder="Select Handle"
                                    />
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-12 col-12">
                                <div className="form-group">
                                    <label className="form-label">Color</label>
                                    <input type="text" className="form-control" />
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-12 col-12">
                                <div className="form-group">
                                    <label className="form-label">Product Type II</label>
                                    <Select
                                        options={productTwo}
                                        value={selectProductTwo}
                                        onChange={setSelectProductTwo}
                                        placeholder="Select Product Type II"
                                    />
                                </div>
                            </div>
                            <div className="col-lg-12 col-md-12 col-12">
                                <button className="btn btn-md btn-primary mt-2 float-end">Submit</button>
                            </div>
                        </div>
                    }
                    {active === 1 && 
                        <div className="row">
                            <div className="col-lg-3 col-md-12 col-12">
                                <div className="form-group">
                                    <label className="form-label">Image Type</label>
                                    <Select
                                        options={imgType}
                                        value={selectImgType}
                                        onChange={setSelectImgType}
                                        placeholder="Select Image Type"
                                    />
                                </div>
                                <div className="fileUploader">
                                    <div className="upload-box"
                                        onDragOver={(e) => e.preventDefault()}
                                        onDrop={(e) => handleDrop(e)}>
                                        <div className="upload-icon"><IconCloudUpload size={50} /></div>
                                        <p>Drag & drop your files here or <span>Browse</span></p>
                                        <input type="file" multiple accept="image/*" onChange={handleFileChange} />
                                        <small>Max 10MB</small>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-9 col-md-12 col-12">
                                {/* File List */}
                                <div className="upload-list">
                                    {files.map((file, index) => (
                                        <div key={index} className="upload-item">
                                            <img src={file.preview} alt="" />
                                            <div className="file-info">
                                                <p>{file.name}</p>
                                                <small>{(file.size / 1024).toFixed(2)} KB</small>
                                                <div className="progress-bar">
                                                <div className={`progress ${
                                                    file.status === "done"
                                                        ? "done"
                                                        : file.status === "error"
                                                        ? "error"
                                                        : ""
                                                    }`}
                                                    style={{ width: file.progress + "%" }}
                                                />
                                                </div>
                                            </div>
                                            <button onClick={() => removeFile(index)}>✕</button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="col-lg-12 col-md-12 col-12">
                                <button className="btn btn-md btn-primary mt-2 float-end">Make Collarge</button>
                            </div>
                        </div>
                    }
                    {active === 2 && 
                        <div className="row">
                            <div className="col-lg-3 col-md-12 col-12">
                                <div className="form-group">
                                    <label className="form-label">Document Type</label>
                                    <Select
                                        options={docType}
                                        value={selectDocType}
                                        onChange={setSelectDocType}
                                        placeholder="Select Document Type"
                                    />
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-12 col-12">
                                <div className="form-group">
                                    <label className="form-label">Shipping Company</label>
                                    <Select 
                                        options={shipping}
                                        value={selectShipping}
                                        onChange={setSelectShipping}
                                        placeholder="Select Shipping Company"
                                    />
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-12 col-12">
                                <div className="form-group">
                                    <label className="form-label">Port From</label>
                                    <Select 
                                        options={port}
                                        value={selectPort}
                                        onChange={setSelectPort}
                                        placeholder="Select Port"
                                    />
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-12 col-12">
                                <div className="form-group">
                                    <label className="form-label">Document Send Date</label>
                                    <DatePicker
                                        selected={sendDate}
                                        onChange={(date) => setSendDate(date)}
                                        className="form-control"
                                        placeholderText="DD/MM/YYYY"
                                        dateFormat="dd/MM/yyyy"
                                    />
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-12 col-12">
                                <div className="form-group">
                                    <label className="form-label">Browse Document</label>
                                    <div className="fileUploader">
                                        <div className="upload-box"
                                            onDragOver={(e) => e.preventDefault()}
                                            onDrop={(e) => handleDrop(e)}>
                                            <div className="upload-icon"><IconCloudUpload size={30} /></div>
                                            <p>Drag & drop your files here or <span>Browse</span></p>
                                            <input type="file" multiple accept="image/*" onChange={handleFileChange} />
                                            <small>Max 10MB</small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-9 col-md-12 col-12">
                                <div className="row">
                                    <div className="col-lg-4 col-md-12 col-12">
                                        <div className="form-group">
                                            <label className="form-label">Weight (KG)</label>
                                            <input type="text" className="form-control" />
                                        </div>
                                    </div>
                                    <div className="col-lg-4 col-md-12 col-12">
                                        <div className="form-group">
                                            <label className="form-label">Length (CM)</label>
                                            <input type="text" className="form-control" />
                                        </div>
                                    </div>
                                    <div className="col-lg-4 col-md-12 col-12">
                                        <div className="form-group">
                                            <label className="form-label">Width (CM)</label>
                                            <input type="text" className="form-control" />
                                        </div>
                                    </div>
                                    <div className="col-lg-4 col-md-12 col-12">
                                        <div className="form-group">
                                            <label className="form-label">Height (CM)</label>
                                            <input type="text" className="form-control" />
                                        </div>
                                    </div>
                                    <div className="col-lg-4 col-md-12 col-12">
                                        <div className="form-group">
                                            <label className="form-label">Identity</label>
                                            <input type="text" className="form-control" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-12 col-12">
                                <div className="upload-list mt-3">
                                    {files.map((file, index) => (
                                        <div key={index} className="upload-item">
                                            <img src={file.preview} alt="" />
                                            <div className="file-info">
                                                <p>{file.name}</p>
                                                <small>{(file.size / 1024).toFixed(2)} KB</small>
                                                <div className="progress-bar">
                                                <div className={`progress ${
                                                    file.status === "done"
                                                        ? "done"
                                                        : file.status === "error"
                                                        ? "error"
                                                        : ""
                                                    }`}
                                                    style={{ width: file.progress + "%" }}
                                                />
                                                </div>
                                            </div>
                                            <button onClick={() => removeFile(index)}>✕</button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="col-lg-12 col-md-12 col-12">
                                <button className="btn btn-md btn-primary float-end">Update Identity</button>
                            </div>
                        </div>
                    }
                    {active === 3 && 
                        <div className="row">
                            <div className="col-lg-4 col-md-12 col-12">
                                <div className="form-group">
                                    <label className="form-label">Browse Auction Sheet Document</label>
                                    <div className="fileUploader">
                                        <div className="upload-box"
                                            onDragOver={(e) => e.preventDefault()}
                                            onDrop={(e) => handleDrop(e)}>
                                            <div className="upload-icon"><IconCloudUpload size={30} /></div>
                                            <p>Drag & drop your files here or <span>Browse</span></p>
                                            <input type="file" multiple accept="image/*" onChange={handleFileChange} />
                                            <small>Max 10MB</small>
                                        </div>
                                    </div>
                                    <div className="upload-list mt-3">
                                        {files.map((file, index) => (
                                            <div key={index} className="upload-item">
                                                <img src={file.preview} alt="" />
                                                <div className="file-info">
                                                    <p>{file.name}</p>
                                                    <small>{(file.size / 1024).toFixed(2)} KB</small>
                                                    <div className="progress-bar">
                                                    <div className={`progress ${
                                                        file.status === "done"
                                                            ? "done"
                                                            : file.status === "error"
                                                            ? "error"
                                                            : ""
                                                        }`}
                                                        style={{ width: file.progress + "%" }}
                                                    />
                                                    </div>
                                                </div>
                                                <button onClick={() => removeFile(index)}>✕</button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-12 col-12">
                                <div className="form-group">
                                    <label className="form-label">Upload Thumnail</label>
                                    <div className="fileUploader">
                                        <div className="upload-box"
                                            onDragOver={(e) => e.preventDefault()}
                                            onDrop={(e) => handleDrop(e)}>
                                            <div className="upload-icon"><IconCloudUpload size={30} /></div>
                                            <p>Drag & drop your files here or <span>Browse</span></p>
                                            <input type="file" multiple accept="image/*" onChange={handleFileChange} />
                                            <small>Max 10MB</small>
                                        </div>
                                    </div>
                                    <div className="upload-list mt-3">
                                        {files.map((file, index) => (
                                            <div key={index} className="upload-item">
                                                <img src={file.preview} alt="" />
                                                <div className="file-info">
                                                    <p>{file.name}</p>
                                                    <small>{(file.size / 1024).toFixed(2)} KB</small>
                                                    <div className="progress-bar">
                                                    <div className={`progress ${
                                                        file.status === "done"
                                                            ? "done"
                                                            : file.status === "error"
                                                            ? "error"
                                                            : ""
                                                        }`}
                                                        style={{ width: file.progress + "%" }}
                                                    />
                                                    </div>
                                                </div>
                                                <button onClick={() => removeFile(index)}>✕</button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-12 col-12">
                                <div className="form-group">
                                    <label className="form-label">Upload Video </label>
                                    <div className="fileUploader">
                                        <div className="upload-box"
                                            onDragOver={(e) => e.preventDefault()}
                                            onDrop={(e) => handleDrop(e)}>
                                            <div className="upload-icon"><IconCloudUpload size={30} /></div>
                                            <p>Drag & drop your files here or <span>Browse</span></p>
                                            <input type="file" multiple accept="mp4/*" onChange={handleFileChange} />
                                            <small>Max 10MB</small>
                                        </div>
                                    </div>
                                    <div className="upload-list mt-3">
                                        {files.map((file, index) => (
                                            <div key={index} className="upload-item">
                                                <img src={file.preview} alt="" />
                                                <div className="file-info">
                                                    <p>{file.name}</p>
                                                    <small>{(file.size / 1024).toFixed(2)} KB</small>
                                                    <div className="progress-bar">
                                                    <div className={`progress ${
                                                        file.status === "done"
                                                            ? "done"
                                                            : file.status === "error"
                                                            ? "error"
                                                            : ""
                                                        }`}
                                                        style={{ width: file.progress + "%" }}
                                                    />
                                                    </div>
                                                </div>
                                                <button onClick={() => removeFile(index)}>✕</button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-12 col-md-12 col-12">
                                <button className="btn btn-md btn-primary float-end">Submit</button>
                            </div>
                        </div>
                    }
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}

export default AddPurchase;