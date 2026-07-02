import React, { useState } from 'react'
import ProductShare from "../web-components/ProductShare";
import { IconInfoCircleFilled } from '@tabler/icons-react';
import CommonModal from "../web-components/CommonModal";
import ContactModal from '../web-components/ContactModal';


function CarInfoSidebar({ car }) {

    const [showBookModal, setShowBookModal] = useState(false);
    const [showContactModal, setShowContactModal] = useState(false);

  return (
    <div>
        <ProductShare />
        <div className="car-listingDetials-block">
            <div className="carDetailsBlock">
                <h5 className="carTitle">{car.productName}</h5>
                <div className="CarInfo">
                    <p>{car.mileage} KM </p> 
                    <p>{car.fuel}</p>
                    <p>{car.transmission}</p>
                </div>
                <p>BIZ ID: {car.productId}</p>
            </div>
            <div className="carPriceBlock">
                <div className="price">
                    <h4>C&F Price (Yen) ¥ {car.price}</h4>
                    <div className="info-block">
                        <IconInfoCircleFilled />
                        <div className="pricetooltip">
                            <p>
                                Стоимость автомобиля C&F (ФОБ и фрахт) <br />
                                + ПРР и СБКТС (расчеты в йенах)<br />
                                1) C&F (ФОБ и фрахт)<br />
                                2) ПРР и СБКТС<br />
                                ＊Ориентировочная цена с доставкой, ПРР и СБКТС, без учета таможни и брокерских услуг
                            </p>
                        </div>
                    </div>
                </div>
                <div className="price rubles">
                    <h4>Turnkey price (Rubles) ₽ {car.price}</h4>
                    <div className="info-block">
                        <IconInfoCircleFilled />
                        <div className="pricetooltip">
                            <p>
                                Стоимость автомобиля C&F (ФОБ и фрахт) <br />
                                + ПРР и СБКТС (расчеты в йенах)<br />
                                1) C&F (ФОБ и фрахт)<br />
                                2) ПРР и СБКТС<br />
                                ＊Ориентировочная цена с доставкой, ПРР и СБКТС, без учета таможни и брокерских услуг
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="auctionSheetBlock">
                <h5>Translation of the auction sheet</h5>
                <div className="widget-block">
                    <h6>Pros</h6>
                    <p>Equipment: Shooting Brake CLA 180 Mileage: 18,997 km. Number of seats: 5. Fuel type: gasoline. Power steering. Power windows. Airbags. Combination leather seats. Navigation. Electric tailgate.</p>
                </div>
                <div className="widget-block">
                    <h6>Cons</h6>
                    <p>Minor scratches and dents on the body. Scratches on the wheels. Scuffs and dirt in the interior. Stone chips on the windshield. Scratches and dents on the inside of the right front door.</p>
                </div>
            </div>
            <div className="carInfo-BtnBlock">
                <button type="button" className="btn btn-lg theme-btn w-100 text-uppercase" onClick={() => setShowBookModal(true)}>Book now</button>
                <button type="button" className="btn btn-lg theme-btn w-100 text-uppercase" onClick={() => setShowContactModal(true)}>Contact Manager</button>
                <button type="button" className="btn btn-lg theme-btn w-100 text-uppercase">Payment Methods</button>
            </div>
        </div>

        {/* ✅ React Modal Popup */}
        <CommonModal 
        show={showBookModal}
        onClose={() => setShowBookModal(false)}
        title="Book Now" 
        />

        <ContactModal 
        show={showContactModal}
        onClose={() => setShowContactModal(false)}
        title="Contact Manager" 
        />

    </div>
  );
}

export default CarInfoSidebar;
