import { IconCircleCheckFilled } from '@tabler/icons-react'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function UpdateCurrencyRate() {

    const [currencylist, setCurrencyList] = useState([]);
    const [selectedIds, setSelectedIds] = useState([]);

    useEffect(()=>{
        fetchCurrencyListData();
    }, []);

    const fetchCurrencyListData = async() => {
        try{
            const res = await axios.get('https://localhost:7244/api/financial/GetCurrency')
            setCurrencyList(res.data.data || res.data)
        }
        catch(error){
            console.error("error fetching data", error);
        }
    };

    // update
    const handleUpdate = async () => {

        // Add here
        if (selectedIds.length === 0) {
            toast.warning("Please select at least one currency");
            return;
        }

        try {
            const payload = currencylist
                .filter(item => selectedIds.includes(item.id))
                .map(item => ({
                    currency: item.currency,
                    rate_B: Number(item.rate_B),
                    rate_L: Number(item.rate_L),
                    id: item.id,
                    uid: item.uid
                }));

            const res = await axios.post(
                "https://localhost:7244/api/financial/UpdateCurrency",
                payload
            );

            toast.success("Currency rates updated successfully");

            fetchCurrencyListData();
            setSelectedIds([]);

        } catch (error) {
            console.error(error);
            toast.error("Update failed");
        }
    };

    // select single checkbox
    const handleCheckboxChange = (id) => {
        setSelectedIds(prev =>
            prev.includes(id)
                ? prev.filter(item => item !== id)
                : [...prev, id]
        );
    };
    // select all checkboxes
    const handleSelectAll = (e) => {
        if (e.target.checked) {
            const allIds = currencylist.map(item => item.id);
            setSelectedIds(allIds);
        } else {
            setSelectedIds([]);
        }
    };

  return (
    <>
        <div className="row">
            <div className="col-lg-12 col-12">
                <div className="card table-card overflow-hidden">
                    <div className="card-header">
                        <h5 className="title">Update Currency Rate</h5>
                        <button className="btn btn-sm btn-primary"
                            onClick={handleUpdate}
                            disabled={selectedIds.length === 0}>
                            <IconCircleCheckFilled /> Update
                        </button>
                    </div>
                    <div className="card-body">
                        <div className="table-responsive">
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th>
                                            <input type="checkbox" className="form-check-input"
                                                onChange={handleSelectAll}
                                                checked={
                                                    selectedIds.length === currencylist.length &&
                                                    currencylist.length > 0
                                                }
                                            />
                                        </th>
                                        <th>Currency</th>
                                        <th>Rate Bizupon</th>
                                        <th>Rate Leading Logistics</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currencylist.map(item => (
                                        <tr key={item}>
                                            <td>
                                                <input type="checkbox" className="form-check-input"
                                                    checked={selectedIds.includes(item.id)}
                                                    onChange={() => handleCheckboxChange(item.id)}
                                                />
                                            </td>
                                            <td>{item.currency}</td>
                                            <td>
                                                <input type="text" name="rate_B"
                                                    value={item.rate_B || ""}
                                                    onChange={(e) => {
                                                        const updated = currencylist.map(cat =>
                                                            cat.id === item.id
                                                                ? { ...cat, rate_B: e.target.value }
                                                                : cat
                                                        );

                                                        setCurrencyList(updated);
                                                    }}
                                                    className="editable-control w-100"
                                                />
                                            </td>
                                            <td>
                                                <input type="text" name="rate_L"
                                                    value={item.rate_L || ""}
                                                    onChange={(e) => {
                                                        const updated = currencylist.map(cat =>
                                                            cat.id === item.id
                                                                ? { ...cat, rate_L: e.target.value }
                                                                : cat
                                                        );

                                                        setCurrencyList(updated);
                                                    }}
                                                    className="editable-control w-100"
                                                />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            closeOnClick
            pauseOnHover
            theme="light"
        />
    </>
  )
}

export default UpdateCurrencyRate
