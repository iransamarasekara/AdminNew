import React, { useEffect, useState } from 'react'
import './ListProduct.css'
import cross_icon from '../../assets/cross_icon.png'
import { json } from 'react-router-dom';

const ListProduct = () => {
    const [allproducts, setAllProducts] = useState([]);
    const [avl, setAvl] = useState(null); // Uncommented this line

    const fetchInfo = async () =>{
        await fetch('https://projectbisonbackend.onrender.com/allproducts')
        .then((res) => res.json())
        .then((data)=>{setAllProducts(data)});
    }

    useEffect(()=>{
        fetchInfo();
    },[])

    const remove_product =async (id)=>{
        await fetch('https://projectbisonbackend.onrender.com/removeproduct',{
            method:'POST',
            headers:{
                Accept:'application/json',
                'Content-Type':'application/json',
            },
            body:JSON.stringify({id:id})
        })
        await fetchInfo();
    }

    const addAvl = async (e, id) => {
      const avl = e.target.value;
      setAvl(e.target.value);
      fetch('https://projectbisonbackend.onrender.com/setavailablestate', {
          method: 'POST',
          headers: {
              Accept: 'application/json',
              'Content-Type':'application/json',
          },
          body: JSON.stringify({ 'itemId': id, 'available': avl }),
      }).then((response) => response.json()).then((data) => console.log(data));
      alert('Available state changed')
  }

  return (
    <div className='list-product'>
      <h1>All Products List</h1>
      <div className="listproduct-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Old Price</p>
        <p>New Price</p>
        <p>Category</p>
        <p>Availability</p>
        <p>Remove</p>
      </div>
      <div className="list-product-allproducts">
        <hr/>
        {allproducts.map((product, index)=>{
            return <><div key={index} className="listproduct-format-main listproduct-format">
                <img src={product.image} alt="" className="listproduct-product-icon" />
                <p>{product.name}</p>
                <p>Rs.{product.old_price}</p>
                <p>Rs.{product.new_price}</p>
                <p>{product.category}</p>

                
                <select onChange={(e)=>addAvl(e, product.id)}>
                  {product.available ? (
                    <>
                      <option value='true'>Available</option>
                      <option value='false'>Unavailable</option>
                    </>
                  ) : (
                    <>
                      <option value='false'>Unavailable</option>
                      <option value='true'>Available</option>
                    </>
                  )}
                  {/* <option value='true'>Available</option>
                  <option value='false'>Unavailable</option> */}
                </select>

                <img onClick={()=>{remove_product(product.id)}} src={cross_icon} alt="" className="listproduct-remove-icon" />
            </div>
            <hr /></>
        })}
      </div>
    </div>
  )
}

export default ListProduct
