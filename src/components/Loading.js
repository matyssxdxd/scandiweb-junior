import "./Loading.css";

export default function Loading() {
  return (
    <div className="profile-main-loader">
      <div className="loader">
        <svg className="circular-loader" viewBox="25 25 50 50">2
          <circle
            className="loader-path"
            cx="50"
            cy="50"
            r="20"
            fill="none"
            stroke="#70c542"
            strokeWidth="2"
          />
        </svg>
      </div>
    </div>
  );
}
