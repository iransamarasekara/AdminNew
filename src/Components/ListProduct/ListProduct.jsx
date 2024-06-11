import React, { useEffect, useState } from 'react'
import './ListProduct.css'
import cross_icon from '../../assets/cross_icon.png'
import { json } from 'react-router-dom';

const ListProduct = () => {
    const [allproducts, setAllProducts] = useState([]);
    const [avl, setAvl] = useState(null); // Uncommented this line
    const [productName, setProduct] = useState(null);
    const [orders, setOrders] = useState([]);
    const [downloadButton, setDownloadButton] = useState(false);

    const fetchInfo = async () =>{
        await fetch('https://projectbisonbackend.onrender.com/allproducts')
        .then((res) => res.json())
        .then((data)=>{setAllProducts(data)});
    }

    useEffect(()=>{
        fetchInfo();
    },[])

    const getProductHandler = (e) => {
      setProduct(e.target.value);
    }

    const getOrders = async () =>{
      allproducts.forEach((product) => {
          if (productName === product.name) {
              setCurrentProduct(product);
              fetch('http://localhost:4000/getordersusingid', {
                  method: 'POST',
                  headers: {
                      Accept: 'application/json',
                      'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({ 'product_id': product.id}),
              }).then((response) => response.json()).then((data) => setOrders(data));
          }
      })
      if(!orders){
          alert("No such product!")
      }else{
        setDownloadButton(true);
      }
    }

    const downloadExcel = () => {
      const worksheet = XLSX.utils.json_to_sheet(orders.map(order => {
          const pairedSizesAndColors = order.product_size.map((size, index) => {
            const color = order.product_color[index];
            return `${size}-${color}`;
          }).join(", ");
        
          return {
            ID: order.id,
            'User ID': order.uder_id,
            'User Name': order.username,
            'Slip Image': order.slip_image,
            'Number of purchase products': order.num_purchase_products,
            'Ordered sizes and colors': pairedSizesAndColors,
            'whatsApp number': order.whatsApp,
            'Product ID': order.product_id,
            'Order type': order.order_type,
            'Total payment': order.total,
            'Product name': order.productname,
          };
        }));
        
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Orders");
        XLSX.writeFile(workbook, "orders.xlsx");
    };

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
      <label>Download orders of any product</label>
      <input onChange={getProductHandler} placeholder='Enter the product name'/>
      <button onClick={getOrders}>Get Orders</button>
      {downloadButton?<button onClick={downloadExcel}>Download as Excel</button>:<></>}
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
