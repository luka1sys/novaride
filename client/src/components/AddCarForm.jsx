import { createPortal } from "react-dom";
import { useCars } from "../contexts/CarsContext";
import { useState, useEffect } from "react";
import { 
    IconX, IconSettings, IconUpload, IconCheck
} from "@tabler/icons-react";

const AddCarForm = ({ onClose }) => {
    const { addCar } = useCars();
    const accentColor = "rgb(254, 154, 0)";

    // Scroll Lock
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => { document.body.style.overflow = 'unset'; };
    }, []);

    const [features, setFeatures] = useState({
        airCondition: false, musicSystem: false, toolkit: false,
        absSystem: false, bluetooth: false, fullBootSpace: false,
        usbCharger: false, auxInput: false, spareTyre: false,
        powerSteering: false, powerWindows: false
    });

    const handleFeatureChange = (e) => {
        const { name, checked } = e.target;
        setFeatures(prev => ({ ...prev, [name]: checked }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        formData.append("features", JSON.stringify(features));

        try {
            await addCar(formData);
            alert("Vehicle integrated into fleet!");
            if (onClose) onClose();
        } catch (error) {
            console.error("Error adding car:", error);
        }
    };

    const inputStyle = "w-full bg-white/[0.03] border border-white/10 p-4 rounded-2xl text-sm text-white focus:outline-none focus:border-orange-500/50 focus:bg-white/[0.05] transition-all placeholder:text-gray-700";
    const labelStyle = "text-xs font-semibold text-gray-500 ml-1 mb-2 block group-focus-within:text-orange-500 transition-colors";

    return createPortal(
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4">
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={onClose} />

            {/* Form Container - შეცვლილია კლასი: no-scrollbar */}
            <div className="bg-[#0A0A0A] p-8 md:p-10 rounded-[40px] relative overflow-hidden border border-white/5 shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-y-auto no-scrollbar">
                
                {/* Background Glow */}
                <div className="absolute -top-24 -right-24 w-64 h-64 bg-orange-500/10 blur-[100px] rounded-full" />

                {/* Close Button */}
                <button onClick={onClose} className="absolute top-6 right-6 p-2.5 bg-white/5 hover:bg-orange-500 hover:text-white rounded-xl transition-all text-gray-500 active:scale-90 z-10">
                    <IconX size={20} />
                </button>

                {/* Header */}
                <div className="mb-10 relative">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-1.5 h-6 bg-orange-500 rounded-full" />
                        <h2 className="text-2xl font-bold tracking-tight text-white leading-none">
                            Register New <span style={{ color: accentColor }}>Vehicle</span>
                        </h2>
                    </div>
                    <p className="text-xs text-gray-500 font-medium tracking-wide ml-4 uppercase">Fleet Expansion Terminal</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8 relative">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        
                        {/* Left Column - Core Info */}
                        <div className="space-y-5">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="group">
                                    <label className={labelStyle}>Brand</label>
                                    <input type="text" name="brand" placeholder="e.g. BMW" required className={inputStyle} />
                                </div>
                                <div className="group">
                                    <label className={labelStyle}>Model</label>
                                    <input type="text" name="model" placeholder="e.g. M4" required className={inputStyle} />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="group">
                                    <label className={labelStyle}>Release Year</label>
                                    <input type="number" name="year" placeholder="2024" required className={inputStyle} />
                                </div>
                                <div className="group">
                                    <label className={labelStyle}>Price / Day ($)</label>
                                    <input type="number" name="pricePerDay" placeholder="250" required className={inputStyle} />
                                </div>
                            </div>

                            <div className="group">
                                <label className={labelStyle}>Media Gallery</label>
                                <div className="relative group/upload">
                                    <input type="file" name="images" multiple className="absolute inset-0 opacity-0 cursor-pointer z-10" />
                                    <div className="border-2 border-dashed border-white/10 rounded-2xl py-8 flex flex-col items-center justify-center group-hover/upload:border-orange-500/50 group-hover/upload:bg-white/[0.02] transition-all">
                                        <IconUpload className="text-gray-600 mb-2 group-hover/upload:text-orange-500" size={24} />
                                        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Drop images here</span>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="group">
                                    <label className={labelStyle}>Car Type</label>
                                    <input type="text" name="carType" placeholder="Sport / Sedan" className={inputStyle} />
                                </div>
                                <div className="group">
                                    <label className={labelStyle}>Engine</label>
                                    <input type="text" name="engine" placeholder="3.0L V6" className={inputStyle} />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="group">
                                    <label className={labelStyle}>Transmission</label>
                                    <input type="text" name="transmission" placeholder="Automatic" className={inputStyle} />
                                </div>
                                <div className="group">
                                    <label className={labelStyle}>Condition</label>
                                    <input type="text" name="condition" placeholder="New / Used" className={inputStyle} />
                                </div>
                            </div>
                        </div>

                        {/* Right Column - Tech Specs & Details */}
                        <div className="space-y-5">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="group">
                                    <label className={labelStyle}>Mileage (km)</label>
                                    <input type="number" name="mileage" placeholder="0" className={inputStyle} />
                                </div>
                                <div className="group">
                                    <label className={labelStyle}>Fuel Type</label>
                                    <input type="text" name="fueltype" placeholder="Petrol / Electric" className={inputStyle} />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="group">
                                    <label className={labelStyle}>Country of Origin</label>
                                    <input type="text" name="countryoforigin" placeholder="Germany" className={inputStyle} />
                                </div>
                                <div className="group">
                                    <label className={labelStyle}>Location</label>
                                    <input type="text" name="location" placeholder="Tbilisi, Georgia" className={inputStyle} />
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-3">
                                <div className="group">
                                    <label className={labelStyle}>Doors</label>
                                    <input type="number" name="doors" placeholder="2" className={inputStyle} />
                                </div>
                                <div className="group">
                                    <label className={labelStyle}>Seats</label>
                                    <input type="number" name="seats" placeholder="4" className={inputStyle} />
                                </div>
                                <div className="group">
                                    <label className={labelStyle}>Passenger</label>
                                    <input type="number" name="pasenger" placeholder="4" className={inputStyle} />
                                </div>
                            </div>

                            <div className="group">
                                <label className={labelStyle}>Contact Phone</label>
                                <input type="text" name="phone" placeholder="+995 ..." className={inputStyle} />
                            </div>

                            <div className="group">
                                <label className={labelStyle}>Vehicle Description</label>
                                <textarea name="description" placeholder="Full history and specs..." className={`${inputStyle} h-[116px] resize-none`} />
                            </div>
                        </div>
                    </div>

                    {/* Features Section */}
                    <div className="pt-6 border-t border-white/5">
                        <div className="flex items-center gap-2 mb-6">
                            <IconSettings size={18} className="text-orange-500" />
                            <h3 className="text-[11px] font-bold text-white uppercase tracking-[0.2em]">Equipment & Systems</h3>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            {Object.keys(features).map(key => (
                                <label key={key} className="flex items-center gap-3 cursor-pointer group/feat">
                                    <div className="relative">
                                        <input
                                            type="checkbox"
                                            name={key}
                                            checked={features[key]}
                                            onChange={handleFeatureChange}
                                            className="peer hidden"
                                        />
                                        <div className="w-5 h-5 border border-white/10 rounded-lg peer-checked:bg-orange-500 peer-checked:border-orange-500 transition-all flex items-center justify-center">
                                            <IconCheck className="text-black hidden peer-checked:block" size={14} stroke={4} />
                                        </div>
                                    </div>
                                    <span className="text-[10px] font-bold text-gray-500 group-hover/feat:text-white uppercase tracking-tight transition-colors">
                                        {key.replace(/([A-Z])/g, ' $1')}
                                    </span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="pt-4 flex gap-4">
                         <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-8 py-5 rounded-2xl border border-white/10 text-xs font-bold text-gray-400 hover:bg-white/5 hover:text-white transition-all active:scale-95"
                        >
                            Cancel
                        </button>
                        <button 
                            type="submit" 
                            className="flex-[2] bg-white text-black py-5 rounded-2xl font-bold  tracking-widest hover:bg-orange-500 hover:text-white transition-all shadow-xl active:scale-95 flex items-center justify-center gap-2"
                        >
                            Add car to Fleet
                        </button>
                    </div>
                </form>
            </div>
        </div>,
        document.body
    );
};

export default AddCarForm;