import React, { useState } from "react";
import { PieChart, Pie, Sector, ResponsiveContainer, Cell } from "recharts";

// Defining the status colors
const statusColors: { [key: string]: string } = {
  Completed: "#28a745",
  "In Progress": "#fd7e14",
  Due: "#dc3545",
};

// Defining the props type for the OrderGraph component
interface OrderGraphProps {
  data: { id: string; status: string }[];
}

const renderActiveShape = (props: any) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    value,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#333"
        style={{ fontWeight: "bold", fontSize: 18 }}
      >{`${value}`}</text>
    </g>
  );
};

const OrderGraph: React.FC<OrderGraphProps> = ({ data }) => {
  // Convert the data into the format expected for the Pie chart
  const chartData = [
    {
      name: "Completed",
      value: data.filter((item) => item.status === "Completed").length,
    },
    {
      name: "In Progress",
      value: data.filter((item) => item.status === "In Progress").length,
    },
    {
      name: "Due",
      value: data.filter((item) => item.status === "Due").length,
    },
  ];

  const [activeIndex, setActiveIndex] = useState<number>(0);

  // Fix for the type error by specifying the correct type for the first parameter
  const onPieEnter = (
    _: React.MouseEvent<SVGPathElement, MouseEvent>,
    index: number
  ) => {
    setActiveIndex(index);
  };

  return (
    <ResponsiveContainer
      width={"100%"}
      height={"100%"}
      style={{ fontSize: 12 }}
    >
      <PieChart>
        <Pie
          activeIndex={activeIndex}
          activeShape={renderActiveShape}
          data={chartData}
          cx="50%"
          cy="50%"
          innerRadius={45}
          outerRadius={60}
          dataKey="value"
          onMouseEnter={onPieEnter}
          labelLine={false}
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={statusColors[entry.name]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};

export default OrderGraph;
