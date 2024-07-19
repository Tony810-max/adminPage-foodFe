import * as yup from "yup";

export const createSchema = yup
  .object()
  .shape({
    email: yup.string().email().required(),
    password: yup.string().required(),
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    phoneNumber: yup.string().required(),
    verificationCode: yup.string().required(),
  })
  .required();
