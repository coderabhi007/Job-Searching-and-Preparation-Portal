import React from "react"
import { useDispatch, useSelector } from 'react-redux'
import NavbarCompany from "./shared/NavbarCompany";
const CompanyInfo=()=>{
    const {loading, user, data}=useSelector(store => store.auth);
    console.log(data);
    
    return(
        <>
        <NavbarCompany/>
        <h1>Company Info Update</h1>
        
        </>
        
        
    )
}
export default CompanyInfo;