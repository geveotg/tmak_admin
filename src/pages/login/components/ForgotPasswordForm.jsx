import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Button, Form, Input } from "antd";
import { UserOutlined, LoginOutlined } from "@ant-design/icons";

import { selectTranslation } from "../../../features/Translation/TranslationSlice";

import REQUESTS from "../../../api/requests";

import TEXT from "../../../config/text";

import ErrorMessage from "../../../components/ErrorMessage";

import classes from "../style/forgotPasswordForm.module.scss";

const ForgotPasswordForm = ({ onClickForgotPassword }) => {
  const translation = useSelector(selectTranslation);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({
    text: "",
    type: true,
  });

  const [form] = Form.useForm();

  const onFinish = (values) => {
    setLoading(true);

    const body = {
      email: values.username,
    };

    function callback(data) {
      setLoading(false);

      setMessage({
        text: data,
        type: true,
      });
    }

    function errorCallback(error) {
      setLoading(false);
      setMessage({
        text: error,
        type: false,
      });
    }

    REQUESTS.FORGOT_PASSWORD(body, callback, errorCallback);
  };

  const onValueChange = () => {
    removeMessage();
  };

  const removeMessage = () => {
    setMessage((prev) => {
      return {
        ...prev,
        text: null,
      };
    });
  };

  const onSubmit = () => {
    removeMessage();
    form.submit();
  };

  return (
    <Form
      form={form}
      name="forgot-form"
      className={classes["login-form"]}
      onFinish={onFinish}
      onValuesChange={onValueChange}
    >
      <Form.Item
        name="username"
        rules={[
          {
            required: true,
            message:
              translation["Please input your username!"] ||
              TEXT["Please input your username!"],
          },
        ]}
      >
        <Input
          size="large"
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder={translation["Email"] || TEXT["Email"]}
        />
      </Form.Item>

      <Form.Item className={classes["form-items"]}>
        <a onClick={onClickForgotPassword} href="#" >
          {translation["Back to login"] || TEXT["Back to login"]}
        </a>
      </Form.Item>

      <ErrorMessage message={message} />

      <Form.Item className={classes["form-items"]}>
        <Button
          loading={loading}
          size={"large"}
          type="primary"
          className={classes["login-form-button"]}
          icon={<LoginOutlined />}
          onClick={onSubmit}
        >
          {translation["Send email"] || TEXT["Send email"]}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ForgotPasswordForm;
