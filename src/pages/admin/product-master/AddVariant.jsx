import { IconEye, IconEyeFilled } from '@tabler/icons-react';
import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AddVariant() {

    const [bodyType, setBodyType] = useState([])
    const [productList, setProductList] = useState([]);

    // fetch data in bodytype select dropdown
    const fetchBodyTypeData = async () => {
        try{
            const res = await axios.get('https://localhost:7069/api/Product/GetBodyType')
            const data = (res.data.data || [res.data]).map(item => ({
                value: item.ID,
                label: item.Name
            }))
            setBodyType(data);
        } catch (error) {
            console.error("Error fetching data", error);
        }
    };

    // fetch product dropdown data
    const fetchProductData = async () => {
        try {

            const res = await axios.get('https://localhost:7069/api/Product/GetMaster');

            const products = (res.data.data.lstProductMaster || []).map(item => ({
                value: item.id,
                label: item.name
            }));

            setProductList(products);

        } catch (error) {
            console.error("Error fetching product:", error);
        }
    };

    useEffect(() => {
        fetchBodyTypeData();
        fetchProductData();
    }, []);


    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        product: null,
        bodyType: null,
        variantName: '',
        modelCode: '',
        drive: '',
        transmission: '',
        fuel: '',
        cc: '',
        weight: '',
        length: '',
        width: '',
        height: '',
        productType: '',
        mildHybrid: ''
    })

    const [errors, setErrors] = useState({})

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({ ...formData, [name]: value });

        // ✅ error remove if field becomes valid
        setErrors((prev) => {
            const newErrors = { ...prev };

            if (value && value.toString().trim() !== "") {
            delete newErrors[name];
            }

            return newErrors;
        });
    };

    const handleSelectChange = (name, selectedOption) => {
        setFormData({ ...formData, [name]: selectedOption });

        setErrors((prev) => {
            const newErrors = { ...prev };

            if (selectedOption) {
            delete newErrors[name];
            }

            return newErrors;
        });
    };

    const validate = () => {
        let newErrors = {}

        if (!formData.product) newErrors.product = "product is required"
        if (!formData.bodyType) newErrors.bodyType = "body type is required"
        if (!formData.variantName.trim()) newErrors.variantName = "variant name is required"
        if (!formData.modelCode.trim()) newErrors.modelCode = "model code is required"
        if (!formData.transmission) newErrors.transmission = "transmission is required"
        if (!formData.fuel) newErrors.fuel = "fuel is required"
        if (!formData.cc || isNaN(formData.cc)) newErrors.cc = "valid CC required"
        if (!formData.weight || isNaN(formData.weight)) newErrors.weight = "valid weight required"

        return newErrors
    }


    const RequiredLabel = ({ text, value }) => {
        let isFilled = false;

        if (value) {
            if (typeof value === "object") {
            isFilled = !!value?.value;
            } else {
            isFilled = value.toString().trim() !== "";
            }
        }

        return (
            <label className="form-label">
            {text}{" "}
            <span className={isFilled ? "text-success" : "text-danger"}>
                *
            </span>
            </label>
        );
    };

    const handleSubmit = async () => {

        const validationErrors = validate();

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {

            const payload = {
                productId: formData.product?.value || 0,
                bodyTypeId: formData.bodyType?.value || 0,
                variantName: formData.variantName,
                modelCode: formData.modelCode,
                drive: formData.drive,
                transmission: formData.transmission,
                fuel: formData.fuel,
                cc: formData.cc,
                weight: formData.weight,
                length: formData.length,
                width: formData.width,
                height: formData.height,
                productType: formData.productType,
                mildHybrid: formData.mildHybrid
            };

            console.log(payload);

            const res = await axios.post('https://localhost:7069/api/Product/AddVariant', payload);

            console.log(res.data);

            if (res.data.success) {

                alert("Variant added successfully");

                setFormData({
                    product: null,
                    bodyType: null,
                    variantName: '',
                    modelCode: '',
                    drive: '',
                    transmission: '',
                    fuel: '',
                    cc: '',
                    weight: '',
                    length: '',
                    width: '',
                    height: '',
                    productType: '',
                    mildHybrid: ''
                });

                setErrors({});

            } else {

                alert(res.data.message || "Failed to add variant");

            }

        } catch (error) {

            console.error("Error adding variant:", error);

            alert("Something went wrong");

        }
    };

    const getSelectStyles = (field) => ({
        control: (base) => ({
            ...base,
            borderColor: errors[field] ? "red" : base.borderColor,
            boxShadow: errors[field] ? "0 0 0 1px red" : base.boxShadow,
            '&:hover': {
            borderColor: errors[field] ? "red" : base.borderColor,
            },
        }),
    })



  return (
    <div className="row">
        <div className="col-lg-12 col-12">
            <div className="card">
                <div className="card-header">
                    <h5 className="title">Add Variant</h5>
                    <button className="btn btn-sm btn-primary" onClick={() => navigate('/admin/product-master/view-variant')}><IconEyeFilled /> View Variant</button>
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-lg-3 col-md-12 col-12">
                            <div className="form-group">
                                <RequiredLabel text="Select Product" value={formData.product} />
                                <Select
                                    options={productList}
                                    value={formData.product}
                                    onChange={(val) => handleSelectChange("product", val)}
                                    className={errors.product ? "react-select error" : "react-select"}
                                    classNamePrefix="react-select"
                                />
                                {errors.product && <small className="text-danger">{errors.product}</small>}
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-12 col-12">
                            <div className="form-group">
                                <RequiredLabel text="Select Body Type" value={formData.bodyType} />
                                <Select
                                    options={bodyType}
                                    value={formData.bodyType}
                                    onChange={(val) => handleSelectChange("bodyType", val)}
                                    className={errors.bodyType ? "react-select error" : "react-select"}
                                    classNamePrefix="react-select"
                                />
                                {errors.bodyType && <small className="text-danger">{errors.bodyType}</small>}
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-12 col-12">
                            <div className="form-group">
                                <RequiredLabel text="Enter Variant Name" value={formData.variantName} />
                                <input type="text" name="variantName" className={`form-control ${errors.variantName ? "is-invalid" : ""}`} 
                                    value={formData.variantName}
                                    onChange={handleChange}
                                />
                                {errors.variantName && <small className="text-danger">{errors.variantName}</small>}
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-12 col-12">
                            <div className="form-group">
                                <RequiredLabel text="Enter Model Code" value={formData.modelCode} />
                                <input type="text" name="modelCode"
                                    className={`form-control ${errors.modelCode ? "is-invalid" : ""}`}
                                    value={formData.modelCode}
                                    onChange={handleChange}
                                />
                                {errors.modelCode && <small className="text-danger">{errors.modelCode}</small>}
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-12 col-12">
                            <div className="form-group">
                                <label className="form-label">Enter Drive</label>
                                <input type="text" name="drive" className="form-control"
                                    value={formData.drive}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-12 col-12">
                            <div className="form-group">
                                <RequiredLabel text="Enter Transmission" value={formData.transmission} />
                                <input type="text" name="transmission"
                                    className={`form-control ${errors.transmission ? "is-invalid" : ""}`}
                                    value={formData.transmission}
                                    onChange={handleChange}
                                />
                                {errors.transmission && <small className="text-danger">{errors.transmission}</small>}
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-12 col-12">
                            <div className="form-group">
                                <RequiredLabel text="Enter Fuel" value={formData.fuel} />
                                <input type="text" name="fuel"
                                    className={`form-control ${errors.fuel ? "is-invalid" : ""}`}
                                    value={formData.fuel}
                                    onChange={handleChange}
                                />
                                {errors.fuel && <small className="text-danger">{errors.fuel}</small>}
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-12 col-12">
                            <div className="form-group">
                                <RequiredLabel text="Enter CC" value={formData.cc} />
                                <input type="text" name="cc"
                                    className={`form-control ${errors.cc ? "is-invalid" : ""}`}
                                    value={formData.cc}
                                    onChange={handleChange}
                                />
                                {errors.cc && <small className="text-danger">{errors.cc}</small>}
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-12 col-12">
                            <div className="form-group">
                                <label className="form-label">Enter Weight </label>
                                <input type="text" name="weight" className="form-control"
                                    value={formData.weight}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-12 col-12">
                            <div className="form-group">
                                <label className="form-label">Enter Length </label>
                                <input type="text" name="length" className="form-control"
                                    value={formData.length}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-12 col-12">
                            <div className="form-group">
                                <label className="form-label">Enter Width </label>
                                <input type="text" name="width" className="form-control"
                                    value={formData.width}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-12 col-12">
                            <div className="form-group">
                                <label className="form-label">Enter Height </label>
                                <input type="text" name="height" className="form-control"
                                    value={formData.height}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-12 col-12">
                            <div className="form-group">
                                <RequiredLabel text="Product Type" value={formData.productType} />
                                <select name="productType"
                                    className={`form-control ${errors.productType ? "error" : ""}`}
                                    value={formData.productType}
                                    onChange={handleChange} >
                                    <option value="">Select Product Type</option>
                                    <option value="1">Normal</option>
                                    <option value="2">Hybrid</option>
                                    <option value="3">Electric</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-12 col-12">
                            <div className="form-group">
                                <RequiredLabel text="Mild Hybrid" value={formData.mildHybrid} />
                                <select name="mildHybrid"
                                    className={`form-control ${errors.mildHybrid ? "error" : ""}`}
                                    value={formData.mildHybrid}
                                    onChange={handleChange} >
                                    <option value="0">Select Mild Hybrid</option>
                                    <option value="1">Yes</option>
                                    <option value="2">No</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-lg-12 col-md-12 col-12">
                            <button className="btn btn-md btn-primary mt-2 float-end" onClick={handleSubmit}>Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default AddVariant
