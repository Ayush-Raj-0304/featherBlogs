import React, { useState } from "react";
import Input from "../Input/Input";
import Logo from "../Logo/Logo";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import authService from "../../appwrite/auth";
import { useDispatch } from "react-redux";
import { login as authLogin } from "../../store/authSlice";
import Button from "../Button/Button";

function Login() {
  const [error, setError] = useState("");
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // async login function
  const login = async (data) => {
    setError(""); // clear previous error

    try {
      const sessionCreated = await authService.login(data);

      if (sessionCreated) {
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

        <h2 className="text-center text-3xl font-semibold text-gray-100">
          Sign in to your account
        </h2>

        <p className="mt-4 text-center text-sm text-gray-300">
          Don&apos;t have an account?&nbsp;
          <Link
            to="/signup"
            className="font-medium text-blue-400 hover:underline"
          >
            Sign Up
          </Link>
        </p>

        {error && (
          <p className="mt-4 text-center text-sm text-red-400">{error}</p>
        )}

        <form onSubmit={handleSubmit(login)} className="mt-6 space-y-6">
          <div>
            <Input
              label="Email"
              type="email"
              placeholder="Enter your email"
              {...register("email", {
                required: "Email is required",
                validate: {
                  matchPattern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be valid",
                },
              })}
              className="bg-gray-700 text-gray-200"
            />
          </div>

          <div>
            <Input
              label="Password"
              type="password"
              placeholder="Enter your password"
              {...register("password", {
                required: "Password is required",
              })}
              className="bg-gray-700 text-gray-200"
            />
          </div>

          <Button type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-all">
            Sign In
          </Button>
        </form>
        <div className="mt-8 text-center text-gray-400">
          <h3 className="font-semibold">Sample Login</h3>
          <p>Email: <span className="text-gray-300">one@one.com</span></p>
          <p>Password: <span className="text-gray-300">12345678</span></p>
        </div>
      </div>
    </div>
  );
}

export default Login;
