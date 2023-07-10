import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Profile from "./components/Profile";
import UploadImg from "./components/Upload";
import ImagePage from "././components/MainImagePage";

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<Login />}></Route>
            <Route path="/signup" element={<Signup />}></Route>
            <Route path="/profile" element={<Profile />}></Route>
            <Route path="/upload" element={<UploadImg />}></Route>
            <Route path="/mainImagePage" element={<ImagePage />}></Route>
          </Routes>
        </div>
      </Router>
    </div>
  );
}
export default App;
