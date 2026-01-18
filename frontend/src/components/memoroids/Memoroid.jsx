import React from "react";

function Memoroid({ title, description, createdAt, image_url, style, isEditing = false, onTitleChange = () => {}, onDescChange = () => {} }) {
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
    
    <img src={image_url} alt="" />
    <p className="dt">{istDate}</p>

    {isEditing ? (
      <>
        <input
          type="text"
          value={title}
          onChange={e => onTitleChange(e.target.value)}
        />

        <textarea
          value={description}
          onChange={e => onDescChange(e.target.value)}
        />
      </>
    ) : (
      <>
        <h1>{title}</h1>
        <p>{description}</p>
      </>
    )}

  </div>
);

}

export default Memoroid;
