import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";

import UploadImg from "./components/Upload";
import Userprofile from "./components/Userprofile";
import ImagePage from "./components/Home";
import Header from "./components/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <Header />
          <Routes>
            <Route path="/" element={<Login />}></Route>
            <Route path="/signup" element={<Signup />}></Route>
            <Route path="/upload" element={<UploadImg />}></Route>
            <Route path="/home" element={<ImagePage />}></Route>
            <Route path="/Userprofile" element={<Userprofile />}></Route>
          </Routes>
        </div>
      </Router>
    </div>
  );
}
export default App;
