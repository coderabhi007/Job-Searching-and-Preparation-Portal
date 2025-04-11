import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const InterviwerProtectedRoute = ({children}) => {
    const {user} = useSelector(store=>store.auth);

    const navigate = useNavigate();

    useEffect(()=>{
        if(user!=="Interviewer"){
          if(user=="Company"){
            navigate('/company')
          }
          else{
            navigate('/')
          }
        }
    },[]);

    return (
        <>
        {children}
        </>
    )
};
export default InterviwerProtectedRoute;