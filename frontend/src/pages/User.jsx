import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FaEdit,
  FaTrash,
  FaPlus,
  FaSearch,
} from "react-icons/fa";
import { toast } from "react-toastify";
import { addUser, getAllUser, updateUser, deleteUser } from "../api/service";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({name: "",email: "",password: "",role: "Member",});
  const [editId, setEditId] = useState(null);
  const token = localStorage.getItem("token");

  const fetchUsers = async () => {
    try {
      const res = await getAllUser();
      if (res.data.success) {
        setUsers(res.data.users);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editId) {
        const res = await updateUser(
          editId,
          formData,
          token
        );

        if (res.data.success) {
          toast.success("User updated successfully");
          fetchUsers();
        }
      }

      else {
         const res = await addUser(
          formData
        );

        if (res.data.success) {
          toast.success("User added successfully");
          fetchUsers();
        }
      }

      setFormData({
        name: "",
        email: "",
        password: "",
        role: "Member",
      });

      setEditId(null);
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const handleEdit = (user) => {
    setEditId(user.id);

    setFormData({
      name: user.name,
      email: user.email,
      password: "",
      role: user.role,
    });
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (!confirmDelete) return;

    try {
      const res = await deleteUser(id, token);

      if (res.data.success) {
        toast.success("User deleted successfully");
        fetchUsers();
      }
    } catch (error) {
      console.log(error);
      toast.error("Delete failed");
    }
  };

  // Search Filter
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container py-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold">Manage Users</h2>
          <p className="text-muted mb-0">
            Create, update and delete users
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              {/* Name */}
              <div className="col-md-6">
                <label className="form-label">
                  Name
                </label>

                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Email */}
              <div className="col-md-6">
                <label className="form-label">
                  Email
                </label>

                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Password */}
              <div className="col-md-6">
                <label className="form-label">
                  Password
                </label>

                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required={!editId}
                />
              </div>

              {/* Role */}
              <div className="col-md-6">
                <label className="form-label">
                  Role
                </label>

                <select
                  className="form-select"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                >
                  <option value="Member">Member</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>

              {/* Button */}
              <div className="col-12">
                <button className="btn btn-primary d-flex align-items-center gap-2">
                  <FaPlus />

                  {editId
                    ? "Update User"
                    : "Add User"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Search */}
      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body">
          <div className="input-group">
            <span className="input-group-text bg-white border-end-0">
              <FaSearch />
            </span>

            <input
              type="text"
              className="form-control border-start-0"
              placeholder="Search users..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="card border-0 shadow-sm">
        <div className="card-body table-responsive">
          {loading ? (
            <div className="text-center py-4">
              Loading...
            </div>
          ) : (
            <table className="table align-middle">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredUsers.map((user, index) => (
                  <tr key={user.id}>
                    <td>{index + 1}</td>

                    <td>{user.name}</td>

                    <td>{user.email}</td>

                    <td>
                      <span
                        className={`badge ${
                          user.role === "Admin"
                            ? "bg-danger"
                            : "bg-success"
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>

                    <td>
                      <div className="d-flex gap-2">
                        {/* Edit */}
                        <button
                          className="btn btn-sm btn-warning"
                          onClick={() =>
                            handleEdit(user)
                          }
                        >
                          <FaEdit />
                        </button>

                        {/* Delete */}
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() =>
                            handleDelete(user.id)
                          }
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {/* Empty */}
          {!loading &&
            filteredUsers.length === 0 && (
              <div className="text-center py-4">
                No Users Found
              </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default Users;