import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';

function Layout() {
    const user = JSON.parse(localStorage.getItem('user'));

    return (
        <div className="container-fluid p-0">
            <div className="row g-0">
                <Sidebar />
                {/* MAIN CONTENT */}
                <div className="col-md-10 bg-light min-vh-100">
                    {/* TOP NAVBAR */}
                    <div className="bg-white shadow-sm p-3 d-flex justify-content-between align-items-center">
                        <h4 className="mb-0">
                            Welcome {user?.name}
                        </h4>
                        <div>
                            <span className="badge bg-primary fs-6 text-uppercase">
                                {user?.role}
                            </span>
                        </div>
                    </div>
                    
                    {/* PAGE CONTENT */}
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export default Layout;
