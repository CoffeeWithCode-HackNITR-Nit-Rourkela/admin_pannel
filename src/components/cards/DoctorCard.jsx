import React from "react";
import { FiCheck, FiX, FiUser, FiMail, FiAward } from "react-icons/fi";
import { colors } from "../../constants/color";
import { Button } from "../atoms/Button";

export const DoctorCard = ({
  doctor,
  onClick,
  onApprove,
  onReject,
  isProcessing,
  showActions = true,
}) => {
  if (!doctor) return null;

  // Generate initials for the avatar if no image is present
  const initials = doctor.fullName
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div
      onClick={() => onClick?.(doctor)}
      className="group w-full bg-white border border-gray-300 rounded-[24px] p-5 flex flex-col sm:flex-row items-center sm:items-start gap-5 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 cursor-pointer  hover:border-pink-100"
      style={{ boxShadow: "0 10px 30px rgba(0,0,0,0.04)" }}
    >
      {/* 1. Avatar Section */}
      <div
        className="w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 shadow-inner"
        style={{ backgroundColor: colors.base }}
      >
        {initials ? (
          <span
            className="text-lg font-bold"
            style={{ color: colors.hoverPink }}
          >
            {initials}
          </span>
        ) : (
          <FiUser size={24} style={{ color: colors.hoverPink }} />
        )}
      </div>

      {/* 2. Info Section */}
      <div className="flex-1 text-center sm:text-left overflow-hidden">
        <h3
          className="text-lg md:text-xl font-bold font-poppins truncate"
          style={{ color: colors.darkgray }}
        >
          {doctor.fullName || "Unnamed Doctor"}
        </h3>

        <div className="flex items-center justify-center sm:justify-start gap-1.5 mt-1 text-gray-500">
          <FiAward size={14} style={{ color: colors.hoverPink }} />
          <p className="text-xs md:text-sm font-medium uppercase tracking-wider font-poppins">
            {doctor.specialization || "General Practitioner"}
          </p>
        </div>

        <div className="flex items-center justify-center sm:justify-start gap-1.5 mt-2 text-gray-400">
          <FiMail size={14} />
          <p className="text-xs md:text-sm truncate font-poppins italic">
            {doctor.email}
          </p>
        </div>
      </div>

      {/* 3. Action Buttons (for approvals view only) */}
      {showActions && (
        <div className="flex flex-row sm:flex-col gap-2 w-full sm:w-auto">
          <Button
            size="sm"
            disabled={isProcessing}
            onClick={(e) => {
              e.stopPropagation();
              onApprove?.(doctor);
            }}
            className="flex-1 sm:min-w-[110px] flex items-center justify-center gap-2 py-2.5 rounded-xl text-white font-semibold transition-all"
            style={{
              backgroundColor: colors.hoverPink,
              boxShadow: `0 4px 14px ${colors.hoverPink}40`,
            }}
          >
            <FiCheck /> Approve
          </Button>

          <Button
            size="sm"
            disabled={isProcessing}
            onClick={(e) => {
              e.stopPropagation();
              onReject?.(doctor);
            }}
            className="flex-1 sm:min-w-[110px] flex items-center justify-center gap-2 py-2.5 rounded-xl font-semibold border-2 transition-all"
            style={{
              borderColor: "#FEE2E2",
              color: colors.primeRed,
              backgroundColor: "#FFF5F5",
            }}
          >
            <FiX /> Reject
          </Button>
        </div>
      )}
    </div>
  );
};

export default DoctorCard;
