import React, { useMemo } from "react";
import { formatDate } from "../../utils/genDate";

function Memoroid({
  title,
  description,
  createdAt,
  image_url,
  style,
  isEditing = false,

  // not passed? keep as default empty function 
  onTitleChange = () => {},
  onDescChange = () => {},
}) {
  
  const istDate = useMemo(() => formatDate(createdAt), [createdAt]);

  return (
    <div className={`pola ${style}`}>
      <img src={image_url} alt={title} />
      <p className="dt">{istDate}</p>

      {style === "sweet-heart" && (
        <div className="hearts">
          <span className="material-symbols-outlined heart">favorite</span>
          <span className="material-symbols-outlined heart">favorite</span>
          <span className="material-symbols-outlined heart">heart_smile</span>
        </div>
      )}

      {isEditing ? (
        <>
          <input
            type="text"
            value={title}
            onChange={(e) => onTitleChange(e.target.value)}
          />

          <textarea
            value={description}
            onChange={(e) => onDescChange(e.target.value)}
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
