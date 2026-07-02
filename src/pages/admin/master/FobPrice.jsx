import { IconCirclePlusFilled } from '@tabler/icons-react'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Select from 'react-select';

function FobPrice() {

    const [showModal, setShowModal] = useState(false);
    const [country, setCountry] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [city, setCity] = useState([]);
    const [selectedCity, setSelectedCity] = useState(null);
    const [auction, setAuction] = useState([]);
    const [selectAuction, setSelectAuction] = useState(null);

    useEffect(() => {
        fetchCountryData();
        fetchCitkyData();
        fetchAuctionData();
    }, []);

    // fetch transport data
    const fetchCountryData = async () => {
        try{
            const res = await axios.get('https://jaishriganesha.com/bizupon-master/api/master/view-Countries');
            const data = (res.data.data || []).map(item => ({
                value: item.id,
                label: item.name
            }))
            .reverse();
            setCountry(data);

        } catch (err) {
            console.error(err);
        }
    };

    // fetch city data
    const fetchCitkyData = async () => {
        try{
            const res = await axios.get('https://jaishriganesha.com/bizupon-master/api/master/view-regions?CID=1');
            const data = (res.data.data || []).map(item => ({
                value: item.sid,
                label: item.stateName
            }))
            setCity(data);

        } catch (err) {
            console.error(err);
        }
    };

    // fetch auction data
    const fetchAuctionData = async () => {
        try{
            const res = await axios.get('https://localhost:7244/api/Port/GetddlAuction');

            const data = (res.data.data || []).map(item => ({
                value: item.cid,
                label: item.name
            }));

            setAuction(data);

        } catch(err){
            console.log(err);
        }
    };

  return (
    <>
        <div className="row">
            <div className="col-lg-12 col-12">
                <div className="card">
                    <div className="card-header">
                        <h5 className="title">FOB Price</h5>
                    </div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-lg-3 col-md-6 col-12">
                                <div className="form-group">
                                    <label className="form-label">FOB For</label>
                                    <Select />
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6 col-12">
                                <div className="form-group">
                                    <label className="form-label">City Name</label>
                                    <Select />
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6 col-12">
                                <div className="form-group">
                                    <label className="form-label">Auction Name</label>
                                    <Select />
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6 col-12">
                                <div className="form-group">
                                    <label className="form-label">Port Name</label>
                                    <Select />
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6 col-12">
                                <div className="form-group">
                                    <label className="form-label">FOB Type</label>
                                    <Select />
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
                        <button className="btn btn-sm btn-primary" onClick={() => setShowModal(true)}><IconCirclePlusFilled /> Add FOB Price</button>
                    </div>
                    <div className="card-body">
                        <div className="table-responsive">
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th>
                                            <input type="checkbox" className="form-check-input"/>
                                        </th>
                                        <th>Port Name</th>
                                        <th>FOB Price</th>
                                    </tr>
                                </thead>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {/* Right Slide Drawer */}
        <div className={`custom-drawer ${showModal ? "open" : ""}`}>
            <div className="drawer-header">
                <h5>Add FOB Price</h5>
                <button className="btn-close" onClick={() => setShowModal(false)}></button>
            </div>

            <div className="drawer-body">
                <form>
                    <div className="form-group">
                        <label className="form-label">Select Country Name</label>
                        <Select 
                            options={country}
                            value={selectedCountry}
                            onChange={setSelectedCountry}
                            placeholder="Select Country Name"
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Select City Name</label>
                        <Select 
                            options={city}
                            value={selectedCity}
                            onChange={setSelectedCity}
                            placeholder="Select City Name"
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Select Auction Name</label>
                        <Select 
                            options={auction}
                            value={selectAuction}
                            onChange={setSelectAuction}
                            placeholder="Select Auction Name"
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Select Port Name</label>
                        <Select />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Select FOB Type</label>
                        <Select />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Price</label>
                        <input type="text" className="form-control" />
                    </div>
                    <button type="submit" className="btn btn-primary w-100 mt-5">
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

export default FobPrice
