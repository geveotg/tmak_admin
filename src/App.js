import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { ConfigProvider } from "antd";

import REQUESTS from "./api/requests";

import DashboardPage from "./layout";

import Login from "./pages/login/index";

import Dashboard from "./pages/dashboard/index";

import Categories from "./pages/categories";

import PrivateRoute from "./pages/privateRoute/privateRoute";

import { selectappInfo } from "./features/appInfoSlice/AppInfoSlice";

import { emptyContext } from "./context_empty/context_empty";

import "./App.css";

import "antd/dist/antd.variable.min.css";

import CONSTANTS from "./config";
import News from "./pages/news/components";
import Publications from "./pages/publications/components";

const customizeRenderEmpty = () => <div style={{ textAlign: "center" }}></div>;

function App() {
    const appInfo = useSelector(selectappInfo);

    const [empty, setEmpty] = useState(true);

    useEffect(() => {
        // localStorage.clear();
        // localStorage.setItem("TOKEN", "cfgrbdhnf");
    }, []);

    ConfigProvider.config({
        theme: {
            primaryColor: "black",
        },
    });

    useEffect(() => {
        const root = document.documentElement;

        root.style.setProperty("--app-color", "black");
        root.style.setProperty("--active-color", "#4cf661");
        root.style.setProperty("--link-color", "white");
        root.style.setProperty("--active-background", "balck");
        root.style.setProperty("--logo-size", CONSTANTS.LOGO_SIZE);
    }, []);

    return (
        <div className="app">
            <ConfigProvider renderEmpty={empty ? customizeRenderEmpty : undefined}>
                <emptyContext.Provider value={[empty, setEmpty]}>
                    <Helmet>
                        <title>{process.env.REACT_APP_APPLICATION_NAME || "Tmak"}</title>
                        <link
                            rel="icon"
                            href={appInfo?.favicon || "/assets/images/icons/favicon-32x32.png"}
                            type="image/x-icon"
                        />
                    </Helmet>

                    {/* {loading && <div className="full-screen-loading"></div>} */}

                    <Routes>
                        <Route path="/" element={<Navigate replace to="login" />} />
                        {/* <Route path="/" element={<Login />} /> */}
                        <Route path="/login" element={<Login />} />

                        <Route
                            path="/"
                            element={
                                <PrivateRoute>
                                    <DashboardPage />
                                </PrivateRoute>
                            }
                        >
                            {/* <Route index element={<Dashboard />} /> */}
                            <Route index element={<Categories />} />
                            <Route path="news" element={<News />} />
                            <Route path="publications" element={<Publications />} />
                            {/* <Route path="paymentHistory" element={<PaymentHistory />} /> */}
                        </Route>
                        <Route path="*" element={<Navigate replace to="/DashboardPage" />} />
                    </Routes>
                </emptyContext.Provider>
            </ConfigProvider>
        </div>
    );
}

export default App;
