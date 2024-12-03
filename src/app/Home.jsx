import { useState, useEffect } from "react";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "@/app/firebase/config";
import { auth } from "@/app/firebase/config";
import { FaMoneyBill, FaBell } from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function Home({ userData }) {
  const [userBalances, setUserBalances] = useState({});

  // Ensure userData is not null or empty before processing
  useEffect(() => {
    if (userData && userData.length > 0) {
      setUserBalances(
        userData.reduce((acc, user) => {
          // Safely check if user and user.uid exist
          if (user && user.uid) {
            acc[user.uid] = user.balance || 0;
          }
          return acc;
        }, {})
      );
    }
  }, [userData]);

  const currentUser = auth.currentUser;
  const userName = currentUser?.displayName || currentUser?.email?.split("@")[0] || "Guest";
  const router = useRouter();

  // Listen for real-time changes in user balances from Firestore
  useEffect(() => {
    if (userData && userData.length > 0) {
      const unsubscribe = userData.map((user) => {
        // Safely check if user and user.uid exist
        if (!user || !user.uid) return; // Skip if user is null or doesn't have a uid

        const userRef = doc(db, "users", user.uid);
        return onSnapshot(userRef, (docSnapshot) => {
          if (docSnapshot.exists()) {
            const updatedUser = docSnapshot.data();
            setUserBalances((prevBalances) => ({
              ...prevBalances,
              [user.uid]: updatedUser.balance || 0,
            }));
          }
        });
      }).filter(Boolean); // filter out undefined values (from skipped users)

      return () => {
        unsubscribe.forEach((unsub) => unsub());
      };
    }
  }, [userData]);

  // Render a fallback if no userData is available
  if (!userData || userData.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900">
        <div className="text-center text-gray-400 text-lg font-semibold">
          No user data available.
        </div>
      </div>
    );
  }

  const totalBalance = Object.values(userBalances).reduce((sum, balance) => sum + balance, 0);

  // Safely check if paymentreq exists and has a valid amount
  const pendingRequests = userData.filter((user) => user && user.paymentreq && user.paymentreq.amount != null).length;

  // Handle the payment request for a user
  const handlePaymentRequest = async (user) => {
    if (!user.paymentreq) return;

    try {
      const paymentAmount = user.paymentreq.amount;
      const currentBalance = userBalances[user.uid];

      // Check if the user has enough balance
      if (currentBalance < paymentAmount) {
        alert(`Insufficient balance. Your current balance is $${currentBalance.toFixed(2)}.`);
        return;
      }

      const newBalance = currentBalance - paymentAmount;
      const transactionDetails = {
        amount: paymentAmount,
        productId: user.paymentreq.productId,
        productName: user.paymentreq.productName,
        requestedAt: user.paymentreq.requestedAt,
        completedAt: new Date().toISOString(),
        status: 'completed',
        additionalDetails: user.paymentreq.additionalDetails,
      };

      const userRef = doc(db, "users", user.uid);

      // Ensure `transactions` is initialized as an empty array if not already
      const updatedTransactions = Array.isArray(user.transactions) ? user.transactions : [];

      // Update user's balance, payment request status, and add transaction to transactions array
      await updateDoc(userRef, {
        balance: newBalance,
        paymentreq: null,  // Clear the payment request after processing
        transactions: [...updatedTransactions, transactionDetails], // Add the new transaction
      });

      setUserBalances((prevBalances) => ({
        ...prevBalances,
        [user.uid]: newBalance,
      }));

      alert(`Payment of $${paymentAmount} processed for ${user.uid}`);
    } catch (error) {
      console.error("Error processing payment:", error);
      alert("Failed to process payment. Please try again.");
    }
  };


  return (
    <div className="Home min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center p-6">
      <div className="max-w-6xl w-full bg-gradient-to-r from-gray-800 to-gray-900 p-8 rounded-3xl shadow-2xl shadow-blue-500/50 flex flex-col items-center">

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 w-full">
  {/* Total Balance Section */}
  <div className="col-span-2 bg-gradient-to-br from-blue-500 to-violet-700 p-6 rounded-lg shadow-md flex items-center space-x-4 hover:shadow-xl transform hover:scale-105 transition-all duration-300">
    <FaMoneyBill className="text-white text-4xl" />
    <div>
      <h2 className="text-lg font-semibold text-white">Total Balance</h2>
      <p className="text-2xl font-bold text-gray-100">${totalBalance.toFixed(2)}</p>
    </div>
  </div>

  {/* Pending Requests Section */}
  <div
    className={`p-6 rounded-lg shadow-md flex items-center space-x-4 hover:shadow-xl transform hover:scale-105 transition-all duration-300 ${
      pendingRequests === 0
        ? "bg-gray-600"
        : "bg-gradient-to-br from-orange-500 to-orange-700"
    }`}>
    <FaBell className="text-white text-4xl" />
    <div>
      <h2 className="text-lg font-semibold text-white">Pending Requests</h2>
      <p className="text-2xl font-bold text-gray-100">{pendingRequests}</p>
    </div>
  </div>
</div>


        {/* Notifications Section */}
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 p-6 rounded-lg shadow-md shadow-purple-500/50 w-full">
          <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 mb-4">
            Recent Notifications
          </h2>
          {userData.map((user) => {
            // Skip null or invalid user objects
            if (!user || !user.paymentreq) return null;

            const paymentRequest = user.paymentreq;
            return (
              <div
                key={user.uid}
                className="bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 p-4 rounded-md shadow-sm hover:shadow-lg hover:scale-[1.02] transition-all duration-300 mb-4"
              >
                <p className="text-gray-200 font-medium truncate max-w-full">
                  <strong>User:</strong> {user.uid}
                </p>
                <p className="text-gray-400">
                  <strong>Payment Amount:</strong> ${paymentRequest.amount}
                </p>
                <p className="text-gray-400">
                  <strong>Product Name:</strong> {paymentRequest.productName}
                </p>
                <p className="text-gray-400">
                  <strong>Details:</strong> {paymentRequest.additionalDetails}
                </p>
                <button
                  onClick={() => handlePaymentRequest(user)}
                  className="mt-2 bg-gradient-to-r from-green-500 to-green-700 text-white px-3 py-1 rounded hover:opacity-90 transform hover:scale-105 transition-all duration-300"
                >
                  Pay
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
