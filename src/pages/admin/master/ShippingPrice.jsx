import axios from 'axios';
import React, {useState, useEffect} from 'react'
import Select from 'react-select';

function ShippingPrice() {

    const [shippingCompany, setShippngComapny] = useState([]);
    const [selectShippngCompany, setSelectShippingComapny] = useState(null);
    const [countries, setCountries] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [port, setPort] = useState([]);
    const [selectPort, setSelectPort] = useState(null);
    const [selectedProductType, setSelectedProductType] = useState(null);

    const fetchShippingCompanyData = async() => {
        try{
            const res = await axios.get('https://localhost:7244/api/Port/GetddlShipping')
            const data = (res.data.data || []).map(item => ({
                value: item.id,
                label: item.name
            }));

            setShippngComapny(data);

        }catch(err){
            console.error(err);
        }
    };

    const fetchCountriesData = async() => {
        try{
            const res = await axios.get('https://localhost:7244/api/master/view-Countries')
            const data = (res.data.data || []).map(item => ({
                value: item.id,
                label: item.name
            }))
            .reverse();
            setCountries(data);

        }catch(err){
            console.error(err);
        }
    };

    const fetchPortData = async() => {
        try{
            const res = await axios.get('https://localhost:7244/api/Port/GetddlPort')
            const data = (res.data.data || []).map(item => ({
                value: item.id,
                label: item.name
            }));

            setPort(data);

        }catch(err){
            console.error(err);
        }
    };

    const productTypeOptions = [
        { value: "Normal", label: "Normal" },
        { value: "Constructor", label: "Constructor" },
        { value: "Container", label: "Container" },
        { value: "Cut", label: "Cut" }
    ];

    useEffect(() => {
        fetchShippingCompanyData();
        fetchCountriesData();
        fetchPortData();
    }, []);

  return (
    <div className="row">
        <div className="col-lg-12 col-12">
            <div className="card">
                <div className="card-header">
                    <h5 className="title">Shipping Price</h5>
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-lg-3 col-md-6 col-12">
                            <div className="form-group">
                                <label className="form-label">Shipping Company Name</label>
                                <Select 
                                    options={shippingCompany}
                                    value={selectShippngCompany}
                                    onChange={setSelectShippingComapny}
                                    placeholder="Select Shipping Company"
                                />
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-12">
                            <div className="form-group">
                                <label className="form-label">Product Type</label>
                                <Select 
                                    options={productTypeOptions}
                                    value={selectedProductType}
                                    onChange={setSelectedProductType}
                                    placeholder="Select Product Type"
                                    />
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-12">
                            <div className="form-group">
                                <label className="form-label">Country Name</label>
                                <Select 
                                    options={countries}
                                    value={selectedCountry}
                                    onChange={setSelectedCountry}
                                    placeholder="Select Country Name"
                                />
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-12">
                            <div className="form-group">
                                <label className="form-label">Port Name</label>
                                <Select 
                                    options={port}
                                    value={selectPort}
                                    onChange={setSelectPort}
                                    placeholder="Select Port Name"
                                />
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-12">
                            <div className="form-group">
                                <label className="form-label">Freight Price</label>
                                <input type="text" className="form-control" />
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-12">
                            <div className="form-group">
                                <button className="btn btn-md btn-primary mt-25">Submit</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ShippingPrice;
