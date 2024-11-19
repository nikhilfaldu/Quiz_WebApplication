import React from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';


const Sidebar = () => {
    

    const username = Cookies.get('username');
    const role=Cookies.get('user');

    return (
        <div className="col-md-3 col-lg-2 sidebar-offcanvas pl-0" id="sidebar" role="navigation" style={{ backgroundColor: "#e9ecef" }}>
            <ul className="nav flex-column sticky-top pl-0 pt-5 p-3 mt-3 ">
 
                    <li className="nav-item mb-2 mt-3">
                            <a className="nav-link text-secondary" href="#">
                                <h5> {username}</h5>
                            </a>
                        </li>
                        <li className="nav-item mb-2">
                            <Link className="nav-link text-secondary" to="/dashboard">
                                <i className="fas fa-home font-weight-bold"></i> <span className="ml-3">Dashboard</span>
                            </Link>
                        </li>
                        <li className="nav-item mb-2">
                            <Link className="nav-link text-secondary" to="/Allinfo">
                                <i className="far fa-book font-weight-bold"></i> <span className="ml-3">Uerresult</span>
                            </Link>
                        </li>
                        <li className="nav-item mb-2">
                            <Link className="nav-link text-secondary" to="/paneluser">
                                <i className="far fa-book font-weight-bold"></i> <span className="ml-3">Paneluser</span>
                            </Link>
                        </li>
                        {role=="superadmin" && (
                            <li className="nav-item mb-2">
                            <Link className="nav-link text-secondary" to="/addpaneluser">
                                <i className="far fa-book font-weight-bold"></i> <span className="ml-3">addpaneluser</span>
                            </Link>
                        </li>
                        )}
                       
                        <li className="nav-item mb-2">
                            <Link className="nav-link text-secondary" to="/userdetails">
                                <i className="far fa-book font-weight-bold"></i> <span className="ml-3">userdetails</span>
                            </Link>
                        </li>
                        <li className="nav-item mb-2">
                            <Link className="nav-link text-secondary" to="/">
                                <i className="far fa-book font-weight-bold"></i> <span className="ml-3">logout</span>
                            </Link>
                        </li>
                      
                        
            </ul>
        </div>
    );
};

export default Sidebar;
