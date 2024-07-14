import React from "react";
import ChartUser from "./ChartUser";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDebouncedValue } from "@mantine/hooks";
import { IUserDataPerDay } from "@/types/common";

export interface IChartUser {
  onSetDay: (value: number) => void;
  userCount?: IUserDataPerDay[];
}

const ChartNewUsersPerDay: React.FC<IChartUser> = ({ onSetDay, userCount }) => {
  const [value, setValue] = React.useState(10);

  const [debounced] = useDebouncedValue(value, 1000);

  React.useEffect(() => {
    onSetDay(debounced);
  }, [debounced]);

  return (
    <div className="col-span-2">
      <div className="flex gap-4 justify-end items-center">
        <Label>Enter day for check</Label>
        <Input
          type="number"
          placeholder="enter days for check"
          className="w-fit"
          value={value}
          onChange={(e) => setValue(Number(e.target.value))}
        />
      </div>
      <ChartUser userCount={userCount} />
    </div>
  );
};

export default ChartNewUsersPerDay;
