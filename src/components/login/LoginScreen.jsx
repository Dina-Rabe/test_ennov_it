import * as React from 'react'
import { showalert } from "../../services/helpers/AlertComponent"
import { NavLink,useNavigate } from 'react-router-dom'
import { setCookie } from '../../services/helpers/CoockieService'
import { login } from "../../services/api/UserServices"


export default function LoginScreen() {
    const navigate = useNavigate()
    const [username, setUsername] = React.useState("")
    const [password, setPassword] = React.useState("")
    const [isloadign, setIsloadign] = React.useState(false)
    const handleSubmit = (e)=>{
        e.preventDefault();
        setIsloadign(true)
        login(username, password).then((data)=> {
            setIsloadign(false)
            if (data.success){
                setCookie("token", data.data.token)
                setCookie("username", username)
                navigate('/dashboard')
            }
            else {
                showalert("Error!", data.data, "error")
            }
        })
    }
    return(
        <>
        <div className={"container"}>
        <form onSubmit={(e)=> handleSubmit(e)} className={"user"}>
            <div className={"row justify-content-center"}>
                <div className={"col-xl-6 col-lg-12 col-md-9"}>
                    <div className={"card o-hidden border-0 shadow-lg my-5"}>
                        <div className={"card-body p-0"}>
                            <div className={"row"}>
                                <div className={"col-lg-12"}>
                                    <div className={"p-5"}>
                                        <div className={"text-center"}>
                                            <h1 className={"h4 text-gray-900 mb-4"}>Welcome Back!</h1>
                                        </div>
                                        <div className={"form-group"}>
                                            <input type="test" className={"form-control form-control-user"}
                                                id="exampleInputEmail" aria-describedby="emailHelp" required
                                                placeholder="Enter username..." onChange={(e)=> setUsername(e.target.value)}/>
                                        </div>
                                        <div className={"form-group"}>
                                            <input type="password" className={"form-control form-control-user"} required
                                                id="exampleInputPassword" placeholder="Password" onChange={(e)=> setPassword(e.target.value)}/>
                                        </div>
                                        <button type='submit' className={"btn btn-primary btn-user btn-block"} disabled={isloadign}>
                                            {isloadign && (
                                                <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                            )}
                                            Login
                                        </button>
                                        <hr></hr>
                                        <div className={"text-center"}>
                                            <NavLink
                                                to="/register"
                                                className={"small"}
                                            >Create an Account!
                                            </NavLink>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>

        </div>
        </>
    )
}