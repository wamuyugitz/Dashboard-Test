import React from "react";
import OrderGraph from "../../graphs/OrderGraph";

// Defining the types for the data prop
interface OrderProps {
  data: { id: string; status: string }[];
}

const Order: React.FC<OrderProps> = ({ data }) => {
  return <OrderGraph data={data} />;
};

export default Order;
