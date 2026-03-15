'use client';

import dynamic from 'next/dynamic';

const MapComponent = dynamic(() => import('./MapComponent'), {
    ssr: false,
    loading: () => (
        <div className="w-full h-full min-h-[500px] bg-slate-100 dark:bg-slate-800 animate-pulse rounded-3xl flex items-center justify-center border border-slate-200 dark:border-slate-700">
            <span className="text-slate-400 font-medium">Loading Interactive Map...</span>
        </div>
    ),
});

export default function MapWrapper() {
    return <MapComponent />;
}
