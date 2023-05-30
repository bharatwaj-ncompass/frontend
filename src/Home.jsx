import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";


const Home = () => {
  const [user, setUser] = useState([]);
  const navigate = useNavigate();
  const fetchData = () => {
    return fetch("http://127.0.0.1:3001/user/readall")
      .then((response) => response.json())
      .then((data) => setUser(data.data));
  };
  useEffect(() => {
    fetchData();
  }, []);
  const onDelete = (id) => {
    if (window.confirm("Are you sure you want to delete the data?")) {
      fetch(`http://127.0.0.1:3001/user/delete/${id}`, {
        method: "DELETE",
      }).then((result) => {
        result.json().then((res) => {
          console.log(res);
          fetchData();
        });
      });
    }
  };
  const LoadEdit = (id) => {
    navigate("/user/update/" + id);
  };
  return (
    <>
      <table id="customers">
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Username</th>
            <th>ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {user.map((index) => (
            <tr key={index.id}>
              <td>{index.id}</td>
              <td>{index.email}</td>
              <td>{index.phone}</td>
              <td>{index.username}</td>
              <td>
                <button
                  className="button-33"
                  onClick={() => {
                    LoadEdit(index.id);
                  }}
                >
                  Edit
                </button>
                <button
                  className="button-33"
                  onClick={() => onDelete(index.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export { Home };
