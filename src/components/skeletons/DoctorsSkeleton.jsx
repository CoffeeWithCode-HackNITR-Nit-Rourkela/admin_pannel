import React from "react";
import { colors } from "../../constants/color";

const SkeletonCard = () => (
  <div
    className="w-full bg-white rounded-[24px] p-5 flex items-center gap-4 animate-pulse"
    style={{ boxShadow: "0 10px 30px rgba(0,0,0,0.02)" }}
  >
    {/* 1. Profile Image Skeleton */}
    <div 
      className="w-14 h-14 rounded-2xl shrink-0"
      style={{ backgroundColor: colors.base }} 
    />

    {/* 2. Text Content Skeleton */}
    <div className="flex-1 space-y-3">
      {/* Name */}
      <div 
        className="h-4 w-3/4 rounded-md" 
        style={{ backgroundColor: colors.base }}
      />
      {/* Specialization & Badge */}
      <div className="flex gap-2">
        <div className="h-2.5 w-1/4 rounded-md" style={{ backgroundColor: colors.base }} />
        <div className="h-2.5 w-1/4 rounded-md opacity-50" style={{ backgroundColor: colors.primepink }} />
      </div>
    </div>
  </div>
);

export const DoctorsSkeleton = () => {
  return (
    // Matching the grid layout defined in your Doctors.jsx
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 w-full">
      {/* Rendering 6 cards to represent a full initial load */}
      {[...Array(6)].map((_, index) => (
        <SkeletonCard key={index} />
      ))}
    </div>
  );
};

export default DoctorsSkeleton;