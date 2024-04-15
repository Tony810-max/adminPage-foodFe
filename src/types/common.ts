export const API_URL = "https://food-be-1dsk.onrender.com";

export interface IUser {
  id: number;
  address: string;
  createdAt: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  roles: string[];
  updatedAt: string;
}
