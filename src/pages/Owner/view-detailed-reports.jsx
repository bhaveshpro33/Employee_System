'use client';
import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import ThemeToggle from '@/components/ui/theme-toggle'
import { LogOut } from 'lucide-react'
import { useNavigate } from "react-router-dom"
import jsPDF from 'jspdf'
import 'jspdf-autotable'

const data = [
  { name: 'Jan', attendance: 95, performance: 88, projects: 5 },
  { name: 'Feb', attendance: 98, performance: 92, projects: 6 },
  { name: 'Mar', attendance: 92, performance: 90, projects: 4 },
  { name: 'Apr', attendance: 96, performance: 95, projects: 7 },
  { name: 'May', attendance: 97, performance: 89, projects: 5 },
  { name: 'Jun', attendance: 94, performance: 91, projects: 6 },
]

export function ViewDetailedReports() {
  const navigate = useNavigate()
  const [selectedEmployee, setSelectedEmployee] = useState('all')

  const handleExit = () => {
    navigate('/owner') 
  }

  const generatePDF = () => {
    const doc = new jsPDF()

    // Add title
    doc.setFontSize(18)
    doc.text('Employee Performance Report', 14, 22)

    // Add employee info
    doc.setFontSize(12)
    doc.text(`Employee: ${selectedEmployee === 'all' ? 'All Employees' : selectedEmployee}`, 14, 32)

    // Add chart (simplified representation)
    doc.setFontSize(14)
    doc.text('Performance Chart', 14, 45)
    doc.rect(14, 50, 180, 80)
    doc.setFontSize(10)
    doc.text('(Chart visualization not available in PDF)', 70, 90)

    // Add table
    doc.autoTable({
      head: [['Month', 'Attendance (%)', 'Performance Score', 'Projects Completed']],
      body: data.map(item => [item.name, item.attendance, item.performance, item.projects]),
      startY: 140,
    })

    // Save the PDF
    doc.save('employee_performance_report.pdf')
  }

  return (
    <div className="space-y-6 p-8 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900 dark:to-pink-900 rounded-lg shadow-sm">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Detailed Reports</h2>
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
          <CardTitle className="text-xl font-semibold text-gray-800 dark:text-gray-100">Employee Performance Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex justify-between items-center">
            <Select value={selectedEmployee} onValueChange={setSelectedEmployee}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select employee" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Employees</SelectItem>
                <SelectItem value="john">John Doe</SelectItem>
                <SelectItem value="jane">Jane Smith</SelectItem>
                <SelectItem value="mike">Mike Johnson</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={generatePDF}>Generate Report</Button>
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="attendance" fill="#8884d8" />
                <Bar dataKey="performance" fill="#82ca9d" />
                <Bar dataKey="projects" fill="#ffc658" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      <Card className="bg-white dark:bg-gray-800 shadow-md">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-gray-800 dark:text-gray-100">Detailed Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Month</TableHead>
                <TableHead>Attendance (%)</TableHead>
                <TableHead>Performance Score</TableHead>
                <TableHead>Projects Completed</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((item) => (
                <TableRow key={item.name}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.attendance}%</TableCell>
                  <TableCell>{item.performance}/100</TableCell>
                  <TableCell>{item.projects}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}