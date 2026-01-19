import ChangePassword from "./ChangePassword"; // დარწმუნდი, რომ ფაილის გზა სწორია

const AdminSystemConfig = () => {
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

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* მარცხენა მხარე: ინფორმაცია ან სხვა სეთინგები */}
                <div className="space-y-6">
                    <div className="bg-[#0A0A0A] border border-white/5 rounded-[32px] p-8 shadow-xl">
                        <h3 className="text-lg font-bold text-white mb-4">Security Overview</h3>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Updating your password regularly helps keep your administrator account secure.
                            Ensure your new password uses a combination of letters, numbers, and symbols.
                        </p>
                    </div>

                    {/* აქ შეგიძლია სხვა ადმინ ფუნქციებიც ჩაამატო მომავალში */}
                </div>

                {/* მარჯვენა მხარე: შენი ChangePassword კომპონენტი */}
                <div className="flex flex-col">
                    <ChangePassword />
                </div>
            </div>
        </div>
    );
};

export default AdminSystemConfig;