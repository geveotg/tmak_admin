import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { Menu } from "antd";
import {
    DashboardOutlined,
    DesktopOutlined,
    HistoryOutlined,
    MessageOutlined,
} from "@ant-design/icons";

import CONSTANTS from "../../config";
import TEXT from "../../config/text";

import { selectTranslation } from "../../features/Translation/TranslationSlice";

import classes from "../style/sidbar.module.scss";
import "../../index.scss";
import REQUESTS from "../../api/requests";

function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}

function Sidbar({ collapsed, setOpen }) {
    const translation = useSelector(selectTranslation);

    const [apiVersion, setApiVersion] = useState("");

    const location = useLocation();
    const [current, setCurrent] = useState(location.pathname);

    const items = [
        // getItem(
        //     <Link className={classes["menu_item_link"]} to={"./"}>
        //         {translation["Dashboard"] || TEXT["Dashboard"]}
        //     </Link>,
        //     "/DashboardPage",
        //     <DashboardOutlined />
        // ),

        getItem(
            <Link className={classes["menu_item_link"]} to={"./"}>
                Staff
            </Link>,
            "/DashboardPage/Categories",
            <DesktopOutlined />
        ),
        getItem(
            <Link className={classes["menu_item_link"]} to={"./news"}>
                News
            </Link>,
            "/DashboardPage/news",
            <MessageOutlined />
        ),

        getItem(
            <Link className={classes["menu_item_link"]} to={"./publications"}>
                Publications
            </Link>,
            "/DashboardPage/publications",
            <HistoryOutlined />
        ),
    ];

    const getApiVersion = () => {
        REQUESTS.GET_API_VERSION((data) => {
            setApiVersion(data);
        });
    };

    useEffect(() => {
        getApiVersion();
    }, []);
    return (
        <div className={classes["sidebar"]}>
            <Menu
                selectedKeys={[current]}
                mode="inline"
                inlineCollapsed={collapsed}
                items={items}
                style={{
                    paddingTop: 0,
                    fontSize: 15,
                    minHeight: "78vh",
                    backgroundColor: "transparent",
                }}
                onClick={(e) => {
                    setCurrent(e.key);
                    if (setOpen) {
                        setOpen(false);
                    }
                }}
            />
            <div
                className={classes["sidebar-footer-section"]}
                style={{
                    fontSize: 10,
                    marginLeft: 10,
                }}
            >
                <span>API {apiVersion}</span>
                <p>Admin {CONSTANTS.UPDATED_VERSION}</p>
            </div>
        </div>
    );
}

export default Sidbar;
