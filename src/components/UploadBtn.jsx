import * as React from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useState } from "react";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export default function InputFileUpload() {
  const [selectedImages, setSelectedImage] = useState([]);
  const handleChangeImage = (e) => {
    const files = Array.from(e.target.files);
    console.log(e.target.files);
    console.log(files);
    setSelectedImage((prevImages) => [...prevImages, ...files]);
    // if (files.length == 1) {
    //   setSelectedImage([files[0]]);
    //   console.log(selectedImages, "sss");
    // } else {
    //   setSelectedImage(files);
    //   console.log(selectedImages, "aaa");
    // }
  };
  return (
    <>
      <Button
        component="label"
        role={undefined}
        variant="contained"
        tabIndex={-1}
        style={{ height: "100%", width: "15%" }}
        startIcon={<CloudUploadIcon />}
        //   onClick={handleUploadImage}
        onChange={handleChangeImage}
      >
        Upload file
        <VisuallyHiddenInput type="file" accept="image/*" multiple />
      </Button>
      {/* <div className="container">selectedImage: {selectedImage}</div> */}
      <div className="container grid grid-cols-3">
        {selectedImages.map((img, index) => (
          <img
            className="container"
            key={index}
            src={URL.createObjectURL(img)}
            alt={`Preview ${index + 1}`}
            style={{
              maxWidth: "300px",
              maxHeight: "300px",
              margin: "5px",
            }}
          />
        ))}
      </div>
    </>
  );
}
