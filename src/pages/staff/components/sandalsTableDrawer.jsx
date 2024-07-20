import { useState, useEffect, useRef } from "react";
import TEXT from "../../../config/text";
import REQUESTS from "../../../api/requests";
import classes from "../style/sandalsTableDrawer.module.scss";
import ErrorMessage from "../../../components/ErrorMessage";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, Drawer, Upload, Image } from "antd";
import DeletCurrentImg from "./deletCurrentImg";

const { TextArea } = Input;

const SandalsTableDrawer = ({
    onClose,
    visible,
    current,
    getData,
    translation,
    followAddElement,
    id,
    category_id,
}) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const useScrollRef = useRef();
    const useParentRef = useRef();
    const [message, setMessage] = useState({
        type: false,
        text: "",
    });
    const [SandalsImg, setNesImg] = useState([]);
    const [urlSandalsImg, setUrlNesImg] = useState([]);
    const [sizesArray, setSizesArray] = useState([]);

    function createFileList() {
        let list = [];

        for (let i = 0; i < SandalsImg.length; i++) {
            for (let j = 0; j < urlSandalsImg.length; j++) {
                if (SandalsImg[i]?.uid === urlSandalsImg[j].uid) {
                    list.push(urlSandalsImg[j]);
                }
            }
        }

        setUrlNesImg(list);
    }

    const deleteImage = (uid) => {
        let images = SandalsImg.filter((el) => el?.uid !== uid);
        setNesImg(images);
        createFileList();
    };

    useEffect(() => {
        createFileList();
    }, [SandalsImg]);

    const propsSandalsImg = {
        onRemove: (file) => {
            const index = SandalsImg.indexOf(file);
            const newFileList = SandalsImg.slice();
            newFileList.splice(index, 1);
            setNesImg(newFileList);
        },
        beforeUpload: (file) => {
            setNesImg([...SandalsImg, file]);
            const myurl = window.URL
                ? window.URL.createObjectURL(file)
                : window.webkitURL.createObjectURL(file);
            setUrlNesImg([...urlSandalsImg, { url: myurl, uid: file?.uid }]);

            return false;
        },
        SandalsImg,
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

        const formData = new FormData();

        formData.append("name", values.name);
        formData.append("weight", values.weight);
        formData.append("description", values.description);
        formData.append("size", values.size);
        formData.append("price", values.price);
        formData.append("categoryId", category_id);
        formData.append("subCategoryId", id);

        if (SandalsImg.length > 0) {
            for (let i = 0; i < SandalsImg.length; i++) {
                formData.append("images", SandalsImg[i]);
            }
            // formData.append("images", SandalsImg);
        }

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

        if (current && current.id) {
            formData.append("id", current.id);

            REQUESTS.NEWS.EDIT(formData, callback, errorCallback);
        } else {
            REQUESTS.NEWS.ADD(formData, callback, errorCallback);
        }
    };

    useEffect(() => {
        if (visible) {
            scrollIntoView();
            if (current?.sizes) {
                setSizesArray([...current.sizes]);
            }
        } else {
            setLoading(false);
            setNesImg([]);
            setUrlNesImg([]);
            setSizesArray([]);
        }
    }, [visible]);

    useEffect(() => {
        if (current) {
            form.setFields([
                {
                    name: "name",
                    value: current.name,
                },

                {
                    name: "description",
                    value: current.description,
                },

                {
                    name: "weight",
                    value: current.weight,
                },
                {
                    name: "size",
                    value: current.style,
                },

                {
                    name: "price",
                    value: current.price,
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
                        label={"Name"}
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: "Please input Name",
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
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label={"Size"}
                        name="size"
                        rules={[
                            {
                                required: true,
                                message: "Please input style",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label={"Weight"}
                        name="weight"
                        rules={[
                            {
                                required: true,
                                message: "Please input Weight",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label={"Price"}
                        name="price"
                        rules={[
                            {
                                required: true,
                                message: "Please input Price",
                            },
                        ]}
                    >
                        <Input type={"number"} />
                    </Form.Item>

                    {current && <DeletCurrentImg images={current?.images} />}
                    <div className={classes["images_list"]}>
                        {urlSandalsImg.map((el, i) => {
                            return (
                                <div className={classes["image_container"]}>
                                    <Image key={i} className={classes["upload_img"]} src={el.url} />
                                    <Button
                                        type="primary"
                                        className={classes["save_button"]}
                                        onClick={() => {
                                            deleteImage(el.uid);
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

export default SandalsTableDrawer;
