import * as yup from "yup";

export const schemaCategory = yup
  .object()
  .shape({
    title: yup.string().required(),
    description: yup.string().required(),
  })
  .required();
