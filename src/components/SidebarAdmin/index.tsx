"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlignJustify,
  ClipboardList,
  HomeIcon,
  Package2,
  SquareArrowRight,
  User,
} from "lucide-react";
import { iconContainerVariants, itemVariants } from "./types/const";
import OriginSidebarAdmin from "./components/OriginSidebarAdmin";
import ReduceSidebarAdmin from "./components/ReduceSidebarAdmin";

const DATA_SIDEBAR_ADMIN = [
  { name: "Home", to: "/admin", id: 1, icon: <HomeIcon /> },
  {
    name: "Category",
    to: "/admin/pages/category",
    id: 2,
    icon: <ClipboardList />,
  },
  { name: "Product", to: "/admin/pages/product", id: 3, icon: <Package2 /> },
  { name: "User", to: "/admin/pages/user", id: 4, icon: <User /> },
];

export default function App() {
  const [opened, setOpened] = useState(false);
  const [idFocus, setIdFocus] = useState<number>(1);
  const handleClick = () => {
    setOpened(!opened);
  };

  return (
    <main>
      <AnimatePresence>
        {opened && (
          <motion.aside
            initial={{ width: 80 }}
            animate={{
              width: 300,
            }}
            exit={{
              width: 80,
              transition: { duration: 0.1 },
            }}
          >
            <motion.div
              className="container bg-yellow-200 flex flex-col py-4 items-start"
              initial="closed"
              animate="open"
              exit="closed"
              variants={itemVariants}
            >
              <button className="self-end" onClick={handleClick}>
                <AlignJustify />
              </button>
              <OriginSidebarAdmin
                data={DATA_SIDEBAR_ADMIN}
                idFocus={idFocus}
                onSetIdFocus={setIdFocus}
              />
            </motion.div>
          </motion.aside>
        )}
        <div className="btn-container bg-yellow-200 min-w-20 min-h-screen">
          {!opened && (
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={iconContainerVariants}
              className="p-3"
            >
              <button onClick={handleClick} className="">
                <SquareArrowRight />
              </button>
              <ReduceSidebarAdmin
                 data={DATA_SIDEBAR_ADMIN}
                 idFocus={idFocus}
                 onSetIdFocus={setIdFocus}
              />
            </motion.div>
          )}
        </div>
      </AnimatePresence>
    </main>
  );
}
