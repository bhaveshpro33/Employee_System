'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Calendar, Clock, FileText, TrendingUp, User ,LogOut} from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import ThemeToggle from '../../components/ui/theme-toggle'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logout } from '@/Store/Authslice'
export function Employeeboard() {
  // Mock employee data
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const employee = {
    name: "Jane Doe",
    designation: "Software Engineer",
    joiningDate: "2022-03-15",
    profileImage: "https://github.com/shadcn.png" // Replace with actual image URL
  }
  const handleExit = () => {
    dispatch(logout())
    navigate('/') 
  }
  return (
    (<div
      className="space-y-6 p-8 bg-gray-50 dark:bg-gray-900 rounded-lg shadow-sm">
      <div
        className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 pb-4">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Employee Dashboard</h2>
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
      <Card className="bg-white dark:bg-gray-800 shadow-md">
        <CardContent className="flex items-center space-x-4 p-6">
          <Avatar className="h-20 w-20">
            <AvatarImage src={employee.profileImage} alt={employee.name} />
            <AvatarFallback><User className="h-10 w-10" /></AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">{employee.name}</h3>
            <p className="text-gray-600 dark:text-gray-300">{employee.designation}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Joined on: {new Date(employee.joiningDate).toLocaleDateString()}</p>
          </div>
        </CardContent>
      </Card>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-l-4 border-blue-500 dark:border-blue-400">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300">Attendance Rate</CardTitle>
            <Calendar className="h-4 w-4 text-blue-500 dark:text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">98.5%</div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">+0.5% from last month</p>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-green-500 dark:border-green-400">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300">Hours Worked (This Week)</CardTitle>
            <Clock className="h-4 w-4 text-green-500 dark:text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">37.5</div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">2.5 hours overtime</p>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-yellow-500 dark:border-yellow-400">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300">Leave Balance</CardTitle>
            <FileText className="h-4 w-4 text-yellow-500 dark:text-yellow-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">12 days</div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">4 days used this year</p>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-purple-500 dark:border-purple-400">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300">Performance Score</CardTitle>
            <TrendingUp className="h-4 w-4 text-purple-500 dark:text-purple-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">8.7/10</div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">+0.2 from last review</p>
          </CardContent>
        </Card>
      </div>
      <Card className="mt-6 bg-white dark:bg-gray-800">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-gray-800 dark:text-gray-100">Recent Attendance</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Date</TableHead>
                <TableHead>Clock In</TableHead>
                <TableHead>Clock Out</TableHead>
                <TableHead>Total Hours</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">2023-05-01</TableCell>
                <TableCell>09:00 AM</TableCell>
                <TableCell>05:30 PM</TableCell>
                <TableCell>8.5</TableCell>
                <TableCell><span
                  className="px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100">On Time</span></TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">2023-05-02</TableCell>
                <TableCell>08:55 AM</TableCell>
                <TableCell>05:25 PM</TableCell>
                <TableCell>8.5</TableCell>
                <TableCell><span
                  className="px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100">On Time</span></TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">2023-05-03</TableCell>
                <TableCell>09:05 AM</TableCell>
                <TableCell>05:35 PM</TableCell>
                <TableCell>8.5</TableCell>
                <TableCell><span
                  className="px-2 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100">Late</span></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <div className="flex justify-end space-x-4 mt-6">
        <Button 
        className="bg-blue-500 hover:bg-blue-600 text-white"
        onClick={()=>{navigate("/leave-request")}}
        >
          <FileText className="mr-2 h-4 w-4" />
          Submit Leave Request
        </Button>
        <Button
          onClick={()=>{navigate("/performance-view")}}
          variant="outline"
          className="border-purple-500 text-purple-500 hover:bg-purple-50 dark:border-purple-400 dark:text-purple-400 dark:hover:bg-purple-900">
          <TrendingUp className="mr-2 h-4 w-4" />
          View Performance Analytics
        </Button>
      </div>
    </div>)
  );
}