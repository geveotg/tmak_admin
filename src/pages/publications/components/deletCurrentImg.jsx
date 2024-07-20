import { useState } from "react";
import classes from "../style/sandalsTableDrawer.module.scss";
import { Image, Button } from "antd";

function DeletCurrentImg({ images }) {
    const [imagesArray, setImagesArray] = useState(images);

    const deleteImage = (id) => {
        let images = imagesArray?.filter((el) => el?.id !== id);
        setImagesArray(images);
    };

    const imagesList = imagesArray.map((el) => {
        return (
            <div className={classes["image_container"]}>
                <Image key={el?.id} className={classes["upload_img"]} src={el.url} />
                <Button
                    type="primary"
                    className={classes["save_button"]}
                    onClick={() => {
                        deleteImage(el?.id);
                    }}
                >
                    Delete
                </Button>
            </div>
        );
    });

    return <div className={classes["images_list"]}>{imagesList}</div>;
}

export default DeletCurrentImg;
