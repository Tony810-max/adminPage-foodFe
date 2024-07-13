import * as yup from "yup";

export const productSchema = yup
  .object()
  .shape({
    title: yup.string().required(),
    categoryId: yup.number().required(),
    stock: yup.number().required(),
    price: yup.number().required(),
    description: yup.string().required(),
  })
  .required();
