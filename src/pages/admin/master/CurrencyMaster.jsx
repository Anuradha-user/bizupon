import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import axios from 'axios'

function CurrencyMaster() {

    const [brokerList, setBrokerList] = useState([]);
    const [selectedBroker, setSelectedBroker] = useState(null);

    const [formData, setFormData] = useState({
        ruble: '',
        dollar: ''
    });

    useEffect(() => {
        fetchBrokerData();
    }, []);

    const fetchBrokerData = async () => {
        try {
            const res = await axios.get(
                'https://jaishriganesha.com/bizupon-master/api/financial/GetAssign-Bank-Broker-For-SBKTS',
                {
                    params: {
                        InvNo: 1,
                        SBKTSID: 2,
                        PageSize: 5,
                        PageIndex: 1
                    }
                }
            );

            const data = (res.data.data?.brokersForSBKTS || []).map(item => ({
                value: item.id,
                label: item.name
            }));

            setBrokerList(data);

        } catch (error) {
            console.error("Error fetching broker", error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });
    };

  return (
    <div className="row">
        <div className="col-lg-12 col-12">
            <div className="card">
                <div className="card-header">
                    <h5 className="title">Currency Master</h5>
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-lg-3 col-md-6 col-12">
                            <div className="form-group">
                                <label className="form-label">Bank Broker</label>
                                <Select
                                    options={brokerList}
                                    value={selectedBroker}
                                    onChange={setSelectedBroker}
                                    placeholder="Select Broker"
                                    isClearable
                                />
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-12">
                            <div className="form-group">
                                <label className="form-label">Ruble Price</label>
                                <input type="number" name="ruble"
                                    value={formData.ruble}
                                    onChange={handleChange}
                                    className="form-control"
                                />
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-12">
                            <div className="form-group">
                                <label className="form-label">Doller Price</label>
                                <input type="number" name="dollar"
                                    value={formData.dollar}
                                    onChange={handleChange}
                                    className="form-control"
                                />
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

export default CurrencyMaster
