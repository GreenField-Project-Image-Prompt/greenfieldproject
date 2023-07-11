import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const urlImg = "http://localhost:3000/img/";
const url = "http://localhost:3000/user/verify";

function UploadImg() {
  const [postImage, setPostImage] = useState({ Base64Img: "" });
  const [postPrompt, setPostPrompt] = useState({ prompt: "" });

  var navigate = useNavigate();
  var [user, setUser] = useState({
    _id: "",
    email: "",
  });
  const createPost = async () => {
    try {
      const postData = {
        Base64Img: postImage.Base64Img,
        prompt: postPrompt.prompt,
        userId: user._id,
      };
      await axios.post(urlImg, postData);
      console.log(postImage.Base64Img, postPrompt.prompt);
    } catch (error) {
      console.log(error);
    }
  };

  function getLocalToken() {
    if (localStorage.getItem("token")) {
      //only user has token on local storage he can see the page
      axios
        .post(url, { token: localStorage.getItem("token") }) //we are taking token which saved to local storage
        .then(({ data }) => {
          if (data._id) {
            // even if user has token but it is not related to its id send to "/"
            setUser(data);
            createPost(data._id); //after create we call func to here
          } else {
            navigate("/");
          }
        });
    } else {
      navigate("/");
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    createPost();
    console.log("updated");
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    setPostImage({ ...postImage, Base64Img: base64 });
    console.log(postImage.Base64Img);
  };

  const handleUploadPrompt = (e) => {
    const prompt = e.target.value;
    console.log(prompt);
    setPostPrompt({ ...postPrompt, prompt: prompt });
  };

  useEffect(() => {
    getLocalToken();
  }, []);

  return (
    <form>
      <input type="text" placeholder="Prompt" onChange={handleUploadPrompt} />
      <br />

      <input
        type="file"
        name="file"
        accept=" .jpeg,.png,.jpg"
        onChange={(e) => handleFileUpload(e)}
      />
      <br />
      <button onClick={handleSubmit} type="submit">
        Submit
      </button>
    </form>
  );
}

// Convert uploaded image to base64 format
function convertToBase64(file) {
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

export default UploadImg;
