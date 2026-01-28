import React, { useRef, useState, useEffect } from "react";

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
  const [expanded, setExpanded] = useState(false);
  const [showReadMore, setShowReadMore] = useState(false);
  const contentRef = useRef(null);
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

  useEffect(() => {
    if (contentRef.current && contentRef.current.scrollHeight > 120) {
      setShowReadMore(true);
    } else {
      setShowReadMore(false);
    }
  }, [description]);

  return (
    <div className={`pola ${style}`} style={{ maxWidth: 400 }}>
      {style === "sweet-heart" && (
        <div className="heart">
          <FontAwesomeIcon icon={faHeart} style={{ color: "black" }} />
          <FontAwesomeIcon icon={faHeart} style={{ color: "#aa3108" }} />
          <FontAwesomeIcon icon={faHeart} style={{ color: "#aa3108" }} />
        </div>
      )}
      {isEditing ? (
        <>
          <input type="text" value={title} onChange={onTitleChange} />
          <textarea value={description} onChange={onDescChange} />
        </>
      ) : (
        <>
          <h1>{title}</h1>
          <div
            ref={contentRef}
            style={{
              maxHeight: expanded ? (contentRef.current ? contentRef.current.scrollHeight : 'none') : 120,
              overflow: 'hidden',
              transition: 'max-height 0.3s',
              whiteSpace: 'pre-line',
            }}
          >
            {description}
          </div>
          {showReadMore && !expanded && (
            <button
              onClick={() => setExpanded(true)}
              style={{ border: 'none', background: 'none', color: '#4B3DA8', cursor: 'pointer', padding: 0, marginTop: 4 }}
            >
              Read more
            </button>
          )}
        </>
      )}
      <p className="dt">{istDate}</p>
    </div>
  );
}
