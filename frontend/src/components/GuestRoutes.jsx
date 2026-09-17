import { Navigate } from "react-router-dom"
function GuestRoutes({children}) {
    const token = localStorage.getItem("accessToken")

    if(token){
        return <Navigate to="/" replace/>
    }
  return children
}

export default GuestRoutes