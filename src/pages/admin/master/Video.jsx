import { IconCirclePlusFilled } from '@tabler/icons-react'
import axios from 'axios';
import React, {useState, useEffect} from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Video() {

    const [video, setVideo] = useState ([]);
    const [selectedIds, setSelectedIds] = useState([]);
    const [showModal, setShowModal] = useState(false);

    useEffect(()=>{
        fetchVideoData();
    }, []);

    const fetchVideoData = async() => {
        try{
            const res = await axios.get('https://localhost:7244/api/master/view-video?LangId=1')
            setVideo(res.data.data || res.data)
        }
        catch(error){
            console.error("error fetching data", error);
        }
    };

    // add video
    const [formData, setFormData] = useState({
        langId: 1,
        vdotext: "",
        vdohtml: "",
        uid: 1
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const payload = {
                langId: Number(formData.langId),
                vdotext: formData.vdotext,
                vdohtml: formData.vdohtml,
                uid: Number(formData.uid)
            };

            console.log("Payload:", payload);

            const res = await axios.post("https://localhost:7244/api/master/Add-Video",
                payload
            );

            console.log(res.data);

            if (res.status === 200) {
                toast.success("Video Added Successfully");

                setFormData({
                    langId: 1,
                    vdotext: "",
                    vdohtml: "",
                    uid: 1
                });

                setShowModal(false);
                fetchVideoData();
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to Add Video");
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

    // select all checkbox
    const handleSelectAll = (e) => {
        if (e.target.checked) {
        const allIds = video.map(item => item.id);
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
                        <h5 className="title">Video</h5>
                        <button className="btn btn-sm btn-primary" onClick={() => setShowModal(true)}>
                            <IconCirclePlusFilled /> Add Video
                        </button>
                    </div>
                    <div className="card-body">
                        <div className="table-responsive">
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th>
                                            <input type="checkbox" 
                                                className="form-check-input"
                                                onChange={handleSelectAll}
                                                checked={video.length > 0 && selectedIds.length === video.length}
                                            />
                                        </th>
                                        <th>Serial Number</th>
                                        <th>Video Title</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {video.length > 0 ? (
                                        video.map((item, index) => (
                                            <tr key={item.id}>
                                                <td>
                                                    <input type="checkbox" 
                                                        className="form-check-input"
                                                        checked={selectedIds.includes(item.id)}
                                                        onChange={() => handleCheckboxChange(item.id)}
                                                    />
                                                </td>
                                                <td>{index + 1}</td>
                                                <td>{item.vdotext}</td>
                                            </tr>
                                        ))
                                        ) : (
                                        <tr>
                                            <td colSpan="4" className="text-center">
                                                No Data Found
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
        
        {/* Right Slide Drawer */}
        <div className={`custom-drawer ${showModal ? "open" : ""}`}>
            <div className="drawer-header">
                <h5>Add Video</h5>
                <button className="btn-close" onClick={() => setShowModal(false)}></button>
            </div>

            <div className="drawer-body">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label">Category Name</label>
                        <select className="form-control"
                            value={formData.langId}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    langId: e.target.value
                                })
                            }>
                            <option value="1">English</option>
                            <option value="2">Japanese</option>
                            <option value="3">Russian</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label className="form-label">Video Title</label>
                        <input type="text" className="form-control"
                            value={formData.vdotext}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    vdotext: e.target.value
                                })
                            }
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Video HTML</label>
                        <textarea className="form-control" rows="5"
                            value={formData.vdohtml}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    vdohtml: e.target.value
                                })
                            }
                            required
                        />
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

        <ToastContainer
            position="top-right"
            autoClose={3000}
        />

    </>
  )
}

export default Video
