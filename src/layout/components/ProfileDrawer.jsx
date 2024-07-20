import { useState } from "react";

import { useSelector } from "react-redux";

import { Drawer, Menu } from "antd";
import { UserOutlined } from "@ant-design/icons";

import TEXT from "../../config/text";

import Profile from "./Profile";

import { selectTranslation } from "../../features/Translation/TranslationSlice";

import classes from "../style/profileDropdown.module.scss";

const ProfileDrawer = () => {
  const [visible, setVisible] = useState(false);
  const translation = useSelector(selectTranslation);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <>
      <Menu.Item
        className={classes["profile_text"]}
        style={{
          height: "30px",
          margin: "10px 0px",
          padding: 0,
          paddingLeft: "10px",
        }}
        onClick={showDrawer}
        icon={<UserOutlined />}
      >
        {translation["Profile"] || TEXT["Profile"]}
      </Menu.Item>

      <Drawer
        title={translation["Profile"] || TEXT["Profile"]}
        placement="right"
        onClose={onClose}
        open={visible}
      >
        <Profile setVisible={setVisible} translation={translation} />
      </Drawer>
    </>
  );
};

export default ProfileDrawer;
