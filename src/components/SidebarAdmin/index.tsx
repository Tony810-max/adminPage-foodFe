"use client";

import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlignJustify,
  ClipboardList,
  Factory,
  HomeIcon,
  Milestone,
  Package2,
  PackageCheck,
  SquareArrowRight,
  SquareUserRound,
  User,
} from "lucide-react";
import { itemVariants } from "./types/const";
import OriginSidebarAdmin from "./components/OriginSidebarAdmin";
import ReduceSidebarAdmin from "./components/ReduceSidebarAdmin";
import Image from "next/image";

const DATA_SIDEBAR_ADMIN = [
  { name: "Home", value: "home", to: "/admin", id: 1, icon: <HomeIcon /> },
  {
    name: "Category",
    value: "category",
    to: "/admin/pages/category",
    id: 2,
    icon: <ClipboardList />,
  },
  {
    name: "Product",
    value: "product",
    to: "/admin/pages/product",
    id: 3,
    icon: <Package2 />,
  },
  {
    name: "Order",
    value: "order",
    to: "/admin/pages/order",
    id: 4,
    icon: <PackageCheck />,
  },
  { name: "User", to: "/admin/pages/user", id: 5, icon: <User /> },
  { name: "post - blog", to: "/admin/pages/post", id: 6, icon: <Milestone /> },
  { name: "publisher", to: "/admin/pages/publisher", id: 7, icon: <Factory /> },
  {
    name: "author",
    to: "/admin/pages/author",
    id: 8,
    icon: <SquareUserRound />,
  },
];

export default function App() {
  const [opened, setOpened] = React.useState(false);
  const [valueParam, setValueParam] = React.useState<string>("Home");
  const handleClick = () => {
    setOpened(!opened);
  };

  const sidebarVariants = {
    opened: {
      width: 200,
      transition: {
        type: "tween",
        ease: "easeOut",
        duration: 0.4,
      },
    },
    closed: {
      width: 100,
      transition: {
        type: "spring",
        duration: 20,
      },
    },
  };

  React.useEffect(() => {
    const savedValueParam = localStorage.getItem("selectedItem");
    if (savedValueParam) {
      setValueParam(savedValueParam);
    }
  }, [valueParam]);

  return (
    <div className=" border  border-red-300 px-5 py-4 shadow-lg">
      <div className="relative  aspect-[4/3]">
        <Image src={"/images/logo.webp"} alt="logo" fill unoptimized priority />
      </div>
      <main className="flex justify-center">
        <AnimatePresence>
          {opened ? (
            <motion.aside
              variants={sidebarVariants}
              initial="closed"
              animate="opened"
              exit="opened"
            >
              <motion.div
                className=" flex flex-col gap-4 py-4 items-center"
                initial="closed"
                animate="open"
                exit="opened"
                variants={itemVariants}
              >
                <button className="self-end" onClick={handleClick}>
                  <AlignJustify />
                </button>
                <AnimatePresence>
                  {opened ? (
                    <motion.aside
                      key="sidebar"
                      initial={{ width: 0 }}
                      animate={{ width: 200 }}
                      exit={{ width: 0 }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                    >
                      <OriginSidebarAdmin
                        opened={opened}
                        valueParam={valueParam}
                        onSetValueParam={setValueParam}
                        data={DATA_SIDEBAR_ADMIN}
                      />
                    </motion.aside>
                  ) : (
                    <motion.aside
                      key="sidebar"
                      initial={{ width: 300 }}
                      animate={{ width: 0 }}
                      exit={{ width: 300 }}
                      transition={{ duration: 3, ease: "easeInOut" }}
                    >
                      <ReduceSidebarAdmin
                        valueParam={valueParam}
                        onSetValueParam={setValueParam}
                        data={DATA_SIDEBAR_ADMIN}
                      />
                    </motion.aside>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.aside>
          ) : (
            <AnimatePresence>
              <motion.aside
                variants={sidebarVariants}
                initial="closed"
                animate="closed"
                exit="closed"
              >
                <motion.div
                  className=" flex flex-col gap-4 py-4 items-center"
                  variants={sidebarVariants}
                  initial="closed"
                  animate="closed"
                  exit="opened"
                >
                  <button onClick={handleClick} className="">
                    <SquareArrowRight />
                  </button>
                  <ReduceSidebarAdmin
                    valueParam={valueParam}
                    onSetValueParam={setValueParam}
                    data={DATA_SIDEBAR_ADMIN}
                  />
                </motion.div>
              </motion.aside>
            </AnimatePresence>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
