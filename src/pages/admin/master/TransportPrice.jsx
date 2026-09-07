import { IconCirclePlusFilled } from '@tabler/icons-react'
import axios from 'axios';
import React, {useState, useEffect} from 'react'
import Select from 'react-select'

function TransportPrice() {

    const [transport, setTransport] = useState([]);
    const [selectTransport, setSelectTransport] = useState(null);
    const [auction, setAuction] = useState([]);
    const [selectAuction, setSelectAuction] = useState(null);
    const [yards, setYards] = useState([]);
    const [selectYard, setSelectYard] = useState(null);
    const [transportPriceList, setTransportPriceList] = useState([]);

    // fetch transport data
    const fetchTransportData = async () => {
        try{
            const res = await axios.get('https://localhost:7244/api/financial/GetMasterForTransportPrice');
            const data = (res.data.data.lstTransport || []).map(item => ({
                value: item.id,
                label: item.name
            }));

            setTransport(data);

        } catch (err) {
            console.error(err);
        }
    };

    // fetch auction data
    const fetchAuctionData = async () => {
        try{
            const res = await axios.get('https://localhost:7244/api/financial/GetMasterForTransportPrice');

            const data = (res.data.data.lstAuction || []).map(item => ({
                value: item.id,
                label: item.name
            }));

            setAuction(data);

        } catch(err){
            console.log(err);
        }
    };

    // yard dropdown data
    const fetchYardData = async (auctionId) => {
        console.log("Auction ID Sent:", auctionId);

        try {
            const res = await axios.get(
                "https://localhost:7244/api/Port/GetddlAuctionYardAID",
                {
                    params: {
                        Id: auctionId
                    }
                }
            );


            const data = (res.data.data || []).map(item => ({
                value: item.id,
                label: item.name
            }));

            setYards(data);

        } catch (err) {
            console.error(err.response?.data);
        }
    };

    // fetch table data
    const fetchTransportPrice = async (
        transportId = 1,
        auctionId = 0,
        yardId = 0
    ) => {
        try {
            const res = await axios.get(
                "https://localhost:7244/api/financial/GetTransportPrice",
                {
                    params: {
                        TId: transportId,
                        AucId: auctionId,
                        YId: yardId
                    }
                }
            );

            console.log("Response:", res.data);

            if (res.data.success) {
                setTransportPriceList(res.data.data || []);
            } else {
                setTransportPriceList([]);
                console.log(res.data.message);
            }

        } catch (error) {
            console.error(error.response?.data || error);
            setTransportPriceList([]);
        }
    };

    const handleFilter = () => {
        fetchTransportPrice(
            selectTransport?.value || 0,
            selectAuction?.value || 0,
            selectYard?.value || 0
        );
    };

    useEffect(() => {
        if (selectAuction?.value) {
            fetchYardData(selectAuction.value);
        }
    }, [selectAuction]);

    useEffect(() => {
        fetchTransportData();
        fetchAuctionData();
        fetchTransportPrice(1, 0, 0);
    }, []);

  return (
    <div className="row">
        <div className="col-lg-12 col-12">
            <div className="card">
                <div className="card-header">
                    <h5 className="title">Transport Price</h5>
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-lg-3 col-md-6 col-12">
                            <div className="form-group">
                                <label className="form-label">Transport Name</label>
                                <Select 
                                    options={transport}
                                    value={selectTransport}
                                    onChange={setSelectTransport}
                                    placeholder="Select Transport Name"
                                />
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-12">
                            <div className="form-group">
                                <label className="form-label">Auction Name</label>
                                <Select
                                    options={auction}
                                    value={selectAuction}
                                    onChange={(selected) => {
                                        console.log("Selected Auction:", selected);
                                        setSelectAuction(selected);
                                    }}
                                    placeholder="Select Auction Name"
                                />
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-12">
                            <div className="form-group">
                                <label className="form-label">Yard Name</label>
                                <Select
                                    options={yards}
                                    value={selectYard}
                                    onChange={setSelectYard}
                                    placeholder="Select Yard Name"
                                    isDisabled={!selectAuction}
                                />
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-12">
                            <div className="form-group">
                                <button className="btn btn-md btn-primary mt-25" onClick={handleFilter}>Filter</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="col-lg-12 col-12">
            <div className="card table-card overflow-hidden">
                <div className="card-header justify-content-end">
                    <button className="btn btn-sm btn-primary"><IconCirclePlusFilled /> Add Transport Price</button>
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
                                    <th>Price</th>
                                    <th>Tax</th>
                                </tr>
                            </thead>
                            <tbody>
                                {transportPriceList.length > 0 ? (
                                    transportPriceList.map((item) => (
                                        <tr key={item.id}>
                                            <td>
                                                <input type="checkbox"className="form-check-input" />
                                            </td>
                                            <td>{item.portName}</td>
                                            <td>{item.price}</td>
                                            <td>{item.ttax}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4" className="text-center">
                                            No data found
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

export default TransportPrice
