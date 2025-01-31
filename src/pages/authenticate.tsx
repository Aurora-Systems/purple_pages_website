import { FormEvent, useState } from "react"
import { Spinner } from "react-bootstrap"
import supabase from "../init/init_supababse"
import { toast, ToastContainer } from "react-toastify"
import { useNavigate } from "react-router-dom"

const Authenticate = () => {
    const nav = useNavigate()
    const [otp, setOtp] = useState<string>("")
    const [otp_sent, setOtpSent] = useState<boolean>(false)
    const [email, setEmail] = useState<string>("")
    const [loading, setLoading]=useState<boolean>(false)

    const handle_submit=(e:FormEvent)=>{
        e.preventDefault()
        setLoading(true)
        supabase.auth.signInWithOtp({
            email,
            options:{
                shouldCreateUser:true
            }
        }).then(res=>{
            if(res.error!==null){
                toast(res.error.message)
            }else{
                setOtpSent(true)
            }

        }).catch(()=>{
            toast("Something went wrong")
        }).finally(()=>{
            setLoading(false)
        })

    }

    
    const handle_otp_submit=(e:FormEvent)=>{
        e.preventDefault()
        setLoading(true)
        supabase.auth.verifyOtp({
            token:otp,
            email,
            type:"email"
        }).then(res=>{
            if(res.error!==null){
                toast(res.error.message)
                return
            }
            const signup_option = sessionStorage.getItem("type") 
            if(signup_option==="individual"){
                nav("/onboard/user")
            }else if(signup_option==="business"){
                nav("/onboard/business")
            }else{
                nav("/")
            }
        }).catch(()=>{
            toast("Something went wrong")
        }).finally(()=>{
            setLoading(false)
        })

    }

    return (
        <div className="vh-100 d-flex align-items-center justify-content-center">
            <div className="text-center">
                <img src={"https://ngratesc.sirv.com/Purple%20Pages/logo.png"} className="img-fluid" width={100} alt="logo" />
                <h3>Create An Account</h3>
                {!otp_sent?
                <form onSubmit={handle_submit}>
                    <div className="mb-2">
                        <p>Please enter your email address to create an account</p>
                        <input
                            type="email"
                            className="form-control text-center"
                            placeholder="jane@doe.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                    </div>
                    <div className="mb-2">
                        <small>By continuing, you agree to our <a href="/legal/privacy-policy" target="_blank"  className="p_text">Privacy Policy</a></small>
                    </div>
                    <div>
                        <button type="submit" className="btn p_btn" disabled={loading}>{loading?<Spinner size="sm"/>:"Continue"}</button>

                    </div>

                </form>
                :
                <form onSubmit={handle_otp_submit}>
                    <div className="mb-2">
                        <p>Please enter the OTP sent to {email}</p>
                        <input 
                            type="text" 
                            className="form-control text-center" 
                            placeholder="123456" 
                            value={otp} 
                            onChange={(e)=>setOtp(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <button type="submit" className="btn p_btn" disabled={loading}>{loading?<Spinner size="sm"/>:"Continue"}</button>
                    
                    </div>
                    <div>
                        <button type="button" className="btn btn-none" onClick={()=>setOtpSent(false)}><u>Back</u></button>
                    </div>
                </form>
}
            </div>
            <ToastContainer/>
        </div>
    )
}

export default Authenticate