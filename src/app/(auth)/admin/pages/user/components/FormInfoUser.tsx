import React from "react";
import LabelInputUser from "./LabelInputUser";
import { IInfoUser } from "../types/common";
import { format } from "date-fns";

const FormInfoUser: React.FC<IInfoUser> = ({ user }) => {
  return (
    <div className="grid gap-4 py-4">
      <LabelInputUser
        name="name"
        value={`${user?.firstName} ${user?.lastName}`}
      />
      <LabelInputUser
        name="address"
        value={user?.address ? user?.address : "not address"}
      />
      <LabelInputUser name="phone number" value={user?.phoneNumber} />
      <LabelInputUser
        name="gender"
        value={user?.gender !== null ? user?.gender : "not gender"}
      />
      <LabelInputUser
        name="date of birth"
        value={user?.dateOfBirth ? user?.dateOfBirth : "not date of birth"}
      />
      <LabelInputUser
        name="create at"
        value={format(new Date(user?.createdAt), "dd-MM-yyyy HH:mm:ss")}
      />
      <LabelInputUser
        name="update at"
        value={format(new Date(user?.updatedAt), "dd-MM-yyyy HH:mm:ss")}
      />
    </div>
  );
};

export default FormInfoUser;
