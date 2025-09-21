import { Route, Routes, Navigate } from "react-router-dom";
import Nav from "./components/layout/nav/Nav"; 
import { useState } from "react";
import HeaderBar from "./components/header/Header";
import { EmployeeList } from "./components/employee-list/EmployeeList";
import { Organization } from "./components/organization-list/Organization";
import Footer from "./components/layout/footer/Footer";


export default function App() {
  return (
    <>
      <header>
        <Nav isLoggedIn={false} onLogin={() => {}} />
        <HeaderBar />
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Navigate to="/employees" replace />} />
          <Route path="/employees" element={<EmployeeList />} />
          <Route path="/organization" element={<Organization />} />
        </Routes>
      </main>

      <Footer />
    </>
  );
}
