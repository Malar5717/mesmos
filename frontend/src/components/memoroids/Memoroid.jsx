import React from "react";
import "./Memoroid.css";

function Memoroid({ title, description, createdAt, image_url, style }) {
  const date = new Date(createdAt);
  const istDate = new Intl.DateTimeFormat("en-IN", {
    timeZone: "Asia/Kolkata",
    hour: "2-digit",
    minute: "2-digit",
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
    hour12: ![],
  }).format(date);

  return (
    <div className={`pola ${style}`}>
      <img src={image_url} />
      <p className="dt">{istDate}</p>
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  );
}

export default Memoroid;
