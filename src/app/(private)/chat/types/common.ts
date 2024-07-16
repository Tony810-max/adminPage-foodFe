import { IUser } from "@/types/common";

export interface Message {
  id: number;
  senderId: string;
  senderName: string;
  text: string;
  timestamp: string;
  deletedAt?: string;
  createdAt?: string;
  sender?: IUser;
}

export interface IUserLocacl {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: string;
  gender: null;
  dateOfBirth: null;
  roles: string[];
  createdAt: string;
  updatedAt: string;
  deletedAt: null;
  isActice: boolean;
}
