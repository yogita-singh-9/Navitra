'use client';

import { useState } from 'react';
import {
    Plane,
    Train,
    Bus,
    Car,
    ArrowRightLeft,
    ChevronDown,
    Plus
} from 'lucide-react';

const TRANSPORT_TYPES = [
    { id: 'flights', icon: Plane, label: 'Flights' },
    { id: 'trains', icon: Train, label: 'Trains' },
    { id: 'buses', icon: Bus, label: 'Buses' },
    { id: 'cabs', icon: Car, label: 'Cabs' },
];

type TripType = 'one-way' | 'round-trip' | 'multi-city';

interface CityPair {
    id: string;
    from: string;
    to: string;
    date: string;
}

export default function SearchWidget() {
    const [activeTransport, setActiveTransport] = useState('flights');
    const [tripType, setTripType] = useState<TripType>('one-way');

    const getTodayDate = () => new Date().toISOString().split('T')[0];

    const [cityPairs, setCityPairs] = useState<CityPair[]>([
        {
            id: '1',
            from: 'San Francisco',
            to: 'Tokyo',
            date: getTodayDate(),
        }
    ]);

    const addCity = () => {
        setCityPairs([...cityPairs, {
            id: Math.random().toString(),
            from: cityPairs[cityPairs.length - 1].to || '',
            to: '',
            date: getTodayDate(),
        }]);
    };

    const removeCity = (id: string) => {
        if (cityPairs.length > 1) {
            setCityPairs(cityPairs.filter(city => city.id !== id));
        }
    };

    const updateCityPair = (id: string, field: keyof CityPair, value: string) => {
        setCityPairs(cityPairs.map(pair => pair.id === id ? { ...pair, [field]: value } : pair));
    };

    const handleSwap = (index: number = 0) => {
        const pairs = [...cityPairs];
        const tempFrom = pairs[index].from;
        pairs[index].from = pairs[index].to;
        pairs[index].to = tempFrom;
        setCityPairs(pairs);
    };

    return (
        <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-visible relative mb-12">
            {/* Top Transport Tabs */}
            <div className="flex items-center justify-center p-2 pt-4 overflow-x-auto no-scrollbar border-b border-slate-100">
                <div className="flex gap-2">
                    {TRANSPORT_TYPES.map((type) => {
                        const Icon = type.icon;
                        const isActive = activeTransport === type.id;
                        return (
                            <button
                                key={type.id}
                                onClick={() => setActiveTransport(type.id)}
                                className={`flex flex-col items-center gap-1.5 px-6 py-3 rounded-2xl relative transition-all ${isActive
                                    ? 'bg-primary/5 text-primary border-b-4 border-primary'
                                    : 'text-slate-500 hover:bg-slate-50'
                                    }`}
                            >
                                <Icon className="w-6 h-6" />
                                <span className="text-xs font-bold whitespace-nowrap">{type.label}</span>
                            </button>
                        );
                    })}
                </div>
            </div>

            <div className="px-8 pb-12 pt-6">
                {/* Trip Type Radios */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex gap-6">
                        {(['one-way', 'round-trip', 'multi-city'] as TripType[]).map((type) => (
                            <label key={type} className="flex items-center gap-2 cursor-pointer group">
                                <input
                                    type="radio"
                                    name="trip-type"
                                    checked={tripType === type}
                                    onChange={() => {
                                        setTripType(type);
                                        // Reset to 1 pair if switching away from multi-city
                                        if (type !== 'multi-city' && cityPairs.length > 1) {
                                            setCityPairs([cityPairs[0]]);
                                        }
                                    }}
                                    className="text-primary focus:ring-primary w-4 h-4 border-slate-300"
                                />
                                <span className="text-sm font-bold text-slate-700 capitalize">
                                    {type.replace('-', ' ')}
                                </span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Dynamic Search Rows */}
                <div className="space-y-4 mb-4">
                    {cityPairs.map((pair, index) => (
                        <div key={pair.id} className="grid grid-cols-1 md:grid-cols-12 border border-slate-200 rounded-2xl overflow-hidden shadow-sm relative group/row">

                            {tripType === 'multi-city' && index > 0 && (
                                <button
                                    onClick={() => removeCity(pair.id)}
                                    className="absolute -right-2 -top-2 bg-red-100 text-red-500 rounded-full p-1 opacity-0 group-hover/row:opacity-100 transition-opacity z-20"
                                >
                                    <Plus className="w-4 h-4 rotate-45" />
                                </button>
                            )}

                            {/* From Column */}
                            <div className="md:col-span-3 p-5 border-r border-slate-200 hover:bg-slate-50 transition-colors group">
                                <p className="text-xs font-bold text-slate-500 uppercase mb-1">From</p>
                                <input
                                    type="text"
                                    value={pair.from}
                                    onChange={(e) => updateCityPair(pair.id, 'from', e.target.value)}
                                    placeholder="Select City"
                                    className="text-2xl font-black text-slate-900 bg-transparent w-full outline-none focus:text-primary transition-colors placeholder:text-slate-300 truncate"
                                />
                            </div>

                            {/* To Column */}
                            <div className="md:col-span-3 p-5 border-r border-slate-200 hover:bg-slate-50 transition-colors relative group">
                                <button
                                    onClick={() => handleSwap(index)}
                                    className="absolute -left-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white border border-slate-200 rounded-full flex items-center justify-center text-primary shadow-md hover:scale-110 transition-transform"
                                >
                                    <ArrowRightLeft className="w-5 h-5" />
                                </button>
                                <p className="text-xs font-bold text-slate-500 uppercase mb-1">To</p>
                                <input
                                    type="text"
                                    value={pair.to}
                                    onChange={(e) => updateCityPair(pair.id, 'to', e.target.value)}
                                    placeholder="Select City"
                                    className="text-2xl font-black text-slate-900 bg-transparent w-full outline-none focus:text-primary transition-colors placeholder:text-slate-300 truncate"
                                />
                            </div>

                            {/* Departure Date */}
                            <div className="md:col-span-3 p-5 border-r border-slate-200 hover:bg-slate-50 transition-colors group flex flex-col justify-center">
                                <p className="text-xs font-bold text-slate-500 uppercase mb-1 flex items-center gap-1">Departure <ChevronDown className="w-4 h-4 text-primary" /></p>
                                <input
                                    type="date"
                                    value={pair.date}
                                    min={getTodayDate()}
                                    onChange={(e) => updateCityPair(pair.id, 'date', e.target.value)}
                                    className="text-xl font-bold bg-transparent text-slate-900 outline-none w-full cursor-pointer"
                                />
                            </div>

                            {/* Return Date */}
                            <div className="md:col-span-3 p-5 hover:bg-slate-50 transition-colors cursor-pointer group flex flex-col justify-center">
                                {tripType === 'round-trip' && index === 0 ? (
                                    <>
                                        <p className="text-xs font-bold text-slate-500 uppercase mb-1 flex items-center gap-1">Return <ChevronDown className="w-4 h-4 text-primary" /></p>
                                        <input
                                            type="date"
                                            min={pair.date || getTodayDate()}
                                            className="text-xl font-bold bg-transparent text-slate-900 outline-none w-full cursor-pointer"
                                        />
                                    </>
                                ) : (
                                    <div className="flex flex-col items-start opacity-40">
                                        <p className="text-xs font-bold text-slate-500 uppercase mb-1">Return</p>
                                        <p className="text-sm font-bold mt-2">Not Applicable</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}

                    {tripType === 'multi-city' && (
                        <button
                            onClick={addCity}
                            className="mt-4 text-primary font-bold text-sm flex items-center gap-1 hover:underline px-2"
                        >
                            <Plus className="w-4 h-4" /> Add Another City
                        </button>
                    )}
                </div>

                {/* Solid Background Search Button */}
                <div className="absolute -bottom-7 left-1/2 -translate-x-1/2 w-full max-w-md px-4 z-20">
                    <button className="w-full bg-[#00AEEF] text-white py-4 rounded-full text-xl font-black shadow-lg shadow-sky-500/30 hover:shadow-xl hover:scale-[1.02] active:scale-95 transition-all uppercase tracking-[4px]">
                        SEARCH
                    </button>
                </div>
            </div>
        </div>
    );
}
