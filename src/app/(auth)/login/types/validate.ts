import * as yup from "yup";

export const Inputschema = yup
  .object()
  .shape({
    email: yup.string().email("Email is not valid").required(),
    password: yup.string().min(6).required(),
  })
  .required();

export type Inputs = {
  email: string;
  password: string;
};
