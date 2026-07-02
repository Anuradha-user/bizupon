import { IconBrandTelegram, IconBrandWhatsapp, IconBrandX, IconPlus } from '@tabler/icons-react'
import React from 'react'
import { Link } from 'react-router-dom'

function ProductShare() {
  return (
    <div className="product-share">
        <p className="mb-0">Share with a friend :</p>
        {/* <Link to="javascript:void();" className="plus"><IconPlus /></Link> */}
        <Link to="javascript:void();" className="whatsapp" data-bs-toggle="tooltip" data-bs-title="Whatsapp"><IconBrandWhatsapp /></Link>
        <Link to="javascript:void();" className="telegram" data-bs-toggle="tooltip" data-bs-title="Telegram"><IconBrandTelegram /></Link>
        <Link to="javascript:void();" className="x" data-bs-toggle="tooltip" data-bs-title="X"><IconBrandX /></Link>
    </div>
  )
}

export default ProductShare
