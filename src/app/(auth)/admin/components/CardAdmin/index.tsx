import React from "react";
import { Package2, Shield, User, UserPlus } from "lucide-react";

import { ICardAdmin } from "../../types/common";

import CardInfoAdmin from "./CardInfoAdmin";
import { OderContext } from "@/context/orderContext";

const CardAdmin: React.FC<ICardAdmin> = ({ userCount, dataAdmin }) => {
  const [userDay, setUserDay] = React.useState(0);
  const orderContext = React.useContext(OderContext);
  const dataOrder = orderContext.dataOrder;

  React.useEffect(() => {
    if (userCount) {
      const date = new Date();
      const currentDay = date.getDate();
      const currentMonth = date.getMonth() + 1;
      const currentYear = date.getFullYear();

      const userTodayCount = userCount.reduce((acc, user) => {
        const [year, month, day] = user.date.split("-").map(Number);
        if (
          year === currentYear &&
          month === currentMonth &&
          day === currentDay
        ) {
          return acc + user.count;
        }
        return acc;
      }, 0);

      setUserDay(userTodayCount);
    }
  }, [userCount]);

  return (
    <div className="grid grid-cols-4 gap-4">
      <CardInfoAdmin
        value={userDay}
        title="New users count per day"
        Icon={UserPlus}
      />
      <CardInfoAdmin
        value={dataOrder ? dataOrder?.orders?.length : 0}
        title="total order processing"
        Icon={Package2}
      />
      <CardInfoAdmin
        value={dataAdmin ? dataAdmin?.users?.length : 0}
        title="total number of administrators"
        Icon={Shield}
      />
      <CardInfoAdmin value="" title="" Icon={User} />
    </div>
  );
};

export default CardAdmin;
