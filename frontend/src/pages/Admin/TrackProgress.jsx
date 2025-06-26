import React from "react";
import Sidebar from "../../components/Admin/AdminSidebar";

export default function TrackProgress({ children }) {
    return (
        <div className="d-flex min-h-screen">
            {/* Sidebar */}
            <Sidebar />

            {/* Main content */}
            <div className="flex-grow ml-[240px] p-5 flex items-center justify-center w-100">
                {children || (
                    <div className="text-center">
                        <h2 className="text-xl font-semibold">Welcome to Admin Dashboard</h2>
                        <p className="mt-4 text-gray-600">
                            This is the main content area. Add your components here.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}