'use client';
import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select } from "@/components/ui/select"
import { User, Briefcase, Calendar, LogOut } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts'
import { motion } from "framer-motion"
import ThemeToggle from '@/components/ui/theme-toggle'
import { useNavigate } from 'react-router-dom';

const performanceData = [
  { name: 'Completed Tasks', value: 65 },
  { name: 'In Progress', value: 25 },
  { name: 'Pending', value: 10 },
]

const COLORS = ['#0088FE', '#00C49F', '#FFBB28']

export function PerformanceView() {
  const [employee, setEmployee] = useState({
    name: "Jane Doe",
    designation: "Software Engineer",
    department: "IT",
    joinDate: "2022-05-15",
    profileImage: "https://github.com/shadcn.png"
  })

  const [isEditing, setIsEditing] = useState(false)
  const navigate = useNavigate()

  const handleInputChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value })
  }

  const handleExit = () => {
    navigate('/employee') // Adjust this path as needed
  }

  return (
    <div className="space-y-6 p-8 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900 dark:to-indigo-900 rounded-lg shadow-sm">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Performance Overview</h2>
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
          <CardTitle className="text-xl font-semibold text-gray-800 dark:text-gray-100">Employee Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4 mb-6">
            <Avatar className="h-20 w-20">
              <AvatarImage src={employee.profileImage} alt={employee.name} />
              <AvatarFallback><User className="h-10 w-10" /></AvatarFallback>
            </Avatar>
            {isEditing ? (
              <div className="space-y-2">
                <Input
                  name="name"
                  value={employee.name}
                  onChange={handleInputChange}
                  className="font-semibold" />
                <Input
                  name="designation"
                  value={employee.designation}
                  onChange={handleInputChange} />
                <Select
                  name="department"
                  value={employee.department}
                  onChange={handleInputChange}>
                  <option value="IT">IT</option>
                  <option value="HR">HR</option>
                  <option value="Finance">Finance</option>
                </Select>
                <Input
                  type="date"
                  name="joinDate"
                  value={employee.joinDate}
                  onChange={handleInputChange} />
              </div>
            ) : (
              <div>
                <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">{employee.name}</h3>
                <p className="text-gray-600 dark:text-gray-300">{employee.designation}</p>
                <p className="text-gray-500 dark:text-gray-400"><Briefcase className="inline mr-1" size={16} /> {employee.department}</p>
                <p className="text-gray-500 dark:text-gray-400"><Calendar className="inline mr-1" size={16} /> Joined: {new Date(employee.joinDate).toLocaleDateString()}</p>
              </div>
            )}
          </div>
          <Button onClick={() => setIsEditing(!isEditing)}>
            {isEditing ? 'Save' : 'Edit Information'}
          </Button>
        </CardContent>
      </Card>
      <Card className="bg-white dark:bg-gray-800 shadow-md">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-gray-800 dark:text-gray-100">Task Completion</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={performanceData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                  {performanceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      <motion.div
        className="grid gap-4 md:grid-cols-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}>
        <Card className="bg-white dark:bg-gray-800">
          <CardContent className="flex flex-col items-center p-6">
            <div className="text-4xl font-bold text-blue-500 mb-2">98%</div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Attendance Rate</p>
          </CardContent>
        </Card>
        <Card className="bg-white dark:bg-gray-800">
          <CardContent className="flex flex-col items-center p-6">
            <div className="text-4xl font-bold text-green-500 mb-2">4.8</div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Average Rating</p>
          </CardContent>
        </Card>
        <Card className="bg-white dark:bg-gray-800">
          <CardContent className="flex flex-col items-center p-6">
            <div className="text-4xl font-bold text-purple-500 mb-2">12</div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Projects Completed</p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}