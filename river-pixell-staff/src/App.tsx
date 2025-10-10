
import { useState } from "react";
import { Route, Routes, Navigate, BrowserRouter } from "react-router";
import Nav from "./components/layout/nav/Nav"; 
import HeaderBar from "./components/header/Header";
import Footer from "./components/layout/footer/Footer";
import { EmployeesPage } from "./components/employee-list/employeeP/EmployeesPage";
import { Organization } from "./components/organization-list/Organization";
import { ToastContainer } from "react-toastify";



export default function App() {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const onLogin = () => setLoggedIn(!loggedIn);

  return (
    <BrowserRouter>
      <header>
        <Nav isLoggedIn={loggedIn} onLogin={onLogin} />
        <HeaderBar />
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Navigate to="/employees" replace />} />
          <Route path="/employees" element={<EmployeesPage />} />
          <Route path="/organization" element={<Organization />} />
        </Routes>
      </main>

      <Footer />
    <ToastContainer />
    </BrowserRouter>
  );
}
