import { useState } from "react";
import axios from "axios";

const url = "http://localhost:3000/"

function UploadImg() {
  const [postImage, setPostImage] = useState({ Base64Img: "" });

  const createPost = async (newImage) => {
    try {
      await axios.post(url, newImage);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createPost(postImage);
    console.log("Uploaded");
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    console.log(base64);
    setPostImage({ ...postImage, Base64Img: base64 });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="file"
        name="file"
        accept=" .jpeg,.png,.jpg"
        onChange={(e) => handleFileUpload(e)}
      />
      <button type="submit">Submit</button>
    </form>
  );
}

export default UploadImg;

 //Convert uploaded image to base64 format
 function convertToBase64(file){
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
}
