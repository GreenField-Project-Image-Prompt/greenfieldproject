import axios from "axios";
import { useState, useEffect } from "react";
import Carousel from 'react-bootstrap/Carousel';

function ImagePage() {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:3000/img").then(({ data }) => {
      setData(data);
    });
    console.log(data);
  }, []);

  return (
    <div className="App" id="main">
      <h1>Images page</h1>
      <Carousel>
      {data.map((singleData) => {
        return (
          <Carousel.Item>
          <img
            className="d-block w-100"
            src={singleData.Base64Img}
          />
          <Carousel.Caption>
            <p> {singleData.prompt} </p>
          </Carousel.Caption>
        </Carousel.Item>
          <div key={singleData._id}>
          <img src={singleData.Base64Img} width="300" alt="Image" />,
          <p > {singleData.prompt} </p> </div>
        );
      })}
      </Carousel>
    </div>
  );
}

export default ImagePage;
