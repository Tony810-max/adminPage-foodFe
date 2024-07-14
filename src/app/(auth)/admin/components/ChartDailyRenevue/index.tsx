"use client";
import { useDailyRevenue } from "@/hook/useDailyRevenue";
import React from "react";
import ChartDaily from "./ChartDaily";

const ChartDailyRenevue = () => {
  const { dataDaily } = useDailyRevenue();

  const dataDailyFilter = React.useMemo(() => {
    return (
      dataDaily &&
      dataDaily.length > 0 &&
      dataDaily?.filter((data) => data?.revenue !== 0)
    );
  }, [dataDaily]);

  return (
    <>
      {dataDailyFilter ? (
        <ChartDaily dataDaily={dataDaily} />
      ) : (
        <div className="col-span-2 flex justify-center items-center font-sans text-lg font-bold capitalize border rounded-lg">
          No revenue generated today
        </div>
      )}
    </>
  );
};

export default ChartDailyRenevue;
