import React, { useState } from "react";
import { IconPlayerPlayFilled } from '@tabler/icons-react'

function BestQuality() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <section className="buy-best-quality">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-12 col-12">

              {/* Video Button */}
              <button className="video_btn border-0 bg-transparent"
                onClick={() => setShowModal(true)}
              >
                <span className="btn_icon">
                  <IconPlayerPlayFilled size={40} />
                </span>
              </button>
                <div className="buy-quality-content-box">
                    <h1>Buy the Best Quality Car With Us</h1>
                    <p>Lorem ipsum dolor amet consectetur adipisicing elit sed do eiusmod cste dolore magnam aliquam quaerat demi text voluptatem dolore amet magna aliqua magna elit.</p>
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modal */}
      {showModal && (
        <div className="video-modal" onClick={() => setShowModal(false)}>
          <div className="video-modal-content" onClick={(e) => e.stopPropagation()} >
            <span className="close-btn" onClick={() => setShowModal(false)} >
              ✕
            </span>

            <iframe width="100%" height="450" src="https://www.youtube.com/embed/nxcsVSQN5lQ?autoplay=1" title="YouTube video player" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
          </div>
        </div>
      )}
    </>
  );
}

export default BestQuality;
