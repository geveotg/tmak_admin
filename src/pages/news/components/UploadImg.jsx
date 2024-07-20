import { useState, useEffect, useRef } from "react";

import TEXT from "../../../config/text";
import REQUESTS from "../../../api/requests";
import classes from "../style/newsTableDrawer.module.scss";
import ErrorMessage from "../../../components/ErrorMessage";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { Button, Form, Upload, Image, notification } from "antd";

const UploadImg = ({ current, translation, setImagesId, imagesId, visible }) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const [message, setMessage] = useState({
        type: false,
        text: "",
    });

    const [newsImg, setNesImg] = useState([]);
    const [urlNewsImg, setUrlNesImg] = useState([]);
    const [imgArr, setImgArr] = useState([]);

    const propsNewsImg = {
        onRemove: (file) => {
            const index = newsImg.indexOf(file);
            const newFileList = newsImg.slice();
            newFileList.splice(index, 1);
            setNesImg(newFileList);
        },
        beforeUpload: (file) => {
            setNesImg([...newsImg, file]);
            //   setNesImg([file]);
            const myurl = window.URL
                ? window.URL.createObjectURL(file)
                : window.webkitURL.createObjectURL(file);
            setUrlNesImg([...urlNewsImg, myurl]);
            setImgArr([
                ...imgArr,
                {
                    data: file,
                    url: myurl,
                    type: file.type.slice(0, 5),
                    file: true,
                },
            ]);

            return false;
        },
        newsImg,
    };

    useEffect(() => {
        if (visible === true && current) {
            makArr();
        } else if (visible === false) {
            setImgArr([]);
        }
    }, [visible]);

    function makArr() {
        let arr = [];
        for (let i = 0; i < current.galeries.length; i++) {
            arr[i] = {
                data: "",
                url: current.galeries[i].url,
                type: current.galeries[i].type,
                file: true,
            };
        }

        setImgArr(arr);
    }

    const openNotification = (message) => {
        const args = {
            message: "News",
            description: message,
            duration: 5,
        };
        notification.open(args);
    };

    function delete_img() {}

    useEffect(() => {
        delete_img();
    }, [newsImg]);

    const onValuesChange = (e) => {
        setMessage({
            type: false,
            text: "",
        });
    };

    const onFinish = (values) => {
        setLoading(true);
        let arr = [];

        for (let i = 0; i < newsImg.length; i++) {
            const formData = new FormData();

            if (newsImg) {
                formData.append("type", newsImg[i].type.slice(0, 5));
                formData.append("url", newsImg[i]);
            }

            function callback(data) {
                setLoading(false);
                setNesImg([]);
                arr[i] = data;
            }

            function errorCallback(err) {
                setLoading(false);
                setMessage({ type: false, text: err });
                setNesImg([]);
            }

            if (current) {
                formData.append("id", current.id);
                REQUESTS.NEWS.ADD_GALERIES(formData, callback, errorCallback);
            } else {
                REQUESTS.NEWS.ADD_GALERIES(formData, callback, errorCallback);
            }
        }

        setImagesId(arr);
    };

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
            <Form.Item label={translation["News images"] || TEXT["News images"]}>
                <div className={classes["app_uload_form"]}>
                    <DndProvider backend={HTML5Backend}>
                        {!imgArr ? (
                            <Image className={classes["uload_img"]} src={current?.img} />
                        ) : (
                            imgArr?.map((el, i) => {
                                return el.type === "image" ? (
                                    <Image className={classes["uload_img"]} src={el.url} />
                                ) : (
                                    <video className={classes["uload_img"]} src={el.url} />
                                );
                            })
                        )}
                    </DndProvider>
                    <Upload {...propsNewsImg} fileList={newsImg}>
                        <Button className={classes["uload_button"]} type="primary">
                            Upload
                        </Button>
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
                        onClick={onFinish}
                    >
                        {translation["Save  Uploads"] || TEXT["Save Uploads"]}
                    </Button>
                </Form.Item>
            </div>
        </Form>
    );
};

export default UploadImg;
