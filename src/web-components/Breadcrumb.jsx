
import React from 'react'
import { Link } from 'react-router-dom'
import { IconChevronRight } from '@tabler/icons-react'

function Breadcrumb({ car }) {

    if (!car) return null;

    return (
        <div className="breadcrumb">
            <p><Link to="/">Home</Link> <IconChevronRight /></p>
            <p><Link to="/product-list">Product List</Link> <IconChevronRight /></p>
            <p>
                <Link to={`/product-list?makers=${car?.makers}`}>
                    {car?.makers}
                </Link>
                <IconChevronRight />
            </p>
            <p>{car?.productName}</p>
        </div>
    )
}

export default Breadcrumb;
