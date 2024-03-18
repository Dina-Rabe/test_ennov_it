import * as React from 'react'
import { register } from "../../services/api/UserServices"
import { alertwithcalback, showalert } from "../../services/helpers/AlertComponent"
import { NavLink,useNavigate } from 'react-router-dom'

export default function RegisterScreen() {
    const [isloadign, setIsloadign] = React.useState(false)
    const [registerdata, setRegisterdata] = React.useState({
        email:'',
        password:'',
        username:'',
        password2:'',
        firstname:'',
        lastname:''
    })
    const navigate = useNavigate()
    const handlechangeinput = (e)=>{
        const { name, value } = e.target
        setRegisterdata({ ...registerdata, [name]: value })
    }
    const navigatetoroot = () => {
        navigate("/")
    }
    const handleSubmit = (e)=>{
        e.preventDefault();
        if (registerdata.password !== registerdata.password2) {
            showalert("Error!", "Passwords do not match", "error")
            return false
        }
        setIsloadign(true)
        let data = {
            email: registerdata.email,
            username:registerdata.username,
            password:registerdata.password,
            name:{
                firstname:registerdata.firstname,
                lastname:registerdata.lastname
            }
        }
        register(data).then((data)=> {
            setIsloadign(false)
            if (data.success){
                alertwithcalback(
                    "Registration confirm",
                    `${registerdata.firstname} ${registerdata.lastname},you are registered on our platform. THANKS`,
                    "success", navigatetoroot)
            }
            else {
                showalert("Error!", data.data, "error")
            }
        })
    }
    return(
        <>
            <div className="container">
                <form onSubmit={(e) => handleSubmit(e)} className="user">
                    <div className="card o-hidden border-0 shadow-lg my-5">
                        <div className="card-body p-0">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="p-5">
                                        <div className="text-center">
                                            <h1 className="h4 text-gray-900 mb-4">Create an Account!</h1>
                                        </div>
                                        <div className="form-group row">
                                            <div className="col-sm-6 mb-3 mb-sm-0">
                                                <input type="text" className="form-control form-control-user" id="exampleFirstName"
                                                    placeholder="First Name" onChange={handlechangeinput} name='firstname' required/>
                                            </div>
                                            <div className="col-sm-6">
                                                <input type="text" className="form-control form-control-user" id="exampleLastName"
                                                    placeholder="Last Name" onChange={handlechangeinput} name='lastname' required/>
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <div className="col-sm-6 mb-3 mb-sm-0">
                                                <input type="email" className="form-control form-control-user" id="exampleInputEmail"
                                                    placeholder="Email Address" onChange={handlechangeinput} name='email' required/>
                                            </div>
                                            <div className="col-sm-6">
                                                <input type="text" className="form-control form-control-user" id="exampleInputUsername"
                                                    placeholder="Username" onChange={handlechangeinput} name='username' required/>
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <div className="col-sm-6 mb-3 mb-sm-0">
                                                <input type="password" className="form-control form-control-user"
                                                    id="exampleInputPassword" placeholder="Password" onChange={handlechangeinput}
                                                    name='password' required/>
                                            </div>
                                            <div className="col-sm-6">
                                                <input type="password" className="form-control form-control-user" name='password2'
                                                    id="exampleRepeatPassword" placeholder="Repeat Password" onChange={handlechangeinput} required/>
                                            </div>
                                        </div>
                                        <button type="submit" className="btn btn-primary btn-user btn-block" disabled={isloadign}>
                                            {isloadign && (
                                                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                            )}
                                            Register Account
                                        </button>
                                        <hr></hr>
                                        <div className="text-center">
                                            <NavLink
                                                to="/"
                                                className="small"
                                            >Already have an account? Login!
                                            </NavLink>
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