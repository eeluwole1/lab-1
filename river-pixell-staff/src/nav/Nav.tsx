import logo from "../assets/rplogo.png";

export default function Nav() {
  return (
    <nav aria-label="Primary">
      <div className="nav-left">
        <img src={logo} alt="Pixell River Logo" />
      </div>
      <div className="nav-links">
        <a href="#">Employees</a>
        <a href="#">Organization</a>
      </div>
    </nav>
  );
}
