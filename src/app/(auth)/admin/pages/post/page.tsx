"use client";
import React from "react";
import TablePost from "./components/TablePost";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import axios from "axios";
import { API_URL, IPostMain } from "@/types/common";
import SearchPost from "./components/SearchPost";
import { useSearchParams } from "next/navigation";
import SelectChild from "./components/SelectValue";
import { DATA_TAB } from "./types/constant";

export type tab = {
  title: string;
  value: string;
};



const PostPage = () => {
  const [tab, setTab] = React.useState("true");
  const [tabTitle, setTabTitle] = React.useState("Approved");

  const [dataPost, setDataPost] = React.useState<IPostMain>();
  const [searchValue, setSearchValue] = React.useState<string>("");
  const search = useSearchParams();
  const page = search.get("page");

  const fetchPost = async () => {
    try {
      const accessToken = JSON.parse(localStorage.getItem("accessToken")!);
      const response = await axios.get(
        `${API_URL}/api/v1/post?isApprove=${tab}&search=${searchValue}&page=${page}&limit=5`,
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
  }, [tab, searchValue, page]);

  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="space-x-2 py-2 hidden sm:block">
          {DATA_TAB?.map((tabData) => (
            <Button
              key={tabData.title}
              variant={"outline"}
              onClick={() => {
                setTabTitle(tabData.title);
                setTab(tabData?.value);
              }}
              className={cn("font-sans text-sm capitalize", {
                "bg-red-500 text-white": tab === tabData.value,
              })}
            >
              {tabData?.title}
            </Button>
          ))}
        </div>
        <SelectChild onSetTab={setTab} />
        <SearchPost onSetSearchValue={setSearchValue} />
      </div>
      <TablePost
        dataPost={dataPost}
        fetchPost={fetchPost}
        tabTitle={tabTitle}
        page={page}
      />
    </div>
  );
};

export default PostPage;
