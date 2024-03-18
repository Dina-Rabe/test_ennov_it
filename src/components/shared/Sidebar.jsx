import { NavLink } from 'react-router-dom'

export default function Sidebar({page}) {
    return (
        <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
            <NavLink
                to="/dashboard"
                className="sidebar-brand d-flex align-items-center justify-content-center"
            >
                <div className="sidebar-brand-icon rotate-n-15">
                    <i className="fas fa-laugh-wink"></i>
                </div>
                <div className="sidebar-brand-text mx-3">SB Admin <sup>2</sup></div>
            </NavLink>

            <hr className="sidebar-divider my-0"></hr>

            <li className={`nav-item ${page === "Dashboard" ? 'active' : ''}`}>
                <NavLink className="nav-link" to="/dashboard">
                    <i className="fas fa-fw fa-tachometer-alt"></i>
                    <span>Dashboard</span></NavLink>
            </li>
            <hr className="sidebar-divider my-0"></hr>

            <li className={`nav-item  ${page === "Product" ? 'active' : ''}`}>
                <NavLink className="nav-link collapsed" to="#" data-bs-toggle="collapse" data-bs-target="#collapseTwo"
                    aria-expanded="true" aria-controls="collapseTwo">
                    <i className="fas fa-fw fa-cog"></i>
                    <span>Produit</span>
                </NavLink>
                <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
                    <div className="bg-white py-2 collapse-inner rounded">
                        <h6 className="collapse-header">Manage product:</h6>
                        <NavLink className="collapse-item" to="/create">Create new</NavLink>
                        <NavLink className="collapse-item" to="/listproduct">Lists</NavLink>
                    </div>
                </div>
            </li>

            <hr className="sidebar-divider d-none d-md-block"></hr>

            <div className="sidebar-card d-none d-lg-flex">
                <p className="text-center mb-2"><strong>SB Admin Pro</strong> is packed with premium features, components, and more!</p>
            </div>

        </ul>
    )
}