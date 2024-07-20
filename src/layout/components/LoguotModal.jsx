import { useSelector } from "react-redux";

import { Modal, Menu } from "antd";
import { LoginOutlined } from "@ant-design/icons";

import TEXT from "../../config/text";

import { selectTranslation } from "../../features/Translation/TranslationSlice";

const LoguotModal = () => {
    const translation = useSelector(selectTranslation);

    return (
        <Menu.Item
            icon={<LoginOutlined />}
            style={{
                height: "30px",
                margin: "3px 0px 0px 0px",
                paddingLeft: "10px",
                color: "#fff",
                backgroundColor: "#bf4342",
            }}
            onClick={() => {
                Modal.confirm({
                    content: `${
                        translation["Do you want to logout ?"] || TEXT["Do you want to logout ?"]
                    }`,
                    okText: `${translation["LOGOUT"] || TEXT["LOGOUT"]}`,

                    okButtonProps: {
                        style: {
                            backgroundColor: "#bf4342",
                            color: "#fff",
                        },
                    },
                    cancelText: `${translation["CANCEL"] || TEXT["CANCEL"]}`,
                    onOk() {
                        window.location.reload();
                        localStorage.clear();

                        setTimeout(() => {
                            window.location.href = "/#/login";
                        }, 500);
                    },
                });
            }}
        >
            <span>{translation["Logout"] || TEXT["Logout"]}</span>
        </Menu.Item>
    );
};

export default LoguotModal;
