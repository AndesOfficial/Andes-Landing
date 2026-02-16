import React from 'react';

const PageLoader = () => (
    <div className="flex justify-center items-center min-h-screen bg-slate-50">
        <div className="relative h-16 w-16">
            <div className="absolute inset-0 rounded-full border-4 border-brand/20"></div>
            <div className="absolute inset-0 rounded-full border-4 border-brand border-t-transparent animate-spin"></div>
        </div>
    </div>
);

export default PageLoader;
