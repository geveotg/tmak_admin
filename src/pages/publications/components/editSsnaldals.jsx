import { useState, useEffect, useRef } from "react";
import TEXT from "../../../config/text";
import REQUESTS from "../../../api/requests";
import classes from "../style/sandalsTableDrawer.module.scss";
import ErrorMessage from "../../../components/ErrorMessage";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, Drawer, Upload, Image } from "antd";
import DeletCurrentImg from "./deletCurrentImg";
import SizesList from "./sizes";

const { TextArea } = Input;

const EditSandal = ({ onClose, visible, current, getData, translation, followAddElement, id }) => {
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
    const [selectedColors, setSelectedColors] = useState([]);

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

        formData.append("category", id);
        formData.append("name", values.name);
        formData.append("brand", values.brand);
        formData.append("weather", values.weather);
        formData.append("material", values.material);
        formData.append("description", values.description);
        formData.append("style", values.style);
        formData.append("colors", JSON.stringify(selectedColors));
        formData.append("priceForSimplePurchase", Number(values.priceForSimplePurchase));
        formData.append("priceForWholesalePurchase", Number(values.priceForWholesalePurchase));
        formData.append("quantityResultsPurchases ", Number(values.priceForWholesalePurchase));
        formData.append("quantityResultsPurchases", Number(values.quantitYresultSpurchases));

        if (SandalsImg.length > 0) {
            for (let i = 0; i < SandalsImg.length; i++) {
                formData.append("images", SandalsImg[i]);
            }
            // formData.append("images", SandalsImg);
        }

        formData.append("sizes", JSON.stringify(sizesArray));

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
                setMessage({ type: false, text: err?.response?.data.message });
            }
        }

        if (current && current.id) {
            formData.append("id", current.id);

            REQUESTS.PUBLICATIONS.EDIT(formData, callback, errorCallback);
        } else {
            REQUESTS.PUBLICATIONS.ADD(formData, callback, errorCallback);
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
                    name: "brand",
                    value: current.brand,
                },

                {
                    name: "description",
                    value: current.description,
                },
                {
                    name: "weather",
                    value: current.weather,
                },
                {
                    name: "style",
                    value: current.style,
                },

                {
                    name: "material",
                    value: current.material,
                },

                {
                    name: "priceForSimplePurchase",
                    value: current.priceForSimplePurchase,
                },
                {
                    name: "priceForWholesalePurchase",
                    value: current.priceForWholesalePurchase,
                },
                {
                    name: "quantitYresultSpurchases",
                    value: current.quantitYresultSpurchases,
                },

                {
                    name: "weather",
                    value: current.weather,
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
                        label={"Brand"}
                        name="brand"
                        rules={[
                            {
                                required: true,
                                message: "Please input Brand",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label={"Weather"}
                        name="weather"
                        rules={[
                            {
                                required: true,
                                message: "Please input Weather",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label={"Color"}
                        name="color"
                        // rules={[
                        //     {
                        //         required: true,
                        //         message: "Please input color",
                        //     },
                        // ]}
                    >
                        {/* <Input /> */}
                    </Form.Item>
                    <Form.Item
                        label={"Style"}
                        name="style"
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
                        label={"Material"}
                        name="material"
                        rules={[
                            {
                                required: true,
                                message: "Please input material",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label={"PriceForSimplePurchase"}
                        name="priceForSimplePurchase"
                        rules={[
                            {
                                required: true,
                                message: "Please input PriceForSimplePurchase",
                            },
                        ]}
                    >
                        <Input type={"number"} />
                    </Form.Item>

                    <Form.Item
                        label={"PriceForWholesalePurchase"}
                        name="priceForWholesalePurchase"
                        rules={[
                            {
                                required: true,
                                message: "Please input PriceForWholesalePurchase",
                            },
                        ]}
                    >
                        <Input type={"number"} />
                    </Form.Item>

                    <Form.Item
                        label={"QuantitYresultSpurchases"}
                        name="quantitYresultSpurchases"
                        rules={[
                            {
                                required: true,
                                message: "Please input quantitYresultSpurchases",
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
                    <SizesList sizesArray={sizesArray} setSizesArray={setSizesArray} />
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

export default EditSandal;
