import { useEffect, useState } from "react";
import { useCars } from "../contexts/CarsContext";

const CarFilter = () => {
    const { cars, getCars } = useCars();
    const [filters, setFilters] = useState({
        brand: "",
        model: "",
        carType: "",
        minYear: "",
        maxYear: "",
        minPrice: "",
        maxPrice: "",
    });
    const [filteredCarTypes, setFilteredCarTypes] = useState([]);
    const [years, setYears] = useState([]);
    const [prices, setPrices] = useState([]);
    const [filteredModels, setFilteredModels] = useState([]);

    useEffect(() => {
        if (filters.brand) {
            const types = cars
                .filter(car => car.brand === filters.brand)
                .map(car => car.carType);
            setFilteredCarTypes([...new Set(types)]);
        } else {
            const types = cars.map(car => car.carType);
            setFilteredCarTypes([...new Set(types)]);
        }
    }, [filters.brand, cars]);

    useEffect(() => {
        const uniqueYears = [...new Set(cars.map(car => car.year))].sort((a, b) => b - a);
        setYears(uniqueYears);
        const uniquePrices = [...new Set(cars.map(car => car.pricePerDay))].sort((a, b) => a - b);
        setPrices(uniquePrices);
    }, [cars]);

    const handleFilter = () => {
        getCars(filters);
    };

    const handleRefresh = () => {
        setFilters({
            brand: "",
            model: "",
            carType: "",
            minYear: "",
            maxYear: "",
            minPrice: "",
            maxPrice: "",
        });
        getCars({});
    };

    // საერთო სტილი select ელემენტებისთვის
    const selectStyles = "w-full bg-white/5 border border-white/10 text-white/80 text-sm rounded-2xl h-[50px] px-4 outline-none focus:border-amber-500/50 focus:bg-white/10 transition-all appearance-none cursor-pointer hover:border-white/20";

    return (
        <div className="w-full flex flex-col space-y-5">
            {/* Brands */}
            <div className="relative">
                <select 
                    className={selectStyles}
                    value={filters.brand}
                    onChange={(e) => {
                        const brand = e.target.value;
                        setFilters({ ...filters, brand, model: "" });
                        const models = cars
                            .filter(car => car.brand === brand)
                            .map(car => car.model);
                        setFilteredModels([...new Set(models)]);
                    }}
                >
                    <option className="bg-[#1a1a1a]" value="">Select Brand</option>
                    {[...new Set(cars.map(car => car.brand))].map(b => (
                        <option className="bg-[#1a1a1a]" key={b} value={b}>{b}</option>
                    ))}
                </select>
            </div>

            {/* Models */}
            <select 
                className={selectStyles}
                value={filters.model}
                onChange={(e) => setFilters({ ...filters, model: e.target.value })}
            >
                <option className="bg-[#1a1a1a]" value="">Select Model</option>
                {filteredModels.map(m => (
                    <option className="bg-[#1a1a1a]" key={m} value={m}>{m}</option>
                ))}
            </select>

            {/* Car Type */}
            <select 
                className={selectStyles}
                value={filters.carType}
                onChange={(e) => setFilters({ ...filters, carType: e.target.value })}
            >
                <option className="bg-[#1a1a1a]" value="">Body Type</option>
                {filteredCarTypes.map(type => (
                    <option className="bg-[#1a1a1a]" key={type} value={type}>{type}</option>
                ))}
            </select>

            {/* Divider */}
            <div className="py-2 flex items-center gap-4">
                <div className="h-px bg-white/5 flex-1"></div>
                <span className="text-[10px] font-black text-white/20 uppercase tracking-widest">Range</span>
                <div className="h-px bg-white/5 flex-1"></div>
            </div>

            {/* Year Range */}
            <div className="flex gap-3">
                <select
                    value={filters.minYear}
                    onChange={(e) => setFilters({ ...filters, minYear: e.target.value })}
                    className={`${selectStyles} !h-[45px] text-xs`}
                >
                    <option className="bg-[#1a1a1a]" value="">Min Year</option>
                    {years.map(year => (
                        <option className="bg-[#1a1a1a]" key={year} value={year}>{year}</option>
                    ))}
                </select>
                <select
                    value={filters.maxYear}
                    onChange={(e) => setFilters({ ...filters, maxYear: e.target.value })}
                    className={`${selectStyles} !h-[45px] text-xs`}
                >
                    <option className="bg-[#1a1a1a]" value="">Max Year</option>
                    {years.filter(y => !filters.minYear || y >= filters.minYear).map(year => (
                        <option className="bg-[#1a1a1a]" key={year} value={year}>{year}</option>
                    ))}
                </select>
            </div>

            {/* Price Range */}
            <div className="flex gap-3">
                <select
                    value={filters.minPrice}
                    onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
                    className={`${selectStyles} !h-[45px] text-xs`}
                >
                    <option className="bg-[#1a1a1a]" value="">Min $</option>
                    {prices.map(price => (
                        <option className="bg-[#1a1a1a]" key={price} value={price}>${price}</option>
                    ))}
                </select>
                <select
                    value={filters.maxPrice}
                    onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
                    className={`${selectStyles} !h-[45px] text-xs`}
                >
                    <option className="bg-[#1a1a1a]" value="">Max $</option>
                    {prices.filter(p => !filters.minPrice || p >= filters.minPrice).map(price => (
                        <option className="bg-[#1a1a1a]" key={price} value={price}>${price}</option>
                    ))}
                </select>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 flex flex-col gap-3">
                <button 
                    className="w-full h-[55px] bg-amber-500 hover:bg-white text-black font-black uppercase tracking-widest text-sm rounded-2xl transition-all duration-300 shadow-lg shadow-amber-500/10 active:scale-95" 
                    onClick={handleFilter}
                >
                    Apply Filters
                </button>
                <button 
                    className="w-full h-[55px] bg-white/5 hover:bg-white/10 text-white/60 font-bold uppercase tracking-widest text-[10px] rounded-2xl transition-all duration-300 border border-white/5 active:scale-95" 
                    onClick={handleRefresh}
                >
                    Reset All
                </button>
            </div>
        </div>
    );
};

export default CarFilter;