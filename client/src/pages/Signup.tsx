import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import {
  Button,
} from '@/components/ui/button';
import { 
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardContent
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';
import axiosClient from '@/utills/axiosClient';

// Define the shape of the form inputs
interface SignupFormInputs {
  name: string,
  email: string;
  password: string;
  confirmPassword: string;
}

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm<SignupFormInputs>();

  const onSubmit: SubmitHandler<SignupFormInputs> = async (data) => {
    // console.log(data);

    const {name, email, password, confirmPassword} = data;
    const response = await axiosClient.post("/api/v1/user/signup", {
      name, email, password, confirmPassword
    });
    console.log(response.data);
    
  };

  const password = watch("password");

  return (
    <div className="flex justify-center items-center h-screen ">
      <Card className="w-96">
        <CardHeader>
          <CardTitle>Sign Up</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name */}
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="name"
                {...register('name', {
                  required: 'Name is required',
                })}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                    message: 'Enter a valid email address'
                  }
                })}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters'
                  }
                })}
              />
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password.message}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                {...register('confirmPassword', {
                  required: 'Please confirm your password',
                  validate: (value) =>
                    value === password || 'Passwords do not match'
                })}
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <div>
              <Button type="submit" className="w-full">
                Sign Up
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <div className="text-center text-sm text-gray-500">
            Already have an account? <span onClick={() => {
              navigate("/signin")
            }} className="text-blue-500">Login</span>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Signup;
