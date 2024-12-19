import React, { useState } from "react";
import "./Tool.css";
import { ref, update } from "firebase/database";
import Swal from "sweetalert2";
import { db } from "../../../firebaseConfig";

// Defining the types for the data prop
interface TeamMember {
  name: string;
  photo: string;
}

interface ToolData {
  id: string;
  toolRef: string;
  teamMember: TeamMember;
  status: string;
  duration: string;
}

interface ToolProps {
  data: ToolData[];
}

const statuses = ["Completed", "In Progress", "Due"];

const Tool: React.FC<ToolProps> = ({ data }) => {
  const handleStatusChange = (index: number, newStatus: string) => {
    const order = data[index];
    console.log(newStatus);
    Swal.fire({
      title: "Are you sure?",
      text: `Do you want to change the status of order ${order.id} to "${newStatus}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, update it!",
      cancelButtonText: "No, cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        // Reference to the specific tool's status in the Realtime Database
        const toolRef = ref(db, `tools/${index}`);

        // Update the status in the database
        update(toolRef, { status: newStatus })
          .then(() => {
            Swal.fire(
              "Updated!",
              `The status of order ${order.id} has been updated to "${newStatus}".`,
              "success"
            );
          })
          .catch((error) => {
            Swal.fire(
              "Error!",
              `Failed to update the status: ${error.message}`,
              "error"
            );
          });
      } else {
        Swal.fire("Cancelled", "The status update was cancelled.", "info");
      }
    });
  };

  return (
    <div className="tool component-body">
      <table className="table">
        <thead>
          <tr>
            <th>Work Order</th>
            <th>Tool Ref</th>
            <th>Team Member</th>
            <th>Status</th>
            <th>Duration</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((order, index) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.toolRef}</td>
              <td>
                <div className="team-member">
                  <img
                    src={order.teamMember.photo}
                    alt={order.teamMember.name}
                    className="profile-photo"
                  />
                  {order.teamMember.name}
                </div>
              </td>
              <td className="status-cell">
                <div className="status-wrapper">
                  <span className={`status ${order.status.toLowerCase()}`}>
                    {order.status}
                  </span>
                  <select
                    className="status-dropdown"
                    value={order.status}
                    onChange={(e) => handleStatusChange(index, e.target.value)}
                  >
                    {statuses.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </div>
              </td>
              <td>{order.duration}</td>
              <td>
                <button className="btn btn-primary btn-sm">Details</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Tool;
