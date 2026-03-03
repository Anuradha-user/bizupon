import { useEffect, useState } from "react";
import SidebarMenu from '../../admin-components/SidebarMenu';
import HeaderNavbar from '../../admin-components/HeaderNavbar';
import Preloader from "../../admin-components/Preloader";
import AdminBanner from "../../admin-components/AdminBanner";
import DashboardCard from "../../admin-components/DashboardCard";

import portImg from '../../admin-images/port-images.png';
import yardImg from '../../admin-images/yard-out.png';
import confirmImg from '../../admin-images/yard-confirmation.png';
import cancelImg from '../../admin-images/yard-cancel.png';
import documentImg from '../../admin-images/doc-confirm.png';
import confirmReportImg from '../../admin-images/document-report.png';
import reportImg from '../../admin-images/yard-out-report.png';

function Dashboard() {

    const cards = [
        { title: "Add Port Images", icon: portImg },
        { title: "Add Yard Out", icon: yardImg },
        { title: "Yard Lookup Confirmation", icon: confirmImg },
        { title: "Yard Lookup Cancel", icon: cancelImg },
        { title: "Document Confirmation", icon: documentImg },
        { title: "Document Confirm Report", icon: confirmReportImg },
        { title: "Yard Out Report", icon: reportImg },
    ];

    const [loading, setLoading] = useState(true);
    const [sidebarHidden, setSidebarHidden] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
        setLoading(false);
        }, 1500); // loader time (ms)

        return () => clearTimeout(timer);
    }, []);

    const toggleSidebar = () => {
        setSidebarHidden(prev => !prev);
    };

    if (loading) return <Preloader />;

        return (
            <>
                <SidebarMenu sidebarHidden={sidebarHidden} />
                <div className={`content-area ${sidebarHidden ? "content-area-full" : ""}`}>
                    <HeaderNavbar onToggleSidebar={toggleSidebar} />
                    <div className="content-block">
                        <div className="container-fluid">
                            <AdminBanner />
                            <div className="row">
                                {cards.map((card, index) => (
                                    <DashboardCard
                                    key={index}
                                    title={card.title}
                                    icon={card.icon}
                                    onClick={() => console.log(card.title)}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }

export default Dashboard;
