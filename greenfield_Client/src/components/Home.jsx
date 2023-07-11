import axios from "axios";
import { useState, useEffect } from "react";
import { Carousel } from "react-bootstrap";
import "./ImagePage.scss";

function ImagePage() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/img").then(({ data }) => {
      setData(data);
    });
  }, []);

  const handleCopyText = (text) => {
    navigator.clipboard.writeText(text);
    alert("Copied!");
  };

  // Get the last 5 added images
  const lastAddedImages = data.slice(-5).map((singleData) => (
    <Carousel.Item key={singleData._id}>
      <img src={singleData.Base64Img} alt="Carousel Image" />
    </Carousel.Item>
  ));

  return (
    <div className="App" id="main">
      <h1>Home</h1>

      <div className="carousel-container">
        <Carousel>{lastAddedImages}</Carousel>
      </div>

      <div className="card-container">
        {data.map((singleData) => (
          <div
            key={singleData._id}
            className="card"
            onClick={() => handleCopyText(singleData.prompt)}
          >
            <img src={singleData.Base64Img} alt="Image" />
            <p className="card-text">{singleData.prompt}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ImagePage;
