import "./index.css";
import Nav from "./components/nav/Nav";
import HeaderBar from "./components/header/Header";
import EmployeeList from "./components/employee-list/EmployeeList";
import Footer from "./components/footer/Footer";

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
