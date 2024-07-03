import React, { useState } from 'react'
import './FundRaising.css'

const FundRaising = () => {
    
    const [fundDetails, setFundDetails] = useState({
        amount:"",
        donators:"",
    })

    const changeHandler = (e) => {
        setFundDetails({...fundDetails,[e.target.name]:e.target.value})
    }

    const Add_FundRaising = async () => {
        console.log(fundDetails);
        let fund = fundDetails;

        console.log(fund);
        await fetch('https://projectbisonbackend.onrender.com/fundraising123',{
            method:'POST',
            headers:{
                Accept:'application/json',
                'Content-Type':'application/json',
            },
            body:JSON.stringify(fund),
        }).then((resp) =>resp.json()).then((data)=>{
            data.success?alert("Detail Added"):alert("Failed")
        })
    }
    
  return (
    <div className='add-product'>
      
      
      <div className="addproduct-itemfield">
            <p>Current fund amount : </p>
            <input value={fundDetails.amount} onChange={changeHandler} type='text' name='amount' placeholder='Type here'/>
        </div>
        <div className="addproduct-itemfield">
            <p>Number of donators : </p>
            <input value={fundDetails.donators} onChange={changeHandler} type='text' name='donators' placeholder='Type here'/>
        </div>
        <button onClick={() => {Add_FundRaising()}} className='add-product-btn'>ADD Details</button>
    </div>
  )
}

export default FundRaising
