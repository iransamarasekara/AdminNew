import React from 'react'
import './Admin.css'
import Sidebar from '../../Components/Sidebar/Sidebar'
import {Routes, Route} from 'react-router-dom'
import AddProduct from '../../Components/AddProduct/AddProduct'
import ListProduct from '../../Components/ListProduct/ListProduct'
import Advertisements from '../../Components/Advertisements/Advertisements'
import FundRaising from '../../Components/FundRaising/FundRaising'
const Admin = () => {
  return (
    <div className='admin'>
      <Sidebar/>
      <Routes>
        <Route path='/addproduct' element={<AddProduct/>} />
        <Route path='/listproduct' element={<ListProduct/>} />
        <Route path='/advertisement' element={<Advertisements/>} />
        <Route path='/fund' element={<FundRaising/>} />
      </Routes>
    </div>
  )
}

export default Admin
