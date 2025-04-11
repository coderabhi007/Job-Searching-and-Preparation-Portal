import React from "react"
import { useDispatch, useSelector } from 'react-redux'
const CompanyInfo=()=>{
    const {loading, user, data}=useSelector(store => store.auth);
    console.log(data);
    
    return(
        <>
        <h1>Company Info Update</h1>
        
        </>
        
        
    )
}
export default CompanyInfo;