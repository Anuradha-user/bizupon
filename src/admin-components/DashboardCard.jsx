import React from 'react'

function DashboardCard({ title, icon, onClick }) {
  return (
    <div className="col-xl-3 col-lg-4 col-md-6 col-12">
        <div className="card dashboard-card" onClick={onClick}>
            <div className="card-content">
                <h6 className="mb-0">{title}</h6>
                <div className="landing-cardIcon">
                    <img src={icon} alt={title} />
                </div>
            </div>
        </div>
    </div>
  );
}

export default DashboardCard
