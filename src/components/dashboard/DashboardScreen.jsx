import { Sidebar, TopBar, CardDashboard, LineChart} from "../shared"
import { fetchProduct, fetchCategorie } from "../../services/api/ProductServices"
import { fetchCart } from "../../services/api/DasboardServices"
import React, { useState, useEffect, useCallback } from 'react';



export default function DashboardScreen() {
    const [categorie, setCategorie] = useState([])
    const [cartdata, setCartdata] = useState({
        labels: [],
        value:[]
    })
    const groupByMonthAndYear = useCallback( (data)=>{
        const groupedData = {};
    
        data.forEach(item => {
            const date = new Date(item.date);
            const month = date.getMonth() + 1;
            const year = date.getFullYear();
    
            const key = `0${month}-${year}`;
            if (!groupedData[key]) {
                groupedData[key] = 0;
            }
    
            item.products.forEach(product => {
                groupedData[key] += product.quantity;
            });
        });

        const dataArray = Object.keys(groupedData).map(key => ({
            key,
            totalQuantity: groupedData[key]
        }));

        dataArray.sort((a, b) => a.key.localeCompare(b.key));
        
        return {
            labels : dataArray.map(x=> x.key), values : dataArray.map(x=> x.totalQuantity)
        };
    }, [])
    useEffect(() => {
        const fetchData = async () => {
            let productall = await fetchProduct();
            productall = productall.data;
            let categorieall = await fetchCategorie();
            let cart = await fetchCart();
            categorieall = categorieall.data;
            let classement = []
            for (let index = 0; index < categorieall.length; index++) {
                const element = categorieall[index];
                classement[element] = productall.filter(pr=>{
                    return (pr.category === element)
                })
            }
            const result = Object.entries(classement).map(([key, value]) => {
                const uniqueValues = [...new Set(value)];
                return { category: key, nombre: uniqueValues.length };
            });
            setCategorie(result)
            setCartdata(groupByMonthAndYear(cart.data))
        };
        fetchData();
    }, [setCategorie, groupByMonthAndYear, setCartdata ]);
    return (
        <>
            <div id="page-top">
                <div id="wrapper">
                    <Sidebar page="Dashboard" />
                    <div id="content-wrapper" className="d-flex flex-column">
                        <div id="content">
                            <TopBar />
                            <div className="container-fluid">
                                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                                    <h1 className="h3 mb-0 text-gray-800">Dashboard</h1>
                                </div>
                                <div className="row">
                                    {categorie.map((item, index) => (
                                        <CardDashboard
                                            key={index}
                                            libelle={item.category}
                                            nombre={item.nombre}
                                        />
                                    ))}
                                </div>
                                <div className="row">
                                    <div className="col-xl-12 col-lg-12">
                                        <div className="card shadow mb-4">
                                            <div
                                                className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                                <h6 className="m-0 font-weight-bold text-primary">Cart Overview</h6>
                                            </div>
                                            <div className="card-body">
                                                <div className="chart-area">
                                                 <LineChart data={cartdata} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        </>
    )
}