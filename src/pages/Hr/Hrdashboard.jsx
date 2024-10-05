'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { UserPlus, Users, Calendar, DollarSign, FileText, TrendingUp ,LogOut} from 'lucide-react'
import ThemeToggle from '@/components/ui/theme-toggle'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logout } from '@/Store/Authslice'
export function HrDashboard() {
  const dispatch = useDispatch()
  const navigate=useNavigate()
  // const navigate=(data)=>{}
    const handleExit = () => {

      dispatch(logout())
      navigate('/') 
    }
  return (
    (<div
      className="space-y-6 p-8 bg-gray-50 dark:bg-gray-900 rounded-lg shadow-sm">
      <div
        className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 pb-4">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">HR/Admin Dashboard</h2>
        <div className="flex items-center space-x-4">
          <ThemeToggle />
          <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" />
            Today: {new Date().toLocaleDateString()}
          </Button>
          <Button 
            onClick={handleExit}
            className="bg-red-500 hover:bg-red-600 text-white"
          >
            <LogOut className="mr-2 h-4 w-4" />
            logout
          </Button>
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-l-4 border-blue-500 dark:border-blue-400">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300">Total Employees</CardTitle>
            <Users className="h-4 w-4 text-blue-500 dark:text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">245</div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">+3% from last month</p>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-green-500 dark:border-green-400">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300">New Hires (This Month)</CardTitle>
            <UserPlus className="h-4 w-4 text-green-500 dark:text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">12</div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">+2 from last month</p>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-yellow-500 dark:border-yellow-400">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300">Attendance Rate</CardTitle>
            <Calendar className="h-4 w-4 text-yellow-500 dark:text-yellow-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">95.7%</div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">-0.3% from last month</p>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-purple-500 dark:border-purple-400">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300">Total Payroll</CardTitle>
            <DollarSign className="h-4 w-4 text-purple-500 dark:text-purple-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">$284,500</div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">+5% from last month</p>
          </CardContent>
        </Card>
      </div>
      <Card className="mt-6 bg-white dark:bg-gray-800">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-gray-800 dark:text-gray-100">Recent Activities</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Date</TableHead>
                <TableHead>Activity</TableHead>
                <TableHead>Employee</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">2023-05-01</TableCell>
                <TableCell>New employee added</TableCell>
                <TableCell>John Doe</TableCell>
                <TableCell><span
                  className="px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100">Completed</span></TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">2023-05-02</TableCell>
                <TableCell>Salary update</TableCell>
                <TableCell>Jane Smith</TableCell>
                <TableCell><span
                  className="px-2 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100">Pending</span></TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">2023-05-03</TableCell>
                <TableCell>Leave request</TableCell>
                <TableCell>Mike Johnson</TableCell>
                <TableCell><span
                  className="px-2 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100">Approved</span></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <div className="flex flex-wrap justify-end gap-4 mt-6">
        <Button className="bg-green-500 hover:bg-green-600 text-white" onClick={()=>{navigate("/add-employee")}}>
          <UserPlus className="mr-2 h-4 w-4" />
          Add New Employee
        </Button>
        <Button
        onClick={()=>{navigate("/manage-attendance")}}
          variant="outline"
          className="border-blue-500 text-blue-500 hover:bg-blue-50 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-900">
          <Calendar className="mr-2 h-4 w-4" />
          Manage Attendance
        </Button>
        <Button
          variant="outline"
          onClick={()=>{navigate("/salary-management")}}
          className="border-purple-500 text-purple-500 hover:bg-purple-50 dark:border-purple-400 dark:text-purple-400 dark:hover:bg-purple-900">
          <DollarSign className="mr-2 h-4 w-4" />
          Salary Management
        </Button>
        <Button
          variant="outline"
          className="border-yellow-500 text-yellow-500 hover:bg-yellow-50 dark:border-yellow-400 dark:text-yellow-400 dark:hover:bg-yellow-900">
          <FileText className="mr-2 h-4 w-4" />
          Generate Reports
        </Button>
        
      </div>
    </div>)
  );
}