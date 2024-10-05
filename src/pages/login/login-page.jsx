import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useForm ,Controller} from 'react-hook-form'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { EyeIcon, EyeOffIcon, LockIcon, UserIcon, Briefcase, Sparkles } from 'lucide-react'
import { login } from '../../Store/Authslice'
import { Rocket } from 'lucide-react'

// Mock user data for demonstration
const users = [
  { username: 'hr_admin', password: 'hr_admin123', role: 'HR' },
  { username: 'johndoe', password: 'johndoe123', role: 'Employee' },
  { username: 'manager1', password: 'manager123', role: 'Manager' },
  { username: 'owner', password: 'owner123', role: 'Owner' },
]

function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const { register, handleSubmit, formState: { errors }, watch,control } = useForm({
    defaultValues: {
      role: '',
    }
  })
  const [loginError, setLoginError] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const togglePasswordVisibility = () => setShowPassword(!showPassword)

  const onSubmit = (data) => {
     console.log(data);
     
    const user = users.find(u => u.username === data.username && u.password === data.password && u.role === data.role)
    if (user) {
      dispatch(login({ role: user.role, username: user.username }))
      switch (user.role) {
        case 'HR':
          navigate('/hr-admin')
          break
        case 'Employee':
          navigate('/employee')
          break
        case 'Manager':
          navigate('/manager')
          break
        case 'Owner':
          navigate('/owner')
          break
        default:
          navigate('/')
      }
    } else {
      setLoginError('Invalid username, password, or role')
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-yellow-300 via-orange-300 to-pink-300">
      <header className="w-full bg-white shadow-md p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Rocket className="text-orange-500" size={32} />
            <span className="text-2xl font-bold text-gray-800">Hr Hub</span>
          </div>
          <motion.button
            className="bg-gradient-to-r from-orange-400 to-pink-500 text-white font-semibold py-2 px-4 rounded-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={()=>{navigate("/signup")}}
          >
            <Briefcase size={18} />
            <span>New Organization</span>
          </motion.button>
        </div>
      </header>
      <div className="flex-grow flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="w-full max-w-md bg-white shadow-lg">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold text-gray-800">Welcome Back!</CardTitle>
              <CardDescription className="text-gray-600">Please sign in to your account</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="username" className="text-sm font-medium text-gray-700">Username</Label>
                    <div className="relative">
                      <Input
                        id="username"
                        type="text"
                        placeholder="Enter your username"
                        className="pl-10 bg-white border-2 border-orange-200 focus:border-orange-400 focus:ring focus:ring-orange-200 focus:ring-opacity-50"
                        {...register("username", { required: "Username is required" })}
                      />
                      <UserIcon
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-400"
                        size={18}
                      />
                    </div>
                    {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-sm font-medium text-gray-700">Password</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        className="pl-10 pr-10 bg-white border-2 border-orange-200 focus:border-orange-400 focus:ring focus:ring-orange-200 focus:ring-opacity-50"
                        {...register("password", { required: "Password is required", minLength: { value: 6, message: "Password must be at least 6 characters" } })}
                      />
                      <LockIcon
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-400"
                        size={18}
                      />
                      <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                      >
                        {showPassword ? (
                          <EyeOffIcon size={18} />
                        ) : (
                          <EyeIcon size={18} />
                        )}
                      </button>
                    </div>
                    {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
                  </div>
                  <div className="space-y-2">
      <Label htmlFor="role" className="text-sm font-medium text-gray-700">Role</Label>
      <Controller
        name="role"
        control={control}
        rules={{ required: 'Role is required' }}
        render={({ field }) => (
          <Select onValueChange={field.onChange} value={field.value}>
            <SelectTrigger className="w-full bg-white border-2 border-orange-200 focus:border-orange-400 focus:ring focus:ring-orange-200 focus:ring-opacity-50">
              <SelectValue placeholder="Select your role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="HR">HR</SelectItem>
              <SelectItem value="Employee">Employee</SelectItem>
              <SelectItem value="Manager">Manager</SelectItem>
              <SelectItem value="Owner">Owner</SelectItem>
            </SelectContent>
          </Select>
        )}
      />
      {errors.role && <p className="text-red-500 text-sm mt-1">{errors.role.message}</p>}
    </div>
                </div>
                {loginError && <p className="text-red-500 text-sm mt-4">{loginError}</p>}
                <CardFooter className="flex flex-col space-y-4 px-0 pt-6">
                  <Button
                    className="w-full bg-gradient-to-r from-orange-400 to-pink-500 hover:from-orange-500 hover:to-pink-600 text-white font-semibold py-2 px-4 rounded-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
                    type="submit"
                  >
                    Sign In
                  </Button>
                  <motion.a
                    href="#"
                    className="text-sm text-orange-500 hover:text-orange-600 hover:underline text-center"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Forgot password?
                  </motion.a>
                </CardFooter>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

export default LoginPage