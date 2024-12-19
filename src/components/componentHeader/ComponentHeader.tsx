import React from "react";
import "./ComponentHeader.css";

// Defining the props interface for the ComponentHeader
interface ComponentHeaderProps {
  icon?: React.ReactNode;
  title: string;
}

const ComponentHeader: React.FC<ComponentHeaderProps> = ({ icon, title }) => {
  return (
    <div className="component-header d-flex align-items-center justify-content-start">
      {icon && <div className="component-icon">{icon}</div>}
      <div className="component-title">{title}</div>
    </div>
  );
};

export default ComponentHeader;
