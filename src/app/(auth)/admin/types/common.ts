import { IUserDataPerDay, IUsers } from "@/types/common";

export interface ICardAdmin {
  userCount?: IUserDataPerDay[];
  dataAdmin?: IUsers;
}
