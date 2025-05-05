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
    <div className="flex items-center justify-center ">
      <div className="relative w-full max-w-md rounded-3xl p-10 backdrop-blur-2xl bg-white/40 border border-white/30 shadow-2xl">
        {/* Ambient gradient accents */}
        <div className="absolute -z-10 -top-10 -left-10 w-64 h-64 bg-indigo-300/30 rounded-full blur-3xl" />
        <div className="absolute -z-10 -bottom-10 -right-10 w-64 h-64 bg-purple-300/30 rounded-full blur-3xl" />

        <div className="mb-6 flex justify-center">
          <Logo className="w-24 h-auto" />
        </div>

        <h2 className="text-3xl font-semibold text-zinc-900 text-center mb-2">
          Create an Account
        </h2>
        <p className="text-sm text-zinc-600 text-center mb-6">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-600 hover:underline">
            Sign In
          </Link>
        </p>

        {error && (
          <p className="mb-4 text-center text-sm text-red-500">{error}</p>
        )}

        <form onSubmit={handleSubmit(signup)} className="space-y-5">
          <Input
            label="Full Name"
            placeholder="John Doe"
            {...register("name", { required: "Full name is required" })}
          />
          <Input
            label="Email"
            type="email"
            placeholder="john@example.com"
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
            Create Account
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
