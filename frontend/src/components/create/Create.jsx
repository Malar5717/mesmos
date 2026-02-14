import axios from "axios";
import { useState, useEffect } from "react";
import "./Create.css";

const nstyles = ["plain-parch", "cubed", "legal-pad", "sticky-note", "dotted"];
const mstyles = [
  "single-taped",
  "double-taped",
  "paper-pinned",
  "sweet-heart",
  "holes-punched",
];

function Create({ setIsCreateOpen, setPolas }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [style, setStyle] = useState(nstyles[0]);
  const [error, setError] = useState("");

  const [polaType, setPolaType] = useState("note");

  const [isPrivate, setIsPrivate] = useState(false);

  useEffect(() => {
    if (polaType === "memo") {
      setStyle(mstyles[0]);
    } else if (polaType === "note") {
      setStyle(nstyles[0]);
    }
  }, [polaType]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!title || !description) {
      setError("Title and description are required.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("image", image);
    formData.append("style", style);
    formData.append("isPrivate", isPrivate);
    axios
      .post("http://localhost:3000/pola/create", formData, {
        withCredentials: true,
      })
      .then(() => {
        setIsCreateOpen(false);
        axios
          .get("http://localhost:3000/pola/all")
          .then((res) => setPolas(res.data));
      });
  };

  return (
    <div className="createComp" tabIndex={0} onFocus={() => setError("")}>
      {error && (
        <div
          className="error-message"
          style={{ color: "red", marginTop: "10px", marginLeft: "10px" }}
        >
          {error}
        </div>
      )}

      <form className="create_main" onSubmit={handleSubmit}>
        <div className="create-title">
          <div className="form-item">
            <input
              type="text"
              id="title"
              placeholder="Enter Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onFocus={() => setError("")}
            ></input>
          </div>
        </div>

        <div className="create-other">
          <div className="form-body">
            <div className="pola-type">
              <div
                type="radio"
                className={`type memoroidPola ${
                  polaType === "memo" ? "active" : ""
                }`}
                onClick={() => setPolaType("memo")}
              >
                <div className="sqr">
                  <div className="sqr"></div>
                </div>
              </div>
              <div
                type="radio"
                className={`type notePola ${
                  polaType === "note" ? "active" : ""
                }`}
                onClick={() => setPolaType("note")}
              >
                <svg
                  width="66"
                  height="83"
                  viewBox="0 0 66 83"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M49.9565 82.5H0.5V0.5H65.5V65.1271M49.9565 82.5L65.5 65.1271M49.9565 82.5V65.1271H65.5"
                    stroke="#777"
                  />
                </svg>
              </div>
              <div className="space"></div>
            </div>

            <div className="pola-data">
              {polaType === "memo" && (
                <div className="form-item">
                  <label htmlFor="image">
                    {image != null ? image.name : "Image"}
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    id="image"
                    onChange={(e) => setImage(e.target.files[0])}
                  ></input>
                </div>
              )}
              {polaType != "default" && (
                <div className="form-item">
                  <label
                    className={
                      description.length === 0
                        ? "placeholder_show"
                        : "placeholder_hide"
                    }
                    htmlFor="description"
                  >
                    Description
                  </label>
                  <textarea
                    type="text"
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                </div>
              )}
              {polaType === "default" && (
                <div className="form-item">
                  <label className={"placeholder_hide"} htmlFor="description">
                    Description
                  </label>
                  <textarea
                    type="text"
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                </div>
              )}
            </div>
          </div>

          <div className="styling">
            <div
              className={
                polaType === "memo"
                  ? "styles memo-styles"
                  : "styles note-styles"
              }
            >
              {polaType === "memo" && (
                <div className="memo-styles-list">
                  {mstyles.map((mstyle) => (
                    <button
                      key={mstyle}
                      type="button"
                      onClick={() => setStyle(mstyle)}
                      style={{
                        border:
                          style === mstyle
                            ? "2px solid #4B3DA8"
                            : "1px solid #ccc",
                        width: "50%",
                      }}
                    >
                      <div className={`memo-style ${mstyle}`}></div>
                    </button>
                  ))}
                </div>
              )}

              {polaType === "note" && (
                <div className="note-styles-list">
                  {nstyles.map((nstyle) => (
                    <button
                      key={nstyle}
                      type="button"
                      onClick={() => setStyle(nstyle)}
                      style={{
                        border:
                          style === nstyle
                            ? "2px solid #4B3DA8"
                            : "1px solid #ccc",
                        background: "none",
                      }}
                    >
                      <div className={`note-style ${nstyle}`}></div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="button-cont">
              
              <div className="button-priv">
                
                <button type="button" onClick={() => setIsPrivate(!isPrivate)}>
                  <span
                    className={`material-symbols-outlined ${isPrivate ? "lock_person" : "lock_open_right"}`}
                    title={isPrivate ? "private" : "public"}
                  >
                    {/* the text that fot renders as icon glyph  */}
                    {isPrivate ? "lock_person" : "lock_open_right"}
                  </span>
                </button>

              </div>

              <button type="submit" className="submit">submit</button>
            
            </div>

          </div>

        </div>

      </form>

    </div>
  );
}

export default Create;
