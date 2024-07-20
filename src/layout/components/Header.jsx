import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { Menu, Button } from "antd";
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    MenuOutlined,
} from "@ant-design/icons";

import classes from "../style/header.module.scss";

function HeaderComponent({ setCollapsed, collapsed, windowSize, showDrawer }) {
    return (
        <Menu mode="horizontal" style={{ paddingRight: "50px" }}>
            <div className={classes["header"]}>
                {windowSize > 800 ? (
                    <Button
                        type="text"
                        onClick={() => setCollapsed(!collapsed)}
                        className="header-tigger-btn"
                    >
                        {React.createElement(
                            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                            {
                                className: "trigger",
                            }
                        )}
                    </Button>
                ) : (
                    <MenuOutlined
                        onClick={showDrawer}
                        style={{ margin: "0 10px" }}
                    />
                )}
            </div>
        </Menu>
    );
}

export default HeaderComponent;
