import { useEffect, useState } from "react";
import SidebarMenu from '../../admin-components/SidebarMenu';
import HeaderNavbar from '../../admin-components/HeaderNavbar';
import Preloader from "../../admin-components/Preloader";

function Dashboard() {

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
                </div>
            </>
        )
    }

export default Dashboard
