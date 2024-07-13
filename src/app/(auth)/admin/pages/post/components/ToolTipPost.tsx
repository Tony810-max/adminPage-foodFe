import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface IToolTip {
  description: string;
}

const ToolTipPost: React.FC<IToolTip> = ({ description }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <span className="font-sans text-base truncate max-w-60">
            {description}
          </span>
        </TooltipTrigger>
        <TooltipContent>
          <p className="font-sans text-base">{description}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default ToolTipPost;
