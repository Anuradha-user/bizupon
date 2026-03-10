import React, { useState } from "react";

function TopCategory() {
    const [activeTab, setActiveTab] = useState("electric");

    const tabs = [
        { id: "electric", label: "Electric/Hybrid" },
        { id: "bestSeller", label: "Best Sellers" },
        { id: "affordable", label: "Affordable Cars" },
        { id: "mileage", label: "Low Mileage" },
        { id: "newArrival", label: "New Arrivals" },
    ];

  return (
    <section class="category">
        <div class="container">
            <div class="row">
                <div class="col-lg-12">
                    <div class="section-title text-center">
                        <h6>Top Category</h6>
                        <h1>Car's For Everyone</h1>
                    </div>
                </div>
                <div className="col-lg-12">
                    <div className="tab text-center">
                        <ul className="nav nav-pills mb-3 mt-5 justify-content-center">
                            {tabs.map((tab) => (
                                <li className="nav-item" key={tab.id}>
                                    <button className={`nav-link ${
                                        activeTab === tab.id ? "active" : ""
                                    }`}
                                    onClick={() => setActiveTab(tab.id)} >
                                    {tab.label}
                                    </button>
                                </li>
                            ))}
                        </ul>

                        {/* Tab Content */}
                        <div className="tab-content mt-4">
                            {activeTab === "electric" && <div>Electric Cars Data</div>}
                            {activeTab === "bestSeller" && <div>Best Seller Cars Data</div>}
                            {activeTab === "affordable" && <div>Affordable Cars Data</div>}
                            {activeTab === "mileage" && <div>Low Mileage Cars Data</div>}
                            {activeTab === "newArrival" && <div>New Arrival Cars Data</div>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default TopCategory;
