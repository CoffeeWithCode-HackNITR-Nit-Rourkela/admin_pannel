import React from "react";
import { colors } from "../../constants/color";

export const Textarea = React.forwardRef(
  ({ label, error, helperText, className = "", style, ...props }, ref) => {
    // Determine the ring and border color based on error state
    // We use primeGold for normal focus to maintain the premium health theme
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
        <textarea
          ref={ref}
          className={`w-full px-4 py-2 border rounded-lg font-poppins text-base transition-all duration-200 focus:outline-none focus:ring-1 min-h-[100px] resize-y ${className}`}
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

Textarea.displayName = "Textarea";