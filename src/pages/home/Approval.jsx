import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { colors } from "../../constants/color";
import {
  getPendingDoctors,
  approveDoctor,
  rejectDoctor,
} from "../../apis/approvals";
import { DoctorCard } from "../../components/cards/DoctorCard";
import { ConfirmActionModal } from "../../components/modals/ConfirmActionModal";
import DoctorDetailsModal from "../../components/modals/DoctorDetailsModal";
import { useToast } from "../../components/ToastProvider";
import PendingApprovalsSkeleton from "../../components/skeletons/PendingApprovalsSkeleton";
const Approval = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [pendingDoctors, setPendingDoctors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isActionLoading, setIsActionLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [modalState, setModalState] = useState({
    open: false,
    type: null,
    doctor: null,
  });
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    setError("");
    try {
      const [pendingRes] = await Promise.all([getPendingDoctors()]);
      if (pendingRes?.doctors) setPendingDoctors(pendingRes.doctors);
    } catch (err) {
      setError(err?.message || "Failed to load dashboard data");
      if (err?.message?.toLowerCase().includes("unauthorized")) {
        navigate("/login");
      }
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
    fetchData();
  }, []);

  const openConfirm = (type, doctor) => {
    setModalState({ open: true, type, doctor });
  };

  const closeConfirm = () => {
    setModalState({ open: false, type: null, doctor: null });
  };

  const handleApprove = async () => {
    const doctor = modalState.doctor;
    if (!doctor) return;
    try {
      setIsActionLoading(true);
      await approveDoctor(doctor.id);
      showToast("Doctor approved successfully.", "success");
      closeConfirm();
      // Remove approved doctor from local state without reloading the whole page
      setPendingDoctors((prev) => prev.filter((d) => d.id !== doctor.id));
    } catch (err) {
      const message = err?.message || "Failed to approve doctor";
      setError(message);
      showToast(message, "error");
    } finally {
      setIsActionLoading(false);
    }
  };

  const handleReject = async () => {
    const doctor = modalState.doctor;
    if (!doctor) return;
    try {
      setIsActionLoading(true);
      await rejectDoctor(doctor.id);
      showToast("Doctor rejected.", "success");
      closeConfirm();
      // Remove rejected doctor from local state without reloading the whole page
      setPendingDoctors((prev) => prev.filter((d) => d.id !== doctor.id));
    } catch (err) {
      const message = err?.message || "Failed to reject doctor";
      setError(message);
      showToast(message, "error");
    } finally {
      setIsActionLoading(false);
    }
  };
  return (
    <div className=" gap-5 w-full">
      <section className="flex-1 card-shadow glass-effect rounded-2xl p-4">
        <div className="flex items-center justify-between mb-3">
          <h2
            className="text-lg md:text-xl font-semibold"
            style={{ color: colors.darkgray }}
          >
            Pending Approvals
          </h2>
          <span
            className="text-xs md:text-sm px-2 py-1 rounded-full"
            style={{
              backgroundColor: colors.primepink,
              color: colors.darkgray,
            }}
          >
            {pendingDoctors.length} pending
          </span>
        </div>
        <div className="max-h-screen overflow-y-auto pr-1">
          {isLoading ? (
            <PendingApprovalsSkeleton />
          ) : pendingDoctors.length === 0 ? (
            <p
              className="text-sm md:text-base"
              style={{ color: colors.darkgray }}
            >
              No pending doctor approvals.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
              {pendingDoctors.map((doctor) => (
                <DoctorCard
                  key={doctor.id}
                  doctor={doctor}
                  isProcessing={isActionLoading}
                  onClick={(doc) => {
                    setSelectedDoctor(doc);
                    setIsDetailsOpen(true);
                  }}
                  onApprove={(doc) => openConfirm("approve", doc)}
                  onReject={(doc) => openConfirm("reject", doc)}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      <DoctorDetailsModal
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        doctor={selectedDoctor}
        onApprove={(doc) => openConfirm("approve", doc)}
        onReject={(doc) => openConfirm("reject", doc)}
        isProcessing={isActionLoading}
      />

      <ConfirmActionModal
        open={modalState.open}
        type={modalState.type}
        doctorName={modalState.doctor?.fullName || "this doctor"}
        onConfirm={modalState.type === "approve" ? handleApprove : handleReject}
        onCancel={closeConfirm}
        isProcessing={isActionLoading}
      />
    </div>
  );
};

export default Approval;
