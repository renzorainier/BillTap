"use client";

import { useEffect, useState, useCallback } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "@/app/firebase/config";
import { useRouter } from "next/navigation";
import { doc, collection, onSnapshot } from "firebase/firestore";
import Home from "./Home"; // Regular user Home component
import UserTransactions from "./UserTransactions"; // Regular user UserTransactions component
import Admin from "./Admin"; // Admin UI component
import UserNavbar from "./UserNavbar"; // UserNavbar

export default function Main() {
  const [user, loading, error] = useAuthState(auth);
  const [userData, setUserData] = useState(null);
  const [allUsersData, setAllUsersData] = useState([]); // Store all users data for admin
  const [activeComponent, setActiveComponent] = useState("home"); // Default is "home"
  const [isAdmin, setIsAdmin] = useState(false); // Track if user is admin
  const router = useRouter();

  const handleUserCheck = useCallback(() => {
    if (!user) {
      router.push("/sign-in");
      return;
    }

    // Check if user is admin
    if (user.uid === "aCK0J1Vf5xeBY1s3zB1iUBn9QNq1") {
      setIsAdmin(true);

      // Subscribe to all user documents in real-time if admin
      const usersCollectionRef = collection(db, "users");
      const unsubscribeAllUsers = onSnapshot(
        usersCollectionRef,
        (querySnapshot) => {
          const users = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setAllUsersData(users);
        },
        (error) => {
          console.error("Error fetching users data in real-time:", error);
        }
      );

      return () => unsubscribeAllUsers();
    } else {
      setIsAdmin(false);

      // Subscribe to the current user's data in real-time
      const userDocRef = doc(db, "users", user.uid);
      const unsubscribeUser = onSnapshot(
        userDocRef,
        (docSnapshot) => {
          if (docSnapshot.exists()) {
            setUserData(docSnapshot.data());
            console.log("User data:", docSnapshot.data());
          } else {
            console.error("No user data found");
            router.push("/error");
          }
        },
        (error) => {
          console.error("Error fetching user data in real-time:", error);
        }
      );

      return () => unsubscribeUser();
    }
  }, [user, router]);

  useEffect(() => {
    if (!loading && !error) {
      const unsubscribe = handleUserCheck();
      return () => unsubscribe && unsubscribe();
    }
  }, [user, loading, error, handleUserCheck]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {isAdmin ? (
        <Admin allUsersData={allUsersData} />
      ) : (
        <>
          <UserNavbar activeComponent={activeComponent} setActiveComponent={setActiveComponent} />
          <main>
            {/* Render Home component by default */}
            {activeComponent === "home" && <Home userData={[userData]} />}
            {activeComponent === "transactions" && <UserTransactions transactions={userData?.transactions || []} />}
          </main>
        </>
      )}
    </div>
  );
}
