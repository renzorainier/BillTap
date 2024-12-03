"use client";

import React from "react";

const AdminTransactions = ({ allUsersData }) => {
  // Safely combine all transactions from all users
  const transactions = allUsersData.flatMap((user) =>
    Array.isArray(user.transactions)
      ? user.transactions.map((transaction) => ({
          ...transaction,
          userName: user.name || "N/A", // Add user name for context
          userEmail: user.email || "N/A", // Add user email for context
        }))
      : [] // If transactions is not an array, return an empty array
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex flex-col items-center py-10 px-4">
      <div className="max-w-6xl w-full bg-gradient-to-r from-gray-800 to-gray-900 p-8 rounded-3xl shadow-2xl shadow-cyan-500/50">
        <h1 className="text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400">
          Admin Transactions
        </h1>
        <p className="text-center text-gray-400 mt-4">
          View all completed transactions:
        </p>

        {transactions.length > 0 ? (
          <div className="mt-8 overflow-x-auto">
            <table className="table-auto w-full border-collapse rounded-lg overflow-hidden shadow-md">
              <thead>
                <tr className="bg-gradient-to-r from-gray-700 via-gray-800 to-gray-700 text-gray-300 text-sm uppercase">
                  <th className="border border-gray-600 px-4 py-3">User Name</th>
                  <th className="border border-gray-600 px-4 py-3">Email</th>
                  <th className="border border-gray-600 px-4 py-3">Product</th>
                  <th className="border border-gray-600 px-4 py-3">Product ID</th>
                  <th className="border border-gray-600 px-4 py-3">Amount</th>
                  <th className="border border-gray-600 px-4 py-3">Details</th>
                  <th className="border border-gray-600 px-4 py-3">
                    Completed At
                  </th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction, index) => (
                  <tr
                    key={index}
                    className={`text-center ${
                      index % 2 === 0 ? "bg-gray-800" : "bg-gray-700"
                    } hover:bg-gray-600 hover:scale-[1.01] transition-all duration-300`}
                  >
                    <td className="border border-gray-600 px-4 py-3 text-gray-300">
                      {transaction.userName}
                    </td>
                    <td className="border border-gray-600 px-4 py-3 text-gray-300">
                      {transaction.userEmail}
                    </td>
                    <td className="border border-gray-600 px-4 py-3 text-gray-300">
                      {transaction.productName || "N/A"}
                    </td>
                    <td className="border border-gray-600 px-4 py-3 text-gray-300">
                      {transaction.productId || "N/A"}
                    </td>
                    <td className="border border-gray-600 px-4 py-3 text-gray-300">
                      ${transaction.amount.toLocaleString()}
                    </td>
                    <td className="border border-gray-600 px-4 py-3 text-gray-300">
                      {transaction.additionalDetails || "None"}
                    </td>
                    <td className="border border-gray-600 px-4 py-3 text-gray-300">
                      {transaction.completedAt
                        ? new Date(transaction.completedAt).toLocaleString()
                        : "N/A"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center text-gray-500 mt-6">
            No transactions available.
          </p>
        )}
      </div>
    </div>
  );
};

export default AdminTransactions;