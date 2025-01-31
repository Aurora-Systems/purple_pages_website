import { FormEvent, useEffect, useState } from "react"
import { user_default, UserType, UserSchema } from "../schemas/user_schema"
import { toast, ToastContainer } from "react-toastify"
import { InternalError, ParseFailed } from "../components/texts"
import { useNavigate } from "react-router-dom"
import { api } from "../api/server_link"
import PhoneInput from "react-phone-input-2"
import countries from "../data/countries.json"
import B from "../components/required"
import axios from "axios"
import supabase from "../init/init_supababse"
import { Spinner } from "react-bootstrap"


const UserOnboarding = () => {
    const nav = useNavigate()
    const [user_data, set_user_data] = useState<UserType>(user_default)
    const [loading, set_loading] = useState<boolean>(false)
    const [token, set_token] = useState<string>("")

    const handle_submit = async (e: FormEvent) => {
        e.preventDefault()
        set_loading(true)
        try {

            if (!UserSchema.safeParse(user_data).success) {
                return toast(ParseFailed)
            }
            const post_data = { ...user_data}
            const request = await axios.post(`${api}onboarding/user`, post_data, {
                headers: {
                    Authorization: `${token}`
                }
            })
            if (request.data.status === true) {
                nav("/success")
            } else {
                return toast(request.data?.error || InternalError)
            }
        } catch {
            toast(InternalError)
            return
        } finally {
            set_loading(false)
        }
    }

    useEffect(()=>{
       const user_type = sessionStorage.getItem("type")
       if(user_type===null){
        nav("/")
       }
       supabase.auth.getSession().then(res=>{
       if(res.error!==null){
           toast("⚠️ Something went wrong, redirecting to home page in 5 seconds")
           return setTimeout(()=>nav("/"), 5000)
       }
       set_token(res.data.session?.access_token as string)
       set_user_data({...user_data, user_id: res.data.session?.user?.id as string, email: res.data.session?.user?.email as string})
    }).catch(()=>{
        toast("⚠️ Something went wrong, redirecting to home page in 5 seconds")
        return setTimeout(()=>nav("/"), 5000)
    })
    },[])

    return (
        <div className="vh-100  d-flex align-items-center justify-content-center">
            <div className="container">

                <div className="text-center">
                    <img src="https://ngratesc.sirv.com/Purple%20Pages/logo.png" className="img-fluid" width={"100"} alt="Purple Pages Logo" />
                </div>
                <div className="text-center">
                    <h1 className="fw-bold">Lets Get You <u className="p_text">Ready!</u></h1>
                    <p>Fill in the details to get your account ready</p>
                </div>
                <div>
                    <form onSubmit={handle_submit}>
                        <div className="row">
                            <div className="col-sm mb-2">
                                <span>First Name<B /></span>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={user_data.first_name}
                                    onChange={(e) => set_user_data({ ...user_data, first_name: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="col-sm mb-2">
                                <span>Last  Name<B /></span>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={user_data.last_name}
                                    onChange={(e) => set_user_data({ ...user_data, last_name: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="col-sm mb-2">
                                <span>Date Of Birth<B /></span>
                                <input
                                    type="date"
                                    className="form-control"
                                    value={user_data.date_of_birth}
                                    onChange={(e) => set_user_data({ ...user_data, date_of_birth: e.target.value })}
                                    required
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm mb-2">
                                <span>Email<B /></span>
                                <input
                                    type="email"
                                    className="form-control"
                                    value={user_data.email}
                                    disabled
                                    required
                                />
                            </div>
                            <div className="col-sm">
                                <span>Contact Number<B /></span>
                                <PhoneInput
                                containerClass=""
                                inputClass="w-100 form-control"
                                    value={user_data.contact_number}
                                    onChange={(e) => set_user_data({ ...user_data, contact_number:e })}
                                    inputProps={{
                                        required:true
                                    }}
                                    />
                            </div>
                            <div className="col-sm">
                                <span>Country<B /></span>
                                <select
                                    className="form-control"
                                    value={user_data.country}
                                    onChange={(e) => set_user_data({ ...user_data, country: e.target.value })}
                                    required
                                >
                                    <option></option>
                                    {
                                        countries.map((item) => {
                                            return (
                                                <option value={item.name} key={item.code}>{item.name}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                        </div>
                        <div className="text-center mb-2">
                            By Onboarding You agree To Allow Us To Contact You About Our Launch
                        </div>
                        <div className="text-center">
                            <button type="submit" className="btn p_btn" disabled={loading}>{loading?<Spinner size="sm"/>:"Onboard"}</button>
                        </div>
                    </form>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}

export default UserOnboarding