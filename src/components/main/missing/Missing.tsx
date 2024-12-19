import React from "react";

// Defining the types for the props and data
interface TeamMember {
  photo: string;
  name: string;
}

interface Order {
  id: string;
  toolRef: string;
  teamMember: TeamMember;
}

interface MissingProps {
  data: Order[];
}

const Missing: React.FC<MissingProps> = ({ data }) => {
  return (
    <div className="tool component-body">
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Tool Ref</th>
            <th>Team Member</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((order) => (
            <tr key={order.id}>
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

export default Missing;
