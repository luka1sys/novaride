import ChangePassword from "./ChangePasswordForm";
import { useAuth } from "../contexts/AuthContext";
import { IconUser, IconMail, IconCrown, IconId } from "@tabler/icons-react";
import { motion } from "framer-motion";

const AdminSystemConfig = () => {
    const { user } = useAuth(); // წამოვიღოთ იუზერის ინფო

    return (
        <div className="max-w-6xl mx-auto p-6 md:p-12">
            {/* სათაურის სექცია */}
            <div className="mb-10">
                <h1 className="text-3xl font-black uppercase tracking-tighter italic text-white">
                    System <span className="text-[#FE9A00]">Config</span>
                </h1>
                <p className="text-gray-500 text-xs uppercase tracking-[0.2em] mt-2">
                    Manage security and administrative preferences
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                
                {/* მარცხენა მხარე: მომხმარებლის ინფორმაცია */}
                <div className="space-y-6">
                    <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-[#0A0A0A] border border-white/5 rounded-[32px] p-8 shadow-xl relative overflow-hidden"
                    >
                        {/* ფონური დეკორაცია */}
                        <div className="absolute -top-10 -right-10 opacity-[0.03] text-white">
                            <IconUser size={200} />
                        </div>

                        <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                            <IconId className="text-[#FE9A00]" size={20} />
                            Admin Identity
                        </h3>

                        <div className="space-y-5 relative z-10">
                            {/* სახელი და გვარი */}
                            <div className="group">
                                <p className="text-[10px] uppercase font-black text-gray-500 tracking-widest mb-1">Full Name</p>
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-lg bg-white/5 text-white">
                                        <IconUser size={18} />
                                    </div>
                                    <p className="text-white font-medium">{user?.fullname || 'N/A'}</p>
                                </div>
                            </div>

                            {/* ელ-ფოსტა */}
                            <div className="group">
                                <p className="text-[10px] uppercase font-black text-gray-500 tracking-widest mb-1">Email Address</p>
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-lg bg-white/5 text-white">
                                        <IconMail size={18} />
                                    </div>
                                    <p className="text-gray-300 font-medium">{user?.email || 'N/A'}</p>
                                </div>
                            </div>

                            {/* როლი/სტატუსი */}
                            <div className="group">
                                <p className="text-[10px] uppercase font-black text-gray-500 tracking-widest mb-1">Privileges</p>
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-lg bg-[#FE9A00]/10 text-[#FE9A00]">
                                        <IconCrown size={18} />
                                    </div>
                                    <span className="text-xs font-black text-white uppercase tracking-widest bg-white/5 px-3 py-1 rounded-full border border-white/10">
                                        {user?.role || 'Administrator'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Security Overview (პატარა ბარათი ქვემოთ) */}
                    <div className="bg-[#0A0A0A] border border-white/5 rounded-[24px] p-6 shadow-xl opacity-60">
                        <p className="text-gray-400 text-xs leading-relaxed italic">
                            * System logs record all security changes. Your IP address and timestamp are logged during password updates for security purposes.
                        </p>
                    </div>
                </div>

                {/* მარჯვენა მხარე: ChangePassword კომპონენტი */}
                <div className="flex flex-col">
                    <ChangePassword />
                </div>
            </div>
        </div>
    );
};

export default AdminSystemConfig;