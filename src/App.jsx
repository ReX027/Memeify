import "./App.css";
import { useState } from "react";
import InputFileUpload from "./components/UploadBtn";
import { useEffect } from "react";

function App() {
  const [draggedOverZone, setDraggedOverZone] = useState(null);
  const [imagesInZones, setImagesInZones] = useState({});
  const [selectedImages, handleUploadImages] = useState([]);
  const [url, setURL] = useState(null);
  const handleDragStart = (event, id) => {
    event.dataTransfer.setData("text/plain", id);
    console.log(id, "line 13");
    const draggedImage = selectedImages.find((image) => image.key === id);
    console.log(draggedImage, "line 15");
    if (draggedImage) {
      setURL(URL.createObjectURL(draggedImage));
    }
  };

  const handleDragOver = (event, id) => {
    event.preventDefault();
    // console.log(id, "line 19");
    // console.log("in drag over line 18");
    setDraggedOverZone(id);
  };

  const handleDragLeave = () => {
    // console.log("in drag leave line 23");
    setDraggedOverZone(null);
  };

  const handleDrop = (event, zoneId) => {
    event.preventDefault();
    const draggedId = event.dataTransfer.getData("text/plain");
    console.log(`Image ${draggedId} dropped into ${zoneId}`);

    // Find the dropped image from selectedImages
    const droppedImage = selectedImages.find((image, key) => {
      // console.log(image, "line 40");
      // console.log(key, "line 41");
      // console.log(draggedId, "line 41");
      // console.log(key == draggedId);
      // console.log(image.key, "line 42");
      return key == draggedId;
    });
    // console.log(droppedImage, "dropped");
    // Update imagesInZones with the dropped image

    // Update selectedImages with the dropped image
    if (droppedImage) {
      setImagesInZones((prevImages) => ({
        ...prevImages,
        [zoneId]: [...(prevImages[zoneId] || []), droppedImage],
      }));
      // console.log(droppedImage, "d");
      // handleUploadImages((prevImages) => [...prevImages, droppedImage]);
    }
    // Remove the dropped image from selectedImages
    const updatedSelectedImages = selectedImages.filter(
      (image) => image.key !== draggedId
    );
    handleUploadImages(updatedSelectedImages);

    setDraggedOverZone(null);
  };

  useEffect(() => {
    // console.log(selectedImages, "neww");
    // // setURL(URL.createObjectURL(selectedImages));
    // console.log(url, "line 69");
    console.log("Updated imagesInZones:", imagesInZones);
    // console.log("Updated imagesInZones:", imagesInZones[dropZone.id]);
  }, [selectedImages, url, imagesInZones]);
  // const handleUploadImages = (uploadedImages) => {
  //   console.log(selectedImages);
  //   // Logic to handle uploaded images
  //   console.log("Uploaded images:", uploadedImages);
  //   // console.log(imagesInZones);
  //   // setImagesInZones((prevImages) => ({
  //   //   ...prevImages,
  //   //   uploaded: [...prevImages, ...uploadedImages],
  //   // }));
  //   // You can further process or update state with the uploaded images here
  // };

  // const images = [
  //   { id: 1, src: "../public/pug.jpg", alt: "Pug 1" },
  //   { id: 2, src: "../public/pug.jpg", alt: "Pug 2" },
  //   { id: 3, src: "../public/pug.jpg", alt: "Pug 3" },
  //   { id: 4, src: "../public/pug.jpg", alt: "Pug 4" },
  //   { id: 5, src: "../public/pug.jpg", alt: "Pug 5" },
  // ];

  const dropZones = [
    { id: "god", title: "God" },
    { id: "decent", title: "Decent" },
    { id: "average", title: "Average" },
    { id: "trash", title: "Trash" },
    { id: "intolerable", title: "Intolerable" },
  ];

  return (
    <>
      <span className="text-3xl font-bold text-center text-slate-300">
        Memeify – Where Imagination Becomes Memes!
      </span>
      {/* < className="upload mb-5 mt-8 p-4 flex"> */}
      <InputFileUpload
        handleDragStart={handleDragStart}
        handleUploadImages={handleUploadImages}
      />

      {/* <div className="upload mb-5 mt-8 p-4">
        <input
          type="file"
          id="imageUpload"
          accept="image/*"
          multiple
          className="block w-full text-lg text-slate-400 file:mr-4 file:px-2 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-100 file:text-purple-800 hover:file:bg-purple-300
          file:cursor-pointer"
        />
      </div> */}
      <div className="categories space-y-4 mt-10 p-5">
        {dropZones.map((dropZone) => (
          <div
            key={dropZone.id}
            id={dropZone.id}
            className={`drop-zone text-black p-3 flex flex-row space-x-3 overflow-auto ${
              draggedOverZone === dropZone.id ? "bg-blue-300" : "bg-green-300"
            }`}
            onDragOver={(event) => handleDragOver(event, dropZone.id)}
            onDragLeave={handleDragLeave}
            onDrop={(event) => handleDrop(event, dropZone.id)}
          >
            <h2 className="text-xl font-bold">{dropZone.title}</h2>
            {imagesInZones[dropZone.id] &&
              imagesInZones[dropZone.id].map((imageId, index) => {
                console.log(imagesInZones[dropZone.id], "abc");
                const imageUrl = URL.createObjectURL(imageId);
                return (
                  <img
                    key={index}
                    width="150px"
                    style={{ height: "150px", cursor: "pointer" }}
                    src={imageUrl}
                    alt={`Preview ${index}`}
                    className="dropped-image"
                    draggable="true"
                    onDragStart={(event) => handleDragStart(event, index)}
                  />
                );
              })}
          </div>
        ))}
      </div>
      {/* <div className="images mt-10 grid grid-cols-4 gap-4 m-8 ">
        {selectedImages.length > 0 &&
          selectedImages.map((image, index) => (
            <img
              key={index}
              width="150px"
              style={{ height: "150px", cursor: "pointer" }}
              src={URL.createObjectURL(image)}
              alt={`Preview ${index + 1}`}
              // id={`image${image.id}`}
              className="draggable"
              draggable="true"
              loading="lazy"
              onDragStart={(event) =>
                handleDragStart(event, `image${index + 1}`)
              }
            />
          ))}
      </div> */}
    </>
  );
}

export default App;
