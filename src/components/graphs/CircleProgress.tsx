import React from "react";
import "./CircleProgress.css";

// Defining the types for the props
interface CircleProgressProps {
  percentage?: number;
}

const CircleProgress: React.FC<CircleProgressProps> = ({ percentage = 50 }) => {
  const radius = 25;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference; // Progress calculation

  return (
    <div className="circle-progress-container">
      <svg className="circle-progress" width="60" height="60">
        <circle
          className="circle-progress-bg"
          cx="30"
          cy="30"
          r={radius}
          stroke="#ffa502ba"
          strokeWidth="6"
          fill="none"
        />
        <circle
          className="circle-progress-fg"
          cx="30"
          cy="30"
          r={radius}
          stroke="orange"
          strokeWidth="6"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round" // Apply rounded ends
        />
      </svg>
      <div className="circle-progress-text">{percentage}%</div>
    </div>
  );
};

export default CircleProgress;
