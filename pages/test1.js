import React, { useState } from "react";
import Image from "next/image";
import { Add } from "iconsax-react";
export default function test1() {
  const [images, setImages] = useState([]);
  const [dragId, setDragId] = useState("");
  const handleFileChange = async (e) => {
    let files = Array.from(e.target.files);
    let arr = [];
    files.forEach((element) => {
      arr.push(element);
    });
    setImages([...images, ...arr]);
  };
  const removeImage = (f) => {
    const filter = images && images?.filter((file) => file !== f);
    setImages(filter);
  };
  const moveImageToFront = (index) => {
    const updatedImages = [...images];
    const [movedImage] = updatedImages.splice(index, 1);
    updatedImages.unshift(movedImage);
    setImages(updatedImages);
  };
  const moveImageBackward = (index) => {
    if (index < images.length - 1) {
      const updatedImages = [...images];
      [updatedImages[index], updatedImages[index + 1]] = [
        updatedImages[index + 1],
        updatedImages[index],
      ];
      setImages(updatedImages);
    }
  };
  const moveImageForward = (index) => {
    if (index > 0) {
      const updatedImages = [...images];
      [updatedImages[index], updatedImages[index - 1]] = [
        updatedImages[index - 1],
        updatedImages[index],
      ];
      setImages(updatedImages);
    }
  };
  const handleAction = (action, index) => {
    switch (action) {
      case "remove":
        removeImage(images[index]);
        break;
      case "makeCover":
        moveImageToFront(index);
        break;
      case "moveForward":
        moveImageForward(index);
        break;
      case "moveBackward":
        moveImageBackward(index);
        break;
      default:
        break;
    }
  };
  const handleDrag = (ev) => {
    setDragId(ev.currentTarget.id);
  };
  const handleOver = (ev) => {
    ev.preventDefault();
  };
  const handleDrop = (ev) => {
    ev.preventDefault();
    const dragImage = images.find((image) => image.name === dragId);
    const dropImage = images.find(
      (image) => image.name === ev.currentTarget.id
    );
    const dragIndex = images.indexOf(dragImage);
    const dropIndex = images.indexOf(dropImage);
    const updatedImages = [...images];
    updatedImages.splice(dragIndex, 1);
    updatedImages.splice(dropIndex, 0, dragImage);
    setImages(updatedImages);
  };
  return (
    <div className={"max-w-[600px] m-auto"}>
      {" "}
      <h2 className="text-3xl text-center font-bold mb-2">
        Add some photos of your {"house"}{" "}
      </h2>{" "}
      <p className="text-normal text-center text-gray-500 mb-8">
        You'll need 5 photos to get started. You can add more or make changes
        later.{" "}
      </p>{" "}
      <div className="flex items-center justify-center w-full mt-5 mb-4  justify-center">
        {" "}
        <label
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer "
        >
          {" "}
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <Add size="100" color="#ccc" />{" "}
            <p className="mb-2 text-lg text-gray-500 text-gray-400">
              {" "}
              <span className="font-semibold">Click to upload</span>{" "}
            </p>{" "}
            <p className="text-normal text-gray-500 text-gray-400">
              Choose atleast 5 images{" "}
            </p>{" "}
            <p className="text-normal text-gray-500 text-gray-400">
              (jpg, jpeg, png, gif, bmp, tif, tiff, svg, webp, avif){" "}
            </p>{" "}
          </div>{" "}
          <input
            id="dropzone-file"
            type="file"
            className="hidden"
            accept=".jpg, .jpeg, .png, .gif, .bmp, .tif, .tiff, .svg, .webp, .avif"
            onChange={handleFileChange}
            name="images"
            required
            multiple
          />{" "}
        </label>{" "}
      </div>{" "}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-16 ">
        {" "}
        {images &&
          images.map((file, index) => (
            <div
              key={index}
              id={file.name}
              draggable
              onDragStart={handleDrag}
              onDragOver={handleOver}
              onDrop={handleDrop}
              className="relative"
            >
              {" "}
              <Image
                src={URL.createObjectURL(file)}
                width={200}
                height={200}
                alt={`Preview ${index}`}
                className="image-preview h-full object-cover border min-h-[150px] max-h-[200px] w-full max-w-full rounded-lg"
                onLoad={() => URL.revokeObjectURL(file)}
              />{" "}
              <div className="absolute text-xs right-2 top-2 bg-white text-black rounded-lg px-3 py-1 m-1 shadow-lg">
                {" "}
                <select
                  onChange={(e) => handleAction(e.target.value, index)}
                  className="bg-white border-none outline-none"
                >
                  {" "}
                  <option value="" disabled selected>
                    Actions{" "}
                  </option>
                  <option value="remove">Remove</option>
                  <option value="makeCover">Make Cover</option>
                  <option value="moveForward">Move Forward</option>{" "}
                  <option value="moveBackward">Move Backward</option>{" "}
                </select>{" "}
              </div>{" "}
            </div>
          ))}{" "}
      </div>{" "}
    </div>
  );
}
