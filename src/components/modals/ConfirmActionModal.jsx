import React from "react";
import { colors } from "../../constants/color";
import { Button } from "../atoms/Button";

export const ConfirmActionModal = ({
  open,
  type, // 'approve' | 'reject'
  doctorName,
  onConfirm,
  onCancel,
  isProcessing,
}) => {
  if (!open) return null;

  const isApprove = type === "approve";

  return (
    <div className="fixed inset-0 backdrop-blur-sm z-40 flex items-center justify-center bg-black/30">
      <div className="bg-white rounded-3xl card-shadow px-6 py-5 max-w-sm w-full mx-4 sm:mx-0">
        <p className="text-lg md:text-xl font-semibold mb-1" style={{ color: colors.darkgray }}>
          {isApprove ? "Approve doctor" : "Reject doctor"}
        </p>
        <p className="text-sm md:text-base mb-4" style={{ color: colors.darkgray }}>
          Are you sure you want to {isApprove ? "approve" : "reject"}{" "}
          <span className="font-semibold">{doctorName}</span>?
        </p>
        <div className="flex justify-end gap-3 mt-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onCancel}
            disabled={isProcessing}
          >
            Cancel
          </Button>
          <Button
            variant={isApprove ? "primary" : "danger"}
            size="sm"
            onClick={onConfirm}
            isLoading={isProcessing}
          >
            {isApprove ? "Approve" : "Reject"}
          </Button>
        </div>
      </div>
    </div>
  );
};
