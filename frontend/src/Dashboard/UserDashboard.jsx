import React, { useEffect, useState } from "react";
import API from "../api/service";
import {
  FaTasks,
  FaProjectDiagram,
  FaCheckCircle,
  FaClock,
  FaChartBar,
  FaSignOutAlt,
} from "react-icons/fa";

import { Link } from "react-router-dom";

function UserDashboard() {

  const [dashboardData, setDashboardData] =
    useState(null);

  const [loading, setLoading] = useState(true);

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const token = localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.location.href = "/login";
  };

  const fetchDashboard = async () => {
    try {
      const [dashRes, tasksRes, projectsRes] = await Promise.all([
        API.get("/dashboard"),
        API.get("/tasks"),
        API.get("/projects")
      ]);

      setDashboardData({
        ...dashRes.data.dashboard,
        tasks: tasksRes.data.tasks || [],
        projects: projectsRes.data.projects || []
      });

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  return (
    <div className="container mt-4">
      {loading ? (
        <div className="text-center py-5">
          <h5>Loading Dashboard...</h5>
        </div>
      ) : (
        <>
          {/* DASHBOARD CARDS */}
          <div className="row g-4">
            {/* Total Tasks */}
            <div className="col-md-3">
              <div className="card border-0 shadow-sm">
                <div className="card-body text-center">
                  <FaTasks className="text-primary mb-3" size={35} />
                  <h5>Total Tasks</h5>
                  <h2 className="fw-bold">{dashboardData?.totalTasks || 0}</h2>
                </div>
              </div>
            </div>

            {/* Completed */}
            <div className="col-md-3">
              <div className="card border-0 shadow-sm">
                <div className="card-body text-center">
                  <FaCheckCircle className="text-success mb-3" size={35} />
                  <h5>Completed</h5>
                  <h2 className="fw-bold">{dashboardData?.completedTasks || 0}</h2>
                </div>
              </div>
            </div>

            {/* Pending */}
            <div className="col-md-3">
              <div className="card border-0 shadow-sm">
                <div className="card-body text-center">
                  <FaClock className="text-warning mb-3" size={35} />
                  <h5>Pending</h5>
                  <h2 className="fw-bold">{dashboardData?.pendingTasks || 0}</h2>
                </div>
              </div>
            </div>

            {/* Projects */}
            <div className="col-md-3">
              <div className="card border-0 shadow-sm">
                <div className="card-body text-center">
                  <FaProjectDiagram className="text-danger mb-3" size={35} />
                  <h5>Projects</h5>
                  <h2 className="fw-bold">{dashboardData?.projects?.length || 0}</h2>
                </div>
              </div>
            </div>
          </div>

          {/* MY TASKS */}
          <div className="card border-0 shadow-sm mt-5">
            <div className="card-body">
              <h4 className="mb-4">My Tasks</h4>
              <div className="table-responsive">
                <table className="table table-hover align-middle">
                  <thead>
                    <tr>
                      <th>Task</th>
                      <th>Project</th>
                      <th>Status</th>
                      <th>Priority</th>
                      <th>Due Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dashboardData?.tasks?.length > 0 ? (
                      dashboardData.tasks.map((task) => (
                        <tr key={task.id}>
                          <td>{task.title}</td>
                          <td>{task.Project?.title}</td>
                          <td>
                            <span
                              className={`badge ${
                                task.status === "Completed"
                                  ? "bg-success"
                                  : task.status === "In Progress"
                                  ? "bg-warning"
                                  : "bg-secondary"
                              }`}
                            >
                              {task.status}
                            </span>
                          </td>
                          <td>
                            <span
                              className={`badge ${
                                task.priority === "High"
                                  ? "bg-danger"
                                  : task.priority === "Medium"
                                  ? "bg-primary"
                                  : "bg-success"
                              }`}
                            >
                              {task.priority}
                            </span>
                          </td>
                          <td>{new Date(task.dueDate).toLocaleDateString()}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="text-center">
                          No Tasks Found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* MY PROJECTS */}
          <div className="card border-0 shadow-sm mt-5">
            <div className="card-body">
              <h4 className="mb-4">My Projects</h4>
              <div className="row g-4">
                {dashboardData?.projects?.length > 0 ? (
                  dashboardData.projects.map((project) => (
                    <div className="col-md-4" key={project.id}>
                      <div className="card border shadow-sm h-100">
                        <div className="card-body">
                          <h5 className="fw-bold">{project.title}</h5>
                          <p className="text-muted">{project.description}</p>
                          <div className="mt-3">
                            <span className="badge bg-primary">{project.status}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center">No Projects Found</div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default UserDashboard;