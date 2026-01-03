import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import { colors } from "../../constants/color";
import { getAdminProfile } from "../../apis/auth";
import { Sidebar } from "../../components/layouts/Sidebar";
import Approval from "./Approval";
import Doctors from "./Doctors";

const Home = () => {
  const navigate = useNavigate();

  const [admin, setAdmin] = useState(null);
  const [error, setError] = useState("");
  const [activeSection, setActiveSection] = useState("Approvals");
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const fetchAdmin = async () => {
    try {
      const profileRes = await getAdminProfile();
      if (profileRes?.data) setAdmin(profileRes.data);
    } catch (err) {
      setError(err?.message || "Failed to load dashboard data");
      if (err?.message?.toLowerCase().includes("unauthorized")) {
        navigate("/login");
      }
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/login");
      return;
    }
    fetchAdmin();
  }, []);

  const renderContent = () => {
    if (activeSection === "Approvals") return <Approval />;
    if (activeSection === "Doctors") return <Doctors />;
    if (activeSection === "Dashboard") {
      return (
        <p className="text-base" style={{ color: colors.darkgray }}>
          Dashboard overview coming soon.
        </p>
      );
    }
    return (
      <p className="text-base" style={{ color: colors.darkgray }}>
        {activeSection} section coming soon.
      </p>
    );
  };

  const openSidebar = () => {
    setIsSidebarVisible(true);
    // Allow the drawer to mount before starting the slide-in animation
    requestAnimationFrame(() => setIsSidebarOpen(true));
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
    // Wait for the slide-out animation to finish before unmounting
    setTimeout(() => setIsSidebarVisible(false), 300);
  };

  return (
    <div
      className="min-h-screen flex flex-col md:flex-row gap-4 md:gap-6 "
      style={{ backgroundColor: colors.base }}
    >
      {/* Desktop Sidebar */}
      <div className="hidden md:block h-full min-h-screen">
        <Sidebar active={activeSection} onChange={setActiveSection} />
      </div>

      <div className="flex-1 p-3 md:p-7 flex flex-col gap-4 min-h-screen">
        <header className="flex items-center justify-between mb-2 gap-3">
          <div className="flex items-center gap-3">
            {/* Mobile menu button */}
            <button
              type="button"
              className="md:hidden inline-flex items-center justify-center  rounded-full shadow-md bg-white"
              style={{ color: colors.hoverPink }}
              onClick={openSidebar}
            >
              <FiMenu size={22} />
            </button>

            <h1
              className="text-2xl md:text-3xl font-semibold"
              style={{ color: colors.darkgray }}
            >
              {activeSection}
            </h1>
          </div>

        </header>

        <p
          className="text-sm md:text-base mb-1 md:mb-2"
          style={{ color: colors.darkgray }}
        >
          Manage doctor approvals and view system status.
        </p>

        {error && (
          <div
            className="mb-2 px-4 py-2 rounded-lg text-sm md:text-base"
            style={{ backgroundColor: "#FEE2E2", color: colors.primeRed }}
          >
            {error}
          </div>
        )}

        <main className="flex-1">{renderContent()}</main>
      </div>

      {/* Mobile Sidebar Drawer */}
      {isSidebarVisible && (
        <div
          className={`fixed inset-0 z-40 flex md:hidden transition-opacity duration-300 ${
            isSidebarOpen ? "opacity-100" : "opacity-0"
          }`}
        >
          <div
            className="flex-1 bg-black/40"
            onClick={closeSidebar}
          />
          <div
            className={`w-72 max-w-[80%] h-full transform transition-transform duration-300 ${
              isSidebarOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <Sidebar
              active={activeSection}
              onChange={(section) => {
                setActiveSection(section);
                closeSidebar();
              }}
              onClose={closeSidebar}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
