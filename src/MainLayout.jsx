import React, { useEffect } from "react";
import Sidebar from "./Componetns/Layout/Sidebar";
import Navbar from "./Componetns/Layout/Navbar";
import "../src/Styles/MainLayout.css";
import { useNavigate } from "react-router-dom";
const MainLayout = ({ children }) => {
  const navigate = useNavigate();
  useEffect(() => {
    const auth = JSON.parse(localStorage.getItem("user"));
    if (!auth) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="d-flex h-100" >
      <Sidebar />
      <div className="contain " >
        <Navbar />
        <div className="mainlayout-children">{children}</div>
      </div>
    </div>
  );
};

export default MainLayout;
