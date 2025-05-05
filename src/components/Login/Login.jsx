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
  const {
    register,
    handleSubmit,
    setValue,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const login = async (data) => {
    setError("");
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
    <div className="flex items-center justify-center">
      <div className="relative w-full max-w-md rounded-3xl p-10 backdrop-blur-2xl bg-white/40 border border-white/30 shadow-2xl">
        {/* Ambient blur blobs */}
        <div className="absolute -z-10 -top-10 -left-10 w-64 h-64 bg-blue-300/30 rounded-full blur-3xl" />
        <div className="absolute -z-10 -bottom-10 -right-10 w-64 h-64 bg-purple-300/30 rounded-full blur-3xl" />

        <div className="mb-6 flex justify-center">
          <Logo className="w-24 h-auto" />
        </div>

        <h2 className="text-center text-3xl font-semibold text-zinc-900 mb-2">
          Welcome Back
        </h2>
        <p className="text-sm text-zinc-600 text-center mb-6">
          Don&apos;t have an account?{" "}
          <Link to="/signup" className="text-indigo-600 hover:underline">
            Sign Up
          </Link>
        </p>

        {error && (
          <p className="mb-4 text-center text-sm text-red-500">{error}</p>
        )}

        <form onSubmit={handleSubmit(login)} className="space-y-5">
          <Input
            label="Email"
            type="email"
            placeholder="you@example.com"
            {...register("email", {
              required: "Email is required",
              validate: {
                matchPattern: (value) =>
                  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                  "Email address must be valid",
              },
            })}
          />
          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            {...register("password", { required: "Password is required" })}
          />

          <Button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 px-4 rounded-xl font-medium shadow-md transition-all"
          >
            Sign In
          </Button>
        </form>

        <Button
          type="button"
          textColor="text-indigo-900"
          className="mt-2 w-full  bg-white/70  border border-white/30 hover:bg-indigo-100  transition-all font-medium rounded-xl py-2.5 shadow backdrop-blur-md"
          onClick={() => {
            setValue("email", "one@one.com");
            setValue("password", "12345678");
            setTimeout(() => {
              handleSubmit(login)();
            }, 100);
          }}
        >
          Use Sample Account
        </Button>
      </div>
    </div>
  );
}

export default Login;
