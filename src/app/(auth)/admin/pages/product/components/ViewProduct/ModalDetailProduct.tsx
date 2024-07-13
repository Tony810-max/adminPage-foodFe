import React from "react";
import LabelInput from "@/components/LabelInput";
import { format } from "date-fns";
import { IViewDetail } from "../../types/common";
import Image from "next/image";

const ModalDetailProduct: React.FC<IViewDetail> = ({ data }) => {
  return (
    <div className="grid gap-4 py-4">
      <LabelInput title="title" value={data?.title} />
      <LabelInput title="description" value={data?.description} />
      <LabelInput title="price" value={data?.price} />
      <LabelInput title="discount" value={data?.discount} />
      <LabelInput title="stock" value={data?.stock} />
      <LabelInput
        title="create at"
        value={format(new Date(data?.createdAt), "dd-MM-yyyy HH:mm:ss")}
      />
      <LabelInput
        title="update at"
        value={format(new Date(data?.updatedAt), "dd-MM-yyyy HH:mm:ss")}
      />
      <div className="flex gap-2">
        {data?.images?.map((img) => (
          <div className="relative w-20 h-20">
            <Image
              src={img}
              alt="imgProduct"
              key={img}
              fill
              priority
              unoptimized
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ModalDetailProduct;
