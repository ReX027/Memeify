import "./App.css";
import { useState } from "react";
import InputFileUpload from "./components/UploadBtn";

function App() {
  const [draggedOverZone, setDraggedOverZone] = useState(null);
  const [imagesInZones, setImagesInZones] = useState({});
  // const [uploadImage, setUploadImage] = useState([]);

  // const handleUploadImage = (e) => {
  //   console.log("uploading here");
  //   console.log(e.target);
  // };

  const handleDragStart = (event, id) => {
    event.dataTransfer.setData("text/plain", id);
    console.log(id);
  };

  const handleDragOver = (event, id) => {
    event.preventDefault();
    setDraggedOverZone(id);
  };

  const handleDragLeave = () => {
    setDraggedOverZone(null);
  };

  const handleDrop = (event, zoneId) => {
    event.preventDefault();
    const draggedId = event.dataTransfer.getData("text/plain");
    console.log(`Image ${draggedId} dropped into ${zoneId}`);

    // Remove the image from the previous zone
    const prevZoneId = Object.keys(imagesInZones).find((key) =>
      imagesInZones[key]?.includes(draggedId)
    );
    if (prevZoneId) {
      const updatedPrevZoneImages = imagesInZones[prevZoneId].filter(
        (image) => image !== draggedId
      );
      setImagesInZones((prevImages) => ({
        ...prevImages,
        [prevZoneId]: updatedPrevZoneImages,
      }));
    }

    // Add the image to the new zone
    setImagesInZones((prevImages) => ({
      ...prevImages,
      [zoneId]: [...(prevImages[zoneId] || []), draggedId],
    }));

    setDraggedOverZone(null);
  };

  const images = [
    { id: 1, src: "../public/pug.jpg", alt: "Pug 1" },
    { id: 2, src: "../public/pug.jpg", alt: "Pug 2" },
    { id: 3, src: "../public/pug.jpg", alt: "Pug 3" },
    { id: 4, src: "../public/pug.jpg", alt: "Pug 4" },
    { id: 5, src: "../public/pug.jpg", alt: "Pug 5" },
  ];

  const dropZones = [
    { id: "god", title: "God" },
    { id: "decent", title: "Decent" },
    { id: "average", title: "Average" },
    { id: "trash", title: "Trash" },
    { id: "intolerable", title: "Intolerable" },
  ];

  return (
    <>
      <div className="upload mb-5 mt-8 p-4 flex">
        <InputFileUpload />
      </div>
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
      <div className="container grid grid-cols-3">
        {/* <span>img1</span>
        <span>img1</span>
        <span>img1</span>
        <span>img1</span> */}
      </div>
      <span className="text-3xl font-bold text-center">
        Memeify – Where Imagination Becomes Memes!
      </span>
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
              imagesInZones[dropZone.id].map((imageId) => (
                <img
                  key={imageId}
                  width="150px"
                  style={{ height: "150px", cursor: "pointer" }}
                  src={
                    images.find(
                      (image) =>
                        image.id === parseInt(imageId.split("image")[1])
                    ).src
                  }
                  alt={
                    images.find(
                      (image) =>
                        image.id === parseInt(imageId.split("image")[1])
                    ).alt
                  }
                  className="dropped-image"
                  draggable="true" // Make the dropped images draggable again
                  onDragStart={(event) => handleDragStart(event, imageId)}
                />
              ))}
          </div>
        ))}
      </div>
      <div className="images mt-10 grid grid-cols-4 gap-4 m-8 ">
        {images.map((image) => (
          <img
            key={image.id}
            width="150px"
            style={{ height: "150px", cursor: "pointer" }}
            src={image.src}
            alt={image.alt}
            id={`image${image.id}`}
            className="draggable"
            draggable="true"
            loading="lazy"
            onDragStart={(event) => handleDragStart(event, `image${image.id}`)}
          />
        ))}
      </div>
    </>
  );
}

export default App;
