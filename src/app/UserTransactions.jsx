"use client";

import { FaCheckCircle, FaTimesCircle, FaBoxOpen, FaMoneyBillAlt, FaCalendarAlt, FaInfoCircle } from "react-icons/fa";

export default function UserTransactions({ transactions }) {
  if (!transactions || Object.keys(transactions).length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900">
        <div className="text-center text-gray-400 text-lg font-semibold">
          No transactions available.
        </div>
      </div>
    );
  }

  return (
    <div className="Transactions min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center p-6">
      <div className="max-w-5xl w-full p-8 bg-gradient-to-r from-gray-800 to-gray-900 rounded-3xl shadow-2xl shadow-blue-500/50">
        {/* Title Section */}
        <h2 className="text-4xl font-extrabold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400">
          Transaction History
        </h2>

        {/* Transaction List */}
        <div className="space-y-6">
          {Object.entries(transactions).map(([transactionId, transactionDetails]) => (
            <div
              key={transactionId}
              className="p-6 rounded-xl bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out"
            >
              {/* Transaction ID */}
              <p className="text-lg text-cyan-400 font-bold mb-3">
                <span className="opacity-75">Transaction ID:</span> {transactionId}
              </p>

              {/* Status with Icon */}
              <div className="flex items-center mb-4">
                {transactionDetails.status === 'completed' ? (
                  <FaCheckCircle className="text-green-400 text-xl mr-2" />
                ) : (
                  <FaTimesCircle className="text-red-400 text-xl mr-2" />
                )}
                <p className={`text-lg font-semibold ${transactionDetails.status === 'completed' ? 'text-green-400' : 'text-red-400'}`}>
                  {transactionDetails.status === 'completed' ? 'Completed' : 'Failed'}
                </p>
              </div>

              {/* Transaction Details */}
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:space-x-12 sm:space-y-0 space-y-4">
                  {/* Left Side: Key Info */}
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <FaBoxOpen className="text-blue-300 text-xl mr-2" />
                      <p className="text-gray-300">
                        <span className="font-semibold">Product:</span> {transactionDetails.productName}
                      </p>
                    </div>
                    <div className="flex items-center mb-2">
                      <FaMoneyBillAlt className="text-yellow-400 text-xl mr-2" />
                      <p className="text-gray-300">
                        <span className="font-semibold">Amount:</span> ${transactionDetails.amount}
                      </p>
                    </div>
                    <div className="flex items-center mb-2">
                      <FaCalendarAlt className="text-gray-400 text-xl mr-2" />
                      <p className="text-gray-300">
                        <span className="font-semibold">Requested At:</span> {new Date(transactionDetails.requestedAt).toLocaleString()}
                      </p>
                    </div>
                  </div>

                  {/* Right Side: Additional Details */}
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <FaBoxOpen className="text-blue-300 text-xl mr-2" />
                      <p className="text-gray-300">
                        <span className="font-semibold">Product ID:</span> {transactionDetails.productId}
                      </p>
                    </div>
                    {transactionDetails.completedAt && (
                      <div className="flex items-center mb-2">
                        <FaCalendarAlt className="text-gray-400 text-xl mr-2" />
                        <p className="text-gray-300">
                          <span className="font-semibold">Completed At:</span> {new Date(transactionDetails.completedAt).toLocaleString()}
                        </p>
                      </div>
                    )}
                    {transactionDetails.additionalDetails && (
                      <div className="flex items-center mb-2">
                        <FaInfoCircle className="text-blue-300 text-xl mr-2" />
                        <p className="text-gray-300">
                          <span className="font-semibold">Additional Details:</span> {transactionDetails.additionalDetails}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
