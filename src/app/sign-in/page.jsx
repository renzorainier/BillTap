"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/app/firebase/config";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import teen from "../img.png";

const SignIn = () => {
  const [showGoogleError, setShowGoogleError] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const router = useRouter();

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: "select_account" });
      await signInWithPopup(auth, provider);
      router.push("/");
    } catch (e) {
      console.error(e);
      setShowGoogleError(true);
      setTimeout(() => setShowGoogleError(false), 3000); // Clear the error message after 3 seconds
    } finally {
      setGoogleLoading(false);
    }
  };

  const redirectToSignUp = () => {
    router.push("/sign-up"); // Update the path based on your routing setup
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 p-4">
      <link rel="manifest" href="/manifest.json" />

      <div className="bg-gray-900 rounded-lg shadow-2xl flex flex-col w-full max-w-lg overflow-hidden">
        {/* Header Section with Logo and App Name */}
        <div className="w-full p-8 flex flex-col justify-center items-center bg-gradient-to-br from-gray-900 to-black text-white rounded-t-lg">
          <div className="flex flex-col items-center space-y-4">
            <Image
              src={teen}
              width="120"
              height="120"
              alt="App Logo"
              className="rounded-full border-4 border-purple-500 shadow-lg transform transition-transform duration-300 hover:scale-110"
            />
            <h1 className="text-3xl font-bold text-indigo-400">BillTap</h1>
          </div>
          <p className="text-gray-400 text-center mt-4">Welcome Back! Please sign in to continue.</p>
        </div>

        {/* Form Section */}
        <div className="w-full p-8 flex flex-col justify-center items-center">
          {showGoogleError && (
            <p className="text-red-500 mb-4 text-center bg-red-100 p-2 rounded-lg shadow-md">
              Error with Google Sign-In. Please make sure to use your school Gmail account.
            </p>
          )}
          <button
            onClick={handleGoogleSignIn}
            className={`w-full p-3 bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500 text-white font-bold rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition duration-300 ease-in-out`}
            disabled={googleLoading}
          >
            {googleLoading ? "Signing In with Google..." : "Sign In with Google"}
          </button>
          <p className="text-gray-400 text-center mt-4">
            Don’t have an account?{" "}
            <button
              onClick={redirectToSignUp}
              className="text-blue-400 hover:text-blue-500 font-semibold underline focus:outline-none"
            >
              Sign Up
            </button>
          </p>
        </div>
      </div>
    </div>
  );

};

export default SignIn;




//this is the main, i just have to disable the manual sign in part
// 'use client';

// import Image from "next/image";
// import { useState, useEffect } from "react";
// import { useSignInWithEmailAndPassword, useSignInWithGoogle } from "react-firebase-hooks/auth";
// import { auth } from "@/app/firebase/config";
// import { useRouter } from "next/navigation";
// import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai"; // Make sure to install react-icons if you haven't already
// import teen from "../img.png";

// const SignIn = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [passwordVisible, setPasswordVisible] = useState(false);
//   const [emailError, setEmailError] = useState("");
//   const [showError, setShowError] = useState(false);
//   const [showGoogleError, setShowGoogleError] = useState(false);
//   const [signInWithEmailAndPassword, user, loading, error] = useSignInWithEmailAndPassword(auth);
//   const [signInWithGoogle, googleUser, googleLoading, googleError] = useSignInWithGoogle(auth);
//   const router = useRouter();

//   const validateEmail = (email) => {
//     const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
//     return gmailRegex.test(email);
//   };

//   const handleSignIn = async () => {
//     if (!validateEmail(email)) {
//       setEmailError("Please enter a valid Gmail address.");
//       setShowError(true);
//       return;
//     }
//     setEmailError(""); // Clear the error message if email is valid
//     setShowError(false);

//     try {
//       await signInWithEmailAndPassword(email, password);
//     } catch (e) {
//       console.error(e);
//     }
//   };

//   const handleGoogleSignIn = async () => {
//     try {
//       await signInWithGoogle();
//     } catch (e) {
//       console.error(e);
//     }
//   };

//   const togglePasswordVisibility = () => {
//     setPasswordVisible(!passwordVisible);
//   };

//   useEffect(() => {
//     if (user || googleUser) {
//       router.push("/");
//     }
//   }, [user, googleUser, router]);

//   useEffect(() => {
//     if (emailError) {
//       const timer = setTimeout(() => {
//         setShowError(false);
//       }, 3000); // Clear the error message after 3 seconds
//       return () => clearTimeout(timer);
//     }
//   }, [emailError]);

