import React from "react";
import { 
  FiX, FiMail, FiPhone, FiAward, FiFileText, 
  FiMapPin, FiClock, FiDollarSign, FiCalendar, FiCheck, FiTrash2 
} from "react-icons/fi";
import { colors } from "../../constants/color";
import { Button } from "../atoms/Button";

const DoctorDetailsModal = ({ isOpen, onClose, doctor, onApprove, onReject, isProcessing, showActions = true }) => {
  if (!isOpen || !doctor) return null;

  // Helper to handle null/empty values
  const InfoRow = ({ icon, label, value }) => (
    <div className="flex items-start gap-3 p-3 rounded-2xl" style={{ backgroundColor: colors.base + "50" }}>
      <div className="mt-1" style={{ color: colors.hoverPink }}>{icon}</div>
      <div>
        <p className="text-[10px] uppercase tracking-wider font-bold opacity-50">{label}</p>
        <p className="text-sm font-medium" style={{ color: colors.darkgray }}>
          {value || <span className="italic opacity-40">Not Provided</span>}
        </p>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div 
        className="relative bg-white w-full max-w-2xl rounded-[40px] shadow-2xl overflow-hidden flex flex-col animate-slideIn"
        style={{ maxHeight: "90vh" }}
      >
        {/* Header Section */}
        <div className="relative p-6 sm:p-8 pb-4 flex flex-col items-center sm:items-start sm:flex-row gap-6">
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <FiX size={24} style={{ color: colors.darkgray }} />
          </button>

          {/* Large Avatar */}
          <div 
            className="w-24 h-24 rounded-3xl flex items-center justify-center shrink-0 shadow-lg text-3xl font-bold"
            style={{ backgroundColor: colors.hoverPink, color: colors.white }}
          >
            {doctor.fullName?.charAt(0).toUpperCase()}
          </div>

          <div className="text-center sm:text-left pt-2">
            <h2 className="text-2xl md:text-3xl font-bold font-poppins" style={{ color: colors.darkgray }}>
              Dr. {doctor.fullName}
            </h2>
            <div className="flex items-center justify-center sm:justify-start gap-2 mt-1" style={{ color: colors.hoverPink }}>
              <FiAward />
              <p className="text-sm font-semibold uppercase tracking-widest">{doctor.specialization}</p>
            </div>
            <p className="text-xs text-gray-400 mt-2">ID: {doctor.id}</p>
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto px-6 sm:px-8 pb-8 custom-scrollbar">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Professional Info */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-widest opacity-30 mt-4">Professional Details</h3>
              <InfoRow icon={<FiFileText />} label="License Number" value={doctor.licenseNumber} />
              <InfoRow icon={<FiAward />} label="Qualification" value={doctor.qualification} />
              <InfoRow icon={<FiClock />} label="Experience" value={doctor.experience ? `${doctor.experience} Years` : null} />
              <InfoRow icon={<FiDollarSign />} label="Consultation Fee" value={doctor.consultationFee ? `$${doctor.consultationFee}` : null} />
            </div>

            {/* Contact Info */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-widest opacity-30 mt-4">Contact Details</h3>
              <InfoRow icon={<FiMail />} label="Email Address" value={doctor.email} />
              <InfoRow icon={<FiPhone />} label="Phone Number" value={doctor.phoneNumber} />
              <InfoRow icon={<FiMapPin />} label="Clinic Address" value={doctor.clinicAddress} />
              <InfoRow icon={<FiCalendar />} label="Joined On" value={new Date(doctor.createdAt).toLocaleDateString()} />
            </div>
          </div>

          {/* Bio Section */}
          <div className="mt-6 p-5 rounded-[24px] border border-dashed" style={{ borderColor: colors.primepink }}>
            <h3 className="text-xs font-bold uppercase tracking-widest opacity-40 mb-2">Professional Bio</h3>
            <p className="text-sm md:text-base leading-relaxed" style={{ color: colors.darkgray }}>
              {doctor.bio || "No biography provided by the doctor."}
            </p>
          </div>

          {/* Certificate Preview Placeholder */}
          {doctor.certificateUrl && (
            <div className="mt-6">
              <h3 className="text-xs font-bold uppercase tracking-widest opacity-40 mb-3">Verification Documents</h3>
              <a 
                href={doctor.certificateUrl} 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center gap-3 p-4 rounded-2xl border transition-all hover:bg-gray-50"
                style={{ borderColor: colors.base }}
              >
                <FiFileText className="text-2xl" style={{ color: colors.hoverPink }} />
                <span className="text-sm font-medium">View Medical Certificate.pdf</span>
              </a>
            </div>
          )}
        </div>

        {/* Footer Actions (hidden in read-only view) */}
        {showActions && (
          <div className="p-8 pt-4 border-t border-gray-100 flex gap-3">
            <Button
              className="flex-1 py-4 flex items-center justify-center gap-2 rounded-2xl text-white shadow-lg shadow-green-100"
              style={{ backgroundColor: colors.hoverPink }}
              onClick={() => onApprove(doctor)}
              disabled={isProcessing}
            >
              <FiCheck /> Approve Doctor
            </Button>
            <Button
              className="flex-1 py-4 flex items-center justify-center gap-2 rounded-2xl border-2 transition-colors"
              style={{ color: colors.primeRed, borderColor: '#FEE2E2', backgroundColor: '#FFF5F5' }}
              onClick={() => onReject(doctor)}
              disabled={isProcessing}
            >
              <FiTrash2 /> Reject Application
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorDetailsModal;