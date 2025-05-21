import Socials from "../components/socials_comp";
import { useNavigate } from "react-router-dom";
const Lander = () => {
    const nav = useNavigate()
    return (
        <div className="container vh-100 d-flex align-items-center">
            <div>

            <div className=" d-flex flex-row flex-wrap align-items-center justify-content-center mb-2">

                <div className="col-sm">
                    <img src="https://ngratesc.sirv.com/Purple%20Pages/lander.png" className="img-fluid" alt="Mockup of purple pgaes" />
                </div>
                <div className="col-sm text-center text-md-start">

                    <div>
                        <div className="d-flex flex-row align-items-center justify-content-center justify-content-md-start">
                            <div className="rounded s_bg">
                                <img src="https://ngratesc.sirv.com/Purple%20Pages/logo.png" width={"100"} />

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
                        <button className="btn p_btn me-2" onClick={() => {
                            sessionStorage.setItem("type", "individual")
                            nav("/onboard/user")
                        }}>For Indivudals</button>
                        <span>or</span>
                        <button className="btn p_btn ms-2" onClick={() => {
                            sessionStorage.setItem("type", "business")
                            nav("/onboard/business")
                        }}>For Businesses</button>
                    </div>
                </div>
            </div>
            <Socials/>
            <div className="mt-2 text-center">
                <small><a href="/legal/privacy-policy" className="p_text">Privacy Policy</a></small>
            </div>
            </div>

        </div>
    )
}

export default Lander