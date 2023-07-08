import React from "react";
import { useState } from "react";

function ImageUpload() {
  const [image, setImage] = useState("");
  const [promt, setPrompt] = useState("");
  //input handler
  function HandleImage(e) {
    console.log(e.target.file);
    setImage(e.target.files[0]);
  }
  function HandlePromt(e) {
    console.log(e.target.file);
    setPromt(e.target.files[0]);
  }
  //Connection with backend
  function HandleApi() {
    const formData = new FormData();
    formData.append("image", image);
    axios.post("url", formData).then((res) => {
      console.log(res);
    });
  }
  return (
    <div>
      <input type="file" name="file" onChange={HandleImage} />
      <button>Submit</button>
    </div>
  );
}

export default ImageUpload;
