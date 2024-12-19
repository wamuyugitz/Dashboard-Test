import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import RoomPreferencesIcon from "@mui/icons-material/RoomPreferences";
import BackupTableIcon from "@mui/icons-material/BackupTable";
import SettingsIcon from "@mui/icons-material/Settings";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import logo from "../assets/images/logo.png";
import "./Sidebar.css";

interface SidebarProps {}

const Sidebar: React.FC<SidebarProps> = () => {
  return (
    <div className="sidebar">
      <div className="logo-container">
        <img src={logo} alt="logo" />
      </div>

      <nav className="nav-options">
        <div className="nav-option" title="Home">
          <HomeIcon className="icon" />
        </div>
        <div className="nav-option" title="Admin Panel">
          <AdminPanelSettingsIcon className="icon" />
        </div>
        <div className="nav-option" title="Room Preferences">
          <RoomPreferencesIcon className="icon" />
        </div>
        <div className="nav-option" title="Backup Table">
          <BackupTableIcon className="icon" />
        </div>
      </nav>

      <div className="nav-option footer" title="Settings">
        <SettingsIcon className="icon" />
      </div>
    </div>
  );
};

export default Sidebar;
