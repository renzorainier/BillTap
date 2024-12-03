"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth, db } from "@/app/firebase/config";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import teen from "../img.png";

const Register = () => {
  const [showError, setShowError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
    location: "",
    contactNumber: "",
  });
  const router = useRouter();

  // Effect to handle touch events for logo hover effect
  useEffect(() => {
    const handleTouchStart = () => {
      document.body.classList.add("touch-hover");
    };

    const handleTouchEnd = (e) => {
      if (!e.target.closest(".logo")) {
        document.body.classList.remove("touch-hover");
      }
    };

    document.addEventListener("touchstart", handleTouchStart);
    document.addEventListener("touchend", handleTouchEnd);

    return () => {
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const userRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userRef);

      if (!userDoc.exists()) {
        setFormData((prev) => ({
          ...prev,
          email: user.email,
          name: user.displayName,
        }));
      } else {
        alert("You are already registered! Welcome back, " + user.displayName);
        router.push("/");
      }
    } catch (error) {
      console.error(error);
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userUid = auth.currentUser.uid;
      const userRef = doc(db, "users", userUid);

      await setDoc(userRef, {
        ...formData,
        uid: userUid,
        transactions: {},
        paymentreq: null,
        balance: 100000,
      });

      alert("Registration complete! Welcome, " + formData.name);
      router.push("/");
    } catch (error) {
      console.error("Error submitting form: ", error);
      setShowError(true);
    }
  };

  const isFormComplete =
    formData.name &&
    formData.email &&
    formData.age &&
    formData.location &&
    formData.contactNumber;

  const redirectToSignIn = () => {
    router.push("/sign-in"); // Update the path based on your routing setup
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 p-4">
      <div className="bg-gray-900 text-white rounded-lg shadow-lg flex flex-col w-full max-w-lg">
        {/* Header Section with Logo and App Name */}
        <div className="w-full p-8 flex flex-col justify-center items-center bg-gradient-to-br from-gray-900 to-black rounded-t-lg">
          <div className="flex flex-col items-center space-y-4">
            <Image
              src={teen}
              width="120"
              height="120"
              alt="App Logo"
              className="logo rounded-full border-4 border-purple-500 shadow-lg transform transition-transform duration-300 ease-in-out hover:scale-110"
            />
            <h1 className="text-3xl font-bold text-indigo-400">BillTap</h1>
          </div>
          <p className="text-gray-400 text-center mt-4">Create Your Account and Get Started!</p>
        </div>

        {/* Form Section */}
        <div className="w-full p-8 flex flex-col justify-center items-center">

          {showError && (
            <p className="text-red-500 bg-red-100 p-2 rounded-lg shadow-md mb-4 text-center">
              Error: Please try again later.
            </p>
          )}

          <button
            onClick={handleGoogleSignIn}
            className={`w-full p-3 bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500 text-white font-bold rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition duration-300 ease-in-out`}
            disabled={loading}>
            {loading ? "Signing up with Google..." : "Sign up with Google"}
          </button>

          {formData.email && (
            <form onSubmit={handleSubmit} className="mt-6 space-y-6 w-full">
              <input
                type="text"
                id="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full border-gray-300 rounded-lg p-3 bg-gray-800 text-gray-300 focus:outline-none focus:ring focus:ring-blue-500 transition duration-200"
              />
              <input
                type="email"
                id="email"
                placeholder="Email"
                value={formData.email}
                disabled
                className="w-full border-gray-300 rounded-lg p-3 bg-gray-700 text-gray-500 cursor-not-allowed"
              />
              <input
                type="number"
                id="age"
                placeholder="Age"
                value={formData.age}
                onChange={handleInputChange}
                required
                min="18"
                className="w-full border-gray-300 rounded-lg p-3 bg-gray-800 text-gray-300 focus:outline-none focus:ring focus:ring-blue-500 transition duration-200"
              />
              <input
                type="text"
                id="location"
                placeholder="Location"
                value={formData.location}
                onChange={handleInputChange}
                required
                className="w-full border-gray-300 rounded-lg p-3 bg-gray-800 text-gray-300 focus:outline-none focus:ring focus:ring-blue-500 transition duration-200"
              />
              <input
                type="text"
                id="contactNumber"
                placeholder="Contact Number"
                value={formData.contactNumber}
                onChange={handleInputChange}
                required
                className="w-full border-gray-300 rounded-lg p-3 bg-gray-800 text-gray-300 focus:outline-none focus:ring focus:ring-blue-500 transition duration-200"
              />
              <button
                type="submit"
                className={`w-full py-2 rounded-lg font-bold transition duration-300 ${
                  isFormComplete
                    ? "bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500 text-white hover:scale-105 hover:shadow-lg"
                    : "bg-gray-600 text-gray-400 cursor-not-allowed"
                }`}
                disabled={!isFormComplete}>
                Complete Registration
              </button>
            </form>
          )}
          <p className="text-gray-400 text-center mt-4">
            Already have an account?{" "}
            <button
              onClick={redirectToSignIn}
              className="text-blue-400 hover:text-blue-500 font-semibold underline focus:outline-none">
              Sign In
            </button>
          </p>
        </div>
      </div>
    </div>
  );

};

export default Register;
