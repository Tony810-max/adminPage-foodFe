"use client";
import React from "react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  Label,
  ResponsiveContainer,
} from "recharts";
import { ICardAdmin } from "../../types/common";
import { IUserDataPerDay } from "@/types/common";

const formatDate = (dateString: any) => {
  const [year, month, day] = dateString.split("-");
  return `${day}/${month}/${year}`;
};

const ChartUser: React.FC<ICardAdmin> = ({ userCount }) => {
  const [formattedData, setFormattedData] = React.useState<
    IUserDataPerDay[] | undefined
  >();

  React.useEffect(() => {
    const formatted = userCount?.map((item) => ({
      ...item,
      date: formatDate(item.date),
    }));
    setFormattedData(formatted);
  }, [userCount]);

  return (
    <ResponsiveContainer width="100%" height={250}>
      <BarChart data={formattedData} className="w-full">
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date">
          <Label value="Date" offset={-5} position="insideBottomRight" />
        </XAxis>
        <YAxis
          tickFormatter={(tick) => Math.round(tick).toString()}
          label={{
            value: "Number of Users",
            angle: -90,
            position: "insideLeft",
            dy: 50,
          }}
        />
        <Tooltip />
        <Legend width={100} />
        <Bar dataKey="count" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default ChartUser;
