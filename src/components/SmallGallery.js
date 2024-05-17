export default function SmallGallery({ imageUrl, handleClick }) {
  return (
    <button
    onClick={handleClick}
    >
      <img
        className="md:h-20 md:w-20 object-cover"
        src={imageUrl}
        alt="small-product-img"
      />
    </button>
  );
}
