import React, { useEffect, useState } from "react";
import {
  FaCheckCircle,
  FaClock,
  FaSpinner,
  FaSearch,
  FaPlus,
  FaTrash
} from "react-icons/fa";
import { toast } from "react-toastify";
import API from "../api/service";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);
  
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "Medium",
    assignedTo: "",
    projectId: ""
  });

  const user = JSON.parse(localStorage.getItem("user"));
  const isAdmin = user?.role === "Admin";

  const fetchData = async () => {
    try {
      setLoading(true);
      const [tasksRes, projectsRes, usersRes] = await Promise.all([
        API.get("/tasks"),
        API.get("/projects"),
        API.get("/auth/allUsers")
      ]);

      if (tasksRes.data.success) setTasks(tasksRes.data.tasks);
      if (projectsRes.data.success) setProjects(projectsRes.data.projects);
      if (usersRes.data.success) setUsers(usersRes.data.users);
      
    } catch (error) {
      console.log(error);
      toast.error("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const createTask = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/tasks", formData);
      if (res.data.success) {
        toast.success("Task created successfully");
        setFormData({
          title: "",
          description: "",
          dueDate: "",
          priority: "Medium",
          assignedTo: "",
          projectId: ""
        });
        fetchData();
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to create task");
    }
  };

  const updateStatus = async (taskId, status) => {
    try {
      const res = await API.put(`/tasks/${taskId}`, { status });
      if (res.data.success) {
        toast.success("Task status updated");
        fetchData();
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to update status");
    }
  };

  const deleteTask = async (taskId) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;
    try {
      const res = await API.delete(`/tasks/${taskId}`);
      if (res.data.success) {
        toast.success("Task deleted");
        fetchData();
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete task");
    }
  };

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(search.toLowerCase())
  );

  const getStatusIcon = (status) => {
    switch (status) {
      case "Completed": return <FaCheckCircle className="text-success" />;
      case "In Progress": return <FaSpinner className="text-warning" />;
      default: return <FaClock className="text-secondary" />;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High": return "danger";
      case "Medium": return "warning";
      default: return "success";
    }
  };

  return (
    <div className="container py-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold">Tasks</h2>
          <p className="text-muted mb-0">Manage all project tasks</p>
        </div>
      </div>

      {/* CREATE TASK FORM (Admin Only) */}
      {isAdmin && (
        <div className="card shadow border-0 mb-4">
          <div className="card-body">
            <h4 className="mb-4">
              <FaPlus className="me-2" />
              Create Task
            </h4>
            <form onSubmit={createTask}>
              <div className="row g-3">
                <div className="col-md-4">
                  <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Task Title" className="form-control" required />
                </div>
                <div className="col-md-4">
                  <input type="date" name="dueDate" value={formData.dueDate} onChange={handleChange} className="form-control" required />
                </div>
                <div className="col-md-4">
                  <select name="priority" value={formData.priority} onChange={handleChange} className="form-select">
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
                <div className="col-md-4">
                  <select name="projectId" value={formData.projectId} onChange={handleChange} className="form-select" required>
                    <option value="">Select Project</option>
                    {projects.map(p => <option key={p.id} value={p.id}>{p.title}</option>)}
                  </select>
                </div>
                <div className="col-md-4">
                  <select name="assignedTo" value={formData.assignedTo} onChange={handleChange} className="form-select" required>
                    <option value="">Assign To</option>
                    {users.map(u => <option key={u.id} value={u.id}>{u.name} ({u.email})</option>)}
                  </select>
                </div>
                <div className="col-md-4">
                  <button type="submit" className="btn btn-primary w-100">Create Task</button>
                </div>
                <div className="col-12">
                  <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Task Description" className="form-control" rows="2" required></textarea>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Search */}
      <div className="card shadow-sm border-0 mb-4">
        <div className="card-body">
          <div className="input-group">
            <span className="input-group-text bg-white border-end-0">
              <FaSearch />
            </span>
            <input type="text" className="form-control border-start-0" placeholder="Search tasks..." value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
        </div>
      </div>

      {/* Loading */}
      {loading ? (
        <div className="text-center py-5">
          <h5>Loading Tasks...</h5>
        </div>
      ) : (
        <div className="row g-4">
          {filteredTasks.map((task) => (
            <div className="col-md-6 col-lg-4" key={task.id}>
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body d-flex flex-column">
                  {/* Title */}
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <h5 className="fw-bold">{task.title}</h5>
                    <span className={`badge bg-${getPriorityColor(task.priority)}`}>
                      {task.priority}
                    </span>
                  </div>

                  <p className="text-muted small">{task.description}</p>

                  <div className="mb-2"><small className="fw-semibold">Project:</small> {task.Project?.title}</div>
                  <div className="mb-2"><small className="fw-semibold">Assigned To:</small> {task.User?.name}</div>
                  <div className="mb-3"><small className="fw-semibold">Due Date:</small> {new Date(task.dueDate).toLocaleDateString()}</div>

                  {/* Footer */}
                  <div className="mt-auto border-top pt-3">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <div className="d-flex align-items-center gap-2">
                        {getStatusIcon(task.status)}
                        <span className="small fw-semibold">{task.status}</span>
                      </div>
                      
                      {isAdmin && (
                        <button onClick={() => deleteTask(task.id)} className="btn btn-sm btn-danger">
                          <FaTrash />
                        </button>
                      )}
                    </div>
                    
                    <select 
                      className="form-select form-select-sm" 
                      value={task.status} 
                      onChange={(e) => updateStatus(task.id, e.target.value)}
                    >
                      <option value="Pending">Pending</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && filteredTasks.length === 0 && (
        <div className="text-center py-5">
          <h5>No Tasks Found</h5>
        </div>
      )}
    </div>
  );
};

export default Tasks;