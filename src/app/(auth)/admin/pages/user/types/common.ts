import { IUser } from "@/types/common";

export interface IInfoUser {
  user: IUser;
}

export interface IUserId {
  idUser: number;
}

export interface IDeleteUser {
  idUser: number;
  tabCurr: string;
}

export interface IUserCode {
  verifyCode: string;
}

export interface IRestoreUser {
  idUser: number;
  fetchUser: () => void;
}
