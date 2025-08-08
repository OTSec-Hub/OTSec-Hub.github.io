import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Admin/AdminSidebar";
import axios from "axios";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function AdminDashboard() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        async function fetchUsers() {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/users/`);
                setUsers(response.data);
            } catch (error) {
                console.error("Failed to fetch users", error);
            }
        }

        fetchUsers();
    }, []);

    // Static chart data for now (mocked revenue over 6 months)
    const revenueData = [
        { month: "Jan", revenue: 1200 },
        { month: "Feb", revenue: 1900 },
        { month: "Mar", revenue: 800 },
        { month: "Apr", revenue: 2400 },
        { month: "May", revenue: 2200 },
        { month: "Jun", revenue: 3000 },
    ];

    return (
        <div className="d-flex min-h-screen w-100" >
            <Sidebar />

            <div className="flex-grow ml-[240px] p-5 bg-gray-50 min-h-screen w-100" width={300} minWidth={300}>
                <h1 className="text-2xl font-semibold mb-4">Admin Analytics</h1>

                {/* Stat Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className=" p-6 rounded-2xl shadow-md">
                        <h3 className="text-sm text-gray-500">Total Users</h3>
                        <p className="text-3xl font-bold">{users.length}</p>
                    </div>
                    <div className=" p-6 rounded-2xl shadow-md">
                        <h3 className="text-sm text-gray-500">Monthly Revenue</h3>
                        <p className="text-3xl font-bold">$3,000</p>
                    </div>
                    <div className=" p-6 rounded-2xl shadow-md">
                        <h3 className="text-sm text-gray-500">Conversion Rate</h3>
                        <p className="text-3xl font-bold">4.7%</p>
                    </div>
                </div>

                {/* Line Chart */}
                <div className=" p-6 rounded-2xl shadow-md" >
                    <h3 className="text-lg font-semibold mb-4">Revenue Trend (Static)</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={revenueData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Line type="monotone" dataKey="revenue" stroke="#8884d8" strokeWidth={2} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}
