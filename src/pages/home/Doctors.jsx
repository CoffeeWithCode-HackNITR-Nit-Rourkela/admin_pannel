import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { colors } from "../../constants/color";
import { getAllDoctors } from "../../apis/approvals";
import { DoctorCard } from "../../components/cards/DoctorCard";
import DoctorDetailsModal from "../../components/modals/DoctorDetailsModal";
import DoctorsSkeleton from "../../components/skeletons/DoctorsSkeleton";

const Doctors = () => {
  const navigate = useNavigate();

  const [doctors, setDoctors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const fetchDoctors = async () => {
    setIsLoading(true);
    setError("");
    try {
      const res = await getAllDoctors();
      const approvedDoctors = (res?.doctors || []).filter(
        (doc) => doc.isApproved
      );
      setDoctors(approvedDoctors);
    } catch (err) {
      setError(err?.message || "Failed to load doctors");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/login");
      return;
    }
    fetchDoctors();
  }, []);

  return (
    <div className="card-shadow max-h-screen glass-effect rounded-2xl p-4 w-full">
      <div className="flex items-center justify-between mb-3">
        <h2
          className="text-lg md:text-xl font-semibold"
          style={{ color: colors.darkgray }}
        >
          Approved Doctors
        </h2>
        <span
          className="text-xs md:text-sm px-2 py-1 rounded-full"
          style={{
            backgroundColor: colors.primepink,
            color: colors.darkgray,
          }}
        >
          {doctors.length} doctors
        </span>
      </div>

      {error && (
        <div
          className="mb-2 px-4 py-2 rounded-lg text-xs md:text-sm"
          style={{ backgroundColor: "#FEE2E2", color: colors.primeRed }}
        >
          {error}
        </div>
      )}

      {isLoading ? (
        <div className="space-y-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 overflow-y-auto pr-1">
        <DoctorsSkeleton />
        </div>
      ) : doctors.length === 0 ? (
        <p
          className="text-sm md:text-base"
          style={{ color: colors.darkgray }}
        >
          No approved doctors found.
        </p>
      ) : (
        <div className="space-y-3 grid grid-cols-1 md:grid-cols-2 gap-4 lg:grid-cols-3 overflow-y-auto pr-1">
          {doctors.map((doctor) => (
            <DoctorCard
              key={doctor.id}
              doctor={doctor}
              isProcessing={false}
              onClick={(doc) => {
                setSelectedDoctor(doc);
                setIsDetailsOpen(true);
              }}
              showActions={false}
            />
          ))}
        </div>
      )}

      <DoctorDetailsModal
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        doctor={selectedDoctor}
        isProcessing={false}
        showActions={false}
      />
    </div>
  );
};

export default Doctors;
