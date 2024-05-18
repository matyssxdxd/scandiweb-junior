export default function SmallGallery({ imageUrl, handleClick, addImageFallback }) {
  return (
    <button
    onClick={handleClick}
    >
      <img
        className="md:h-20 md:w-20 object-cover"
        src={imageUrl}
        alt="small-product-img"
        onError={addImageFallback}
      />
    </button>
  );
}
