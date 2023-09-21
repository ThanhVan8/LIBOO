import React from "react";
import { Radio } from "@material-tailwind/react";

const RadioButton = ({label, defaultChecked}) => {
  return (
    <Radio
      icon={<div className="w-2 h-2 rounded-full bg-red"></div>}
      name="type"
      label={label}
      className="w-4 h-4 checked:border-red"
      containerProps={{ className: "p-2" }}
      defaultChecked={defaultChecked ? true : false}
    />
  );
};

export default RadioButton;
