"use client";

import { useState } from "react";
import AdminHome from "./AdminHome"; // Admin Home component
import AdminTransactions from "./AdminTransactions"; // Admin Transactions component
import AdminNavbar from "./AdminNavbar"; // Admin Navbar

export default function Admin({ allUsersData }) {
  const [activeComponent, setActiveComponent] = useState("home"); // Manage active section
console.log(allUsersData)
  return (
    <>
      {/* Navbar */}
      <AdminNavbar activeComponent={activeComponent} setActiveComponent={setActiveComponent} />

      {/* Main Content */}
      <main className="">
      {activeComponent === "home" && <AdminHome allUsersData={allUsersData} />}
      {activeComponent === "transactions" && <AdminTransactions allUsersData={allUsersData} />}
      {/* {activeComponent === "transactions" && (
          <AdminTransactions transactions={allUsersData?.transactions || []} />
        )} */}
      </main>
    </>
  );
}