import React, { useEffect, useState } from 'react';
import './ListProduct.css';
import cross_icon from '../../assets/cross_icon.png';
import * as XLSX from 'xlsx';

const ListProduct = () => {
    const [allproducts, setAllProducts] = useState([]);
    const [avl, setAvl] = useState(null);
    const [productName, setProduct] = useState(null);
    const [orders, setOrders] = useState([]);
    const [downloadButton, setDownloadButton] = useState(false);

    const fetchInfo = async () => {
        await fetch('https://projectbisonbackend.onrender.com/allproducts')
            .then((res) => res.json())
            .then((data) => { setAllProducts(data); });
    };

    useEffect(() => {
        fetchInfo();
    }, []);

    const getProductHandler = (e) => {
        setProduct(e.target.value);
    };

    const getOrders = async () => {
        await fetchInfo();
        const product = allproducts.find(product => product.name === productName);
        if (product) {
            await fetch('https://projectbisonbackend.onrender.com/getordersusingid', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 'product_id': product.id }),
            })
            .then((response) => response.json())
            .then((data) => {
                setOrders(data);
                if (data.length === 0) {
                    alert("No orders found for this product!");
                } else {
                    setDownloadButton(true);
                }
            });
        } else {
            alert("No such product!");
            setDownloadButton(false);
        }
    };

    const downloadExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(orders.map(order => {
            const pairedSizesAndColors = order.product_size.map((size, index) => {
                const color = order.product_color[index];
                if (size && color) { // Check if size and color are not null
                    return `${size}-${color}`;
                }
                return ''; // Return an empty string if either size or color is null
            }).filter(Boolean).join(", "); // Filter out empty strings before joining
    
            return {
                ID: order.id,
                'User ID': order.user_id, // Corrected the typo here
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

    const addAvl = async (e, id) => {
        const avl = e.target.value;
        setAvl(e.target.value);
        fetch('https://projectbisonbackend.onrender.com/setavailablestate', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 'itemId': id, 'available': avl }),
        }).then((response) => response.json()).then((data) => console.log(data));
        alert('Available state changed');
    };

    return (
        <div className='list-product'>
            <h1>All Products List</h1>
            <div className="excel">
                <label>Download orders of any product</label>
                <input onChange={getProductHandler} placeholder='Enter the product name' />
                <button onClick={getOrders}>Get Orders</button>
                {downloadButton ? <button onClick={downloadExcel}>Download as Excel</button> : <></>}
            </div>
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
                <hr />
                {allproducts.map((product, index) => {
                    return (
                        <React.Fragment key={index}>
                            <div className="listproduct-format-main listproduct-format">
                                <img src={product.image} alt="" className="listproduct-product-icon" />
                                <p>{product.name}</p>
                                <p>Rs.{product.old_price}</p>
                                <p>Rs.{product.new_price}</p>
                                <p>{product.category}</p>
                                <select onChange={(e) => addAvl(e, product.id)}>
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
                                </select>
                                <img onClick={() => { remove_product(product.id) }} src={cross_icon} alt="" className="listproduct-remove-icon" />
                            </div>
                            <hr />
                        </React.Fragment>
                    );
                })}
            </div>
        </div>
    );
}

export default ListProduct;

