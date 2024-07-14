import React from "react";
import axios from "axios";
import { API_URL, IDailyRevenue } from "@/types/common";

export const useDailyRevenue = () => {
  const [dataDaily, setDataDaily] = React.useState<IDailyRevenue[]>();

  const fetchDailyRevenue = async () => {
    try {
      const accessToken = JSON.parse(localStorage.getItem("accessToken")!);
      const response = await axios.get(
        `${API_URL}/api/v1/orders/daily-revenue`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );

      if (response) {
        setDataDaily(response?.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    fetchDailyRevenue();
  }, []);

  return {
    dataDaily,
    fetchDailyRevenue,
  };
};
