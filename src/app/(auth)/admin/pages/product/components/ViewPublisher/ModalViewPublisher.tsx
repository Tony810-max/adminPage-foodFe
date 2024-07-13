import React from "react";
import { IViewDetail } from "../../types/common";
import LabelInput from "@/components/LabelInput";
import { format } from "date-fns";

const ModalViewPublisher: React.FC<IViewDetail> = ({ data }) => {
  return (
    <div className="grid gap-4 py-4">
      <LabelInput title="name" value={data?.publisher?.name} />
      <LabelInput title="description" value={data?.publisher?.description} />

      <LabelInput
        title="create at"
        value={format(
          new Date(data?.publisher?.createdAt),
          "dd-MM-yyyy HH:mm:ss"
        )}
      />
      <LabelInput
        title="update at"
        value={format(
          new Date(data?.publisher?.updatedAt),
          "dd-MM-yyyy HH:mm:ss"
        )}
      />
    </div>
  );
};

export default ModalViewPublisher;