//   useEffect(() => {
//     if (error) {
//       setShowError(true);
//       const timer = setTimeout(() => {
//         setShowError(false);
//       }, 3000); // Clear the error message after 3 seconds
//       return () => clearTimeout(timer);
//     }
//   }, [error]);

//   useEffect(() => {
//     if (googleError) {
//       setShowGoogleError(true);
//       const timer = setTimeout(() => {
//         setShowGoogleError(false);
//       }, 3000); // Clear the error message after 3 seconds
//       return () => clearTimeout(timer);
//     }
//   }, [googleError]);

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#035172] to-[#0587be] p-4">
//       <div className="bg-white rounded-lg shadow-lg flex flex-col md:flex-row w-full max-w-4xl">
//         <div className="md:w-1/2 p-8 flex flex-col justify-center items-center bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-lg">
//           <div>
//             <Image src={teen} width="260" height="260" alt="/" />
//           </div>
//         </div>
//         <div className="md:w-1/2 p-8 flex flex-col justify-center items-center">
//           {showError && error && <p className="text-red-500 mb-4">Error Logging in</p>}
//           {showGoogleError && googleError && (
//             <p className="text-red-500 mb-4 text-center">
//               Error with Google Sign-In. Please make sure to use your school Gmail account.
//             </p>
//           )}
//           {showError && emailError && <p className="text-red-500 mb-4">{emailError}</p>}
//           <input
//             type="email"
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="w-full p-3 mb-4 bg-gray-100 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0587be]"
//           />
//           <div className="w-full mb-4 relative">
//             <input
//               type={passwordVisible ? "text" : "password"}
//               placeholder="Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full p-3 bg-gray-100 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0587be]"
//             />
//             <button
//               type="button"
//               onClick={togglePasswordVisibility}
//               className="absolute inset-y-0 right-3 flex items-center text-gray-600">
//               {passwordVisible ? (
//                 <AiFillEyeInvisible size={24} />
//               ) : (
//                 <AiFillEye size={24} />
//               )}
//             </button>
//           </div>
//           <button
//             onClick={handleSignIn}
//             className="w-full p-3 bg-[#035172] text-white rounded hover:bg-[#0587be] transition duration-300"
//             disabled={loading}>
//             {loading ? "Signing In..." : "Sign In"}
//           </button>
//           <button
//             onClick={handleGoogleSignIn}
//             className="w-full p-3 mt-4 bg-[#3aad42] text-white rounded hover:bg-[#55fa60] transition duration-300"
//             disabled={googleLoading}>
//             {googleLoading ? "Signing In with Google..." : "Sign In with Google"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SignIn;




//works aug 1, just not sure about the bug on the sign in
// "use client";

// import Image from "next/image";
// import { useState, useEffect } from "react";
// import { useSignInWithEmailAndPassword, useSignInWithGoogle } from "react-firebase-hooks/auth";
// import { auth, googleAuthProvider } from "@/app/firebase/config";
// import { useRouter } from "next/navigation";
// import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai"; // Make sure to install react-icons if you haven't already
// import teen from "../img.png";

// const SignIn = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [passwordVisible, setPasswordVisible] = useState(false);
//   const [signInWithEmailAndPassword, user, loading, error] = useSignInWithEmailAndPassword(auth);
//   const [signInWithGoogle, googleUser, googleLoading, googleError] = useSignInWithGoogle(auth);
//   const router = useRouter();

//   useEffect(() => {
//     const savedUser = JSON.parse(localStorage.getItem("user"));

//     if (savedUser) {
//       signInWithEmailAndPassword(savedUser.email, savedUser.password);
//     }
//   }, [signInWithEmailAndPassword]);

//   useEffect(() => {
//     if (user || googleUser) {
//       localStorage.setItem("user", JSON.stringify({ email, password, uid: user?.uid || googleUser?.uid }));
//       router.push("/");
//     }
//   }, [user, googleUser, email, password, router]);

//   const handleSignIn = async () => {
//     try {
//       await signInWithEmailAndPassword(email, password);
//     } catch (e) {
//       console.error(e);
//     }
//   };

//   const handleGoogleSignIn = async () => {
//     try {
//       await signInWithGoogle();
//     } catch (e) {
//       console.error(e);
//     }
//   };

