import axios from "axios";
import { useState, useEffect } from "react";

function ImagePage() {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:3000/img").then(({ data }) => {
      setData(data);
    });
    console.log(data);
  }, []);

  return (
    <div className="App">
      <h1>Images page</h1>
      {data.map((singleData) => {
        return (
          <div key={singleData._id}>
          <img src={singleData.Base64Img} width="300" alt="Image" />,
          <p > {singleData.prompt} </p> </div>
        );
      })}
    </div>
  );
}

export default ImagePage;
