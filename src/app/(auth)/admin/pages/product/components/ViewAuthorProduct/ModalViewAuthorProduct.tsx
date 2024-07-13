import React from "react";
import { IViewDetail } from "../../types/common";
import LabelInput from "@/components/LabelInput";
import { format } from "date-fns";

const ModalViewAuthorProduct: React.FC<IViewDetail> = ({ data }) => {
  return (
    <div className="grid gap-4 py-4">
      <LabelInput title="name" value={data?.author?.name} />
      <LabelInput title="gender" value={data?.author?.gender} />
      <LabelInput
        title="date of birth"
        value={format(
          new Date(data?.author?.dateOfBirth),
          "dd-MM-yyyy HH:mm:ss"
        )}
      />
      <LabelInput
        title="create at"
        value={format(new Date(data?.author?.createdAt), "dd-MM-yyyy HH:mm:ss")}
      />
      <LabelInput
        title="update at"
        value={format(new Date(data?.author?.updatedAt), "dd-MM-yyyy HH:mm:ss")}
      />
    </div>
  );
};

export default ModalViewAuthorProduct;
