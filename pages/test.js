import React, { useState, useEffect, Fragment } from 'react';
import { MdDelete } from 'react-icons/md';

// Higher Order Component for handling images
function withImageHandling(WrappedComponent) {
  return function EnhancedComponent(props) {
    const [imagesPreviewUrls, setImagesPreviewUrls] = useState([]);

    const handleImagesPreviewUrls = (result) => {
      setImagesPreviewUrls((prevUrls) => [...prevUrls, result]);
    };

    const handleDeleteImage = (id) => {
      setImagesPreviewUrls((prevUrls) => prevUrls.filter((image) => image.id !== id));
    };

    return (
      <WrappedComponent
        imagesPreviewUrls={imagesPreviewUrls}
        handleImagesPreviewUrls={handleImagesPreviewUrls}
        handleDeleteImage={handleDeleteImage}
        {...props}
      />
    );
  };
}

function App({ imagesPreviewUrls, handleImagesPreviewUrls, handleDeleteImage }) {
  return (
    <div className="image-mover mt-40">
      <Uploader imagesPreviewUrls={handleImagesPreviewUrls} />
      {imagesPreviewUrls.length > 0 ? (
        <Preview imagesPreviewUrls={imagesPreviewUrls} deleteImage={handleDeleteImage} />
      ) : null}
    </div>
  );
}

function Uploader({ imagesPreviewUrls }) {
  const [imageValidationError, setImageValidationError] = useState(null);

  const filesSelectedHandler = (e) => {
    if (checkMimeType(e)) {
      const files = Array.from(e.target.files);
      files.forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const result = {
            file: reader.result,
            size: file.size,
            name: file.name,
            id: new Date().getTime().toString(),
          };
          setImageValidationError(null);
          imagesPreviewUrls(result);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const checkMimeType = (event) => {
    const { files } = event.target;
    let err = "";
    const types = ["image/png", "image/jpeg", "image/jpg"];
    for (let x = 0; x < files.length; x += 1) {
      if (types.every((type) => files[x].type !== type)) {
        err += `${files[x].type} is not a supported format\n`;
      }
    }

    if (err !== "") {
      event.target.value = null;
      setImageValidationError(err);
      return false;
    }
    return true;
  };

  return (
    <>
      <div id="main">
        <input
          type="file"
          name="file"
          id="file"
          className="custom-file-input"
          onChange={filesSelectedHandler}
          accept="image/png, image/jpeg"
          multiple
        />
        <p>Drag your images here or click in this area.</p>
        {imageValidationError && (
          <span className="error-msg">{imageValidationError}</span>
        )}
      </div>
    </>
  );
}

function Preview({ imagesPreviewUrls, deleteImage }) {
  const [previewImages, setPreviewImages] = useState(imagesPreviewUrls);
  const [dragId, setDragId] = useState("");

  useEffect(() => {
    setPreviewImages(imagesPreviewUrls);
  }, [imagesPreviewUrls]);

  const handleDeleteImage = (id) => {
    deleteImage(id);
  };

  const handleOver = (ev) => {
    ev.preventDefault();
  };

  const handleDrag = (ev) => {
    setDragId(ev.currentTarget.id);
  };

  const handleDrop = (ev) => {
    ev.preventDefault();
    const dragImage = previewImages.find((image) => image.id == dragId);
    const dropImage = previewImages.find((image) => image.id == ev.currentTarget.id);
    const arr = moveItem(dragImage.id - 1, dropImage.id - 1);
    setPreviewImages(arr);
  };

  const moveItem = (from, to) => {
    const updatedImages = [...previewImages];
    const f = updatedImages.splice(from, 1)[0];
    updatedImages.splice(to, 0, f);
    return updatedImages;
  };

  const renderPreview = () => {
    if (previewImages.length > 0) {
      previewImages.forEach((items, index) => {
        items.id = index + 1;
      });
    }
    return (
      <Fragment>
        {previewImages.length > 0 &&
          previewImages.map((element, index) => (
            <div
              className="gallery"
              key={index}
              id={element.id}
              draggable
              onDragOver={handleOver}
              onDragStart={handleDrag}
              onDrop={handleDrop}
            >
              <img
                src={element.file}
                alt={element.name}
                width="600"
                height="400"
              />
              <div className="desc">
                <div className="image-order">
                  <MdDelete
                    size={24}
                    className="delete-icon"
                    onClick={() => handleDeleteImage(element.id)}
                  />
                </div>
              </div>
            </div>
          ))}
      </Fragment>
    );
  };

  return (
    <div className="wrapper">
      {renderPreview()}
    </div>
  );
}

const EnhancedApp = withImageHandling(App);
export default function test() {
  return (
    <>
    <EnhancedApp/>
      {/* <CheckinCheckout /> */}
      {/* <ButtonGroup /> */}
      {/* <StayPolicySelector /> */}
      {/* <PriceManageForm /> */}
      {/* <DirectionManualWifiComponent/> */}
    </>
  );
}
