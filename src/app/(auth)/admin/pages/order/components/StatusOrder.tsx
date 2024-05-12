import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import React from "react";

interface statusProps {
  value: string;
  Icon: React.ElementType;
  variant:
    | "default"
    | "secondary"
    | "destructive"
    | "outline"
    | null
    | undefined;
  className?: string;
}

const StatusOrder: React.FC<statusProps> = ({
  Icon,
  value,
  className,
  variant,
}) => {
  return (
    <Badge variant={variant} className={cn("gap-2 w-fit px-4 py-2 ", className)}>
      <Icon size={15} />
      <p className="font-sans text-sm  capitalize">{value}</p>
    </Badge>
  );
};

export default StatusOrder;
