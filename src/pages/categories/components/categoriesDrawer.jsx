import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { selectwidgets } from "../../../features/widgets/selector";

import TEXT from "../../../config/text";
import REQUESTS from "../../../api/requests";
import classes from "../style/categoriesDrawer.module.scss";
import ErrorMessage from "../../../components/ErrorMessage";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, Drawer, Select, Upload, Image } from "antd";
const { Option } = Select;
const { TextArea } = Input;

const colorMap = {};

const UserPackageListDrawer = ({
    onClose,
    visible,
    current,
    getData,
    translation,
    followAddElement,
}) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [categoryImg, setCategoryImg] = useState([]);
    const [categoryImgPath, setCategoryImgPath] = useState("");

    const useScrollRef = useRef();
    const useParentRef = useRef();
    const [message, setMessage] = useState({
        type: false,
        text: "",
    });

    const onValuesChange = () => {
        setMessage({
            type: false,
            text: "",
        });
    };

    const propsCategoryImg = {
        onRemove: (file) => {
            const index = categoryImg.indexOf(file);
            const newFileList = categoryImg.slice();
            newFileList.splice(index, 1);
            setCategoryImg(newFileList);
        },
        beforeUpload: (file) => {
            setCategoryImg([file]);
            const myurl = window.URL
                ? window.URL.createObjectURL(file)
                : window.webkitURL.createObjectURL(file);
            setCategoryImgPath(myurl);

            return false;
        },
        categoryImg,
    };

    function scrollIntoView() {
        setTimeout(() => {
            useScrollRef.current.scrollIntoView({
                block: "end",
                behavior: "smooth",
            });
        }, 200);
    }

    const onFinish = (values) => {
        setLoading(true);

        const { name, surname, education, experience, trainings, position } = values;

        const formData = new FormData();
        formData.append("name", name);
        formData.append("surname", surname);
        formData.append("education", education);
        formData.append("experience", experience);
        formData.append("trainings", trainings);
        formData.append("position", position);
        if (categoryImg.length > 0) {
            for (let i = 0; i < categoryImg.length; i++) {
                formData.append("image", categoryImg[i]);
            }
        }

        // formData.append("images", SandalsImg);

        function callback() {
            setLoading(false);
            onClose();
            getData();
        }

        function errorCallback(err) {
            setLoading(false);
            setMessage({ type: false, text: err?.response?.data?.message });
        }
        console.log(current);

        if (current) {
            // body.id = current.id;
            REQUESTS.CATEGORIES.EDIT(current.id, formData, callback, errorCallback);
        } else {
            REQUESTS.CATEGORIES.ADD(formData, callback, errorCallback);
        }
    };

    const uploadButton = (
        <div>
            <PlusOutlined />
            <div
                style={{
                    marginTop: 8,
                }}
            >
                Upload
            </div>
        </div>
    );

    useEffect(() => {
        if (visible) {
            scrollIntoView();
        } else {
            setLoading(false);

            onValuesChange();
        }
    }, [visible]);
    // , , , ,
    useEffect(() => {
        if (current) {
            form.setFields([
                {
                    name: "name",
                    value: current?.name,
                },
                {
                    name: "surname",
                    value: current?.surname,
                },
                {
                    name: "education",
                    value: current?.education,
                },
                {
                    name: "experience",
                    value: current?.experience,
                },
                {
                    name: "trainings",
                    value: current?.trainings,
                },
                {
                    name: "position",
                    value: current?.position,
                },
            ]);
            setCategoryImgPath(`http://localhost:3005${current?.image}`);
        } else {
            form.resetFields();
        }
    }, [current, visible]);

    return (
        <div ref={useParentRef}>
            <Drawer
                title={
                    current
                        ? `${translation["Edit"] || TEXT["Edit"]} ${
                              translation["Category"] || TEXT["Category"]
                          }`
                        : `${translation["Add"] || TEXT["Add"]} ${
                              translation["Category"] || TEXT["Category"]
                          }`
                }
                placement="right"
                onClose={onClose}
                open={visible}
            >
                <div ref={useScrollRef}></div>
                <Form
                    form={form}
                    name="profile"
                    layout="vertical"
                    onFinish={onFinish}
                    onValuesChange={onValuesChange}
                >
                    <Form.Item
                        label={"name"}
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: "Please input name",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label={"surname"}
                        name="surname"
                        rules={[
                            {
                                required: true,
                                message: "Please input surname",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label={"education"}
                        name="education"
                        rules={[
                            {
                                required: true,
                                message: "Please input education",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label={"experience"}
                        name="experience"
                        rules={[
                            {
                                required: true,
                                message: "Please input experience",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label={"trainings"}
                        name="trainings"
                        rules={[
                            {
                                required: true,
                                message: "Please input trainings",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label={"position"}
                        name="position"
                        rules={[
                            {
                                required: true,
                                message: "Please input position",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    {categoryImgPath.length > 0 && (
                        <Image width={320} src={categoryImgPath} alt="img" />
                    )}
                    <Upload
                        // onChange={({ file }) => {
                        //     createFileList(file);
                        // }}
                        {...propsCategoryImg}
                        fileList={[]}
                        listType="picture-card"
                    >
                        {uploadButton}
                    </Upload>
                    <ErrorMessage message={message} />
                    <div className={classes["save_button_div"]}>
                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                className={classes["save_button"]}
                                loading={loading}
                            >
                                {translation["Save"] || TEXT["Save"]}
                            </Button>
                        </Form.Item>
                    </div>
                </Form>
            </Drawer>
        </div>
    );
};

export default UserPackageListDrawer;
