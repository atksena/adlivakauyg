import "./App.css";
import React, { useEffect, useState } from "react";
import logoImage from "./assets/ff.png";
import {
  BrowserRouter as Router,
  Link,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import HastaBilgileri from "./components/HastaBilgileri";
import GenelBilgi from "./components/GenelBilgi";
import AdliVakaList from "./components/AdliVakaList";
import { HastaProvider } from "./HastaContext";
import DashboardPage from "./components/DashboardPage";

const App: React.FC = () => {
  return (
    <HastaProvider>
      <Router>
        <div>
          <header style={headerStyle}>
            <div style={logoStyle}>
              <img src={logoImage} alt="Logo" style={logoImageStyle} />
            </div>
            <div style={buttonContainerStyle}>
              <Link to="/hasta-bilgileri">
                <button style={buttonStyle}>Vaka Raporu Oluştur</button>
              </Link>
              <Link to="/adliVaka-list">
                <button style={buttonStyle}>Adli Vaka Raporları</button>
              </Link>
            </div>
          </header>
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/dashboard-page" element={<DashboardPage />} />
            <Route path="/hasta-bilgileri" element={<HastaBilgileri />} />
            <Route path="/genel-bilgi" element={<GenelBilgi />} />
            <Route path="/adliVaka-list" element={<AdliVakaList />} />
          </Routes>
        </div>
      </Router>
    </HastaProvider>
  );
};

const headerStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  backgroundColor: "#f0f0f0",
  padding: "10px",
};

const logoStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
};

const logoImageStyle: React.CSSProperties = {
  width: "40px",
  height: "auto",
};

const buttonContainerStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "center",
};

const buttonStyle: React.CSSProperties = {
  marginLeft: "10px",
  background: "none",
  border: "none",
  cursor: "pointer",
  fontSize: "16px",
  fontWeight: "bold",
  textDecoration: "underline",
  color: "gray",
  textDecorationLine: "none",
};

export default App;
