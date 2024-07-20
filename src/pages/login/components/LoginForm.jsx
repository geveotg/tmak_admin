import { useEffect, useState } from "react";

import { useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";

import { Button, Form, Input } from "antd";

import { LockOutlined, UserOutlined, LoginOutlined } from "@ant-design/icons";

import REQUESTS from "../../../api/requests";
import TEXT from "../../../config/text";

import { selectTranslation } from "../../../features/Translation/TranslationSlice";

import ErrorMessage from "../../../components/ErrorMessage";

import "antd/dist/antd.css";
import classes from "../index.module.scss";

const LoginForm = ({ onClickForgotPassword }) => {
    const navigate = useNavigate();

    const translation = useSelector(selectTranslation);

    const [loading, setLoading] = useState(false);

    const [message, setMessage] = useState({
        text: "",
        type: [true, false],
    });

    const [form] = Form.useForm();

    const onFinish = (values) => {
        setLoading(true);

        removeErrorMessege();

        const body = {
            email: values.username,
            password: values.password,
        };

        function callback(data) {
            setLoading(false);
            localStorage.setItem("TOKEN", data?.access_token);

            navigate("/DashboardPage");
            document.body.scrollIntoView(true);
        }

        function errorCallback(err) {
            setLoading(false);
            setMessage({
                text: err?.message,
                type: false,
            });
        }

        REQUESTS.LOGIN(body, callback, errorCallback);
    };

    const removeErrorMessege = () => {
        setMessage((prev) => {
            return {
                ...prev,
                text: null,
            };
        });
    };

    const onValuesChange = (e) => {
        removeErrorMessege();
    };

    return (
        <Form
            form={form}
            size={"large"}
            name="login"
            className={classes["login-form"]}
            onValuesChange={onValuesChange}
            onFinish={onFinish}
        >
            <Form.Item
                name="username"
                rules={[
                    {
                        required: true,
                        message:
                            translation["Please input your username"] ||
                            TEXT["Please input your username"],
                    },
                ]}
            >
                <Input
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    placeholder={translation["Username"] || TEXT["Username"]}
                />
            </Form.Item>

            <Form.Item
                name="password"
                rules={[
                    {
                        required: true,
                        message:
                            translation["Please input your Password!"] ||
                            TEXT["Please input your Password!"],
                    },
                ]}
            >
                <Input.Password
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder={translation["Password"] || TEXT["Password"]}
                />
            </Form.Item>

            <ErrorMessage message={message} />

            <Form.Item>
                <Button
                    type="primary"
                    className={classes["login-form-button"]}
                    loading={loading}
                    icon={<LoginOutlined />}
                    onClick={() => {
                        form.submit();
                    }}
                >
                    {translation["Login"] || TEXT["Login"]}
                </Button>
            </Form.Item>
        </Form>
    );
};

export default LoginForm;
