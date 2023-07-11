import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const url = "http://localhost:3000/user/verify";

function Profile() {
  var navigate = useNavigate();
  var [user, setUser] = useState({
    _id: "",
    email: "",
  });
  
  var [todo, setTodo] = useState("");
  var [todos, setTodos] = useState([]);

  function disconnect() {
    localStorage.removeItem("token"); //it just delete token and navigate to "/"
    navigate("/");
  }

  function getMyTodos(userId) {
    //then we will get users todos
    axios.get("http://localhost:3000/img/" + userId).then(({ data }) => {
      setTodos(data);
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
            getMyTodos(data._id); //after create we call func to here
          } else {
            navigate("/");
          }
        });
    } else {
      navigate("/");
    }
  }

  //CREATE A TODO
  function create() {
    axios
      .post("http://localhost:3000/img/", { todo: todo, userId: user._id })
      .then((data) => {
        console.log({ data });
        getMyTodos(user._id); //after we need to refresh the page to
        setTodo(""); 
      });
  }

  //DELETE THE TODO
  function del(id) {
    axios.delete("http://localhost:3000/img/" + id).then(({ data }) => {
      console.log(data);
    });
    // const newList = todos.filter((items) => items._id !== id);
    // setTodos(newList);
    getMyTodos(user._id);
  }
  
  //UPDATE THE TODO
  function update(id) {
    axios
      .put("http://localhost:3000/img/" + id, { todo: todo })
      .then(({ data }) => {
        console.log({ msg: "list updated" });
        getMyTodos(user._id);
      });
  }

  //TO START WHEN PAGE LOAD
  useEffect(() => {
    getLocalToken();
    getMyTodos(user._id);
  }, []);

  return (
    <div>
      <h1>{user.email} Profile</h1>
      <ul>
        {todos.map((e) => {
          return (
            <li key={e._id}>
              <div>
                {e.todo}
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
  );
}

export default Profile;
