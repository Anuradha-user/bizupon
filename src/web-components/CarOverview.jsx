function CarOverview({ car }) {
  const overviewData = [
    { label: "Vehicle body number", value: car.chassisNo },
    { label: "Car Brand", value: car.makers },
    { label: "Body type", value: car.bodyType },
    { label: "Year", value: car.registrationDate },
    { label: "Mileage", value: car.mileage },
    { label: "Engine displacement", value: car.cc },
    { label: "Transmission", value: car.transmission },
    { label: "Steering wheel", value: car.handle },
    { label: "Fuel type", value: car.fuel },
    { label: "Rating", value: "" },
    { label: "Drive", value: car.drive },
    { label: "Color", value: car.carcolor },
  ];
  return (
    <div className="carOverviewBlock">
        <div className="carOverview">
            <h4 className="fw-medium">Car Overview</h4>
            <div className="carOverview-content">
               {overviewData.map((item, index) => (
                    <div className="overview-item" key={index}>
                        <p>{item.label}</p>
                        <h6>{item.value}</h6>
                    </div>
                ))}
            </div>
        </div>
    </div>
  );
}

export default CarOverview;
