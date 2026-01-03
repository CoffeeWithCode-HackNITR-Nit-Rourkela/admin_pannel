import React from "react";
import { 
  FiGrid, 
  FiCheckCircle, 
  FiUser, 
  FiUsers, 
  FiSettings, 
  FiLogOut,
  FiActivity,
  FiX,
} from "react-icons/fi";
import { colors } from "../../constants/color";

const items = [
  { label: "Dashboard", icon: <FiGrid /> },
  { label: "Approvals", icon: <FiCheckCircle /> },
  { label: "Doctors", icon: <FiActivity /> },
  { label: "Patients", icon: <FiUsers /> },
  { label: "Profile", icon: <FiUser /> },
  { label: "Settings", icon: <FiSettings /> },
];

export const Sidebar = ({ active, onChange, onClose }) => {
  return (
    <aside 
      className="min-h-screen w-full md:w-72 bg-white rounded-r-[40px] shadow-2xl flex flex-col py-8 px-6 transition-all duration-300"
    >
      {/* Brand Logo Section */}
      <div className="mb-8 px-2 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div 
            className="p-2 rounded-xl text-white shadow-lg"
            style={{ backgroundColor: colors.hoverPink }}
          >
            <FiActivity size={24} />
          </div>
          <div>
            <p className="text-xl md:text-2xl font-bold tracking-tight font-poppins" style={{ color: colors.darkgray }}>
              Health<span style={{ color: colors.hoverPink }}>ness</span>
            </p>
            <p className="text-[10px] uppercase tracking-widest font-semibold opacity-50">
              Admin Portal
            </p>
          </div>
        </div>

        {onClose && (
          <button
            type="button"
            className="md:hidden inline-flex items-center justify-center p-2 rounded-full hover:bg-gray-100 transition-colors"
            onClick={onClose}
            style={{ color: colors.darkgray }}
          >
            <FiX size={18} />
          </button>
        )}
      </div>

      {/* Navigation Links */}
      <nav className="space-y-2 flex-1">
        {items.map((item) => {
          const isActive = active === item.label;
          return (
            <button
              key={item.label}
              type="button"
              onClick={() => onChange?.(item.label)}
              className="group w-full flex items-center gap-4 text-sm md:text-base font-semibold rounded-2xl px-4 py-3.5 transition-all duration-200 relative overflow-hidden"
              style={{
                backgroundColor: isActive ? colors.primepink : "transparent",
                color: isActive ? colors.darkgray : "#6B7280", // Gray-500 for inactive
              }}
              onMouseEnter={(e) => {
                if (!isActive) e.currentTarget.style.backgroundColor = `${colors.primepink}50`; // 50 is hex alpha
              }}
              onMouseLeave={(e) => {
                if (!isActive) e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              {/* Active Indicator Bar */}
              {isActive && (
                <div 
                  className="absolute left-0 top-1/4 bottom-1/4 w-1 rounded-r-full"
                  style={{ backgroundColor: colors.hoverPink }}
                />
              )}

              <span className={`text-lg transition-transform duration-200 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`}
                    style={{ color: isActive ? colors.hoverPink : "inherit" }}>
                {item.icon}
              </span>
              
              <span className="font-poppins">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Footer / Logout */}
      <div className="pt-6 mt-6 border-t border-gray-100">
        <button
          className="w-full flex items-center gap-4 px-4 py-3 text-sm font-semibold rounded-2xl transition-colors font-poppins"
          style={{ color: colors.primeRed }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#FFF5F5"}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}
        >
          <FiLogOut size={18} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;