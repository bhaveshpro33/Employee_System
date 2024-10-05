'use client'

import React, { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Calendar as CalendarIcon, FileText, CheckCircle } from 'lucide-react'
import { motion, AnimatePresence } from "framer-motion"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { useNavigate } from 'react-router-dom'

const leaveTypes = [
  { id: 'annual', label: 'Annual Leave', color: 'bg-blue-500' },
  { id: 'sick', label: 'Sick Leave', color: 'bg-red-500' },
  { id: 'personal', label: 'Personal Leave', color: 'bg-purple-500' },
  { id: 'other', label: 'Other', color: 'bg-yellow-500' },
]

export function LeaveRequest() {
  const { control, handleSubmit, watch, formState: { errors } } = useForm({
    defaultValues: {
      leaveType: '',
      startDate: null,
      endDate: null,
      reason: '',
    },
  });

  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  const onSubmit = (data) => {
    console.log(data);
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
      navigate("/employee");
    }, 2000);
  };

  const selectedLeaveType = watch('leaveType');

  return (<>
    <Card className="bg-green-50 dark:bg-green-900 shadow-md">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-gray-800 dark:text-gray-100">Submit Leave Request</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label className="text-gray-700 dark:text-gray-300">Leave Type</Label>
            <div className="grid grid-cols-2 gap-2">
              <Controller
                name="leaveType"
                control={control}
                rules={{ required: 'Leave type is required' }}
                render={({ field }) => (
                  <>
                    {leaveTypes.map((type) => (
                      <motion.button
                        key={type.id}
                        type="button"
                        className={`p-2 rounded-md text-white ${type.color} ${field.value === type.id ? 'ring-2 ring-offset-2 ring-offset-green-50 dark:ring-offset-green-900 ring-ring' : ''}`}
                        onClick={() => field.onChange(type.id)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}>
                        {type.label}
                      </motion.button>
                    ))}
                  </>
                )} />
            </div>
            {errors.leaveType && <p className="text-red-500 text-sm">{errors.leaveType.message}</p>}
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label className="text-gray-700 dark:text-gray-300">Start Date</Label>
              <Controller
                name="startDate"
                control={control}
                rules={{ required: 'Start date is required' }}
                render={({ field }) => (
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={`w-full justify-start text-left font-normal ${!field.value && "text-muted-foreground"}`}>
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {field.value ? format(field.value, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 bg-white">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus />
                    </PopoverContent>
                  </Popover>
                )} />
              {errors.startDate && <p className="text-red-500 text-sm">{errors.startDate.message}</p>}
            </div>
            <div className="space-y-2">
              <Label className="text-gray-700 dark:text-gray-300">End Date</Label>
              <Controller
                name="endDate"
                control={control}
                rules={{ required: 'End date is required' }}
                render={({ field }) => (
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={`w-full justify-start text-left font-normal ${!field.value && "text-muted-foreground"}`}>
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {field.value ? format(field.value, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 bg-white">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus />
                    </PopoverContent>
                  </Popover>
                )} />
              {errors.endDate && <p className="text-red-500 text-sm">{errors.endDate.message}</p>}
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="reason" className="text-gray-700 dark:text-gray-300">Reason for Leave</Label>
            <Controller
              name="reason"
              control={control}
              rules={{ required: 'Reason is required' }}
              render={({ field }) => (
                <Textarea
                  id="reason"
                  placeholder="Please provide a brief explanation for your leave request."
                  className="bg-white dark:bg-gray-800"
                  {...field} />
              )} />
            {errors.reason && <p className="text-red-500 text-sm">{errors.reason.message}</p>}
          </div>
          <Button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white">
            <FileText className="mr-2 h-4 w-4" />
            Submit Leave Request
          </Button>
        </form>
      </CardContent>
    </Card>
    <AnimatePresence>
      {showPopup && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg flex items-center">
            <CheckCircle className="text-green-500 mr-3 h-6 w-6" />
            <p className="text-gray-800 dark:text-gray-200 font-semibold">Leave request submitted successfully!</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </>);
}