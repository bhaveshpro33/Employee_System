'use client';
import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { motion } from "framer-motion"
import { Check, X } from 'lucide-react'
import ThemeToggle from '@/components/ui/theme-toggle'
import { Button } from "@/components/ui/button"
import { LogOut } from 'lucide-react'
import { useNavigate } from "react-router-dom"
const initialLeaves = [
  { id: 1, employee: "John Doe", type: "Annual Leave", from: "2023-07-01", to: "2023-07-05", status: "Pending" },
  { id: 2, employee: "Jane Smith", type: "Sick Leave", from: "2023-07-10", to: "2023-07-12", status: "Pending" },
  { id: 3, employee: "Mike Johnson", type: "Personal Leave", from: "2023-07-15", to: "2023-07-16", status: "Pending" },
]

export function ViewPendingLeaves() {
  const [leaves, setLeaves] = useState(initialLeaves)
  const navigate=useNavigate()
  const handleExit = () => {
    navigate('/manager') 
  }
  const handleLeaveAction = (id, action) => {
    setLeaves(prevLeaves =>
      prevLeaves.map(leave =>
        leave.id === id ? { ...leave, status: action === 'approve' ? 'Approved' : 'Rejected' } : leave))
  }

  return (
    (<motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-6 p-8 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900 dark:to-indigo-900 rounded-lg shadow-sm">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Pending Leaves</h2>
        <div className="flex items-center space-x-2">
        <ThemeToggle />
        <Button 
            onClick={handleExit}
            className="bg-red-500 hover:bg-red-600 text-white"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Exit
          </Button></div>
      </div>
      <Card className="bg-white dark:bg-gray-800 shadow-md">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-gray-800 dark:text-gray-100">Leave Requests</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead>Leave Type</TableHead>
                <TableHead>From</TableHead>
                <TableHead>To</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leaves.map((leave) => (
                <TableRow key={leave.id}>
                  <TableCell>{leave.employee}</TableCell>
                  <TableCell>{leave.type}</TableCell>
                  <TableCell>{leave.from}</TableCell>
                  <TableCell>{leave.to}</TableCell>
                  <TableCell>{leave.status}</TableCell>
                  <TableCell>
                    {leave.status === 'Pending' && (
                      <div className="flex space-x-2">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleLeaveAction(leave.id, 'approve')}
                          className="p-2 bg-green-500 text-white rounded-full">
                          <Check size={16} />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleLeaveAction(leave.id, 'reject')}
                          className="p-2 bg-red-500 text-white rounded-full">
                          <X size={16} />
                        </motion.button>
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </motion.div>)
  );
}