import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";

export default function Note({
  title,
  description,
  createdAt,
  style,
  isEditing = false,
  onTitleChange = () => {},
  onDescChange = () => {},
}) {
  let istDate = "";
  if (createdAt) {
    const date = new Date(createdAt);
    if (!isNaN(date.getTime())) {
      istDate = new Intl.DateTimeFormat("en-IN", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        day: "2-digit",
        month: "2-digit",
        year: "2-digit",
        hour12: false,
      }).format(date);
    } else {
      istDate = "Invalid date";
    }
  } else {
    istDate = "No date";
  }

  return (
    <div className={`pola ${style}`}>
      {style === "sweet-heart" && (
        <div className="heart">
          <FontAwesomeIcon icon={faHeart} style={{ color: "black" }} />
          <FontAwesomeIcon icon={faHeart} style={{ color: "#aa3108" }} />
          <FontAwesomeIcon icon={faHeart} style={{ color: "#aa3108" }} />
        </div>
      )}
      {isEditing ? (
        <>
          <input type="text" value={title} onChange={(e) => onTitleChange(e.target.value)} />
          <textarea value={description} onChange={(e) => onDescChange(e.target.value)} />
        </>
      ) : (
        <>
          <h1>{title}</h1>
          <p>{description}</p>
        </>
      )}
      <p className="dt">{istDate}</p>
    </div>
  );
}
