import React from 'react'
import Login from './Login'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Dashboard from './Dashboard/Dashboard'
import Projects from './pages/Projects'
import Tasks from './pages/Tasks'
import Users from './pages/User'
import UserDashboard from './Dashboard/UserDashboard'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import Layout from './components/Layout/Layout'

import PublicRoute from './components/PublicRoute/PublicRoute'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes (Redirect to dashboard if already logged in) */}
        <Route element={<PublicRoute />}>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
        </Route>

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/user-dashboard" element={<UserDashboard />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/users" element={<Users />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
