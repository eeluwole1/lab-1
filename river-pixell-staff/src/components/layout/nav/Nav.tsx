import { NavLink } from "react-router-dom";
import { Outlet } from "react-router";
import logo from "../../../assets/rplogo.png";

interface NavbarProps {
  isLoggedIn: boolean;
  onLogin: () => void;
}

export default function Nav({isLoggedIn, onLogin}: NavbarProps) {
  return (
    <header>
      <nav aria-label="Primary">
      <div className="nav-left">
        <img src={logo} alt="Pixell River logo" />
      </div>

      <div className="nav-links">
        <NavLink to="/employees">Employees</NavLink>
        <NavLink to="/organization">Organization</NavLink>
      </div>
    </nav>

    </header>
    
  );
}
