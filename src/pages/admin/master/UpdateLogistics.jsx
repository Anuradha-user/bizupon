import axios from "axios";
import React, {useState, useEffect} from "react";
import Select from "react-select";

function UpdateLogistics() {

    const[country, setCountry] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [clients, setClients] = useState([]);
    const [selectedClient, setSelectedClient] = useState(null);
    const [shippingCompanies, setShippingCompanies] = useState([]);
    const [selectedShipping, setSelectedShipping] = useState(null);
    const [ships, setShips] = useState([]);
    const [selectedShip, setSelectedShip] = useState(null);
    const [transports, setTransports] = useState([]);
    const [selectedTransport, setSelectedTransport] = useState(null);
    const [auction, setAuction] = useState([]);
    const [selectAuction, setSelectAuction] = useState(null);

    // fetch country name
    const fetchCountries = async () => {
        try {
            const res = await fetch('https://jaishriganesha.com/bizupon-master/api/master/view-Countries');
            const result = await res.json();

            const formatted = (result.data || [])
                .map(item => ({
                    value: item.cid,
                    label: item.name
                }))
                .reverse();

            setCountry(formatted);
        } catch (error) {
            console.error(error);
        }
    };

    const handleCountrychangae = (selected) => {
        setSelectedCountry(selected);
    };

    useEffect(() => {
        fetchCountries();
        fetchClients();
        fetchShippingCompanies();
        fetchShips(0); 
        fetchTransports();
        fetchAuctionData();
    }, []);

    // fetch client name
    const fetchClients = async () => {
        try {
            const res = await fetch("https://jaishriganesha.com/bizupon-master/api/master/GetClient");
            const result = await res.json();

            console.log("Client API:", result);

            const formatted = (result.data || []).map(item => ({
                value: item.id,
                label: item.name 
            }));

            setClients(formatted);
        } catch (error) {
            console.error("Error fetching clients:", error);
        }
    };

    // shipping company data
    const fetchShippingCompanies = async () => {
        try {
            const res = await fetch("https://jaishriganesha.com/bizupon-master/api/Port/GetddlShipping");
            const result = await res.json();

            console.log("Shipping API:", result);

            const formatted = (result.data || []).map(item => ({
                value: item.id,
                label: item.name
            }));

            setShippingCompanies(formatted);
        } catch (error) {
            console.error("Error fetching shipping companies:", error);
        }
    };

    // ship name data
    const fetchShips = async (sid = 0) => {
        try {
            let url = `https://jaishriganesha.com/bizupon-master/api/Port/view-Ship?SID=${sid}`;

            const res = await fetch(url);
            const result = await res.json();

            console.log("Ship API:", result);

            const formatted = (result.data || []).map(item => ({
                value: item.id,
                label: item.shipname
            }));

            setShips(formatted);
        } catch (error) {
            console.error("Error fetching ships:", error);
        }
    };

    // transport data
    const fetchTransports = async () => {
        try {
            const res = await fetch("https://jaishriganesha.com/bizupon-master/api/Port/GetddlTransport");
            const result = await res.json();

            console.log("Transport API:", result);

            const formatted = (result.data || []).map(item => ({
                value: item.id,
                label: item.name
            }));

            setTransports(formatted);

        } catch (error) {
            console.error("Error fetching transports:", error);
        }
    };

    // fetch auction name data
    const fetchAuctionData = async() => {
        try{
            const res = await axios.get('https://jaishriganesha.com/bizupon-master/api/Port/view-auction?CID=0&AcutionName=0')
            const data = (res.data.data || []).map(item => ({
                value:item.id,
                label: item.name
            }));

        setAuction(data)

        } catch (error){
            console.error("error fetching data", error);
        }
    };


  return (
    <div className="row">
        <div className="col-lg-12 col-12">
            <div className="card">
                <div className="card-header">
                    <h5 className="title">Update Logistics</h5>
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-lg-3 col-md-6 col-12">
                            <div className="form-group">
                                <label className="form-label">Country Name</label>
                                <Select 
                                    options={country}
                                    value={selectedCountry}
                                    onChange={handleCountrychangae}
                                    placeholder="Select Country Name"
                                    isSearchable
                                >
                                </Select>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-12">
                            <div className="form-group">
                                <label className="form-label">Client Name</label>
                                <Select options={clients}
                                    value={selectedClient}
                                    onChange={setSelectedClient}
                                    placeholder="Select Client Name"
                                    isSearchable
                                >
                                </Select>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-12">
                            <div className="form-group">
                                <label className="form-label">Auction House</label>
                                <Select 
                                    options={auction}
                                    value={selectAuction}
                                    onChange={setSelectAuction}
                                    placeholder="Select Auction Name"
                                />
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-12">
                            <div className="form-group">
                                <label className="form-label">Shipping Company</label>
                                <Select options={shippingCompanies}
                                    value={selectedShipping}
                                    onChange={setSelectedShipping}
                                    placeholder="Select Shipping Company"
                                    isSearchable
                                />
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-12">
                            <div className="form-group">
                                <label className="form-label">Ship Name</label>
                                 <Select 
                                    options={ships}
                                    value={selectedShip}
                                    onChange={setSelectedShip}
                                    placeholder="Select Ship Name"
                                    isSearchable
                                />
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-12">
                            <div className="form-group">
                                <label className="form-label">Port From</label>
                                <select className="form-control"></select>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-12">
                            <div className="form-group">
                                <label className="form-label">Transport</label>
                                <Select options={transports}
                                    value={selectedTransport}
                                    onChange={setSelectedTransport}
                                    placeholder="Select Transport"
                                    isSearchable
                                />
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-12">
                            <div className="form-group">
                                <label className="form-label">Broker</label>
                                <select className="form-control"></select>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-12">
                            <div className="form-group">
                                <label className="form-label">Urgent</label>
                                <select className="form-control" id="urgent">
                                    <option value="yes">Yes</option>
                                    <option value="no">No</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-12">
                            <div className="form-group">
                                <label className="form-label">No Plate</label>
                                <select className="form-control" id="noplate">
                                    <option value="yes">Yes</option>
                                    <option value="no">No</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-12">
                            <div className="form-group">
                                <label className="form-label">Surrender</label>
                                <select className="form-control" id="surrender">
                                    <option value="yes">Yes</option>
                                    <option value="no">No</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-12">
                            <div className="form-group">
                                <label className="form-label">Car Status</label>
                                <select className="form-control"></select>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-12 col-12">
                            <div className="form-group">
                                <label className="form-label">All Chassis Number</label>
                                <textarea className="form-control" rows="9"></textarea>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-12 col-12">
                            <div className="row">
                                <div className="col-lg-6 col-md-6 col-12">
                                    <div className="form-group">
                                        <label className="form-label">Date From</label>
                                        <input type="date" className="form-control"></input>
                                    </div>
                                </div>
                                <div className="col-lg-6 col-md-6 col-12">
                                    <div className="form-group">
                                        <label className="form-label">Date To</label>
                                        <input type="date" className="form-control"></input>
                                    </div>
                                </div>
                                <div className="col-lg-6 col-md-6 col-12">
                                    <div className="form-group">
                                        <label className="form-label">Rikuji Date</label>
                                        <input type="date" className="form-control"></input>
                                    </div>
                                </div>
                                <div className="col-lg-6 col-md-6 col-12">
                                    <div className="form-group">
                                        <label className="form-label">Product In</label>
                                        <select className="form-control"></select>
                                    </div>
                                </div>
                                <div className="col-lg-6 col-md-6 col-12">
                                    <div className="form-group">
                                        <label className="form-label">Chassis Number</label>
                                        <input type="text" className="form-control"></input>
                                    </div>
                                </div>
                                <div className="col-lg-6 col-md-6 col-12">
                                    <div className="form-group">
                                        <label className="form-label">Loading</label>
                                        <select className="form-control" id="loading">
                                            <option value="yes">Yes</option>
                                            <option value="no">No</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-12 col-md-12 col-12">
                            <button className="btn btn-md btn-primary mt-3 float-end">Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default UpdateLogistics
