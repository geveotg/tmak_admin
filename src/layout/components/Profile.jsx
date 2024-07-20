import { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";

import { Button, Form, Input } from "antd";

import TEXT from "../../config/text";

import REQUESTS from "../../api/requests";

import {
  selectUser,
  editUser,
} from "../../features/DataUserProfile/DataUserProfileSlise";

import classes from "../style/profile.module.scss";

const Profile = ({ setVisible, translation }) => {
  const dispatch = useDispatch();

  const profile = useSelector(selectUser);

  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  const [form] = Form.useForm();

  const renoveMessage = () => {
    setShowMessage(false);
  };

  const getProfile = () => {
    function collback(data) {
      dispatch(editUser(data));
    }

    function errorCollback(data) {
      dispatch(editUser(data));
    }

    REQUESTS.PROFILE.GET(collback, errorCollback);
  };

  const onFinish = (values) => {
    setLoading(true);
    renoveMessage();

    const body = {
      name: values.name,
      surname: values.surname,
      email: values.email,
    };

    if (values.password.length) {
      body.password = values.password;
    }

    function callback() {
      getProfile();
      setLoading(false);
      setVisible(false);
    }

    function errorCallback(err) {
      setShowMessage(true);
      setLoading(false);
      if (typeof err === "string") {
        setMessage(err);
      }
    }

    REQUESTS.PROFILE.EDIT(body, callback, errorCallback);
  };

  const onValuesChange = (e) => {
    renoveMessage();
  };

  useEffect(() => {
    if (profile) {
      form.setFields([
        { name: "name", value: profile.name },
        { name: "surname", value: profile.surname },
        { name: "email", value: profile.email },
        { name: "password", value: "" },
      ]);
    }
  }, [profile]);

  return (
    <Form
      form={form}
      name="profile"
      layout="vertical"
      onFinish={onFinish}
      onValuesChange={onValuesChange}
      initialValues={{
        password: "",
      }}
    >
      <Form.Item
        label={translation["Name"] || TEXT["Name"]}
        name="name"
        rules={[
          {
            required: true,
            message: `${
              translation["Please input name"] || TEXT["Please input name"]
            }`,
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="surname"
        label={translation["Surname"] || TEXT["Surname"]}
        rules={[
          {
            required: true,
            message: `${
              translation["Please input  surname"] ||
              TEXT["Please input  surname"]
            }`,
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="email"
        label={translation["Email"] || TEXT["Email"]}
        rules={[
          {
            required: true,
            message: `${
              translation["Please input email"] || TEXT["Please input email"]
            }`,
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="password"
        label={translation["Password"] || TEXT["Password"]}
      >
        <Input.Password />
      </Form.Item>
      <div
        className={showMessage ? classes["open_error"] : classes["close_error"]}
      >
        <span className={classes["error_message"]}>{message}</span>
      </div>
      <Form.Item>
        <Button
          type="primary"
          loading={loading}
          className={classes["profile-form-button"]}
          onClick={() => form.submit()}
        >
          {translation["Save"] || TEXT["Save"]}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Profile;
