import { useNavigate } from "react-router-dom";

function useLogout(){
    let navigate=useNavigate()
    return()=>{
        sessionStorage.clear()
        navigate('/dashboard')
    }
    
}
export default useLogout