import * as yup from "yup";

export const productSchema = yup
  .object()
  .shape({
    title: yup.string().required(),
    description: yup.string().required(),

    stock: yup.number().min(0).required("stock must be greater than"),
    price: yup.number().min(0).required("price must be greater than"),
    discount: yup.number().min(0).required("discount must be greater than"),

    categoryValue: yup.string().required(),
    authorValue: yup.string().required(),
    publisherValue: yup.string().required(),
  })
  .required();
