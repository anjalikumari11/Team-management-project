import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaTasks, FaProjectDiagram, FaUsers, FaChartBar, FaSignOutAlt } from 'react-icons/fa';

function Sidebar() {
    const user = JSON.parse(localStorage.getItem('user'));
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
    };

    return (
        <div className="col-md-2 bg-dark text-white min-vh-100">
            <div className="p-3 border-bottom">
                <h3 className="fw-bold text-center">
                    {user?.role === 'Admin' ? 'Admin Panel' : 'User Panel'}
                </h3>
            </div>
            <div className="p-3">
                <ul className="nav flex-column gap-2">
                    {/* Dashboard */}
                    <li className="nav-item">
                        <Link
                            to={user?.role === 'Admin' ? '/dashboard' : '/user-dashboard'}
                            className="nav-link text-white"
                        >
                            <FaChartBar className="me-2" />
                            Dashboard
                        </Link>
                    </li>

                    {/* Projects */}
                    <li className="nav-item">
                        <Link to="/projects" className="nav-link text-white">
                            <FaProjectDiagram className="me-2" />
                            {user?.role === 'Admin' ? 'Projects' : 'My Projects'}
                        </Link>
                    </li>

                    {/* Tasks */}
                    <li className="nav-item">
                        <Link to="/tasks" className="nav-link text-white">
                            <FaTasks className="me-2" />
                            {user?.role === 'Admin' ? 'Tasks' : 'My Tasks'}
                        </Link>
                    </li>

                    {/* Users (Admin Only) */}
                    {user?.role === 'Admin' && (
                        <li className="nav-item">
                            <Link to="/users" className="nav-link text-white">
                                <FaUsers className="me-2" />
                                Users
                            </Link>
                        </li>
                    )}

                    {/* Logout */}
                    <li className="nav-item mt-4">
                        <button onClick={logout} className="btn btn-danger w-100">
                            <FaSignOutAlt className="me-2" />
                            Logout
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Sidebar;
