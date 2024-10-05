'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Users, Calendar, FileText, TrendingUp, User, AlertCircle ,LogOut} from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import ThemeToggle from '@/components/ui/theme-toggle'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logout } from '@/Store/Authslice'
export function ManagerDashboard() {
  const manager = {
    name: "Alex Johnson",
    designation: "Senior Project Manager",
    joiningDate: "2020-01-10",
    profileImage: "https://github.com/shadcn.png",
    teamName: "Product Development Team"
  }
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const handleExit = () => {
    dispatch(logout())
    navigate('/') 
  }
  return (
    (<div
      className="space-y-6 p-8 bg-gray-50 dark:bg-gray-900 rounded-lg shadow-sm">
      <div
        className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 pb-4">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Manager Dashboard</h2>
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
            <AvatarImage src={manager.profileImage} alt={manager.name} />
            <AvatarFallback><User className="h-10 w-10" /></AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">{manager.name}</h3>
            <p className="text-gray-600 dark:text-gray-300">{manager.designation}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Joined on: {new Date(manager.joiningDate).toLocaleDateString()}</p>
            <p className="text-sm font-medium text-blue-600 dark:text-blue-400 mt-1">Team: {manager.teamName}</p>
          </div>
        </CardContent>
      </Card>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-l-4 border-blue-500 dark:border-blue-400">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300">Team Members</CardTitle>
            <Users className="h-4 w-4 text-blue-500 dark:text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">12</div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">2 new members this month</p>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-green-500 dark:border-green-400">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300">Team Attendance Rate</CardTitle>
            <Calendar className="h-4 w-4 text-green-500 dark:text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">96.8%</div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">+1.2% from last month</p>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-yellow-500 dark:border-yellow-400">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300">Pending Leave Requests</CardTitle>
            <FileText className="h-4 w-4 text-yellow-500 dark:text-yellow-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">3</div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">5 approved this week</p>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-purple-500 dark:border-purple-400">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300">Team Performance</CardTitle>
            <TrendingUp className="h-4 w-4 text-purple-500 dark:text-purple-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">8.9/10</div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">+0.3 from last quarter</p>
          </CardContent>
        </Card>
      </div>
      <Card className="mt-6 bg-white dark:bg-gray-800">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-gray-800 dark:text-gray-100">Team Attendance Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead>Today's Status</TableHead>
                <TableHead>This Week</TableHead>
                <TableHead>This Month</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">John Doe</TableCell>
                <TableCell><span
                  className="px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100">Present</span></TableCell>
                <TableCell>5/5</TableCell>
                <TableCell>22/22</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Jane Smith</TableCell>
                <TableCell><span
                  className="px-2 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100">On Leave</span></TableCell>
                <TableCell>4/5</TableCell>
                <TableCell>21/22</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Mike Johnson</TableCell>
                <TableCell><span
                  className="px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100">Present</span></TableCell>
                <TableCell>5/5</TableCell>
                <TableCell>20/22</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <div className="flex justify-end space-x-4 mt-6">
        <Button className="bg-yellow-500 hover:bg-yellow-600 text-white" onClick={()=>{navigate("/pending-leaves")}}>
          <AlertCircle className="mr-2 h-4 w-4" />
          View Pending Leaves
        </Button>
        <Button className="bg-blue-500 hover:bg-blue-600 text-white" onClick={()=>{navigate("/manage-documents")}}>
          <FileText className="mr-2 h-4 w-4" />
          Manage Documents
        </Button>
        <Button
          onClick={()=>{navigate("/team-performance")}}
          variant="outline"
          className="border-purple-500 text-purple-500 hover:bg-purple-50 dark:border-purple-400 dark:text-purple-400 dark:hover:bg-purple-900">
          <TrendingUp className="mr-2 h-4 w-4" />
          Team Performance Report
        </Button>
      </div>
    </div>)
  );
}