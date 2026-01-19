import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { motion } from "framer-motion";
import { IconLock, IconShieldCheck } from "@tabler/icons-react";

const ChangePassword = () => {
  const { changeUserPassword } = useAuth();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      await changeUserPassword({
        currentPassword,
        newPassword,
      });
      alert("Password changed successfully!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      alert("Failed to change password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-xl mx-auto"
    >
      <div className="bg-[#0A0A0A] border border-white/5 rounded-[40px] p-8 md:p-12 relative overflow-hidden shadow-2xl">
        {/* დეკორატიული აიქონი ფონზე */}
        <div className="absolute top-0 right-0 p-8 opacity-5 text-[#FE9A00]">
          <IconLock size={120} />
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-[#FE9A00]">
              <IconShieldCheck size={24} />
            </div>
            <h3 className="text-2xl font-black uppercase tracking-tighter italic">
              Update <span className="text-[#FE9A00]">Security</span>
            </h3>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Current Password */}
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-gray-500 font-black ml-1">
                Current Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:border-[#FE9A00]/50 transition-all text-sm text-white placeholder:text-gray-700"
                required
              />
            </div>

            {/* New Password */}
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-gray-500 font-black ml-1">
                New Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:border-[#FE9A00]/50 transition-all text-sm text-white placeholder:text-gray-700"
                required
              />
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-gray-500 font-black ml-1">
                Confirm New Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:border-[#FE9A00]/50 transition-all text-sm text-white placeholder:text-gray-700"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#FE9A00] text-black font-black uppercase tracking-widest py-5 rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-lg shadow-orange-500/10 disabled:opacity-50 disabled:hover:scale-100"
            >
              {loading ? "Processing..." : "Apply New Password"}
            </button>
          </form>

          <p className="mt-6 text-[10px] text-center text-gray-600 font-medium uppercase tracking-widest">
            Ensure your new password is at least 8 characters long
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default ChangePassword;