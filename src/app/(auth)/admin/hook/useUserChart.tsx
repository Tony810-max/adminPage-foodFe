import { API_URL, IUserDataPerDay } from "@/types/common";
import axios from "axios";
import React from "react";

export const useUserChart = () => {
  const [userCount, setUserCount] = React.useState<IUserDataPerDay[]>();
  const [day, setDay] = React.useState<Number>(10);

  const fetchUserPerDay = async () => {
    try {
      const accessToken = JSON.parse(localStorage.getItem("accessToken")!);

      const response = await axios.get(
        `${API_URL}/api/v1/user/new-users-count-per-day?days=${day}`,
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      if (response) {
        setUserCount(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    fetchUserPerDay();
  }, [day]);

  return {
    userCount,
    day,
    setDay,
    fetchUserPerDay,
  };
};
