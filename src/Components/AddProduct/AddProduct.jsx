import React, { useState } from 'react'
import './AddProduct.css'
import upload_area from '../../assets/upload_area.svg'

const AddProduct = () => {
    const [image,setImage] = useState(false);
    const [image_2,setImage_2] = useState(false);
    const [image_3,setImage_3] = useState(false);
    const [image_logo,setImage_logo] = useState(false);
    const [size_guide,setSize_Guide] = useState(false);
    let descbox = [];
    for(let i = 0; i < 50; i++){
        let text = '';
        let name = '';
        let profilephoto = '';
        let rating = 0; 

        descbox.push({
            text,
            name,
            profilephoto,
            rating
        })
    }
    const [productDetails, setProductDetails] = useState({
        name:"",
        image:"",
        category:"t-shirts",
        new_price:"",
        old_price:"",
        description:"",
        image_logo:"",
        colors:[],
        avl_size:[],
        image_2:"",
        image_3:"",
        rating:0,
        reviewText:descbox,
        no_of_rators:0,
        size_guide:"",
        acc_no:"",
        avl_order_types:"both",
        acc_name:"",
        bank:"",
        acc_branch:"",
        acc_no2:"",
        acc_name2:"",
        bank2:"",
        acc_branch2:"",
    })

    const imageLogoHandler = (e)=>{
        setImage_logo(e.target.files[0]);
    }

    const image_2_Handler = (e)=>{
        setImage_2(e.target.files[0]);
    }

    const image_3_Handler = (e)=>{
        setImage_3(e.target.files[0]);
    }

    const size_guide_Handler = (e)=>{
        setSize_Guide(e.target.files[0]);
    }

    const imageHandler = (e)=>{
        setImage(e.target.files[0]);
    }

    const colorsHandler = (e) => {
        setProductDetails({...productDetails, colors: e.target.value.split(',')});
    }

    const sizesHandler = (e) => {
        setProductDetails({...productDetails, avl_size: e.target.value.split(',')});
    }

    const changeHandler = (e) => {
        setProductDetails({...productDetails,[e.target.name]:e.target.value})
    }

    const Add_Product = async () => {
        console.log(productDetails);
        let responceData;
        let responceData_2 ={ success: true, image_url: null };
        let responceData_3 ={ success: true, image_url: null };
        let responceData_sizeGuide ={ success: true, image_url: null };
        let responceData_logo ={ success: true, image_url: null };
        let product = productDetails;

        let formData = new FormData();
        formData.append('product', image);

        
        

        
        

        await fetch('https://projectbisonbackend.onrender.com/upload',{
            method:'POST',
            headers:{
                Accept:'application/json',
            },
            body:formData,
        }).then((resp) => resp.json()).then((data) =>{responceData=data});
        if(image_2)
        {
            let formData_2 = new FormData();
            formData_2.append('product', image_2);
            await fetch('https://projectbisonbackend.onrender.com/upload',{
                method:'POST',
                headers:{
                    Accept:'application/json',
                },
                body:formData_2,
            }).then((resp) => resp.json()).then((data) =>{responceData_2=data});
        }

        if(image_3)
        {
            let formData_3 = new FormData();
            formData_3.append('product', image_3);
            await fetch('https://projectbisonbackend.onrender.com/upload',{
                method:'POST',
                headers:{
                    Accept:'application/json',
                },
                body:formData_3,
            }).then((resp) => resp.json()).then((data) =>{responceData_3=data});
        }

        if(size_guide)
            {
                let formData_3 = new FormData();
                formData_3.append('product', size_guide);
                await fetch('https://projectbisonbackend.onrender.com/upload',{
                    method:'POST',
                    headers:{
                        Accept:'application/json',
                    },
                    body:formData_3,
                }).then((resp) => resp.json()).then((data) =>{responceData_sizeGuide=data});
            }

        if(image_logo)
            {
                let formData2 = new FormData();
                formData2.append('product', image_logo);
                await fetch('https://projectbisonbackend.onrender.com/upload',{
                    method:'POST',
                    headers:{
                        Accept:'application/json',
                    },
                    body:formData2,
                }).then((resp) => resp.json()).then((data) =>{responceData_logo=data});
            }   
        // if(!responceData_2.success){
        //     responceData_2.image_url = null;
        // }
        // if(!responceData_3.success){
        //     responceData_3.image_url = null;
        // }

        if(responceData.success)
        {
            product.image = responceData.image_url;
            product.image_logo = responceData_logo.image_url;
            product.image_2 = responceData_2.image_url;
            product.image_3 = responceData_3.image_url;
            product.size_guide = responceData_sizeGuide.image_url;
            if(!product.acc_no){
                product.acc_no = "Account number not provided";
            }
            console.log(product);
            await fetch('https://projectbisonbackend.onrender.com/addproduct',{
                method:'POST',
                headers:{
                    Accept:'application/json',
                    'Content-Type':'application/json',
                },
                body:JSON.stringify(product),
            }).then((resp) =>resp.json()).then((data)=>{
                data.success?alert("Product Added"):alert("Failed")
            })
        }
    }
    
  return (
    <div className='add-product'>
      <div className="addproduct-itemfield">
        <p>Product Title</p>
        <input value={productDetails.name} onChange={changeHandler} type='text' name='name' placeholder='Type here' />
      </div>
      <div className="addproduct-itemfield">
        <p>Product Description</p>
        <input value={productDetails.description} onChange={changeHandler} type='text' name='description' placeholder='Type here' />
      </div>
      <div className="addproduct-price">
        <div className="addproduct-itemfield">
            <p>Price</p>
            <input value={productDetails.old_price} onChange={changeHandler} type='text' name='old_price' placeholder='Type here'/>
        </div>

        <div className="addproduct-itemfield">
            <p>Offer Price</p>
            <input value={productDetails.new_price} onChange={changeHandler} type='text' name='new_price' placeholder='Type here'/>
        </div>
      </div>
        <div className="addproduct-itemfield">
            <p>Account Number</p>
            <input value={productDetails.acc_no} onChange={changeHandler} type='text' name='acc_no' placeholder='Type here'/>
        </div>
        <div className="addproduct-itemfield">
            <p>Name of Account Holder</p>
            <input value={productDetails.acc_name} onChange={changeHandler} type='text' name='acc_name' placeholder='Type here'/>
        </div>
        <div className="addproduct-itemfield">
            <p>Bank</p>
            <input value={productDetails.bank} onChange={changeHandler} type='text' name='bank' placeholder='Type here'/>
        </div>
        <div className="addproduct-itemfield">
            <p>Branch</p>
            <input value={productDetails.acc_branch} onChange={changeHandler} type='text' name='acc_branch' placeholder='Type here'/>
        </div>

        <div className="addproduct-itemfield">
            <p>Account Number2</p>
            <input value={productDetails.acc_no2} onChange={changeHandler} type='text' name='acc_no2' placeholder='Type here'/>
        </div>
        <div className="addproduct-itemfield">
            <p>Name of Account Holder2</p>
            <input value={productDetails.acc_name2} onChange={changeHandler} type='text' name='acc_name2' placeholder='Type here'/>
        </div>
        <div className="addproduct-itemfield">
            <p>Bank2</p>
            <input value={productDetails.bank2} onChange={changeHandler} type='text' name='bank2' placeholder='Type here'/>
        </div>
        <div className="addproduct-itemfield">
            <p>Branch2</p>
            <input value={productDetails.acc_branch2} onChange={changeHandler} type='text' name='acc_branch2' placeholder='Type here'/>
        </div>


        <div className="addproduct-itemfield">
            <p>Product Category</p>
            <select value={productDetails.category} onChange={changeHandler} name="category" className='add-product-selector'>
                <option value='t-shirts'>T-Shirts</option>
                <option value='wristbands'>Wristbands</option>
                <option value='others'>Others</option>
            </select>
        </div>
        <div className="addproduct-itemfield">
            <p>Available Order Types</p>
            <select value={productDetails.avl_order_types} onChange={changeHandler} name="avl_order_types" className='add-product-selector'>
                <option value='both'>Both</option>
                <option value='pre'>Pre Order</option>
                <option value='post'>Post Order</option>
            </select>
        </div>
        <div className="addproduct-itemfield">
            <p>Image Upload</p>
            <label htmlFor='file-input'>
                <img src={image?URL.createObjectURL(image):upload_area} className='addproduct-thumnail-img' alt="" />
            </label>
            <input onChange={imageHandler} type="file" name='image' id='file-input' hidden/>
        </div>

        <div className="addproduct-itemfield">
            <p>Image Upload 2(not required)</p>
            <label htmlFor='file-input_2'>
                <img src={image_2?URL.createObjectURL(image_2):upload_area} className='addproduct-thumnail-img' alt="" />
            </label>
            <input onChange={image_2_Handler} type="file" name='image_2' id='file-input_2' hidden/>
        </div>

        <div className="addproduct-itemfield">
            <p>Image Upload 3(not required)</p>
            <label htmlFor='file-input_3'>
                <img src={image_3?URL.createObjectURL(image_3):upload_area} className='addproduct-thumnail-img' alt="" />
            </label>
            <input onChange={image_3_Handler} type="file" name='image_3' id='file-input_3' hidden/>
        </div>

        <div className="addproduct-itemfield">
            <p>Size Guide Upload(not required)</p>
            <label htmlFor='file-size_guide'>
                <img src={size_guide?URL.createObjectURL(size_guide):upload_area} className='addproduct-thumnail-img' alt="" />
            </label>
            <input onChange={size_guide_Handler} type="file" name='size_guide' id='file-size_guide' hidden/>
        </div>

        <div className="addproduct-itemfield">
            <p>Event Logo Upload(not required)</p>
            <label htmlFor='file-input1'>
                <img src={image_logo?URL.createObjectURL(image_logo):upload_area} className='addproduct-thumnail-img' alt="" />
            </label>
            <input onChange={imageLogoHandler} type="file" name='image_logo' id='file-input1' hidden/>
        </div>

        <div className="addproduct-itemfield">
            <p>Product Colors (comma separated)</p>
            <input value={productDetails.colors.join(',')} onChange={colorsHandler} type='text' name='colors' placeholder='Type here'/>
        </div>

        <div className="addproduct-itemfield">
            <p>Available Product Sizes (comma separated)</p>
            <input value={productDetails.avl_size.join(',')} onChange={sizesHandler} type='text' name='avl_size' placeholder='Type here'/>
        </div>


      <button onClick={() => {Add_Product()}} className='add-product-btn'>ADD</button>
    </div>
  )
}

export default AddProduct
