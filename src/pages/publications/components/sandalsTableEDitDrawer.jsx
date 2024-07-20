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
        REQUESTS.PUBLICATIONS.GETPRODUCT(id, (data) => {
            setCurrent(data?.message);

            setUrlNesImg(data?.message?.publication_images);
        });
    };

    const addImage = () => {
        const formData = new FormData();

        if (SandalsImg.length > 0) {
            for (let i = 0; i < SandalsImg.length; i++) {
                formData.append("images", SandalsImg[i]);
            }
        }

        REQUESTS.PUBLICATIONS.ADDIMG(
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

        let body = values;

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

        REQUESTS.PUBLICATIONS.EDIT(id, body, callback, errorCallback);
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
                    value: current.title,
                },

                {
                    name: "description",
                    value: current.description,
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
                                        src={`http://localhost:3005${el.path}`}
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

/////////////////////////////
// version: "3.9"

// services:
//     app:
//         build: .
//         ports:
//             - "3005:3005"
//         environment:
//             PORT: 3005
//             DB_DIALECT: mysql
//             DB_HOST: 172.18.0.2
//             DB_PORT: 3306
//             DB_NAME: tmak
//             DB_USER: root
//             DB_PASSWORD: root
//             JWT_ACCESS_KEY: AAAAB3NzaC1yc2EAAAADAQABAAABAQCUSW1TF32ycC7xDdjmhQoOkuGoDouJZwJFPZ++bpbrNgFe6n9xQFHjsf+uFSIiPErD2B36zCBlYOg85Y6iQePgijPuYCvNIltlNCP+Ao5H4n+/Y7Rd/DmwFpRV+PordtwsUjzwEf7CDAPTcgAzMzxJeO8sbBY9MImiVd+Q6pENCSiJFP5XrBYaEI5pejDmrOmqx1tvm5+JvyrbfCEwV0hOLUFhk75CHnw4P1IDDKXe0LfYoxuT/Gadao5t3/hcCfhmvx2Byv1Dq6/oM+JwKsHtYL6mBmsbmXJpX15g7fcBBIuO0CbUuV7Lqe1yQ7a+JbfDew+3dy6Ryg6p3rArU+qR
//             JWT_REFRESH_KEY: vfgbdgfNzaC1yc2EAAAADAQABAAABAQCUSW1TF32ycC7xDdjmhQoOkuGoDouJZwJFPZ++bpbrNgFe6n9xQFHjsf+uFSIiPErD2B36zCBlYOg85Y6iQePgijPuYCvNIltlNCP+Ao5H4n+/Y7Rd/DmwFpRV+PordtwsUjzwEf7CDAPTcgAzMzxJeO8sbBY9MImiVd+Q6pENCSiJFP5XrBYaEI5pejDmrOmqx1tvm5+JvyrbfCEwV0hOLUFhk75CHnw4P1IDDKXe0LfYoxuT/Gadao5t3/hcCfhmvx2Byv1Dq6/oM+JwKsHtYL6mBmsbmXJpX15g7fcBBIuO0CbUuV7Lqe1vbgfbnhmhjkyg6p3rArU+qR
//             SMTP_HOST: smtp.gmail.com
//             SMTP_PORT: 587
//             SMTP_USER: "gevorgyenokyan02@gmail.com"
//             SMTP_PASSWORD: fkty ubgw acgc eaml
//             API_URL: http://localhost:3005/admin/verify
//             NODE_ENV: development
//         depends_on:
//             - mysql
//         volumes:
//             - .:/usr/src/app
//             - /usr/src/app/node_modules

//     mysql:
//         image: mysql:8.0
//         ports:
//             - "3307:3306"
//         environment:
//             MYSQL_ROOT_PASSWORD: root
//             MYSQL_DATABASE: tmak
//             # MYSQL_USER: root
//             MYSQL_PASSWORD: root
//         volumes:
//             - mysql-data:/var/lib/mysql

// volumes:
//     mysql-data:
