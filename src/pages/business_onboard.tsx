import { FormEvent, useState, useRef } from "react"
import { BusinessType, business_default, BusinessSchema } from "../schemas/business_schema"
import { search } from "ss-search"
import { toast, ToastContainer } from "react-toastify"
import countries from "../data/countries.json"
import categories from "../data/categories.json"
import B from "../components/required"
import { AuthenticateError, InternalError, ParseFailed } from "../components/texts"
import { useNavigate } from "react-router-dom"
import { useKindeAuth } from "@kinde-oss/kinde-auth-react"
import axios from "axios"
import { api } from "../api/server_link"

const BusinessOnboarding = () => {
    const { user } = useKindeAuth()
    const nav = useNavigate()
    const [user_data, set_user_data] = useState<BusinessType>(business_default)
    const [industry_result, set_industry_result] = useState<Array<{ value: string, label: string }>>([])
    const [show_results, set_show_results] = useState<boolean>(false)
    const [loading, set_loading] = useState<boolean>(false)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const industry_input: any = useRef(null)
    const handle_submit = async (e: FormEvent) => {
        e.preventDefault()
        set_loading(true)
        try {
            if (user_data.industry.length === 0) {
                return toast("Industry Required")
            }
            const access_token = sessionStorage.getItem("token")
            if (access_token === null && user === undefined) {
                toast(AuthenticateError)
                return setTimeout(() => nav("/"), 5000)
            }

            if (!BusinessSchema.safeParse(user_data).success) {
                return toast(ParseFailed)
            }
            const data = { ...user_data, user_id: user?.id, email: user?.email }
            const request = await axios.post(`${api}onboarding/business`, data, {
                headers: {
                    Authorization: `Bearer ${access_token}`
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

    const handle_industry_search = (e: string) => {
        if (e.length > 2) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const data: { value: string, label: string }[] | any = search(categories, ["value"], e)
            if (data.length > 0) {
                set_industry_result(data)
                set_show_results(true)
            } else {
                set_show_results(false)
            }

        } else {
            set_show_results(false)
        }
    }
    return (
        <div className="min-vh-100  d-flex align-items-center justify-content-center">
            <div className="container">

                <div className="text-center">
                    <img src="https://ngratesc.sirv.com/Purple%20Pages/logo.png" className="img-fluid" width={"100"} alt="Purple Pages Logo" />
                </div>
                <div className="text-center">
                    <h1 className="fw-bold">Lets Get Your Business <u className="p_text">Ready!</u></h1>
                    <p>Fill in the details to get your account ready</p>
                </div>
                <div>
                    <form onSubmit={handle_submit}>
                        <div className="row">
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
                                <input
                                    type="text"
                                    className="form-control"
                                    value={user_data.contact_number}
                                    onChange={(e) => set_user_data({ ...user_data, contact_number: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="col-sm mb-2 position-relative w-100">
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

                            </div>
                        </div>
                        <div>
                            <span>Description (1000 words max)<B /> </span>
                            <textarea
                                className="form-control"
                                value={user_data.description}
                                onChange={(e) => set_user_data({ ...user_data, description: e.target.value })}
                                required
                            ></textarea>
                        </div>
                        <div className="mb-2">
                            <span>Street Address<B /></span>
                            <input
                                type="text"
                                className="form-control"
                                value={user_data.street_address}
                                onChange={(e) => set_user_data({ ...user_data, street_address: e.target.value })}
                                required
                            />
                        </div>
                        <div className="row">
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
                                    {
                                        countries.map((item) => {
                                            return (
                                                <option value={item.name}>{item.name}</option>
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
                            <button type="submit" className="btn p_btn" disabled={loading}>Onboard</button>
                        </div>
                    </form>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}

export default BusinessOnboarding