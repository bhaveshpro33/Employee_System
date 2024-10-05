'use client';

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Calendar } from "@/components/ui/calendar"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { format, isValid, isSameDay, addDays } from 'date-fns'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from 'lucide-react'
import ThemeToggle from '@/components/ui/theme-toggle'
import { useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';
const employees = [
  { id: 1, name: "John Doe", department: "IT", attendance: "Present" },
  { id: 2, name: "Jane Smith", department: "HR", attendance: "Absent" },
  { id: 3, name: "Mike Johnson", department: "Finance", attendance: "Leave" },
]

const generateMockAttendanceData = () => {
  const attendanceData = {}
  const startDate = new Date(2023, 5, 1) // June 1, 2023
  const statuses = ['present', 'absent', 'leave']

  for (let i = 0; i < 30; i++) {
    const currentDate = addDays(startDate, i)
    const dateString = currentDate.toISOString().split('T')[0]
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)]
    attendanceData[dateString] = { status: randomStatus }
  }

  return attendanceData
}

const mockAttendanceData = generateMockAttendanceData()

export function ManageAttendance() {
  const [selectedEmployee, setSelectedEmployee] = useState(null)
  const [selectedDate, setSelectedDate] = useState(null)
  const [attendanceData, setAttendanceData] = useState(mockAttendanceData)
  const [showError, setShowError] = useState(false)
  const navigate=useNavigate()
  // const navigate=(data)=>{}
  const handleDateSelect = (date) => {
    if (!isValid(date)) return;

    setSelectedDate(prevDate => 
      prevDate && isSameDay(prevDate, date) ? null : date
    )

    const dateString = date.toISOString().split('T')[0]
    if (!attendanceData[dateString]) {
      setAttendanceData(prev => ({
        ...prev,
        [dateString]: { status: 'present' }
      }))
    }
  }

  const handleStatusChange = (dateString, status) => {
    setAttendanceData(prev => ({
      ...prev,
      [dateString]: { ...prev[dateString], status }
    }))
  }
  const handleExit = () => {
    navigate('/hr-admin') 
  }
  const getDateClassNames = (date) => {
    const dateString = date.toISOString().split('T')[0]
    if (attendanceData[dateString]) {
      switch (attendanceData[dateString].status) {
        case 'present':
          return 'bg-green-200 hover:bg-green-300 text-green-800'
        case 'absent':
          return 'bg-red-200 hover:bg-red-300 text-red-800'
        case 'leave':
          return 'bg-yellow-200 hover:bg-yellow-300 text-yellow-800'
        default:
          return ''
      }
    }
    return ''
  }

  return (
    <div className="space-y-6 p-8 min-h-screen bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-900 dark:to-blue-900 rounded-lg shadow-sm">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Manage Attendance</h2>
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
          <CardTitle className="text-xl font-semibold text-gray-800 dark:text-gray-100">Employee Attendance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <Input placeholder="Search employees..." />
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Today's Attendance</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {employees.map((employee) => (
                <TableRow key={employee.id}>
                  <TableCell>{employee.name}</TableCell>
                  <TableCell>{employee.department}</TableCell>
                  <TableCell>{employee.attendance}</TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" onClick={() => setSelectedEmployee(employee)}>Edit Attendance</Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>Edit Attendance - {selectedEmployee?.name}</DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          {showError && (
                            <Alert variant="destructive">
                              <AlertCircle className="h-4 w-4" />
                              <AlertTitle>Error</AlertTitle>
                              <AlertDescription>
                                An error occurred while updating the attendance.
                              </AlertDescription>
                            </Alert>
                          )}
                          <Calendar
                            mode="single"
                            selected={selectedDate}
                            onSelect={handleDateSelect}
                            className="rounded-md border"
                            modifiers={{
                              customStyles: (date) => getDateClassNames(date)
                            }}
                            modifiersStyles={{
                              customStyles: (date) => ({ className: getDateClassNames(date) })
                            }}
                          />
                          {selectedDate && (
                            <div className="flex items-center space-x-2">
                              <span>{format(selectedDate, 'PPP')}</span>
                              <Select
                                value={attendanceData[selectedDate.toISOString().split('T')[0]]?.status || 'present'}
                                onValueChange={(value) => handleStatusChange(selectedDate.toISOString().split('T')[0], value)}
                              >
                                <SelectTrigger className="w-[180px]">
                                  <SelectValue placeholder="Select status" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="present">Present</SelectItem>
                                  <SelectItem value="absent">Absent</SelectItem>
                                  <SelectItem value="leave">Leave</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          )}
                        </div>
                        <Button onClick={()=>{navigate("/hr-admin")}} className="w-full">Save Changes</Button>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}