import { IconBrandTelegram, IconBrandWhatsapp, IconX } from "@tabler/icons-react";
import React, { useState } from "react";
import { Link } from 'react-router-dom'

function ContactModal({ show, onClose, title }) {

  if (!show) return null; // ✅ important

  return (
    <div className="custom-modal-overlay">
      <div className="custom-modal">

        <div className="modal-header">
          <h4>{title}</h4>
          <button onClick={onClose} className="close-btn">
            <IconX />
          </button>
        </div>

        <div className="modal-body bg-transparent p-0">
            <div className="phone-item-block mb-2">
                +81 80-7505-1919 — Anna
                <p>
                    <Link to="https://wa.me/+818075051919" target="_blank" title="whatsapp"><IconBrandWhatsapp className="text-success" /></Link>
                    <Link to="https://t.me/+818075051919" target="_blank" title="telegram"><IconBrandTelegram className="text-primary" /></Link>
                </p>
            </div>
            <div className="phone-item-block mb-2">
                +81 80-2956-1568 — Lyudmila
                <p>
                    <Link to="https://wa.me/+818029561568" target="_blank" title="whatsapp"><IconBrandWhatsapp className="text-success" /></Link>
                    <Link to="https://t.me/+818029561568" target="_blank" title="telegram"><IconBrandTelegram className="text-primary" /></Link>
                </p>
            </div>
            <div className="phone-item-block mb-2">
                +81 80-8016-3056 — Nominal
                <p>
                    <Link to="https://wa.me/+818080163056" target="_blank" title="whatsapp"><IconBrandWhatsapp className="text-success" /></Link>
                    <Link to="https://t.me/+818080163056" target="_blank" title="telegram"><IconBrandTelegram className="text-primary" /></Link>
                </p>
            </div>
            <div className="phone-item-block mb-2">
                +81 70-2620-6438 — Nadezhda
                <p>
                    <Link to="https://wa.me/+817026206438" target="_blank" title="whatsapp"><IconBrandWhatsapp className="text-success" /></Link>
                    <Link to="https://t.me/+817026206438" target="_blank" title="telegram"><IconBrandTelegram className="text-primary" /></Link>
                </p>
            </div>
            <div className="phone-item-block mb-2">
                +81 90-8493-4040 — Anya
                <p>
                    <Link to="https://wa.me/+819084934040" target="_blank" title="whatsapp"><IconBrandWhatsapp className="text-success" /></Link>
                    <Link to="https://t.me/+819084934040" target="_blank" title="telegram"><IconBrandTelegram className="text-primary" /></Link>
                </p>
            </div>
            <div className="phone-item-block mb-2">
                +81 90-2638-9090 — Alexandra
                <p>
                    <Link to="https://wa.me/+819026389090" target="_blank" title="whatsapp"><IconBrandWhatsapp className="text-success" /></Link>
                    <Link to="https://t.me/+819026389090" target="_blank" title="telegram"><IconBrandTelegram className="text-primary" /></Link>
                </p>
            </div>
            <div className="phone-item-block mb-2">
                +81 70-3967-0694 — Lyuda
                <p>
                    <Link to="https://wa.me/+817039670694" target="_blank" title="whatsapp"><IconBrandWhatsapp className="text-success" /></Link>
                    <Link to="https://t.me/+817039670694" target="_blank" title="telegram"><IconBrandTelegram className="text-primary" /></Link>
                </p>
            </div>
            <div className="phone-item-block mb-2">
                +81 80-1457-5050 — Gleb
                <p>
                    <Link to="https://wa.me/+818014575050" target="_blank" title="whatsapp"><IconBrandWhatsapp className="text-success" /></Link>
                    <Link to="https://t.me/+818014575050" target="_blank" title="telegram"><IconBrandTelegram className="text-primary" /></Link>
                </p>
            </div>
            <div className="phone-item-block">
                +81 90-2461-4251 — Igor
                <p>
                    <Link to="https://wa.me/+819024614251" target="_blank" title="whatsapp"><IconBrandWhatsapp className="text-success" /></Link>
                    <Link to="https://wa.me/+819024614251" target="_blank" title="telegram"><IconBrandTelegram className="text-primary" /></Link>
                </p>
            </div>
        </div>
      </div>
    </div>
  );
}

export default ContactModal;