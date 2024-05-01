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

export default function InputFileUpload({
  handleDragStart,
  handleUploadImages,
}) {
  const [selectedImages, setSelectedImage] = useState([]);
  const handleChangeImage = (e) => {
    const files = Array.from(e.target.files);
    console.log(files);
    setSelectedImage((prevImages) => [...prevImages, ...files]);
    handleUploadImages((prevImages) => [...prevImages, ...files]);
  };

  return (
    <>
      <div
        className="upload mb-5 mt-8 p-4 flex"
        style={{ height: "100%", width: "15%" }}
      >
        <Button
          component="label"
          role={undefined}
          variant="contained"
          tabIndex={-1}
          startIcon={<CloudUploadIcon />}
          //   onClick={handleUploadImage}
          onChange={handleChangeImage}
        >
          Upload file
          <VisuallyHiddenInput type="file" accept="image/*" multiple />
        </Button>
      </div>
      <div className="container grid grid-cols-3 gap-4 mb-10">
        {selectedImages.map((img, index) => (
          <img
            className="container draggable"
            key={index}
            src={URL.createObjectURL(img)}
            alt={`Preview ${index + 1}`}
            id={`${index}`}
            style={{
              maxWidth: "300px",
              maxHeight: "300px",
              margin: "5px",
              cursor: "pointer",
            }}
            draggable="true"
            loading="lazy"
            onDragStart={(event) => handleDragStart(event, `${index}`)}
          />
        ))}
      </div>
    </>
  );
}
