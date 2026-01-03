import React, { useEffect, useState } from "react";
import { FiUser, FiShield, FiMail, FiCalendar, FiRefreshCw, FiCheckCircle } from "react-icons/fi";
import { colors } from "../../constants/color";
import { getAdminProfile } from "../../apis/auth";
import { Input } from "../../components/atoms/Input";
import { Button } from "../../components/atoms/Button";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchProfile = async () => {
    setIsLoading(true);
    setError("");
    try {
      const res = await getAdminProfile();
      if (res?.data) setProfile(res.data);
    } catch (err) {
      setError(err?.message || "Failed to load profile");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  // Extract initials for the avatar
  const getInitials = (name) => {
    return name?.split(" ").map(n => n[0]).join("").toUpperCase() || "AD";
  };

  return (
    <div className="w-full flex justify-center items-start py-8 px-4">
      <div className="w-full max-w-3xl space-y-6">
        
        {/* 1. Profile Header Card */}
        <div 
          className="bg-white rounded-[32px] p-8 shadow-md flex flex-col md:flex-row items-center gap-6 relative overflow-hidden"
        >
          {/* Decorative background circle */}
          <div 
            className="absolute -top-10 -right-10 w-40 h-40 rounded-full opacity-10"
            style={{ backgroundColor: colors.primepink }}
          />

          <div 
            className="w-24 h-24 rounded-3xl flex items-center justify-center text-3xl font-bold  shrink-0"
            style={{ backgroundColor: colors.base, color: colors.hoverPink }}
          >
            {getInitials(profile?.fullName)}
          </div>

          <div className="text-center md:text-left flex-1">
            <h1 className="text-3xl font-bold font-poppins" style={{ color: colors.darkgray }}>
              {profile?.fullName || "Admin Profile"}
            </h1>
            <p className="text-gray-500 font-poppins flex items-center justify-center md:justify-start gap-2 mt-1">
              <FiShield size={14} style={{ color: colors.primeGreen }} />
              System Administrator
            </p>
          </div>

          <Button
            variant="outline"
            className="rounded-xl flex items-center gap-2 border-gray-100"
            onClick={fetchProfile}
            disabled={isLoading}
          >
            <FiRefreshCw className={isLoading ? "animate-spin" : ""} />
            Refresh
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          
          {/* 2. Account Details Section */}
          <div className="md:col-span-3 bg-white rounded-[32px] p-8 shadow-lg space-y-5">
            <h3 className="text-lg font-bold font-poppins flex items-center gap-2 mb-2" style={{ color: colors.darkgray }}>
              <FiUser style={{ color: colors.primepink }} /> Account Information
            </h3>

            {error && (
              <div className="p-3 rounded-xl text-xs" style={{ backgroundColor: "#FFF5F5", color: colors.primeRed }}>
                {error}
              </div>
            )}

            <div className="space-y-4">
              <Input label="Full Name" value={profile?.fullName || "Loading..."} readOnly disabled />
              <Input label="Email Address" value={profile?.email || "Loading..."} readOnly disabled />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input label="Admin ID" value={profile?.id?.slice(0, 8) || "..."} readOnly disabled />
                <Input 
                  label="Last Login" 
                  value={profile?.lastLogin ? new Date(profile.lastLogin).toLocaleDateString() : "Never"} 
                  readOnly 
                  disabled 
                />
              </div>
            </div>
          </div>

          {/* 3. Security & 2FA Section (Static) */}
          <div className="md:col-span-2 space-y-6">
            <div className="bg-white rounded-[32px] p-8 shadow-lg border-2 border-transparent transition-all hover:border-green-100">
              <h3 className="text-lg font-bold font-poppins flex items-center gap-2 mb-4" style={{ color: colors.darkgray }}>
                <FiShield style={{ color: colors.primeGreen }} /> Security
              </h3>

              <div className="p-4 rounded-2xl mb-6" style={{ backgroundColor: colors.base }}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-bold font-poppins" style={{ color: colors.darkgray }}>2FA Status</span>
                  <span className="flex items-center gap-1 text-[10px] font-bold uppercase px-2 py-1 rounded-full bg-white" style={{ color: colors.primeGreen }}>
                    <FiCheckCircle /> Active
                  </span>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Two-factor authentication is currently enabled for your account using an Authenticator App.
                </p>
              </div>

              <Button 
                variant="primary" 
                className="w-full py-3 rounded-xl text-sm"
                style={{ backgroundColor: colors.hoverPink }}
              >
                Manage 2FA
              </Button>
            </div>

            <div className="bg-white rounded-[32px] p-6 shadow-sm border border-gray-50 opacity-60">
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Security Log</p>
              <p className="text-xs font-medium">Password last changed 3 months ago</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Profile;