//   const togglePasswordVisibility = () => {
//     setPasswordVisible(!passwordVisible);
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#035172] to-[#0587be] p-4">
//       <div className="bg-white rounded-lg shadow-lg flex flex-col md:flex-row w-full max-w-4xl">
//         <div className="md:w-1/2 p-8 flex flex-col justify-center items-center bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-lg">
//           <div>
//             <Image src={teen} width="260" height="260" alt="/" />
//           </div>
//         </div>
//         <div className="md:w-1/2 p-8 flex flex-col justify-center items-center">
//           {error && <p className="text-red-500 mb-4">Error Logging in</p>}
//           {googleError && <p className="text-red-500 mb-4 text-center">Error with Google Sign-In. Please make sure to use your school Gmail account.</p>}
//           <input
//             type="email"
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="w-full p-3 mb-4 bg-gray-100 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0587be]"
//           />
//           <div className="w-full mb-4 relative">
//             <input
//               type={passwordVisible ? "text" : "password"}
//               placeholder="Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full p-3 bg-gray-100 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0587be]"
//             />
//             <button
//               type="button"
//               onClick={togglePasswordVisibility}
//               className="absolute inset-y-0 right-3 flex items-center text-gray-600">
//               {passwordVisible ? (
//                 <AiFillEyeInvisible size={24} />
//               ) : (
//                 <AiFillEye size={24} />
//               )}
//             </button>
//           </div>
//           <button
//             onClick={handleSignIn}
//             className="w-full p-3 bg-[#035172] text-white rounded hover:bg-[#0587be] transition duration-300"
//             disabled={loading}>
//             {loading ? "Signing In..." : "Sign In"}
//           </button>
//           <button
//             onClick={handleGoogleSignIn}
//             className="w-full p-3 mt-4 bg-[#3aad42] text-white rounded hover:bg-[#55fa60] transition duration-300"
//             disabled={googleLoading}>
//             {googleLoading ? "Signing In with Google..." : "Sign In with Google"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SignIn;

//working, before the sync on 27
// "use client";

// import Image from "next/image";
// import { useState, useEffect } from "react";
// import { useSignInWithEmailAndPassword, useSignInWithGoogle } from "react-firebase-hooks/auth";
// import { auth, googleAuthProvider } from "@/app/firebase/config";
// import { useRouter } from "next/navigation";
// import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai"; // Make sure to install react-icons if you haven't already
// import teen from "../img.png";

// const SignIn = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [passwordVisible, setPasswordVisible] = useState(false);
//   const [signInWithEmailAndPassword, user, loading, error] = useSignInWithEmailAndPassword(auth);
//   const [signInWithGoogle, googleUser, googleLoading, googleError] = useSignInWithGoogle(auth);
//   const router = useRouter();

//   useEffect(() => {
//     const savedEmail = localStorage.getItem("email");
//     const savedPassword = localStorage.getItem("password");

//     if (savedEmail && savedPassword) {
//       signInWithEmailAndPassword(savedEmail, savedPassword);
//     }
//   }, [signInWithEmailAndPassword]);

//   useEffect(() => {
//     if (user || googleUser) {
//       localStorage.setItem("email", email);
//       localStorage.setItem("password", password);
//       sessionStorage.setItem("user", true);
//       router.push("/");
//     }
//   }, [user, googleUser, email, password, router]);

//   const handleSignIn = async () => {
//     try {
//       await signInWithEmailAndPassword(email, password);
//     } catch (e) {
//       console.error(e);
//     }
//   };

//   const handleGoogleSignIn = async () => {
//     try {
//       await signInWithGoogle();
//     } catch (e) {
//       console.error(e);
//     }
//   };

//   const togglePasswordVisibility = () => {
//     setPasswordVisible(!passwordVisible);
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#035172] to-[#0587be] p-4">
//       <div className="bg-white rounded-lg shadow-lg flex flex-col md:flex-row w-full max-w-4xl">
//         <div className="md:w-1/2 p-8 flex flex-col justify-center items-center bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-lg">
//           <div>
//             <Image src={teen} width="260" height="260" alt="/" />
//           </div>
//         </div>
//         <div className="md:w-1/2 p-8 flex flex-col justify-center items-center">
//           {error && <p className="text-red-500 mb-4">Error Logging in</p>}
//           {googleError && <p className="text-red-500 mb-4 text-center">Error with Google Sign-In. Please make sure to use your school Gmail account.</p>}
//           <input
//             type="email"
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="w-full p-3 mb-4 bg-gray-100 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0587be]"
//           />
//           <div className="w-full mb-4 relative">
//             <input
//               type={passwordVisible ? "text" : "password"}
//               placeholder="Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full p-3 bg-gray-100 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0587be]"
//             />
//             <button
//               type="button"
//               onClick={togglePasswordVisibility}
//               className="absolute inset-y-0 right-3 flex items-center text-gray-600">
//               {passwordVisible ? (
//                 <AiFillEyeInvisible size={24} />
//               ) : (
//                 <AiFillEye size={24} />
//               )}
//             </button>
//           </div>
//           <button
//             onClick={handleSignIn}
//             className="w-full p-3 bg-[#035172] text-white rounded hover:bg-[#0587be] transition duration-300"
//             disabled={loading}>
//             {loading ? "Signing In..." : "Sign In"}
//           </button>
//           <button
//             onClick={handleGoogleSignIn}
//             className="w-full p-3 mt-4 bg-[#3aad42] text-white rounded hover:bg-[#55fa60] transition duration-300"
//             disabled={googleLoading}>
//             {googleLoading ? "Signing In with Google..." : "Sign In with Google"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SignIn;







