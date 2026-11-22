import { Outlet } from "react-router";
import Navbar from "../components/Navbar";

function HomePage() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default HomePage;
