import * as yup from "yup";

export const publisherSchema = yup
  .object()
  .shape({
    name: yup.string().required(),
    description: yup.string().required(),
  })
  .required();