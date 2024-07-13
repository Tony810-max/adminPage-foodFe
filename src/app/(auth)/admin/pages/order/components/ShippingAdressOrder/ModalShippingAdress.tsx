import React from "react";
import LabelInput from "@/components/LabelInput";
import { IShippingOrder } from "../../types/common";

const ModalShippingAdress: React.FC<IShippingOrder> = ({ data }) => {
  return (
    <div className="grid gap-4 py-4">
      <LabelInput title="name" value={data?.name} />
      <LabelInput title="phone number" value={data?.phoneNumber} />
      <LabelInput title="address" value={data?.address} />
      <LabelInput title="city" value={data?.city} />
      <LabelInput title="post code" value={data?.postCode} />
      <LabelInput title="state" value={data?.state} />
      <LabelInput title="country" value={data?.country} />
    </div>
  );
};

export default ModalShippingAdress;
