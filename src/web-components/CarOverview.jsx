function CarOverview({ car }) {

  return (
    <div className="carOverviewBlock">
        <div className="carOverview">
            <h4 className="fw-medium">Car Overview</h4>
            <div className="carOverview-content">
                <div className="overview-item">
                    <p>Vehicle body number</p>
                    <h6>W1K1186842N190268</h6>
                </div>
                <div className="overview-item">
                    <p>Car Brand</p>
                    <h6>{car.makers}</h6>
                </div>
                <div className="overview-item">
                    <p>Body type</p>
                    <h6>Wagon</h6>
                </div>
                <div className="overview-item">
                    <p>Year</p>
                    <h6>{car.registrationdate}</h6>
                </div>
                <div className="overview-item">
                    <p>Mileage</p>
                    <h6>{car.mileage}</h6>
                </div>
                <div className="overview-item">
                    <p>Engine displacement</p>
                    <h6>{car.cc}</h6>
                </div>
                <div className="overview-item">
                    <p>Transmission</p>
                    <h6>{car.transmission}</h6>
                </div>
                <div className="overview-item">
                    <p>Steering wheel</p>
                    <h6>{car.handle}</h6>
                </div>
                <div className="overview-item">
                    <p>Fuel type</p>
                    <h6>{car.fuel}</h6>
                </div>
                <div className="overview-item">
                    <p>Rating</p>
                    <h6>4.5</h6>
                </div>
                <div className="overview-item">
                    <p>Drive</p>
                    <h6>FF</h6>
                </div>
                <div className="overview-item">
                    <p>Color</p>
                    <h6>White</h6>
                </div>
            </div>
        </div>
    </div>
  );
}

export default CarOverview;