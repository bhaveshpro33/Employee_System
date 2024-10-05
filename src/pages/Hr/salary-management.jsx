'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { motion } from "framer-motion"
import ThemeToggle from '@/components/ui/theme-toggle'
import { useNavigate } from 'react-router-dom'
import { LogOut } from 'lucide-react';
export function SalaryManagement() {
  const [searchTerm, setSearchTerm] = useState('')
  const [employee, setEmployee] = useState(null)
  const [dailyWage, setDailyWage] = useState('')
  const [daysWorked, setDaysWorked] = useState('')
  const [calculatedSalary, setCalculatedSalary] = useState(null)
  // const navigate=(data)=>{}
  const navigate=useNavigate()
  const handleSearch = () => {
    // In a real application, this would be an API call
    setEmployee({
      name: "John Doe",
      username: "johndoe",
      department: "IT",
      designation: "Software Engineer"
    })
  }

  const handleExit = () => {
    navigate('/hr-admin') 
  }
  const calculateSalary = () => {
    const salary = parseFloat(dailyWage) * parseInt(daysWorked)
    setCalculatedSalary(salary)

    setTimeout(()=>{navigate("/hr-admin")},2000)
  }

  return (
    (<div
      className="space-y-6 p-8 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900 dark:to-orange-900 rounded-lg shadow-sm">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Salary Management</h2>
        <div className="flex items-center space-x-2">
        <ThemeToggle />
        <Button 
            onClick={handleExit}
            className="bg-red-500 hover:bg-red-600 text-white"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Exit
          </Button>
      </div>
      </div>
      <Card className="bg-white dark:bg-gray-800 shadow-md">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-gray-800 dark:text-gray-100">Search Employee</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-2">
            <Input
              placeholder="Enter username"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} />
            <Button onClick={handleSearch}>Search</Button>
          </div>
        </CardContent>
      </Card>
      {employee && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}>
          <Card className="bg-white dark:bg-gray-800 shadow-md">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-800 dark:text-gray-100">Employee Details</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Name</TableCell>
                    <TableCell>{employee.name}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Username</TableCell>
                    <TableCell>{employee.username}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Department</TableCell>
                    <TableCell>{employee.department}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Designation</TableCell>
                    <TableCell>{employee.designation}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-800 shadow-md mt-6">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-800 dark:text-gray-100">Salary Calculation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="dailyWage">Daily Wage</Label>
                    <Input
                      id="dailyWage"
                      type="number"
                      value={dailyWage}
                      onChange={(e) => setDailyWage(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="daysWorked">Days Worked</Label>
                    <Input
                      id="daysWorked"
                      type="number"
                      value={daysWorked}
                      onChange={(e) => setDaysWorked(e.target.value)} />
                  </div>
                </div>
                <Button onClick={calculateSalary} className="w-full">Calculate Salary</Button>
                {calculatedSalary !== null && (
                  <div className="text-center">
                    <p className="text-lg font-semibold">Calculated Salary</p>
                    <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                      ${calculatedSalary.toFixed(2)}
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>)
  );
}