"use client";
import React from "react";
import TablePost from "./components/TablePost";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import axios from "axios";
import { API_URL, IPostMain } from "@/types/common";
import SearchPost from "./components/SearchPost";

export type tab = {
  title: string;
  value: boolean;
};

const DATA_TAB = [
  {
    title: "Approved",
    value: true,
  },
  {
    title: "UnApproved",
    value: false,
  },
];

const PostPage = () => {
  const [tab, setTab] = React.useState<tab>(DATA_TAB[0]);
  const [dataPost, setDataPost] = React.useState<IPostMain>();
  
  const [searchValue, setSearchValue] = React.useState<string>("");

  const fetchPost = async () => {
    try {
      const accessToken = JSON.parse(localStorage.getItem("accessToken")!);
      const response = await axios.get(
        `${API_URL}/api/v1/post?isApprove=${tab?.value}&search=${searchValue}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      if (response) {
        setDataPost(response?.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    fetchPost();
  }, [tab, searchValue]);

  return (
    <div>
      <div className="flex justify-between">
        <div className="space-x-2 py-2">
          {DATA_TAB?.map((tabData: tab) => (
            <Button
              key={tabData.title}
              variant={"outline"}
              onClick={() => setTab(tabData)}
              className={cn("font-sans text-sm capitalize", {
                "bg-red-500 text-white": tab === tabData,
              })}
            >
              {tabData?.title}
            </Button>
          ))}
        </div>
        <SearchPost onSetSearchValue={setSearchValue} />
      </div>
      <TablePost dataPost={dataPost} fetchPost={fetchPost} tab={tab} />
    </div>
  );
};

export default PostPage;
