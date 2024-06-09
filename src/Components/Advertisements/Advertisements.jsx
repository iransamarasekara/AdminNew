import React, { useState } from 'react'
import './Advertisements.css'
import upload_area from '../../assets/upload_area.svg'

const Advertisements = () => {
    const [ad_image,setAd_image] = useState(false);
    
    const [addDetails, setAddDetails] = useState({
        ad_image:"",
        ad_category:"t-shirts",
    })


    const imageHandler = (e)=>{
        setAd_image(e.target.files[0]);
    }

    const changeHandler = (e) => {
        setAddDetails({...addDetails,[e.target.name]:e.target.value})
    }

    const Add_Advertisement = async () => {
        console.log(addDetails);
        let responceData;
        let add = addDetails;

        let formData = new FormData();
        formData.append('product', ad_image);
        

        await fetch('https://projectbisonbackend.onrender.com/upload',{
            method:'POST',
            headers:{
                Accept:'application/json',
            },
            body:formData,
        }).then((resp) => resp.json()).then((data) =>{responceData=data});

        if(responceData.success)
        {
            add.ad_image = responceData.image_url;
            console.log(add);
            await fetch('https://projectbisonbackend.onrender.com/addAdertisement',{
                method:'POST',
                headers:{
                    Accept:'application/json',
                    'Content-Type':'application/json',
                },
                body:JSON.stringify(add),
            }).then((resp) =>resp.json()).then((data)=>{
                data.success?alert("Advertisement Added"):alert("Failed")
            })
        }
    }
    
  return (
    <div className='add-product'>
      
      
        <div className="addproduct-itemfield">
            <p>Product Category</p>
            <select value={addDetails.ad_category} onChange={changeHandler} name="ad_category" className='add-product-selector'>
                <option value='t-shirts'>T-Shirts</option>
                <option value='home'>Home</option>
                <option value='wristbands'>Wristbands</option>
                <option value='others'>Others</option>
            </select>
        </div>
        <div className="addproduct-itemfield">
            <p>Image Upload</p>
            <label htmlFor='file-input'>
                <img src={ad_image?URL.createObjectURL(ad_image):upload_area} className='addproduct-thumnail-img' alt="" />
            </label>
            <input onChange={imageHandler} type="file" name='ad_image' id='file-input' hidden/>
        </div>


      <button onClick={() => {Add_Advertisement()}} className='add-product-btn'>ADD</button>
    </div>
  )
}


export default Advertisements
