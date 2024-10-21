import React, { useState } from "react";
import Logo from "../Logo/Logo";
import { Link, useNavigate } from "react-router-dom";
import Input from "../Input/Input";
import Button from "../Button/Button";
import { useForm } from "react-hook-form";
import authService from "../../appwrite/auth";
import { useDispatch } from "react-redux";
import { login as authLogin } from "../../store/authSlice";

function Signup() {
  const [error, setError] = useState("");
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const signup = async (data) => {
    setError("");

    try {
      const accountGenerated = await authService.createAccount(data);

      if (accountGenerated) {
        const userData = await authService.getCurrentUser();
        if (userData) {
          dispatch(authLogin(userData));
          navigate("/");
        }
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-700">
      <div className="mx-auto w-full max-w-md bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-600">
        <div className="mb-6 flex justify-center">
          <Logo className="w-24 h-auto" />
        </div>

        <h2 className="text-center text-3xl font-semibold text-white">
          Sign Up to create account
        </h2>

        <p className="mt-4 text-center text-sm text-gray-400">
          Already have an account?&nbsp;
          <Link
            to="/login"
            className="font-medium text-blue-400 hover:underline"
          >
            Sign In
          </Link>
        </p>

        {error && (
          <p className="mt-4 text-center text-sm text-red-400">{error}</p>
        )}

        <form onSubmit={handleSubmit(signup)} className="mt-6 space-y-6">
          <div>
            <Input
              label="Full Name"
              placeholder="Enter your full name"
              className="text-white"
              {...register("name", {
                required: "Full name is required",
              })}
            />
          </div>

          <div>
            <Input
              label="Email"
              type="email"
              placeholder="Enter your email"
              className="text-white"
              {...register("email", {
                required: "Email is required",
                validate: {
                  matchPattern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be valid",
                },
              })}
            />
          </div>

          <div>
            <Input
              label="Password"
              type="password"
              placeholder="Enter your password"
              className="text-white"
              {...register("password", {
                required: "Password is required",
              })}
            />
          </div>

          <Button type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-all">
            Create Account
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
