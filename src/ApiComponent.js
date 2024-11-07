import axios from 'axios'
import React from 'react'
import { useEffect,useState } from 'react'
function ApiComponent() {

function getapi(){
    return axios.get('http://127.0.0.1:8000/api/books/')
    .then(res=>res.data)
}

const [data,setData]=useState([])
useEffect(()=>{
 getapi()
 .then(res=>
    {
        console.log(res)
        setData(res)
})
},[])
return(
    <div>
        <ul>
            {
                data.map((item,index)=>(<li key={index}>{JSON.stringify(item)}</li>))
            }
        </ul>
    </div>
 )
}

export default ApiComponent