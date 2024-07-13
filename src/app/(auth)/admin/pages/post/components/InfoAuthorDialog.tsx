import React from "react";
import { IAuthorDialog } from "./AuthorDialogPost";
import LabelInput from "../../../../../../components/LabelInput";

const InfoAuthorDialog: React.FC<IAuthorDialog> = ({ data }) => {
  return (
    <div className="grid gap-4 py-4">
      <LabelInput
        title={"name"}
        value={`${data?.firstName} ${data?.lastName}`}
      />
      <LabelInput title={"address"} value={data?.address} />
      <LabelInput title={"phone number"} value={data?.phoneNumber} />
      <LabelInput title={"create at"} value={data?.createdAt} />
      <LabelInput
        title={"delete at"}
        value={data?.deletedAt !== null ? data?.deletedAt : "None"}
      />
    </div>
  );
};

export default InfoAuthorDialog;
