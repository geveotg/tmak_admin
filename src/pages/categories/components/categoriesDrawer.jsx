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

        const {
            name,
            name_eng,
            surname,
            surname_eng,
            education,
            education_eng,
            experience,
            experience_eng,
            trainings,
            trainings_eng,
            position,
            position_eng,
        } = values;

        const formData = new FormData();
        formData.append("name", JSON.stringify({ arm: name, eng: name_eng }));
        formData.append("surname", JSON.stringify({ arm: surname, eng: surname_eng }));
        formData.append("education", JSON.stringify({ arm: education, eng: education_eng }));
        formData.append("experience", JSON.stringify({ arm: experience, eng: experience_eng }));
        formData.append("trainings", JSON.stringify({ arm: trainings, eng: trainings_eng }));
        formData.append("position", JSON.stringify({ arm: position, eng: position_eng }));
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
                    value: JSON.parse(current?.name)["arm"],
                },

                {
                    name: "name_eng",
                    value: JSON.parse(current?.name)["eng"],
                },
                {
                    name: "surname",
                    value: JSON.parse(current?.surname)["arm"],
                },

                {
                    name: "surname_eng",
                    value: JSON.parse(current?.surname)["eng"],
                },
                {
                    name: "education",
                    value: JSON.parse(current?.education)["arm"],
                },

                {
                    name: "education_eng",
                    value: JSON.parse(current?.education)["arm"],
                },
                {
                    name: "experience",
                    value: JSON.parse(current?.experience)["arm"],
                },

                {
                    name: "experience_eng",
                    value: JSON.parse(current?.experience)["eng"],
                },
                {
                    name: "trainings",
                    value: JSON.parse(current?.trainings)["arm"],
                },
                {
                    name: "trainings_eng",
                    value: JSON.parse(current?.trainings)["eng"],
                },
                {
                    name: "position",
                    value: JSON.parse(current?.position)["arm"],
                },
                {
                    name: "position_eng",
                    value: JSON.parse(current?.position)["eng"],
                },
            ]);
            setCategoryImgPath(`http://tmak.am${current?.image}`);
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
                        label={"name Eng"}
                        name="name_eng"
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
                        label={"surname eng"}
                        name="surname_eng"
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
                        label={"education eng"}
                        name="education_eng"
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
                        label={"experience eng"}
                        name="experience_eng"
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
                        label={"trainings eng"}
                        name="trainings_eng"
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

                    <Form.Item
                        label={"position eng"}
                        name="position_eng"
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
