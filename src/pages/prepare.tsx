import { useKindeAuth } from "@kinde-oss/kinde-auth-react"
import { useNavigate } from "react-router-dom"

const Prepare=()=>{
    const nav = useNavigate()
    const {isLoading, isAuthenticated,  getToken} = useKindeAuth()

   
    const get_token=async()=>{
       try{
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const token:any  = await getToken()
        if(token!==undefined){
            sessionStorage.setItem("token", token)
            const acc_type = sessionStorage.getItem("type")
            if(acc_type==="individual"){
                nav("/onboard/user")
            }else if(acc_type==="business"){
                nav("/onboard/business")
            }else{
                nav("/")
            }
        }else{
            console.log("undefined")
            nav("/")
        }
    }catch{
        nav("/")
    }
    }

    if(!isLoading && isAuthenticated){
        get_token()
    }

    return(
        <div className="vh-100 d-flex justify-content-center align-items-center">
            <div className="text-center">
            <div className="breathe mb-3">
                <img src="https://ngratesc.sirv.com/Purple%20Pages/logo.png" alt="logo" width={"50px"}/>
            </div>
            <p>Preparing to launch</p>
            </div>
        </div>
    )

   
   
}

export default Prepare