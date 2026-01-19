import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { motion } from "framer-motion";
import { 
  IconLock, 
  IconShieldCheck, 
  IconEye, 
  IconEyeOff, 
  IconUser, 
  IconMail, 
  IconCrown 
} from "@tabler/icons-react";

// ცალკე გამოტანილი ChangePassword კომპონენტი ზუსტად ისე, როგორც მოთხოვე
const ChangePassword = () => {
  const { changeUserPassword } = useAuth();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    setLoading(true);
    try {
      await changeUserPassword({ currentPassword, newPassword });
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

  const PasswordField = ({ label, value, onChange, show, setShow, placeholder }) => (
    <div className="space-y-2">
      <label className="text-[10px] uppercase tracking-widest text-gray-500 font-black ml-1">
        {label}
      </label>
      <div className="relative group">
        <input
          type={show ? "text" : "password"}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 pr-14 focus:outline-none focus:border-[#FE9A00]/50 transition-all text-sm text-white placeholder:text-gray-700"
          required
        />
        <button
          type="button"
          onClick={() => setShow(!show)}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#FE9A00] transition-colors p-1"
        >
          {show ? <IconEyeOff size={20} /> : <IconEye size={20} />}
        </button>
      </div>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full"
    >
      <div className="bg-[#0A0A0A] border border-white/5 rounded-[40px] p-8 md:p-12 relative overflow-hidden shadow-2xl">
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
            <PasswordField label="Current Password" value={currentPassword} onChange={setCurrentPassword} show={showCurrent} setShow={setShowCurrent} placeholder="••••••••" />
            <PasswordField label="New Password" value={newPassword} onChange={setNewPassword} show={showNew} setShow={setShowNew} placeholder="••••••••" />
            <PasswordField label="Confirm New Password" value={confirmPassword} onChange={setConfirmPassword} show={showConfirm} setShow={setShowConfirm} placeholder="••••••••" />
            <button type="submit" disabled={loading} className="w-full bg-[#FE9A00] text-black font-black uppercase tracking-widest py-5 rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-lg shadow-orange-500/10 disabled:opacity-50 mt-4">
              {loading ? "Processing..." : "Apply New Password"}
            </button>
          </form>
        </div>
      </div>
    </motion.div>
  );
};

// მთავარი კონფიგურაციის კომპონენტი
const AdminSystemConfig = () => {
  const { user } = useAuth();

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
        
        {/* მომხმარებლის ინფო ბარათი */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-[#0A0A0A] border border-white/5 rounded-[40px] p-8 md:p-12 relative overflow-hidden shadow-2xl flex flex-col justify-center"
        >
          <div className="absolute top-0 right-0 p-8 opacity-5 text-white">
            <IconUser size={120} />
          </div>
          <div className="relative z-10 space-y-8">
            <div className="flex items-center gap-3 mb-4">
               <h3 className="text-2xl font-black uppercase tracking-tighter italic">
                Admin <span className="text-gray-500">Identity</span>
              </h3>
            </div>
            
            <div className="space-y-6">
              <div className="group">
                <p className="text-[10px] uppercase font-black text-gray-500 tracking-[0.2em] mb-1">Full Name</p>
                <div className="flex items-center gap-3">
                  <IconUser size={18} className="text-[#FE9A00]" />
                  <p className="text-xl text-white font-medium">{user?.fullname}</p>
                </div>
              </div>

              <div className="group">
                <p className="text-[10px] uppercase font-black text-gray-500 tracking-[0.2em] mb-1">Email Address</p>
                <div className="flex items-center gap-3">
                  <IconMail size={18} className="text-[#FE9A00]" />
                  <p className="text-lg text-gray-300 font-medium">{user?.email}</p>
                </div>
              </div>

              <div className="group">
                <p className="text-[10px] uppercase font-black text-gray-500 tracking-[0.2em] mb-1">Privileges</p>
                <div className="flex items-center gap-3">
                  <IconCrown size={18} className="text-[#FE9A00]" />
                  <span className="text-sm font-black text-white uppercase tracking-widest bg-white/5 px-3 py-1 rounded-lg border border-white/10">
                    {user?.role || 'Administrator'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* პაროლის შეცვლის კომპონენტი */}
        <ChangePassword />
      </div>
    </div>
  );
};

export default AdminSystemConfig;