import { useState } from "react";
export function TrailerEmbed({ videoKey, title }) {
  const [playing, setPlaying] = useState(false);

  if (!playing) {
    return (
      <button
        className="ratio ratio-16x9 shadow-lg rounded overflow-hidden border-0 p-0 position-relative"
        onClick={() => setPlaying(true)}
        style={{ cursor: "pointer" }}
      >
        <img
          src={`https://img.youtube.com/vi/${videoKey}/hqdefault.jpg`}
          alt={title}
          className="w-100 h-100"
          style={{ objectFit: "cover" }}
        />
        <i className="bi bi-play-circle-fill position-absolute top-50 start-50 translate-middle text-white fs-1" />
      </button>
    );
  }

  return (
    <div className="ratio ratio-16x9 shadow-lg rounded overflow-hidden">
      <iframe
        src={`https://www.youtube.com/embed/${videoKey}?autoplay=1`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
}