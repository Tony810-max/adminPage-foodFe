import * as yup from "yup";

export const schemaOrder = yup
  .object()
  .shape({
    status: yup.string().required(),
  })
  .required();
