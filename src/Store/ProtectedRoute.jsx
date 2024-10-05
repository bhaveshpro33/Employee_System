import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'
import { selectAuth } from './Authslice'

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { isAuthenticated, userRole } = useSelector(selectAuth)
  const location = useLocation()

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/unauthorized" state={{ from: location }} replace />
  }

  return children
}

export default ProtectedRoute