import { useState, useEffect, useRef } from "react";
import TEXT from "../../../config/text";
import REQUESTS from "../../../api/requests";
import classes from "../style/sandalsTableDrawer.module.scss";
import ErrorMessage from "../../../components/ErrorMessage";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, Drawer, Upload, Image } from "antd";
import DeletCurrentImg from "./deletCurrentImg";

const { TextArea } = Input;

const SandalsTableEditDrawer = ({ onClose, visible, translation, followAddElement, id }) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const useScrollRef = useRef();
    const useParentRef = useRef();
    const [message, setMessage] = useState({
        type: false,
        text: "",
    });
    const [current, setCurrent] = useState();
    const [SandalsImg, setNesImg] = useState([]);
    const [urlSandalsImg, setUrlNesImg] = useState([]);

    const getData = () => {
        REQUESTS.NEWS.GETPRODUCT(id, (data) => {
            setCurrent(data?.message);
            if (data?.message?.news_images) {
                setUrlNesImg(data?.message?.news_images);
            }
        });
    };

    const addImage = () => {
        const formData = new FormData();

        if (SandalsImg.length > 0) {
            for (let i = 0; i < SandalsImg.length; i++) {
                formData.append("images", SandalsImg[i]);
            }
        }

        REQUESTS.NEWS.ADDIMG(
            current?.id,
            formData,
            () => {
                getData();
            },
            (err) => {
                console.log(err);
            }
        );
    };

    const deleteImage = (uid) => {
        REQUESTS.NEWS.DELETE_IMG(uid, () => {
            getData();
        });
    };

    const propsSandalsImg = {
        onRemove: (file) => {
            const index = SandalsImg.indexOf(file);
            const newFileList = SandalsImg.slice();
            newFileList.splice(index, 1);
            setNesImg(newFileList);
        },
        beforeUpload: (file) => {
            setNesImg([file]);

            return false;
        },
        SandalsImg,
    };

    useEffect(
        () => {
            if (visible) {
                addImage();
            }
        },
        [SandalsImg],
        visible
    );

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

    const onValuesChange = (e) => {
        setMessage({
            type: false,
            text: "",
        });
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

        setMessage({
            type: false,
            text: "",
        });

        let body = {
            title: JSON.stringify({ arm: values.title, eng: values.title_eng }),
            description: JSON.stringify({ arm: values.description, eng: values.description_eng }),
        };

        function callback() {
            if (!current) {
                followAddElement.setCurrentPage(1);
                followAddElement.setSearch("");
                followAddElement.setSort(["id", "DESC"]);
                followAddElement.setCurrentPage(1);
                followAddElement.setLimit(10);
                followAddElement.setTotal();
                followAddElement.setDate("");
            }

            setLoading(false);
            onClose();
            getData();
        }

        function errorCallback(err) {
            setLoading(false);

            if (SandalsImg.length == 0) {
                setMessage({ type: false, text: "Please select image" });
                setLoading(false);
            } else {
                setMessage({ type: false, text: err?.response?.data?.message });
            }
        }

        REQUESTS.NEWS.EDIT(id, body, callback, errorCallback);
    };

    useEffect(() => {
        if (visible) {
            scrollIntoView();
        } else {
            setLoading(false);
            setNesImg([]);
            setUrlNesImg([]);
        }
    }, [visible]);

    useEffect(getData, [visible, id]);

    useEffect(() => {
        if (current) {
            form.setFields([
                {
                    name: "title",
                    value: JSON.parse(current.title)["arm"],
                },
                {
                    name: "title_eng",
                    value: JSON.parse(current.title)["eng"],
                },

                {
                    name: "description",
                    value: JSON.parse(current.description)["arm"],
                },
                {
                    name: "description_eng",
                    value: JSON.parse(current.description)["eng"],
                },
            ]);
        } else {
            form.resetFields();
        }
    }, [current, visible]);

    return (
        <div ref={useParentRef}>
            <Drawer
                title={
                    current
                        ? `${translation["Edit"] || TEXT["Edit"]} ${"Sandal"}`
                        : `${translation["Add"] || TEXT["Add"]} ${"Sandal"}`
                }
                placement="right"
                onClose={onClose}
                visible={visible}
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
                        label={"Tile"}
                        name="title"
                        rules={[
                            {
                                required: true,
                                message: "Please input title",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label={"Tile eng"}
                        name="title_eng"
                        rules={[
                            {
                                required: true,
                                message: "Please input title",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label={"Description"}
                        name="description"
                        rules={[
                            {
                                required: true,
                                message: "Please input description",
                            },
                        ]}
                    >
                        <TextArea />
                    </Form.Item>

                    <Form.Item
                        label={"Description eng"}
                        name="description_eng"
                        rules={[
                            {
                                required: true,
                                message: "Please input description",
                            },
                        ]}
                    >
                        <TextArea />
                    </Form.Item>
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
                    {/* {current && <DeletCurrentImg images={current?.images} />} */}
                    <div className={classes["images_list"]}>
                        {urlSandalsImg?.map((el, i) => {
                            return (
                                <div className={classes["image_container"]}>
                                    <Image
                                        key={i}
                                        className={classes["upload_img"]}
                                        src={`http://tmak.am${el.path}`}
                                    />
                                    <Button
                                        type="primary"
                                        className={classes["save_button"]}
                                        onClick={() => {
                                            deleteImage(el.id);
                                        }}
                                    >
                                        Delete
                                    </Button>
                                </div>
                            );
                        })}
                    </div>
                    <Form.Item>
                        <div className={classes["app_uload_form"]}>
                            <Upload
                                // onChange={({ file }) => {
                                //     createFileList(file);
                                // }}
                                {...propsSandalsImg}
                                fileList={[]}
                                listType="picture-card"
                            >
                                {uploadButton}
                            </Upload>
                        </div>
                    </Form.Item>

                    <ErrorMessage message={message} />
                </Form>
            </Drawer>
        </div>
    );
};

export default SandalsTableEditDrawer;
