import React from "react";
import { useNavigate } from "react-router-dom";
import { colors } from "../constants/color";
import { Button } from "../components/atoms/Button";

const Error = () => {
  const navigate = useNavigate();
  const hasToken = Boolean(localStorage.getItem("adminToken"));

  const handleGoBack = () => {
    if (hasToken) {
      navigate("/Dashboard");
    } else {
      navigate("/login");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ backgroundColor: colors.base }}
    >
      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8 text-center">
        <h1
          className="text-3xl md:text-4xl font-bold mb-3 font-poppins"
          style={{ color: colors.darkgray }}
        >
          Oops! Page not found
        </h1>
        <p className="text-sm md:text-base text-gray-500 mb-6 font-poppins">
          The page you are looking for doesn&apos;t exist or you don&apos;t have
          access to it.
        </p>
        <Button
          type="button"
          variant="primary"
          className="w-full py-3 text-base font-poppins"
          style={{ backgroundColor: colors.hoverPink }}
          onClick={handleGoBack}
        >
          Go back
        </Button>
      </div>
    </div>
  );
};

export default Error;
