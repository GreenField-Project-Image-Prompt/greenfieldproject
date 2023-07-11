import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const urlImg = "http://localhost:3000/img/";
const url = "http://localhost:3000/user/verify";

function Userprofile() {
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

  function getMyImg(userId) {
    const postData = {
      Base64Img: postImage.Base64Img,
      prompt: postPrompt.prompt,
      userId: user._id,
    };
    //then we will get users img
    axios.get("http://localhost:3000/img/" + userId).then(({ data }) => {
      console.log(data);
      setPostImage(data);
      setPostPrompt(data);
    });
  }

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

  //DELETE THE TODO
  function del(id) {
    axios.delete("http://localhost:3000/img/" + id).then(({ data }) => {
      console.log(data);
      getMyImg(user._id);
    });
  }

  //UPDATE THE TODO
  function update(id) {
    // Define your update function here
  }

  useEffect(() => {
    getLocalToken();
    if (user._id) {
      getMyImg(user._id); // Pass userId to getMyImg
    }
  }, [user]); // Add user to dependency array
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
      }, [postImage]);

  return (
    <div>
      <h1>img</h1>
      <h3>
        This is Profile of <br /> {user.email}
      </h3>
      <div>
        <ul>
          {Img.map((e) => {
            return (
              <li key={e._id}>
                <div>
                  {e.img}
                  <button /* Delete button*/
                    onClick={() => {
                      del(e._id);
                    }}
                  >
                    Delete
                  </button>
                  <button /* Update button*/
                    onClick={() => {
                      update(e._id);
                    }}
                  >
                    Update
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
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

export default Userprofile;
