import { FormEvent, useState } from "react"
import { user_default, UserType, UserSchema } from "../schemas/user_schema"
import { toast, ToastContainer } from "react-toastify"
import { AuthenticateError, InternalError, ParseFailed } from "../components/texts"
import { useKindeAuth } from "@kinde-oss/kinde-auth-react"
import { useNavigate } from "react-router-dom"
import { api } from "../api/server_link"
import countries from "../data/countries.json"
import B from "../components/required"
import axios from "axios"


const UserOnboarding = () => {
    const nav = useNavigate()
    const { user } = useKindeAuth()
    const [user_data, set_user_data] = useState<UserType>(user_default)
    const [loading, set_loading] = useState<boolean>(false)

    const handle_submit = async (e: FormEvent) => {
        e.preventDefault()
        set_loading(true)
        try {
            const access_token = sessionStorage.getItem("token")
            if (access_token === null && user === undefined) {
                toast(AuthenticateError)
                return setTimeout(() => nav("/"), 5000)
            }

            if (!UserSchema.safeParse(user_data).success) {
                return toast(ParseFailed)
            }
            const data = { ...user_data, user_id: user?.id, email: user?.email }
            const request = await axios.post(`${api}onboarding/user`, data, {
                headers: {
                    Authorization: `${access_token}`
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
                                    value={user?.email as string}
                                    disabled
                                    required
                                />
                            </div>
                            <div className="col-sm">
                                <span>Contact Number<B /></span>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={user_data.contact_number}
                                    placeholder="+263 ********"
                                    onChange={(e) => set_user_data({ ...user_data, contact_number: e.target.value })}
                                    required
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
                            <button type="submit" className="btn p_btn" disabled={loading}>Onboard</button>
                        </div>
                    </form>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}

export default UserOnboarding