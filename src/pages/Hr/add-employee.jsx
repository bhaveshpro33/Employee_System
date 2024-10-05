import React from 'react'
import { useForm, Controller } from 'react-hook-form'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { CalendarIcon } from 'lucide-react'
import { motion } from "framer-motion"
import ThemeToggle from '@/components/ui/theme-toggle'
import { useNavigate } from 'react-router-dom'
import { LogOut } from 'lucide-react';
export default function AddEmployee() {
  const { register, handleSubmit, control, formState: { errors } } = useForm()
  // const navigate=(data)=>{}
  const navigate=useNavigate()
  const handleExit = () => {
    navigate('/hr-admin') 
  }
  const onSubmit = (data) => {
    console.log(data)
   navigate("/hr-admin")
    // Handle form submission
    
  }

  return (
    <div className="space-y-6 p-8 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900 dark:to-orange-900 rounded-lg shadow-sm">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Add New Employee</h2>
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
          <form onSubmit={handleSubmit(onSubmit) } className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  {...register("name", { required: "Full name is required" })}
                  placeholder="John Doe"
                />
                {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="mobile">Mobile Number</Label>
                <Input
                  id="mobile"
                  {...register("mobile", {
                    required: "Mobile number is required",
                    pattern: {
                      value: /^\+?[1-9]\d{1,14}$/,
                      message: "Invalid mobile number"
                    }
                  })}
                  placeholder="+1 (555) 123-4567"
                />
                {errors.mobile && <span className="text-red-500 text-sm">{errors.mobile.message}</span>}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Textarea
                id="address"
                {...register("address", { required: "Address is required" })}
                placeholder="123 Main St, City, Country"
              />
              {errors.address && <span className="text-red-500 text-sm">{errors.address.message}</span>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="department">Department</Label>
                <Controller
                  name="department"
                  control={control}
                  rules={{ required: "Department is required" }}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Department" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="IT">IT</SelectItem>
                        <SelectItem value="HR">HR</SelectItem>
                        <SelectItem value="Finance">Finance</SelectItem>
                        <SelectItem value="Marketing">Marketing</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.department && <span className="text-red-500 text-sm">{errors.department.message}</span>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Input
                  id="role"
                  {...register("role", { required: "Role is required" })}
                  placeholder="Software Engineer"
                />
                {errors.role && <span className="text-red-500 text-sm">{errors.role.message}</span>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  {...register("username", { required: "Username is required" })}
                  placeholder="johndoe"
                />
                {errors.username && <span className="text-red-500 text-sm">{errors.username.message}</span>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters long"
                    }
                  })}
                  placeholder="••••••••"
                />
                {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Joining Date</Label>
              <Controller
                name="joiningDate"
                control={control}
                rules={{ required: "Joining date is required" }}
                render={({ field }) => (
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={`w-full justify-start text-left font-normal ${!field.value && "text-muted-foreground"}`}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {field.value ? format(field.value, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                )}
              />
              {errors.joiningDate && <span className="text-red-500 text-sm">{errors.joiningDate.message}</span>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="profileImage">Profile Image</Label>
              <Input
                id="profileImage"
                type="file"
                accept="image/*"
                {...register("profileImage", { required: "Profile image is required" })}
              />
              {errors.profileImage && <span className="text-red-500 text-sm">{errors.profileImage.message}</span>}
            </div>

            <div className="space-y-2">
              <Label>Documents</Label>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="aadharCard">Aadhar Card</Label>
                  <Input
                    id="aadharCard"
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    {...register("aadharCard", { required: "Aadhar Card is required" })}
                    className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-amber-50 file:text-amber-700 hover:file:bg-amber-100"
                  />
                  {errors.aadharCard && <span className="text-red-500 text-sm block mt-1">{errors.aadharCard.message}</span>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="voterId">Voter ID</Label>
                  <Input
                    id="voterId"
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    {...register("voterId", { required: "Voter ID is required" })}
                    className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-amber-50 file:text-amber-700 hover:file:bg-amber-100"
                  />
                  {errors.voterId && <span className="text-red-500 text-sm block mt-1">{errors.voterId.message}</span>}
                </div>
              </div>
            </div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              
              <Button type="submit" className="w-full bg-amber-500 hover:bg-amber-600 text-white"  >
                Add Employee
              </Button>
            </motion.div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}