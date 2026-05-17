import { Link, Outlet, useNavigate } from "react-router-dom";

import { FaTasks, FaProjectDiagram, FaUsers, FaChartBar, FaSignOutAlt } from "react-icons/fa";
import { useEffect } from "react";
import { getDashboardDetail } from "../api/service";
import { useState } from "react";

function Dashboard() {

    const [DashboardDetail, setDashboardDetail] = useState();
    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = "/login";
    };
    const getDetail = async () => {
        try {
            const dashboardData =
                await getDashboardDetail(token);
            console.log(dashboardData);
            setDashboardDetail(
                dashboardData.data.dashboard
            );
        }
        catch (error) {
            console.log(error);
        }

    }

    useEffect(() => {
        getDetail();
    }, []);

    return (
        <div className="container mt-4">
            <div className="row g-4">
                {/* Total Tasks */}
                <div className="col-md-3">
                    <div className="card shadow border-0">
                        <div className="card-body text-center">
                            <h5>Total Tasks</h5>
                            <h2 className="fw-bold text-primary">
                                {DashboardDetail?.totalTasks}
                            </h2>
                        </div>
                    </div>
                </div>

                {/* Completed */}
                <div className="col-md-3">
                    <div className="card shadow border-0">
                        <div className="card-body text-center">
                            <h5>Completed</h5>
                            <h2 className="fw-bold text-success">
                                {DashboardDetail?.completedTasks}
                            </h2>
                        </div>
                    </div>
                </div>

                {/* In Progress */}
                <div className="col-md-3">
                    <div className="card shadow border-0">
                        <div className="card-body text-center">
                            <h5>In Progress</h5>
                            <h2 className="fw-bold text-warning">
                                {DashboardDetail?.inProgressTasks}
                            </h2>
                        </div>
                    </div>
                </div>

                {/* Pending */}
                <div className="col-md-3">
                    <div className="card shadow border-0">
                        <div className="card-body text-center">
                            <h5>Pending</h5>
                            <h2 className="fw-bold text-danger">
                                {DashboardDetail?.pendingTasks}
                            </h2>
                        </div>
                    </div>
                </div>
            </div>

            {/* RECENT TASKS TABLE */}
            <div className="card shadow border-0 mt-5">
                <div className="card-body">
                    <h4 className="mb-4">Recent Tasks</h4>
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th>Task</th>
                                <th>Assigned To</th>
                                <th>Status</th>
                                <th>Priority</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Frontend UI</td>
                                <td>Anjali</td>
                                <td>
                                    <span className="badge bg-warning">In Progress</span>
                                </td>
                                <td>
                                    <span className="badge bg-danger">High</span>
                                </td>
                            </tr>
                            <tr>
                                <td>Backend APIs</td>
                                <td>Rahul</td>
                                <td>
                                    <span className="badge bg-success">Done</span>
                                </td>
                                <td>
                                    <span className="badge bg-primary">Medium</span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );

}

export default Dashboard;
