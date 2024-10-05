'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Users, DollarSign, TrendingUp, BarChart, User, Building,LogOut } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import ThemeToggle from '@/components/ui/theme-toggle'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logout } from '@/Store/Authslice'
export function OwnerDashboard() {
  const owner = {
    name: "Sarah Thompson",
    designation: "CEO & Founder",
    companyFounded: "2015-06-01",
    profileImage: "https://github.com/shadcn.png",
    companyName: "InnoTech Solutions"
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
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Owner Dashboard</h2>
        <div className="flex items-center space-x-4">
          <ThemeToggle />
          <Button variant="outline">
            <Building className="mr-2 h-4 w-4" />
            {owner.companyName}
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
            <AvatarImage src={owner.profileImage} alt={owner.name} />
            <AvatarFallback><User className="h-10 w-10" /></AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">{owner.name}</h3>
            <p className="text-gray-600 dark:text-gray-300">{owner.designation}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Company founded: {new Date(owner.companyFounded).toLocaleDateString()}</p>
            <p className="text-sm font-medium text-blue-600 dark:text-blue-400 mt-1">{owner.companyName}</p>
          </div>
        </CardContent>
      </Card>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-l-4 border-blue-500 dark:border-blue-400">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300">Total Employees</CardTitle>
            <Users className="h-4 w-4 text-blue-500 dark:text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">245</div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">+15% from last year</p>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-green-500 dark:border-green-400">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300">Total Payroll</CardTitle>
            <DollarSign className="h-4 w-4 text-green-500 dark:text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">$284,500</div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">+8% from last month</p>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-yellow-500 dark:border-yellow-400">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300">Overall Performance</CardTitle>
            <TrendingUp className="h-4 w-4 text-yellow-500 dark:text-yellow-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">8.7/10</div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">+0.5 from last quarter</p>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-purple-500 dark:border-purple-400">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300">Departments</CardTitle>
            <BarChart className="h-4 w-4 text-purple-500 dark:text-purple-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">8</div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">1 new department added</p>
          </CardContent>
        </Card>
      </div>
      <Card className="mt-6 bg-white dark:bg-gray-800">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-gray-800 dark:text-gray-100">Department Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Department</TableHead>
                <TableHead>Employees</TableHead>
                <TableHead>Avg. Performance</TableHead>
                <TableHead>Total Payroll</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">IT</TableCell>
                <TableCell>45</TableCell>
                <TableCell>
                  <span
                    className="px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100">9.1/10</span>
                </TableCell>
                <TableCell>$67,500</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Sales</TableCell>
                <TableCell>38</TableCell>
                <TableCell>
                  <span
                    className="px-2 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100">8.7/10</span>
                </TableCell>
                <TableCell>$57,000</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Marketing</TableCell>
                <TableCell>32</TableCell>
                <TableCell>
                  <span
                    className="px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100">8.9/10</span>
                </TableCell>
                <TableCell>$48,000</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <div className="flex flex-wrap justify-end gap-4 mt-6">
        <Button className="bg-blue-500 hover:bg-blue-600 text-white" onClick={()=>{navigate("/view-reports")}}>
          <BarChart className="mr-2 h-4 w-4" />
          View Detailed Reports
        </Button>
        <Button
        onClick={()=>{navigate( "/manage-roles")}}
          variant="outline"
          className="border-purple-500 text-purple-500 hover:bg-purple-50 dark:border-purple-400 dark:text-purple-400 dark:hover:bg-purple-900">
          <Users className="mr-2 h-4 w-4" />
          Manage User Roles
        </Button>
        <Button
        onClick={()=>{navigate("/financial-overview")}}
          variant="outline"
          className="border-green-500 text-green-500 hover:bg-green-50 dark:border-green-400 dark:text-green-400 dark:hover:bg-green-900">
          <DollarSign className="mr-2 h-4 w-4" />
          Financial Overview
        </Button>
      </div>
    </div>)
  );
}