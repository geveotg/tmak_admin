import React from "react";
import { DeleteOutlined } from "@ant-design/icons";
import { Menu, Button } from "antd";
import classes from "./style/deleteButton.module.scss";

export default function ActionButton({
  handleMenuClick,
  text,
  index,
  icon,
  disabled = false,
}) {
  return (
    <div className={classes["deleteButton_div"]}>
      <Button
        key={index}
        onClick={handleMenuClick}
        icon={icon}
        disabled={disabled}
      >
        {text}
      </Button>
    </div>
  );
}
