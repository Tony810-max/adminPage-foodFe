import { IDailyRevenue } from "@/types/common";
import React from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface IChartDaily {
  dataDaily?: IDailyRevenue[];
}

const ChartDaily: React.FC<IChartDaily> = ({ dataDaily }) => {
  return (
    <ResponsiveContainer width="100%" height="100%" className={"col-span-2"}>
      <LineChart data={dataDaily}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="revenue" stroke="#8884d8" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default ChartDaily;
