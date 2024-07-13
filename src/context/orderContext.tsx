import { API_URL, IOderMain } from "@/types/common";
import axios from "axios";
import React from "react";

interface IOrderContext {
  dataOrder: IOderMain | null | undefined;
  fetchOrders: () => void;
  tabCurr: string;
  setTabCurr: React.Dispatch<React.SetStateAction<string>>;
}

export const OderContext = React.createContext<IOrderContext>({
  dataOrder: null,
  fetchOrders: () => {},
  tabCurr: "processing",
  setTabCurr: () => {},
});

const OrderProvider = ({ children }: { children: React.ReactNode }) => {
  const [dataOrder, setDataOrder] = React.useState<IOderMain>();
  const [tabCurr, setTabCurr] = React.useState("processing");

  const fetchOrders = async () => {
    try {
      const accessToken = JSON.parse(localStorage.getItem("accessToken")!);
      const response = await axios.get(
        `${API_URL}/api/v1/orders?status=${tabCurr}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );

      if (response) {
        setDataOrder(response?.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    fetchOrders();
  }, [tabCurr]);

  const context = React.useMemo(() => {
    return {
      dataOrder,
      fetchOrders,
      tabCurr,
      setTabCurr,
    };
  }, [dataOrder, fetchOrders, tabCurr, setTabCurr]);

  return (
    <OderContext.Provider value={context}>{children}</OderContext.Provider>
  );
};

export default OrderProvider;