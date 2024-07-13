import React from "react";
import LabelInput from "@/components/LabelInput";
import { format } from "date-fns";
import { IViewDetail } from "../../types/common";

const ModalDetailProduct: React.FC<IViewDetail> = ({ data }) => {
  return (
    <div className="grid gap-4 py-4">
      <LabelInput title="title" value={data?.title} />
      <LabelInput title="description" value={data?.description} />
      <LabelInput title="price" value={data?.price} />
      <LabelInput title="discount" value={data?.discount} />
      <LabelInput
        title="create at"
        value={format(new Date(data?.createdAt), "dd-MM-yyyy HH:mm:ss")}
      />
      <LabelInput
        title="update at"
        value={format(new Date(data?.updatedAt), "dd-MM-yyyy HH:mm:ss")}
      />
    </div>
  );
};

export default ModalDetailProduct;
