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
interface SigninFormInputs {
  email: string;
  password: string;
}

const Signin: React.FC = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<SigninFormInputs>();

  const onSubmit: SubmitHandler<SigninFormInputs> = async(data) => {
    const {email, password} = data;
    const response = await axiosClient.post("/api/v1/user/signin", {
     email, password, 
    });
   
    console.log(response.data);
    navigate("/");
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="w-96">
        <CardHeader>
          <CardTitle>Sign In</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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

            {/* Submit Button */}
            <div>
              <Button type="submit" className="w-full">
                Sign In
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <div className="text-center text-sm text-gray-500">
            Already have an account? <span onClick={() => {
              navigate("/signup")
            }} className="text-blue-500">Login</span>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Signin;
