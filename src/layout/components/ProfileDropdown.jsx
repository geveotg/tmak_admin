import { Dropdown, Menu, Space, Button } from "antd";

import LoguotModal from "./LoguotModal";
import ProfileDrawer from "./ProfileDrawer";

import classes from "../style/profileDropdown.module.scss";

const menu = (
    <Menu
        style={{ minWitdh: "150px" }}
        // className={classes["profile_dropdown"]}
        className="profile-dropdown-component"
        items={[
            {
                label: <ProfileDrawer />,
                key: "0",
            },
            {
                label: <LoguotModal />,
                key: "1",
            },
        ]}
    />
);

const ProfileDropdown = ({ userInfo }) => (
    <Space direction="vertical">
        <Space wrap>
            <Dropdown overlay={menu} placement="bottom" trigger={["click"]}>
                <Space>
                    <img
                        width={35}
                        alt="profile"
                        src="assets/img/user.png"
                        className={classes["profile_img"]}
                        onError={(e) => {
                            e.target.src = "assets/img/user.png";
                        }}
                    />
                    <div className={classes["profile_name"]}>
                        {userInfo && (
                            <>
                                <span>{userInfo.name}</span>
                                <span>{userInfo.surname}</span>
                            </>
                        )}
                    </div>
                </Space>
            </Dropdown>
        </Space>
    </Space>
);

export default ProfileDropdown;
