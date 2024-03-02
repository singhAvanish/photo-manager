import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { database } from "../context/Context";
import { ref, get } from "firebase/database";

const ImageView = () => {
  const { imageId } = useParams();
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    const imageRef = ref(database, `images/${imageId}`);
    get(imageRef).then((snapshot) => {
      const imageData = snapshot.val();
      if (imageData) {
        setImageUrl(imageData.url);
      }
    });
  }, [imageId]);

  return (
    <div>
      <h2>Image Viewer</h2>
      {imageUrl && <img src={imageUrl} alt="Uploaded" />}
    </div>
  );
};

export default ImageView;
