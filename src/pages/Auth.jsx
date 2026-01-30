"use client";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { colors } from "../constants/color";
import { Input } from "../components/atoms/Input";
import { Button } from "../components/atoms/Button";
import { adminLogin, adminRegister } from "../apis/auth";
import { useToast } from "../components/ToastProvider";

const Auth = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  
  // State to toggle between Login and Signup
  const [isSignup, setIsSignup] = useState(false);
  
  const [formValues, setFormValues] = useState({ 
    email: "", 
    password: "", 
    fullName: "" 
  });
  
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
    setApiError("");
  };

  const validate = () => {
    const newErrors = {};
    if (!formValues.email) newErrors.email = "Email is required";
    if (!formValues.password) newErrors.password = "Password is required";
    if (isSignup && !formValues.fullName) newErrors.fullName = "Full name is required";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);
    setApiError("");

    try {
      if (isSignup) {
        const payload = {
          email: formValues.email,
          password: formValues.password,
          fullName: formValues.fullName,
        };

        const res = await adminRegister(payload);

        if (res?.data?.id) {
          localStorage.setItem("userId", res.data.id);
        }

        showToast("Account created successfully. Please sign in.", "success");
        // After successful signup, switch back to sign-in mode
        setIsSignup(false);
      } else {
        const res = await adminLogin({
          email: formValues.email,
          password: formValues.password,
        });

        if (res?.token) {
          localStorage.setItem("adminToken", res.token);
        }
        if (res?.data?.id) {
          localStorage.setItem("userId", res.data.id);
        }

        showToast("Logged in successfully.", "success");
        navigate("/Dashboard");
      }
    } catch (error) {
      const message = error?.message || "Something went wrong. Please try again.";
      setApiError(message);
      showToast(message, "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-8"
      style={{ backgroundColor: colors.base }}
    >
      <div className="max-w-5xl w-full bg-white rounded-[32px] md:rounded-[40px] shadow-2xl flex flex-col md:flex-row overflow-hidden min-h-[520px] md:min-h-[600px]">
        
        {/* Left Side: Image Content */}
        <div 
          className="md:w-1/2 hidden md:flex relative items-center justify-center"
          style={{ backgroundColor: colors.base }}
        >
          <div className="relative z-10 w-full h-full flex items-center justify-center">
             <img 
                src="/images/login.png" 
                alt="Auth Illustration" 
                className="w-full h-auto object-contain max-h-[500px]"
             />
          </div>
          {/* Subtle Pink/Beige decorative blobs to tie in your theme */}
          <div 
            className="absolute top-[-10%] left-[-10%] w-64 h-64 rounded-full blur-3xl opacity-50"
            style={{ backgroundColor: colors.primepink }}
          />
        </div>

        {/* Right Side: Form Content */}
        <div className="md:w-1/2 px-6 sm:px-8 md:px-16 py-8 md:py-12 flex flex-col justify-center bg-white">
          <div className="mb-8 text-center">
            <h1 
              className="text-3xl md:text-4xl font-bold mb-2 font-poppins"
              style={{ color: colors.darkgray }}
            >
              {isSignup ? "Create Account" : "Admin Sign In"}
            </h1>
            <p className="text-sm md:text-base text-gray-500 font-poppins">
              {isSignup ? "" : "Unlock your Pannel access."}
            </p>
          </div>

          {apiError && (
            <div
              className="mb-6 px-4 py-3 rounded-xl text-sm md:text-base border font-poppins"
              style={{ backgroundColor: "#FFF5F5", color: colors.primeRed, borderColor: colors.primeRed }}
            >
              {apiError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {isSignup && (
              <Input
                label="Full Name"
                required
                name="fullName"
                placeholder="Enter your full name"
                value={formValues.fullName}
                onChange={handleChange}
                error={errors.fullName}
              />
            )}

            <Input
              label="Email"
              required
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formValues.email}
              onChange={handleChange}
              error={errors.email}
            />

            <Input
              label="Password"
              required
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formValues.password}
              onChange={handleChange}
              error={errors.password}
            />

            

            <div className="space-y-4 pt-4">
              <Button
                type="submit"
                variant="primary"
                isLoading={isLoading}
                className="w-full py-4 text-lg shadow-lg hover:opacity-90 transition-opacity"
                style={{ backgroundColor: colors.hoverPink }}
              >
                {isSignup ? "Sign Up" : "Sign In"}
              </Button>

              {/* <div className="flex items-center my-6">
                <div className="flex-1 border-t border-gray-200"></div>
                <span className="px-4 text-sm text-gray-400 font-poppins">OR</span>
                <div className="flex-1 border-t border-gray-200"></div>
              </div> */}
{/* 
              <Button
                type="button"
                variant="outline"
                className="w-full py-4 text-lg border-2"
                onClick={() => {
                    setIsSignup(!isSignup);
                    setErrors({});
                    setApiError("");
                }}
              >
                {isSignup ? "Already have an account? Sign In" : "Create an account"}
              </Button> */}
            </div>
          </form>
        </div>

      </div>
    </div>
  );
};

export default Auth;