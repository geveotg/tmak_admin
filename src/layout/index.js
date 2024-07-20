import { useState, useRef, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Layout, Drawer } from "antd";
import Sidbar from "./components/Sidebar";
import HeaderComponent from "./components/Header";
import CONSTANTS from "../config";
import classes from "./index.module.scss";
import "../index.scss";

const { Header, Sider, Content } = Layout;

const DashboardPage = () => {
    const [windowSize, setWindowSize] = useState(window.innerWidth);

    const [collapsed, setCollapsed] = useState(false);
    const [open, setOpen] = useState(false);

    const showDrawer = () => {
        setOpen(true);
    };

    useEffect(() => {
        const handleWindowResize = () => {
            setWindowSize(window.innerWidth);
        };

        window.addEventListener("resize", handleWindowResize);

        return () => {
            window.removeEventListener("resize", handleWindowResize);
        };
    }, []);

    useEffect(() => {
        if (windowSize < 790) {
            setCollapsed(false);
        }
    }, [windowSize]);

    return (
        <Layout className="layout" style={{ minHeigh: "100vh" }}>
            {windowSize > 800 ? (
                <Sider
                    style={{
                        height: "100vh",
                        overflowY: "auto",
                        overflowX: "hidden",
                        backgroundColor: CONSTANTS.APP_COLOR || "#1a1a1a",
                    }}
                    className="sidebar"
                    trigger={null}
                    collapsible
                    collapsed={collapsed}
                    width={220}
                >
                    <div className={classes["logo-wrapper"]}>
                        <div className={classes["logo"]}>
                            <img
                                src={"assets/img/logo.jpg"}
                                style={{
                                    width: "80px",
                                }}
                                alt="logo"
                            />
                        </div>
                    </div>
                    <Sidbar style={{ height: "83vh" }} collapsed={collapsed} />
                </Sider>
            ) : (
                <Drawer
                    placement="left"
                    closable={false}
                    onClose={() => setOpen(false)}
                    open={open}
                    title={null}
                    bodyStyle={{ padding: 0 }}
                    width={290}
                >
                    <Sider
                        style={{
                            height: "100vh",
                            overflowY: "auto",
                            overflowX: "hidden",
                            backgroundColor: CONSTANTS.APP_COLOR || "#1a1a1a",
                        }}
                        className="sidebar"
                        trigger={null}
                        collapsible
                        width={220}
                    >
                        <div className={classes["logo-wrapper"]}>
                            <div className={classes["logo"]}>
                                <img
                                    src={"assets/img/sidbarlogo.png"}
                                    onError={(e) => {
                                        e.target.src =
                                            "assets/img/sidbarlogo.png";
                                    }}
                                    style={{
                                        width: CONSTANTS.LOGO_SIZE || "100px",
                                    }}
                                    alt="logo"
                                />
                            </div>
                        </div>
                        <Sidbar
                            style={{ height: "83vh" }}
                            collapsed={collapsed}
                            setOpen={setOpen}
                        />
                    </Sider>
                </Drawer>
            )}

            <Layout className={classes["site-layout"]}>
                <Header
                    className="site-layout-background"
                    style={{
                        padding: 0,
                        color: "black",
                        height: "63px",
                    }}
                >
                    <HeaderComponent
                        windowSize={windowSize}
                        collapsed={collapsed}
                        setCollapsed={setCollapsed}
                        showDrawer={showDrawer}
                    />
                </Header>
                <Content
                    className={classes["site-layout-background"]}
                    style={{
                        minHeight: 280,
                    }}
                >
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
};

export default DashboardPage;
