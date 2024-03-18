import { Sidebar, TopBar} from "../shared"
import { postProduct, fetchCategorie } from "../../services/api/ProductServices"
import { alertwithcalback, showalert } from "../../services/helpers/AlertComponent"
import * as React from 'react'
import { useNavigate } from 'react-router-dom'

export default function CreateProductScreen() {
    const navigate = useNavigate()
    const [isloadign, setIsloadign] = React.useState(false)
    const [categorie, setCategorie] = React.useState([])
    const [registerdata, setRegisterdata] = React.useState({
        title:'',
        category:'',
        price:0,
        image:'',
        description:'',
    })
    React.useEffect(() => {
        const fetchData = async () => {
            let categorieall = await fetchCategorie();
            setCategorie(categorieall.data)
        };
        fetchData();
    }, [setCategorie ]);
    const handlechangeinput = (e)=>{
        const { name, value } = e.target
        setRegisterdata({ ...registerdata, [name]: value })
    }
    const navigatetoroot = () => {
        navigate("listproduct")
    }
    const handleSubmit = (e)=>{
        e.preventDefault();
        setIsloadign(true)
        postProduct(registerdata).then((data)=> {
            setIsloadign(false)
            if (data.success){
                alertwithcalback(
                    "Create product",
                    `the product ${registerdata.title}, has been saved.`,
                    "success", navigatetoroot)
            }
            else {
                showalert("Error!", data.data, "error")
            }
        })
    }
    return (
        <>
            <div id="page-top">
                <div id="wrapper">
                    <Sidebar page="Product" />
                    <div id="content-wrapper" className="d-flex flex-column">
                        <div id="content">
                            <TopBar />
                            <div className="container-fluid">
                                <form onSubmit={(e) => handleSubmit(e)} className="user">
                                    <div className="d-sm-flex align-items-center justify-content-between mb-4">
                                        <h1 className="h3 mb-0 text-gray-800">Create product</h1>
                                    </div>
                                    <div className="form-group row">
                                        <div className="col-sm-6 mb-3 mb-sm-0">
                                            <input type="text" className="form-control form-control-user"
                                                placeholder="Title" onChange={handlechangeinput} name='title' required/>
                                        </div>
                                        <div className="col-sm-6">
                                            <select className="form-control form-control-user" onChange={handlechangeinput} name='category'>
                                                {
                                                    categorie.map((item, index) => (
                                                        <option key={index} value="{item}">{item}</option>
                                                    ))
                                                }
                                            </select>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <div className="col-sm-6 mb-3 mb-sm-0">
                                            <input type="number" className="form-control form-control-user"
                                                placeholder="Price" onChange={handlechangeinput} name='price' required/>
                                        </div>
                                        <div className="col-sm-6">
                                            <input type="text" className="form-control form-control-user"
                                                placeholder="Image url" onChange={handlechangeinput} name='image' required/>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <div className="col-sm-12 mb-3 mb-sm-0">
                                            <textarea name="description" className="form-control form-control-user" onChange={handlechangeinput} placeholder="description"></textarea>
                                        </div>
                                    </div>
                                    <button type="submit" className="btn btn-primary btn-user btn-block" disabled={isloadign}>
                                        {isloadign && (
                                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                        )}
                                        Save
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        </>
    )
}
