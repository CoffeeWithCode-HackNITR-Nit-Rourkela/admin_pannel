import React from "react";
import { colors } from "../../constants/color";

const SkeletonItem = () => (
  <div
    className="w-full bg-white rounded-[24px] p-5 flex flex-col sm:flex-row items-center sm:items-start gap-5 animate-pulse border border-transparent"
    style={{ boxShadow: "0 10px 30px rgba(0,0,0,0.02)" }}
  >
    {/* 1. Avatar Skeleton */}
    <div 
      className="w-16 h-16 rounded-2xl shrink-0"
      style={{ backgroundColor: colors.base }} 
    />

    {/* 2. Info Section Skeleton */}
    <div className="flex-1 w-full space-y-3 pt-2">
      {/* Name */}
      <div 
        className="h-5 w-3/4 sm:w-1/2 rounded-md" 
        style={{ backgroundColor: colors.base }}
      />
      {/* Specialization */}
      <div className="flex items-center gap-2">
        <div className="h-3 w-3 rounded-full" style={{ backgroundColor: colors.base }} />
        <div className="h-3 w-1/3 rounded-md" style={{ backgroundColor: colors.base }} />
      </div>
      {/* Email */}
      <div className="flex items-center gap-2">
        <div className="h-3 w-3 rounded-full" style={{ backgroundColor: colors.base }} />
        <div className="h-3 w-2/3 rounded-md" style={{ backgroundColor: colors.base }} />
      </div>
    </div>

    {/* 3. Button Skeletons */}
    <div className="flex flex-row sm:flex-col gap-2 w-full sm:w-auto pt-1">
      <div 
        className="h-10 flex-1 sm:w-[110px] rounded-xl" 
        style={{ backgroundColor: colors.base }}
      />
      <div 
        className="h-10 flex-1 sm:w-[110px] rounded-xl" 
        style={{ backgroundColor: colors.base }}
      />
    </div>
  </div>
);

export const PendingApprovalsSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
      {/* Rendering 3 skeleton cards to match the grid layout */}
      <SkeletonItem />
      <SkeletonItem />
      <SkeletonItem />
    </div>
  );
};

export default PendingApprovalsSkeleton;