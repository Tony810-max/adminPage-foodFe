import * as yup from "yup";

export const changePasswrodSchema = yup
  .object()
  .shape({
    currentPassword: yup.string().required(),
    newPassword: yup.string().required(),
    confirmPassword: yup.string().required(),
  })
  .required();
