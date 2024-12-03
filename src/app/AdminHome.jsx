"use client";
import React, { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/app/firebase/config";

const AdminHome = ({ allUsersData }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedUser, setSelectedUser] = useState(null);
    const [paymentDetails, setPaymentDetails] = useState({
        amount: "",
        additionalDetails: "",
        productName: "",
        productId: "",
    });
    const [message, setMessage] = useState("");

    const filteredUsers = allUsersData.filter((user) =>
        (user.name?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
        (user.email?.toLowerCase() || "").includes(searchTerm.toLowerCase())
    );

    const pendingRequests = allUsersData.filter((user) =>
        user.paymentreq && user.paymentreq.status === false
    );

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPaymentDetails((prev) => ({ ...prev, [name]: value }));
    };

    const handlePaymentRequest = async () => {
        const { amount, additionalDetails, productName, productId } = paymentDetails;
        if (!selectedUser || !amount || !productName || !productId) {
            setMessage("Please fill out all required fields.");
            return;
        }

        try {
            const userDocRef = doc(db, "users", selectedUser.id);
            await updateDoc(userDocRef, {
                paymentreq: {
                    amount,
                    additionalDetails,
                    productName,
                    productId,
                    requestedAt: new Date().toISOString(),
                    status: false,
                },
            });

            setMessage("Payment request successfully sent!");
            setPaymentDetails({ amount: "", additionalDetails: "", productName: "", productId: "" });
            setSelectedUser(null);
        } catch (error) {
            console.error("Error updating payment request:", error);
            setMessage("Failed to send payment request. Try again later.");
        }
    };

    return (
        <div className="bg-gradient-to-br from-gray-900 via-black to-gray-900 flex flex-col items-center min-h-screen text-white font-orbitron py-0 px-0">
            <div className="max-w-6xl w-full bg-gradient-to-r from-gray-800 to-gray-900 p-8 rounded-3xl shadow-lg shadow-blue-500/50">
                {/* Header */}
                <h1 className="text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 mb-4 animate-pulse">
                    Admin Dashboard
                </h1>
                <p className="text-center text-gray-400 mb-6">
                    Manage users and request payments efficiently.
                </p>

                {/* Search Bar */}
                <div className="mt-4">
                    <input
                        type="text"
                        placeholder="Search by name or email..."
                        className="w-full p-3 border border-transparent rounded-lg shadow-inner bg-gradient-to-r from-gray-700 to-gray-800 text-gray-300 focus:ring focus:ring-cyan-400"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {/* User Table */}
                <div className="mt-8 overflow-x-auto">
                    {filteredUsers.length > 0 ? (
                        <table className="table-auto w-full border-collapse rounded-lg shadow-md">
                            <thead>
                                <tr className="bg-gradient-to-r from-cyan-500 to-purple-500 text-black shadow-lg">
                                    <th className="px-6 py-3 border-b border-gray-700">Name</th>
                                    <th className="px-6 py-3 border-b border-gray-700">Email</th>
                                    <th className="px-6 py-3 border-b border-gray-700">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredUsers.map((user) => (
                                    <tr key={user.id} className="text-center hover:bg-gray-800 transition-all duration-200">
                                        <td className="px-6 py-4 border-b border-gray-700">{user.name || "N/A"}</td>
                                        <td className="px-6 py-4 border-b border-gray-700">{user.email || "N/A"}</td>
                                        <td className="px-6 py-4 border-b border-gray-700">
                                            <button
                                                onClick={() => setSelectedUser(user)}
                                                className="bg-gradient-to-r from-cyan-500 to-purple-500 text-black px-4 py-2 rounded-lg shadow-lg hover:opacity-90 transform hover:scale-105 transition duration-300"
                                            >
                                                Request Payment
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p className="text-center text-gray-400 mt-4">No users found.</p>
                    )}
                </div>

                {/* Payment Request Form */}
                {selectedUser && (
                    <div className="mt-8 p-6 rounded-lg bg-gradient-to-r from-gray-800 to-gray-900 shadow-lg">
                        <h2 className="text-lg font-semibold text-cyan-400 mb-4">
                            Request Payment from {selectedUser.name}
                        </h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-cyan-300">Amount</label>
                                <input
                                    type="number"
                                    name="amount"
                                    className="w-full p-3 border border-transparent rounded-md bg-gradient-to-r from-gray-700 to-gray-800 text-gray-300 focus:ring focus:ring-cyan-400"
                                    value={paymentDetails.amount}
                                    onChange={handleInputChange}
                                    placeholder="Enter amount"
                                />
                            </div>
                            <div>
                                <label className="block text-cyan-300">Additional Details</label>
                                <input
                                    type="text"
                                    name="additionalDetails"
                                    className="w-full p-3 border border-transparent rounded-md bg-gradient-to-r from-gray-700 to-gray-800 text-gray-300 focus:ring focus:ring-cyan-400"
                                    value={paymentDetails.additionalDetails}
                                    onChange={handleInputChange}
                                    placeholder="Optional details"
                                />
                            </div>
                            <div>
                                <label className="block text-cyan-300">Product Name</label>
                                <input
                                    type="text"
                                    name="productName"
                                    className="w-full p-3 border border-transparent rounded-md bg-gradient-to-r from-gray-700 to-gray-800 text-gray-300 focus:ring focus:ring-cyan-400"
                                    value={paymentDetails.productName}
                                    onChange={handleInputChange}
                                    placeholder="Enter product name"
                                />
                            </div>
                            <div>
                                <label className="block text-cyan-300">Product ID</label>
                                <input
                                    type="text"
                                    name="productId"
                                    className="w-full p-3 border border-transparent rounded-md bg-gradient-to-r from-gray-700 to-gray-800 text-gray-300 focus:ring focus:ring-cyan-400"
                                    value={paymentDetails.productId}
                                    onChange={handleInputChange}
                                    placeholder="Enter product ID"
                                />
                            </div>
                            <div className="flex justify-end space-x-4">
                                <button
                                    onClick={() => setSelectedUser(null)}
                                    className="bg-gradient-to-r from-gray-700 to-gray-800 text-gray-300 px-4 py-2 rounded-md shadow-md hover:opacity-90 transition-all duration-300"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handlePaymentRequest}
                                    className="bg-gradient-to-r from-cyan-500 to-purple-500 text-black px-4 py-2 rounded-md shadow-lg hover:scale-105 transition-all duration-300"
                                >
                                    Send Request
                                </button>
                            </div>
                            {message && <p className="mt-4 text-center text-red-400">{message}</p>}
                        </div>
                    </div>
                )}

                {/* Pending Payment Requests */}
                <div className="mt-12">
                    <h2 className="text-xl font-bold text-cyan-400">Pending Payment Requests</h2>
                    {pendingRequests.length > 0 ? (
                        <table className="table-auto w-full mt-4 border-collapse rounded-lg shadow-md">
                            <thead>
                                <tr className="bg-gradient-to-r from-cyan-500 to-purple-500 text-black">
                                    <th className="px-6 py-3 border-b border-gray-700">Name</th>
                                    <th className="px-6 py-3 border-b border-gray-700">Amount</th>
                                    <th className="px-6 py-3 border-b border-gray-700">Requested At</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pendingRequests.map((user) => (
                                    <tr key={user.id} className="text-center hover:bg-gray-800 transition-all duration-200">
                                        <td className="px-6 py-4 border-b border-gray-700">{user.name || "N/A"}</td>
                                        <td className="px-6 py-4 border-b border-gray-700">{user.paymentreq?.amount || "N/A"}</td>
                                        <td className="px-6 py-4 border-b border-gray-700">{user.paymentreq?.requestedAt || "N/A"}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p className="text-center text-gray-400 mt-4">No pending requests.</p>
                    )}

                </div>

            </div>
        </div>
    );
};

export default AdminHome;
