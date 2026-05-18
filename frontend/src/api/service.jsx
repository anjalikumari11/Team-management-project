import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const API = axios.create({
  baseURL: BASE_URL
});


// Add token automatically
API.interceptors.request.use((req)=>{

  const token =
    localStorage.getItem("token");

  if(token){

    req.headers.Authorization =
      `Bearer ${token}`;

  }

  return req;

});


export default API;



export const getDashboardDetail = async (token) => {

    return axios.get(
        `${BASE_URL}/dashboard`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

}
export const getTaskDetail = async (token) => {

    return axios.get(
        `${BASE_URL}/tasks`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );
}

export const getAllUser = async () => {
  return axios.get(`${BASE_URL}/auth/allUsers`);
};

export const addUser = async (data) => {
  return axios.post(`${BASE_URL}/auth/signup`,data);
}

export const updateUser = async (id, data, token) => {
  return axios.put(`${BASE_URL}/users/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` }
  });
}

export const deleteUser = async (id, token) => {
  return axios.delete(`${BASE_URL}/users/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
}

export const createTask = async (data, token) => {
  return axios.post(`${BASE_URL}/tasks`, data, {
    headers: { Authorization: `Bearer ${token}` }
  });
}

export const updateTaskStatus = async (taskId, status, token) => {
  return axios.put(`${BASE_URL}/tasks/${taskId}`, { status }, {
    headers: { Authorization: `Bearer ${token}` }
  });
}

export const deleteTaskApi = async (taskId, token) => {
  return axios.delete(`${BASE_URL}/tasks/${taskId}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
}

export const addProjectMember = async (projectId, userId, token) => {
  return axios.post(`${BASE_URL}/projects/${projectId}/member`, { userId }, {
    headers: { Authorization: `Bearer ${token}` }
  });
}

export const removeProjectMember = async (projectId, userId, token) => {
  return axios.delete(`${BASE_URL}/projects/${projectId}/member/${userId}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
}
