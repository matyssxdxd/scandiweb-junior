import React, { useState } from "react";
import Gallery from "./Gallery";
import SmallGallery from "./SmallGallery";

export default function Slider({ gallery }) {
  const [imgIndex, setImgIndex] = useState(0);
  const totalImages = gallery.length;

  const swipeRight = () => {
    const newIndex = (imgIndex + 1) % totalImages;
    setImgIndex(newIndex);
  };

  const swipeLeft = () => {
    const newIndex = (imgIndex - 1 + totalImages) % totalImages;
    setImgIndex(newIndex);
  };

  const handleSmallGalleryClick = (index) => {
    setImgIndex(index);
  } 

  const addImageFallback = (event) => {
    event.currentTarget.src =
      "https://static.vecteezy.com/system/resources/thumbnails/022/014/063/small_2x/missing-picture-page-for-website-design-or-mobile-app-design-no-image-available-icon-vector.jpg";
  };

  return (
    <div className="flex gap-10">
      <div
        className="flex flex-col justify-between overflow-scroll"
        style={{ height: "478px", gap: "10px" }}
      >
        {gallery.map((galleryElement, index) => (
          <SmallGallery
            key={galleryElement.image_url}
            imageUrl={galleryElement.image_url}
            addImageFallback={addImageFallback}
            style={{ marginBottom: "10px" }}
            handleClick={() => handleSmallGalleryClick(index)}
          />
        ))}
      </div>
      <Gallery
        imageUrl={gallery[imgIndex].image_url}
        swipeRight={swipeRight}
        swipeLeft={swipeLeft}
        addImageFallback={addImageFallback}
      />
    </div>
  );
}
