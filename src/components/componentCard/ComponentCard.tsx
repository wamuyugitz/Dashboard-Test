import React, { useEffect, useState } from "react";
import "./ComponentCard.css";
import ComponentHeader from "../componentHeader/ComponentHeader";

// Defining the props interface for the ComponentCard
interface ComponentCardProps {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
  width: number;
}

const ComponentCard: React.FC<ComponentCardProps> = ({
  icon,
  title,
  children,
  width,
}) => {
  const [largeScreen, setLargeScreen] = useState<boolean>(
    window.innerWidth >= 992
  );

  const handleResize = () => {
    setLargeScreen(window.innerWidth >= 992);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      className="component-card-container"
      style={{ width: largeScreen ? `${width}%` : "95%" }}
    >
      <div className="component-card">
        <ComponentHeader icon={icon} title={title} />
        <div className="component-body">{children}</div>
      </div>
    </div>
  );
};

export default ComponentCard;
