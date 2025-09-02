import "./index.css";
import Nav from "./nav/Nav";
import HeaderBar from "./header/Header";
import EmployeeList from "./components/employee-list/EmployeeList";
import Footer from "./footer/Footer";

export default function App() {
  return (
    <>
      <header>
        <Nav />
        <HeaderBar />
      </header>

      <main>
        <h2>Employee Directory</h2>
        <EmployeeList />
      </main>

      <Footer />
    </>
  );
}
