import { IconCirclePlusFilled } from '@tabler/icons-react';
import React, { useState, useEffect } from 'react';
import Select from 'react-select';

function TransportAndShipping() {

    const [countries, setCountries] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState(null);

    const [regions, setRegions] = useState([]);
    const [selectedRegion, setSelectedRegion] = useState(null);

    // fetch countries data
    useEffect(() => {
        fetchCountries();
        fetchRegions(1);
    }, []);

    const fetchCountries = async () => {
        try {
            const res = await fetch("https://jaishriganesha.com/bizupon-master/api/master/view-Countries");
            const data = await res.json();

            const list = Array.isArray(data) ? data : data.data || data.result || [];

            const formatted = list.map(item => ({
                value: item.id || item.countryId || item.Id,
                label: item.name || item.countryName || item.CountryName
            })).reverse();

            setCountries(formatted);
        } catch (err) {
            console.error(err);
        }
    };

    // fetch region data
    const fetchRegions = async (countryId) => {
        try {
            const res = await fetch(`https://jaishriganesha.com/bizupon-master/api/master/view-regions?CID=${countryId}`);
            const data = await res.json();

            console.log("Region API:", data);

            const list = data.data || []; 

            const formatted = list.map(item => ({
                value: item.sid, 
                label: item.stateName 
            }));

            setRegions(formatted);
        } catch (err) {
            console.error(err);
            setRegions([]);
        }
    };
    

    return (
        <div className="row">
            <div className="col-lg-12 col-12">
                <div className="card">
                    <div className="card-header">
                        <h5 className="title">Transport and Shipping</h5>
                    </div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-lg-3 col-md-6 col-12">
                                <div className="form-group">
                                    <label className="form-label">Select Country Name</label>
                                    <Select options={countries}
                                        value={selectedCountry}
                                        onChange={(selected) => {
                                            setSelectedCountry(selected);
                                        }}
                                        placeholder="Search Country Name"
                                        isSearchable
                                    />
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6 col-12">
                                <div className="form-group">
                                    <label className="form-label">Select Region Name</label>
                                    <Select options={regions}
                                        value={selectedRegion}
                                        onChange={setSelectedRegion}
                                        placeholder="Search Region..."
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
                <div className="card table-card">
                    <div className="card-body">
                        <div className="table-responsive">
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th>
                                            <input type="checkbox" className="form-check-input" />
                                        </th>
                                        <th>Auction Name</th>
                                        <th>Trailer</th>
                                        <th>S Normal</th>
                                        <th>S Constructor</th>
                                        <th>S Cut</th>
                                        <th>S Container</th>
                                    </tr>
                                </thead>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TransportAndShipping;