import { rejects } from "assert";
import React from "react";
import { useState } from "react";

function UploadImg() {
  const [image, setImage] = useState("");
  const [promt, setPrompt] = useState("");

  //input handler***
  function HandleImage(e) {
    console.log(e.target.file);
    setImage(e.target.files[0]);
  }

  function HandlePromt(e) {
    console.log(e.target.file);
    setPromt(e.target.files[0]);
  }
  //Convert uploaded image to base64 format
  function convertToBase64(file) {
    return new Promise((resolve, rejects) => {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (err) => {
        reject(err);
      };
    });
  }
  return (
    <div>
      <input
        type="file"
        name="file"
        accept=" .jpeg,.png,.jpg"
        onChange={HandleImage***}
      />
      <input type="text" name="file" onChange={HandlePromt} />
      <button>Submit</button>
    </div>
  );
}

export default UploadImg;
