import React, { useState, useEffect } from "react";
import Loader from "../components/Loader";
import Error from "../components/Error.js";
import axios from "axios";
export default function Addroom() {
    const [name,setname]=useState('')
    const [rentperday,setrentperday]=useState()
    const [maxcount,setmaxcount]=useState()
    const [description,setdescription]=useState()
    const [phonenumber,setphonenumber]=useState()
    const [type,settype]=useState()
    const [imageurl1,setimageurl1]=useState()
    const [imageurl2,setimageurl2]=useState()
    const [imageurl3,setimageurl3]=useState()

    function addRoom(){

        const newroom={
            name,
            rentperday,
            maxcount,
            description,
            phonenumber,
            type,
            imageurls:[ imageurl1,imageurl2,imageurl3]
        }
        console.log(newroom);
    }
  return (
    <div className="row">
        <div className="col-md-5">
            <input type="text" className="form-control" placeholder="room name" 
            value={name} onChange={(e)=>setname(e.target.value)}
            />
            <input type="text" className="form-control" placeholder="rent per day" 
            value={rentperday} onChange={(e)=>setrentperday(e.target.value)}
            />
            <input type="text" className="form-control" placeholder="max count" 
            value={maxcount} onChange={(e)=>setmaxcount(e.target.value)}
            />
            <input type="text" className="form-control" placeholder="description" 
            value={description} onChange={(e)=>setdescription(e.target.value)}
            />
            <input type="text" className="form-control" placeholder="phone number" 
            value={phonenumber} onChange={(e)=>setphonenumber(e.target.value)}
            />
        </div>
        <div className="col-md-5">
        <input type="text" className="form-control" placeholder="type" 
        value={type} onChange={(e)=>settype(e.target.value)}
        />
            <input type="text" className="form-control" placeholder="Image URL 1" 
            value={imageurl1} onChange={(e)=>setimageurl1(e.target.value)}
            />
            <input type="text" className="form-control" placeholder="Image URL 2" 
            value={imageurl2} onChange={(e)=>setimageurl2(e.target.value)}
            />
            <input type="text" className="form-control" placeholder="Image URL 3" 
            value={imageurl3} onChange={(e)=>setimageurl3(e.target.value)}
            />

            <div className="text-right">
                <button className="btn btn-primary mt-2" onClick={addRoom}>Add Room</button>
            </div>  
        </div>
      
    </div>
  )
}
