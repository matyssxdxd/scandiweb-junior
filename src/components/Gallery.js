import NavigateBackIcon from "./NavigateBackIcon";
import NavigateNextIcon from "./NavigateNextIcon";

export default function Gallery({ imageUrl, swipeRight, swipeLeft }) {
  return (
    <div className="relative" style={{ height: "478px", width: "575px" }}>
      <button
        className="absolute z-10 right-10 top-1/2 opacity-75"
        onClick={swipeRight}
      >
        <NavigateNextIcon />
      </button>
      <button
        className="absolute z-10 left-10 top-1/2 opacity-75"
        onClick={swipeLeft}
      >
        <NavigateBackIcon />
      </button>
      <img
        className="relative object-contain"
        style={{ height: "478px", width: "575px" }}
        src={imageUrl}
        alt="small-product-img"
      />
    </div>
  );
}
