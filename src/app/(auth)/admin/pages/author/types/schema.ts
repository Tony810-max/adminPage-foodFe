import * as yup from "yup";

export const authorSchema = yup
  .object()
  .shape({
    name: yup.string().required(),
    genderValue: yup.string().required("gender is require field"),
    date: yup.string().required(),
  })
  .required();
