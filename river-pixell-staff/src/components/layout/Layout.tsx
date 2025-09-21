import { Outlet } from "react-router-dom";
import Nav from "./nav/Nav";
import Footer from "./footer/Footer";

interface LayoutProps {
  isLoggedIn: boolean;
  onLogin: () => void;
}
export function Layout({ isLoggedIn, onLogin }: LayoutProps) {
  return (
    <div className="p-8 flex flex-col min-h-screen bg-stone-200">
      <Nav
        onLogin={onLogin}
        isLoggedIn={isLoggedIn}
      />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
