import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Building2, Users, Briefcase, Lock, Eye, EyeOff } from 'lucide-react'
import { useNavigate } from 'react-router-dom';
const formSchema = z.object({
  ownerName: z.string().min(2, "Owner name must be at least 2 characters"),
  companyName: z.string().min(2, "Company name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  employeeCount: z.number().min(1, "Must have at least 1 employee"),
  workType: z.enum(["On-site", "Remote", "Hybrid"]),
  industry: z.string().min(2, "Industry must be at least 2 characters"),
  termsAccepted: z.boolean().refine(val => val === true, "You must accept the terms and conditions")
})

export function NewOrganization() {
  const navigate=useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const { register, handleSubmit, control, formState: { errors } } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ownerName: "",
      companyName: "",
      email: "",
      password: "",
      employeeCount: 1,
      workType: "On-site",
      industry: "",
      termsAccepted: true
    }
  })

  const onSubmit = (data) => {
    console.log(data)
    navigate('/owner')
    // Here you would typically send this data to your backend
  }

  return (
    (<div
      className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl">
        <Card className="w-full bg-white shadow-xl">
          <CardHeader
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-t-lg">
            <CardTitle className="text-2xl font-bold">Create New Organization</CardTitle>
            <CardDescription className="text-purple-100">Enter your organization details to get started</CardDescription>
          </CardHeader>
          <CardContent className="mt-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="ownerName" className="text-gray-700">Owner Name</Label>
                  <Input
                    id="ownerName"
                    {...register("ownerName")}
                    className="mt-1 border-purple-300 focus:border-purple-500 focus:ring-purple-500" />
                  {errors.ownerName && <p className="text-red-500 text-sm mt-1">{errors.ownerName.message}</p>}
                </div>
                
                <div>
                  <Label htmlFor="companyName" className="text-gray-700">Company Name</Label>
                  <div className="relative">
                    <Input
                      id="companyName"
                      {...register("companyName")}
                      className="mt-1 pl-10 border-purple-300 focus:border-purple-500 focus:ring-purple-500" />
                    <Building2
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-500"
                      size={18} />
                  </div>
                  {errors.companyName && <p className="text-red-500 text-sm mt-1">{errors.companyName.message}</p>}
                </div>
                
                <div>
                  <Label htmlFor="email" className="text-gray-700">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    {...register("email")}
                    className="mt-1 border-purple-300 focus:border-purple-500 focus:ring-purple-500" />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                </div>

                <div>
                  <Label htmlFor="password" className="text-gray-700">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      {...register("password")}
                      className="mt-1 pl-10 pr-10 border-purple-300 focus:border-purple-500 focus:ring-purple-500" />
                    <Lock
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-500"
                      size={18} />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-purple-500 hover:text-purple-700 focus:outline-none">
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
                </div>
                
                <div>
                  <Label htmlFor="employeeCount" className="text-gray-700">Number of Employees</Label>
                  <div className="relative">
                    <Input
                      id="employeeCount"
                      type="number"
                      {...register("employeeCount", { valueAsNumber: true })}
                      className="mt-1 pl-10 border-purple-300 focus:border-purple-500 focus:ring-purple-500" />
                    <Users
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-500"
                      size={18} />
                  </div>
                  {errors.employeeCount && <p className="text-red-500 text-sm mt-1">{errors.employeeCount.message}</p>}
                </div>
                
                <div>
                  <Label htmlFor="workType" className="text-gray-700">Work Type</Label>
                  <div className="relative">
                    <Controller
                      name="workType"
                      control={control}
                      render={({ field }) => (
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <SelectTrigger
                            className="mt-1 pl-10 border-purple-300 focus:border-purple-500 focus:ring-purple-500">
                            <SelectValue placeholder="Select work type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="On-site">On-site</SelectItem>
                            <SelectItem value="Remote">Remote</SelectItem>
                            <SelectItem value="Hybrid">Hybrid</SelectItem>
                          </SelectContent>
                        </Select>
                      )} />
                    <Briefcase
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-500"
                      size={18} />
                  </div>
                  {errors.workType && <p className="text-red-500 text-sm mt-1">{errors.workType.message}</p>}
                </div>
                
                <div>
                  <Label htmlFor="industry" className="text-gray-700">Industry</Label>
                  <Input
                    id="industry"
                    {...register("industry")}
                    className="mt-1 border-purple-300 focus:border-purple-500 focus:ring-purple-500" />
                  {errors.industry && <p className="text-red-500 text-sm mt-1">{errors.industry.message}</p>}
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="termsAccepted"
                    {...register("termsAccepted")}
                    className="border-purple-300 text-purple-600 focus:border-purple-500 focus:ring-purple-500" />
                  <Label htmlFor="termsAccepted" className="text-sm text-gray-700">
                    I accept the terms and conditions
                  </Label>
                </div>
                {errors.termsAccepted && <p className="text-red-500 text-sm mt-1">{errors.termsAccepted.message}</p>}
              </div>
              
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-2 px-4 rounded-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105">
                Create Organization
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>)
  );
}