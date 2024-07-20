import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import LoginForm from "./components/LoginForm";

import classes from "./index.module.scss";

function Login() {
    const [active, setActive] = useState(true);

    const navigate = useNavigate();

    const onClickForgotPassword = (event) => {
        event.preventDefault();
        setActive(!active);
    };

    useEffect(() => {
        if (localStorage.getItem("TOKEN")) {
            navigate("/DashboardPage/");
        }
    }, []);

    return (
        <div className={classes["logoin_block"]}>
            <div className={classes["logoin_container"]}>
                <div className={classes["admin_welcome_div"]}></div>
                <div className={classes["login_div_container"]}>
                    <div className={classes["login_div"]}>
                        <img
                            loading="lazy"
                            className={classes["login_img"]}
                            src="assets/img/logo.jpg"
                            alt=""
                        />

                        <LoginForm
                            onClickForgotPassword={onClickForgotPassword}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
