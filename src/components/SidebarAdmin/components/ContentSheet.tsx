import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import OriginSidebarAdmin from "./OriginSidebarAdmin";
import { DATA_SIDEBAR_ADMIN } from "..";
import { itemVariants } from "../types/const";

export interface IContentSheet {
  onSetOpen: (value: boolean) => void;
}

const ContentSheet: React.FC<IContentSheet> = ({ onSetOpen }) => {
  const [valueParam, setValueParam] = React.useState<string>("Home");

  React.useEffect(() => {
    const savedValueParam = localStorage.getItem("selectedItem");
    if (savedValueParam) {
      setValueParam(savedValueParam);
    }
  }, [valueParam]);

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

  return (
    <main className="flex justify-center ">
      <AnimatePresence>
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
            <AnimatePresence>
              <motion.aside
                key="sidebar"
                initial={{ width: 0 }}
                animate={{ width: 200 }}
                exit={{ width: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                <OriginSidebarAdmin
                  onSetOpen={onSetOpen}
                  valueParam={valueParam}
                  onSetValueParam={setValueParam}
                  data={DATA_SIDEBAR_ADMIN}
                />
              </motion.aside>
            </AnimatePresence>
          </motion.div>
        </motion.aside>
      </AnimatePresence>
    </main>
  );
};

export default ContentSheet;
