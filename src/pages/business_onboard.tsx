import { FormEvent, useState } from "react"
import { BusinessType, business_default, BusinessSchema } from "../schemas/business_schema"
// import { search } from "ss-search"
import { toast, ToastContainer } from "react-toastify"
// import countries from "../data/countries.json"
// import categories from "../data/categories.json"
import B from "../components/required"
import { InternalError, ParseFailed } from "../components/texts"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { api } from "../api/server_link"
import PhoneInput from "react-phone-input-2"
// import supabase from "../init/init_supababse"
import { Spinner } from "react-bootstrap"
import supabase from "../init/init_supababse"

const BusinessOnboarding = () => {
    const nav = useNavigate()
    const [user_data, set_user_data] = useState<BusinessType>(business_default)
    const [password, setPassword] = useState<string>("")
    const [confirmPassword, setConfirmPassword] = useState<string>("")
    // const [industry_result, set_industry_result] = useState<Array<{ value: string, label: string }>>([])
    // const [show_results, set_show_results] = useState<boolean>(false)
    const [loading, set_loading] = useState<boolean>(false)
    // const [token, set_token] = useState<string>("")
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    // const industry_input: any = useRef(null)
    const handle_submit = async (e: FormEvent) => {
        e.preventDefault()
        set_loading(true)
       
        try {
             if(password !== confirmPassword){
            return toast("Passwords do not match")
        }

              const {data,error} = await supabase.auth.signUp({
                email:user_data.email,
                password:password
            })

            if(error){
                return toast(error.message)
            } 
            console.log(data)
           

            if (!BusinessSchema.safeParse(user_data).success) {
                return toast(ParseFailed)
            }
            const post_data = { ...user_data, user_id: data.user?.id}
            const request = await axios.post(`${api}onboarding/business`, post_data, {
                headers: {
                    Authorization: `${data.session?.access_token}`
                }
            })
            if (request.data.status === true) {
                nav("/success")
            } else {
                return toast(request.data?.error || InternalError)
            }
        } catch {
            return toast(InternalError)
        } finally {
            set_loading(false)
        }
    }

   

    // const handle_industry_search = (e: string) => {
    //     if (e.length > 2) {
    //         // eslint-disable-next-line @typescript-eslint/no-explicit-any
    //         const data: { value: string, label: string }[] | any = search(categories, ["value"], e)
    //         if (data.length > 0) {
    //             set_industry_result(data)
    //             set_show_results(true)
    //         } else {
    //             set_show_results(false)
    //         }

    //     } else {
    //         set_show_results(false)
    //     }
    // }

    // useEffect(()=>{
    //     const user_type = sessionStorage.getItem("type")
    //     if(user_type!=="business"){
    //      nav("/")
    //     }
    //     supabase.auth.getSession().then(res=>{
    //     if(res.error!==null){
    //         toast("⚠️ Something went wrong, redirecting to home page in 5 seconds")
    //         return setTimeout(()=>nav("/"), 5000)
    //     }
    //     set_token(res.data.session?.access_token as string)
    //     set_user_data({...user_data, user_id: res.data.session?.user?.id as string, email: res.data.session?.user?.email as string})
    //  }).catch(()=>{
    //      toast("⚠️ Something went wrong, redirecting to home page in 5 seconds")
    //      return setTimeout(()=>nav("/"), 5000)
    //  })
    //  },[])
    return (
        <div className="min-vh-100  page_grad d-flex align-items-center justify-content-center">
            <div className="container d-flex flex-column justify-content-center align-items-center">

                
                <div className="onboard_form p-3 rounded-5">

                    <form onSubmit={handle_submit}>
                        <div className="text-center">
                    <img src="https://ngratesc.sirv.com/Purple%20Pages/logo.png" className="img-fluid" width={"80"} alt="Purple Pages Logo" />
                </div>
                <div className="text-center">
                    <h4 className="fw-bold">Lets Get Your Business <u className="p_text">Ready!</u></h4>
                </div>

                        <div className="">
                            <div className="col-sm mb-2">
                                <span>Business Name<B /></span>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={user_data.name}
                                    onChange={(e) => set_user_data({ ...user_data, name: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="col-sm mb-2">
                                <span>Work Email<B /></span>
                                <input
                                    type="email"
                                    className="form-control"
                                    value={user_data.email}
                                    onChange={(e) => set_user_data({ ...user_data, email: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="col-sm mb-2">
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
                            {/* <div className="col-sm mb-2 position-relative w-100">
                                <span>Industry<B /></span>
                                <input
                                    type="text"
                                    className="form-control"
                                    onChange={(e) => handle_industry_search(e.target.value)}
                                    ref={industry_input}
                                    required

                                />
                                {show_results ?
                                    <div className="position-absolute w-100 shadow bg-white rounded d-flex flex-column justify-content-start text-start" style={{ maxHeight: "25vh", overflow: "auto" }}>
                                        {
                                            industry_result.map((item) => {
                                                return (
                                                    <span className="btn text-start" onClick={() => {
                                                        set_user_data({ ...user_data, industry: item.value })
                                                        if (industry_input.current !== null) {
                                                            industry_input.current.value = item.value
                                                        }
                                                        set_show_results(false)

                                                    }}>{item.value}</span>
                                                )
                                            })
                                        }
                                    </div> :
                                    <></>
                                }

                            </div> */}
                        </div>
                        {/* <div>
                            <span>Description (1000 words max)<B /> </span>
                            <textarea
                                className="form-control"
                                value={user_data.description}
                                onChange={(e) => set_user_data({ ...user_data, description: e.target.value })}
                                required
                            ></textarea>
                        </div> */}
                        {/* <div className="mb-2">
                            <span>Street Address<B /></span>
                            <input
                                type="text"
                                className="form-control"
                                value={user_data.street_address}
                                onChange={(e) => set_user_data({ ...user_data, street_address: e.target.value })}
                                required
                            />
                        </div> */}
                        {/* <div className="row">
                            <div className="col-sm mb-2">
                                <span>City<B /></span>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={user_data.city}
                                    onChange={(e) => set_user_data({ ...user_data, city: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="col-sm mb-2">
                                <span>State<B /></span>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={user_data.state}
                                    onChange={(e) => set_user_data({ ...user_data, state: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="col-sm mb-2">
                                <span>Postal Code<B /></span>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={user_data.postal_code}
                                    onChange={(e) => set_user_data({ ...user_data, postal_code: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="col-sm mb-2">
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
                                                <option value={item.name}>{item.name}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                        </div> */}
                        <div className="mb-2">
                            <span>Password <B/></span>
                               <input type="password" className="form-control" minLength={6} value={password} onChange={(e)=>setPassword(e.target.value)} required/> 
                        </div>
                        <div className="mb-2">
                            <span>Repeat Password <B/></span>
                               <input type="password" className="form-control" minLength={6} value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} required/> 
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

export default BusinessOnboarding