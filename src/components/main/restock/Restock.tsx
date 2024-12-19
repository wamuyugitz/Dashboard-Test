import React from "react";

// Defining types for the props
interface RestockItem {
  id: string | number;
  toolRef: string;
  toolName: string;
}

interface RestockProps {
  data: RestockItem[];
}

const Restock: React.FC<RestockProps> = ({ data }) => {
  return (
    <div className="restock component-body">
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Tool Ref</th>
            <th>Tool/Equipment Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((order) => (
            <tr key={order.id}>
              <td>{order.toolRef}</td>
              <td>{order.toolName}</td>
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

export default Restock;
