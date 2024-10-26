import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import "../Styles/PostelPinCode.css"
export default function PostelPinCode() {
    const[data,setData]=useState([])
    const[filterData,setFilterData]=useState([])
    const[search,setSearch]=useState("")
    const {pin} =useParams()
    useEffect(()=>{
        const getData=async ()=>{
            try{
              const response=await fetch(`https://api.postalpincode.in/pincode/${pin}`)
              const json=await response.json();
              setData(json[0].PostOffice)
              setFilterData(json[0].PostOffice)
            }
            catch{
              console.log("error")
            }
          }
          getData()
    },[])

    function filterHander(e){
        const value=e.target.value.toLowerCase();
        setSearch(value)
        const filterSearch=data.filter(item=>item.Name.toLowerCase().includes(value))
        setFilterData(filterSearch)
    }
  return (
    <>
    <div className="container">
        <div className="">
            <p><strong>Pincode:</strong>{pin}</p>
            <p><strong>Message:</strong>Number of Pincode(S) Found:{data.length}</p>
            <input type="text" name="" id="" placeholder='🔍 Filter' onChange={filterHander}/>
        </div>
    <div className='pincode-container'>
      {
        filterData ?(filterData.map((item,index)=>{
            return(
                <div className="pincode-item" key={index}>
                    <h1>Name: {item.Name}</h1>
                    <p>Pincode: {item.Pincode}</p>
                    <p>District: {item.District}</p>
                    <p>State: {item.State}</p>
                </div>
            )
        })):(<h1>Couldn’t find the postal data you’re looking for…</h1>)
      }
    </div>
    </div>
    </>
  )
}
