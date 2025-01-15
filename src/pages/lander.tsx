import {useKindeAuth} from "@kinde-oss/kinde-auth-react"
const Lander=()=>{
    const {register} = useKindeAuth();
    return(
        <div className="container ">
            <div className="vh-100 d-flex flex-row flex-wrap align-items-center justify-content-center">

              <div className="col-sm">
              <img src="https://ngratesc.sirv.com/Purple%20Pages/lander.png" className="img-fluid" alt="Mockup of purple pgaes"/>
            </div>
            <div className="col-sm text-center text-md-start">
               
                <div>
                    <div className="d-flex flex-row align-items-center justify-content-center justify-content-md-start">
                        <div className="rounded s_bg">
                        <img src="https://ngratesc.sirv.com/Purple%20Pages/logo.png" width={"100"}/>

                        </div>
                        <div>
                        <h1 className="display-3 mt-4 fw-bold p_text">
                    <span>urple</span> <span>Pages</span>
                    </h1>
                        </div>
                       
                    </div>
                   
                    <p className="fst-italic p_text">Your trusted guide to places that deliver what they promise</p>
                    <p>Looking for a gym that keeps its promises? A restaurant that serves what’s on the menu? A spa that truly soothes? Purple Pages is here to help you verify and choose the best places wherever you go.</p>
                    <p className="p_text">Sign Up for Early Access</p>
                    <button className="btn p_btn me-2" onClick={()=>{
                        sessionStorage.setItem("type", "individual")
                        register()
                        }}>For Indivudals</button>
                    <span>or</span>
                    <button className="btn p_btn ms-2" onClick={()=>{
                        sessionStorage.setItem("type","business")
                        register()
                    }}>For Businesses</button>
                </div>
            </div>  
            </div>

        </div>
    )
}

export default Lander