import { useEffect, useState } from "react";
import { FaPlus, FaTrash, FaUsers, FaTimes } from "react-icons/fa";
import API from "../api/service";
import { toast } from "react-toastify";

function Projects() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ title: "", description: "" });
  
  const [selectedProject, setSelectedProject] = useState(null);
  const [newMemberId, setNewMemberId] = useState("");

  const getProjects = async () => {
    try {
      setLoading(true);
      const response = await API.get("/projects");
      setProjects(response.data.projects);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getAllUsers = async () => {
    if (user?.role !== "Admin") return;
    try {
      const response = await API.get("/auth/allUsers");
      setUsers(response.data.users);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const createProject = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post("/projects", formData);
      toast.success(response.data.message);
      setFormData({ title: "", description: "" });
      getProjects();
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to create project");
    }
  };

  const deleteProject = async (id) => {
    if (!window.confirm("Delete this project?")) return;
    try {
      await API.delete(`/projects/${id}`);
      toast.success("Project deleted");
      getProjects();
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete project");
    }
  };

  const handleManageTeam = (project) => {
    setSelectedProject(project);
    setNewMemberId("");
  };

  const closeTeamModal = () => {
    setSelectedProject(null);
    setNewMemberId("");
  };

  const addMember = async (e) => {
    e.preventDefault();
    if (!newMemberId) return toast.warning("Please select a user");

    try {
      const response = await API.post(`/projects/${selectedProject.id}/member`, { userId: newMemberId });
      toast.success(response.data.message);
      
      getProjects();
      
      const updatedUser = users.find(u => u.id === parseInt(newMemberId));
      if (updatedUser) {
        setSelectedProject({
          ...selectedProject,
          Users: [...(selectedProject.Users || []), updatedUser]
        });
      }
      setNewMemberId("");
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to add member");
    }
  };

  const removeMember = async (userId) => {
    if (!window.confirm("Remove this member?")) return;
    try {
      const response = await API.delete(`/projects/${selectedProject.id}/member/${userId}`);
      toast.success(response.data.message);
      
      getProjects();
      setSelectedProject({
        ...selectedProject,
        Users: selectedProject.Users.filter(u => u.id !== userId)
      });
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to remove member");
    }
  };

  useEffect(() => {
    getProjects();
    getAllUsers();
  }, []);

  return (
    <div className="container mt-4 position-relative">
      {/* PAGE TITLE */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">Projects Management</h2>
      </div>

      {/* CREATE PROJECT FORM */}
      {user?.role === "Admin" && (
        <div className="card shadow border-0 mb-4">
          <div className="card-body">
            <h4 className="mb-4">
              <FaPlus className="me-2" />
              Create Project
            </h4>
            <form onSubmit={createProject}>
              <div className="row g-3">
                <div className="col-md-5">
                  <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Project Title" className="form-control" required />
                </div>
                <div className="col-md-5">
                  <input type="text" name="description" value={formData.description} onChange={handleChange} placeholder="Description" className="form-control" required />
                </div>
                <div className="col-md-2">
                  <button className="btn btn-primary w-100">Create</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="row">
        {/* PROJECTS TABLE */}
        <div className={`col-md-${selectedProject ? '8' : '12'}`}>
          <div className="card shadow border-0">
            <div className="card-body">
              <h4 className="mb-4">All Projects</h4>
              {loading ? (
                <h5>Loading...</h5>
              ) : (
                <div className="table-responsive">
                  <table className="table table-hover align-middle">
                    <thead className="table-dark">
                      <tr>
                        <th>ID</th>
                        <th>Project</th>
                        <th>Description</th>
                        <th>Team Size</th>
                        <th>Team</th>
                        {user?.role === "Admin" && <th>Actions</th>}
                      </tr>
                    </thead>
                    <tbody>
                      {projects?.length > 0 ? (
                        projects.map((project) => (
                          <tr key={project.id}>
                            <td>{project.id}</td>
                            <td>{project.title}</td>
                            <td>{project.description}</td>
                            <td>
                              <span className="badge bg-primary">
                                {project.Users?.length || 0} Members
                              </span>
                            </td>
                            <td>
                              <button 
                                onClick={() => handleManageTeam(project)}
                                className="btn btn-sm btn-info text-white"
                              >
                                <FaUsers className="me-1"/> View Team
                              </button>
                            </td>
                            {user?.role === "Admin" && (
                              <td>
                                <button onClick={() => deleteProject(project.id)} className="btn btn-danger btn-sm">
                                  <FaTrash />
                                </button>
                              </td>
                            )}
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="6" className="text-center">No Projects Found</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* TEAM MANAGEMENT SIDE PANEL */}
        {selectedProject && (
          <div className="col-md-4">
            <div className="card shadow border-0 position-sticky" style={{top: '20px'}}>
              <div className="card-header bg-white d-flex justify-content-between align-items-center">
                <h5 className="mb-0 fw-bold">Team: {selectedProject.title}</h5>
                <button onClick={closeTeamModal} className="btn btn-sm btn-light">
                  <FaTimes />
                </button>
              </div>
              <div className="card-body">
                {/* Team Members List */}
                <h6 className="fw-semibold text-muted mb-3">Current Members</h6>
                <ul className="list-group mb-4">
                  {selectedProject.Users?.length > 0 ? (
                    selectedProject.Users.map(member => (
                      <li key={member.id} className="list-group-item d-flex justify-content-between align-items-center">
                        <div>
                          <strong>{member.name}</strong>
                          <br/>
                          <small className="text-muted">{member.email}</small>
                        </div>
                        {user?.role === "Admin" && member.id !== selectedProject.adminId && (
                          <button 
                            onClick={() => removeMember(member.id)} 
                            className="btn btn-sm btn-outline-danger"
                            title="Remove Member"
                          >
                            <FaTrash />
                          </button>
                        )}
                      </li>
                    ))
                  ) : (
                    <li className="list-group-item text-center text-muted">No members yet</li>
                  )}
                </ul>

                {/* Add Member Form (Admin Only) */}
                {user?.role === "Admin" && (
                  <>
                    <h6 className="fw-semibold text-muted mb-3">Add New Member</h6>
                    <form onSubmit={addMember} className="d-flex gap-2">
                      <select 
                        className="form-select form-select-sm" 
                        value={newMemberId} 
                        onChange={(e) => setNewMemberId(e.target.value)}
                        required
                      >
                        <option value="">Select User</option>
                        {users.filter(u => !selectedProject.Users?.find(member => member.id === u.id)).map(u => (
                          <option key={u.id} value={u.id}>{u.name} ({u.email})</option>
                        ))}
                      </select>
                      <button type="submit" className="btn btn-sm btn-primary">Add</button>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Projects;
