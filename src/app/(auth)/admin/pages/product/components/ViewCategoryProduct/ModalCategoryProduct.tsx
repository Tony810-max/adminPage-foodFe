import LabelInput from "@/components/LabelInput";
import React from "react";
import { IViewDetail } from "../../types/common";
import { format } from "date-fns";

const ModalCategoryProduct: React.FC<IViewDetail> = ({ data }) => {
  return (
    <div className="grid gap-4 py-4">
      <LabelInput title="title" value={data?.category?.title} />
      <LabelInput title="description" value={data?.category?.description} />
      <LabelInput
        title="create at"
        value={format(
          new Date(data?.category?.createdAt),
          "dd-MM-yyyy HH:mm:ss"
        )}
      />
      <LabelInput
        title="update at"
        value={format(
          new Date(data?.category?.updatedAt),
          "dd-MM-yyyy HH:mm:ss"
        )}
      />
    </div>
  );
};

export default ModalCategoryProduct;
