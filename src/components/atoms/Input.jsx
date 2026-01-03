import React from "react";
import { colors } from "../../constants/color";

export const Input = React.forwardRef(
  ({ label, error, helperText, className = "", style, ...props }, ref) => {
    // When focusing, the ring color will be Gold (Wellness theme) or Red (Error)
    const activeColor = error ? colors.primeRed : colors.primepink;

    return (
      <div className="w-full text-left">
        {label && (
          <label
            className="block text-sm font-medium font-poppins mb-1.5"
            style={{ color: colors.darkgray }}
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          // Prevents number inputs from changing on scroll
          onWheel={(e) => e.target.blur()}
          className={`w-full px-4 py-2 border rounded-lg font-poppins text-base transition-all duration-200 focus:outline-none focus:ring-1 ${className}`}
          style={{
            borderColor: error ? colors.primeRed : "#D1D5DB",
            "--tw-ring-color": activeColor,
            ...style,
          }}
          {...props}
        />
        {error && (
          <p className="mt-1 text-sm font-poppins" style={{ color: colors.primeRed }}>
            {error}
          </p>
        )}
        {helperText && !error && (
          <p className="mt-1 text-sm font-poppins text-gray-400">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";