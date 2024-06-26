import * as yup from "yup";

export const productSchema = yup
  .object()
  .shape({
    title: yup.string().required(),
    categoryId: yup.string().required(),
    stock: yup.number().required(),
    price: yup.string().required(),
    description: yup.string().required(),
  })
  .required();
