import React from 'react'
import './Sidebar.css'
import {Link} from 'react-router-dom'
import add_product_icon from '../../assets/Product_Cart.svg'
import list_product_icon from '../../assets/Product_list_icon.svg'
import advertisement_icon from '../../assets/adsimage.png'

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <Link to={'/addproduct'} style={{textDecoration:"none"}}>
        <div className="sidebar-item">
            <img src={add_product_icon} alt=''/>
            <p>Add Product</p>
        </div>
      </Link>
      <Link to={'/listproduct'} style={{textDecoration:"none"}}>
        <div className="sidebar-item">
            <img src={list_product_icon} alt=''/>
            <p>Product List</p>
        </div>
      </Link>
      <Link to={'/advertisement'} style={{textDecoration:"none"}}>
        <div className="sidebar-item">
            <img src={advertisement_icon} alt=''/>
            <p>Adverticements</p>
        </div>
      </Link>
      <Link to={'/fund'} style={{textDecoration:"none"}}>
        <div className="sidebar-item">
            <img src={advertisement_icon} alt=''/>
            <p>Fund Raisings</p>
        </div>
      </Link>
    </div>
  )
}

export default Sidebar