// "use client";

// import Image from "next/image";
// import { useState, useEffect } from "react";
// import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
// import { auth } from "@/app/firebase/config";
// import { useRouter } from "next/navigation";
// import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai"; // Make sure to install react-icons if you haven't already
// import teen from "../img.png";

// const SignIn = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [passwordVisible, setPasswordVisible] = useState(false);
//   const [signInWithEmailAndPassword, user, loading, error] =
//     useSignInWithEmailAndPassword(auth);
//   const router = useRouter();

//   useEffect(() => {
//     const savedEmail = localStorage.getItem("email");
//     const savedPassword = localStorage.getItem("password");

//     if (savedEmail && savedPassword) {
//       signInWithEmailAndPassword(savedEmail, savedPassword);
//     }
//   }, [signInWithEmailAndPassword]);

//   useEffect(() => {
//     if (user) {
//       localStorage.setItem("email", email);
//       localStorage.setItem("password", password);
//       sessionStorage.setItem("user", true);
//       router.push("/");
//     }
//   }, [user, email, password, router]);

//   const handleSignIn = async () => {
//     try {
//       await signInWithEmailAndPassword(email, password);
//     } catch (e) {
//       console.error(e);
//     }
//   };

//   const togglePasswordVisibility = () => {
//     setPasswordVisible(!passwordVisible);
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#035172] to-[#0587be] p-4">
//       <div className="bg-white rounded-lg shadow-lg flex flex-col md:flex-row w-full max-w-4xl">
//         <div className="md:w-1/2 p-8 flex flex-col justify-center items-center bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-lg">
//           <div>
//             <Image src={teen} width="260" height="260" alt="/" />
//           </div>
//         </div>
//         <div className="md:w-1/2 p-8 flex flex-col justify-center items-center">
//           {error && <p className="text-red-500 mb-4">Error Logging in</p>}
//           <input
//             type="email"
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="w-full p-3 mb-4 bg-gray-100 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0587be]"
//           />
//           <div className="w-full mb-4 relative">
//             <input
//               type={passwordVisible ? "text" : "password"}
//               placeholder="Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full p-3 bg-gray-100 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0587be]"
//             />
//             <button
//               type="button"
//               onClick={togglePasswordVisibility}
//               className="absolute inset-y-0 right-3 flex items-center text-gray-600">
//               {passwordVisible ? (
//                 <AiFillEyeInvisible size={24} />
//               ) : (
//                 <AiFillEye size={24} />
//               )}
//             </button>
//           </div>
//           <button
//             onClick={handleSignIn}
//             className="w-full p-3 bg-[#035172] text-white rounded hover:bg-[#0587be] transition duration-300"
//             disabled={loading}>
//             {loading ? "Signing In..." : "Sign In"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SignIn;























// 'use client';

// import { useState, useEffect } from 'react';
// import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
// import { auth } from '@/app/firebase/config';
// import { useRouter } from 'next/navigation';

// const SignIn = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [signInWithEmailAndPassword, user, loading, error] = useSignInWithEmailAndPassword(auth);
//   const router = useRouter();

//   useEffect(() => {
//     if (user) {
//       sessionStorage.setItem('user', true);
//       router.push('/');
//     }
//   }, [user, router]);

//   const handleSignIn = async () => {
//     try {
//       await signInWithEmailAndPassword(email, password);
//     } catch (e) {
//       console.error(e);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-white">
//       <div className="bg-gray-800 p-10 rounded-lg shadow-xl w-96">
//         <h1 className="text-white text-2xl mb-5">Sign In</h1>
//         {error && <p className="text-red-500 mb-4">Error Logging in</p>}
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           className="w-full p-3 mb-4 bg-gray-700 rounded outline-none text-white placeholder-gray-500"
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className="w-full p-3 mb-4 bg-gray-700 rounded outline-none text-white placeholder-gray-500"
//         />
//         <button
//           onClick={handleSignIn}
//           className="w-full p-3 bg-[#0587be] rounded text-white hover:bg-indigo-500"
//           disabled={loading}
//         >
//           {loading ? 'Signing In...' : 'Sign In'}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default SignIn;
