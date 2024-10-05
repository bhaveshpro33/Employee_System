import React from 'react'
import { createBrowserRouter, Navigate } from 'react-router-dom'
import ProtectedRoute from './Store/ProtectedRoute'
import {
  LoginPage,
  Employeeboard,
  LeaveRequest,
  PerformanceView,
  HrDashboard,
  AddEmployee,
  ManageAttendance,
  SalaryManagement,
  ManagerDashboard,
  ManageDocuments,
  TeamPerformanceReport,
  ViewPendingLeaves,
  OwnerDashboard,
  ManageUserRoles,
  FinancialOverview,
  ViewDetailedReports,
  NewOrganization
} from './index'

const Unauthorized = () => {
  return <h1>Unauthorized Access</h1>
}

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />
  },
  {
    path: "/signup",
    element: <NewOrganization />
  },
  {
    path: "/",
    element: <Navigate replace to="/login" />
  },
  {
    path: "/hr-admin",
    element: (
      <ProtectedRoute allowedRoles={['HR', 'Admin']}>
        <HrDashboard />
      </ProtectedRoute>
    )
  },
  {
    path: "/employee",
    element: (
      <ProtectedRoute allowedRoles={['Employee']}>
        <Employeeboard />
      </ProtectedRoute>
    )
  },
  {
    path: "/manager",
    element: (
      <ProtectedRoute allowedRoles={['Manager']}>
        <ManagerDashboard />
      </ProtectedRoute>
    )
  },
  {
    path: "/owner",
    element: (
      <ProtectedRoute allowedRoles={['Owner']}>
        <OwnerDashboard />
      </ProtectedRoute>
    )
  },
  {
    path: "/add-employee",
    element: (
      <ProtectedRoute allowedRoles={['HR', 'Admin']}>
        <AddEmployee />
      </ProtectedRoute>
    )
  },
  {
    path: "/manage-attendance",
    element: (
      <ProtectedRoute allowedRoles={['HR', 'Admin']}>
        <ManageAttendance />
      </ProtectedRoute>
    )
  },
  {
    path: "/salary-management",
    element: (
      <ProtectedRoute allowedRoles={['HR', 'Admin']}>
        <SalaryManagement />
      </ProtectedRoute>
    )
  },
  {
    path: "/view-reports",
    element: (
      <ProtectedRoute allowedRoles={['Owner']}>
        <ViewDetailedReports />
      </ProtectedRoute>
    )
  },
  {
    path: "/manage-roles",
    element: (
      <ProtectedRoute allowedRoles={['Owner']}>
        <ManageUserRoles />
      </ProtectedRoute>
    )
  },
  {
    path: "/financial-overview",
    element: (
      <ProtectedRoute allowedRoles={['Owner']}>
        <FinancialOverview />
      </ProtectedRoute>
    )
  },
  {
    path: "/pending-leaves",
    element: (
      <ProtectedRoute allowedRoles={['Manager']}>
        <ViewPendingLeaves />
      </ProtectedRoute>
    )
  },
  {
    path: "/manage-documents",
    element: (
      <ProtectedRoute allowedRoles={['Manager']}>
        <ManageDocuments />
      </ProtectedRoute>
    )
  },
  {
    path: "/team-performance",
    element: (
      <ProtectedRoute allowedRoles={['Manager']}>
        <TeamPerformanceReport />
      </ProtectedRoute>
    )
  },
  {
    path: "/leave-request",
    element: (
      <ProtectedRoute allowedRoles={['Employee']}>
        <LeaveRequest />
      </ProtectedRoute>
    )
  },
  {
    path: "/performance-view",
    element: (
      <ProtectedRoute allowedRoles={['Employee']}>
        <PerformanceView />
      </ProtectedRoute>
    )
  },
  {
    path: "/unauthorized",
    element: <Unauthorized />
  }
])

const App = () => {
  // The App component is no longer needed for rendering,
  // as we're using RouterProvider in main.jsx
  return null
}

export default App