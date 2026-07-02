import { IconCirclePlusFilled } from '@tabler/icons-react'
import React, {useState, useEffect} from 'react'
import Select from 'react-select'
import axios from 'axios'

function BulkFobPrice() {

    const [country, setCountry] = useState([]);
    const [selectCountry, setSelectCountry] = useState(null);
    const [city, setCity] = useState([]);
    const [selectCity, setSelectCity] = useState(null);


    useEffect(() => {
        fetchCountryData();
        fetchCityData();
    }, []);

    // fetch country data
    const fetchCountryData = async () => {
        try{
            const res = await axios.get('https://jaishriganesha.com/bizupon-master/api/master/view-Countries');
            const data = (res.data.data || []).map(item => ({
                value: item.id,
                label: item.name
            }))
            .reverse();
            setCountry(data);

        } catch(err){
            console.log(err);
        }
    };

    // fetch city data
    const fetchCityData = async () => {
        try{
            const res = await axios.get('https://jaishriganesha.com/bizupon-master/api/master/view-regions?CID=1');
            const data = (res.data.data || []).map(item => ({
                value: item.sid,
                label: item.stateName
            }))

            setCity(data);

        } catch(err){
            console.log(err);
        }
    };

  return (
    <div className="row">
        <div className="col-lg-12 col-12">
            <div className="card">
                <div className="card-header">
                    <h5 className="title">Bulk FOB Price</h5>
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-lg-3 col-md-6 col-12">
                            <div className="form-group">
                                <label className="form-label">Country Name</label>
                                <Select
                                    options={country}
                                    value={selectCountry}
                                    onChange={setSelectCountry}
                                    placeholder="Select Country Name"
                                />
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-12">
                            <div className="form-group">
                                <label className="form-label">City Name</label>
                                <Select
                                    options={city}
                                    value={selectCity}
                                    onChange={setSelectCity}
                                    placeholder="Select City Name"
                                />
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-12">
                            <div className="form-group">
                                <label className="form-label">FOB Type</label>
                                <select className="form-control"></select>
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
                    <button className="btn btn-sm btn-primary"><IconCirclePlusFilled /> Add FOB</button>
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
  )
}

export default BulkFobPrice
