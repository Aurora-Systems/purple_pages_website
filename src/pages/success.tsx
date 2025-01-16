import Socials from "../components/socials_comp"

export const Success=()=>{
    return(
        <div className="container text-center vh-100 d-flex justify-content-center align-items-center">
            <div>

            <img src="https://ngratesc.sirv.com/Purple%20Pages/logo.png" className="img-fluid" width={"200"}/>
            <h1 className="display-1 p_text fw-bold ">You're In!</h1>
            <p>We will keep you updated via email😉!</p>
            <Socials/>
            </div>

        </div>
    )
}

export default Success