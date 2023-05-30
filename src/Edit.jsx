import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import './Edit.css'
import './Home.css'

const Edit = () => {
  const { userid } = useParams();

  const [id] = useState("");
  const [email, emailchange] = useState("");
  const [phone, phonechange] = useState("");
  const [username, usernamechange] = useState("");
  const navigate = useNavigate();
  const handlesubmit = (e) => {
    e.preventDefault();
    const userdata = { id, email, phone, username };
    fetch("http://127.0.0.1:3001/private-backend-api/user/update/" + userid, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(userdata),
    })
      .then((res) => {
        alert("Saved successfully.");
        navigate("/home");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  return (
    <>
      <div>
        <form onSubmit={handlesubmit}>
          <label>EMAIL</label>
          <input type="email" id="email" defaultValue={email} onChange={e=>emailchange(e.target.value)}/>
          <label>PHONE</label>
          <input type="phone" id="phone" defaultValue={phone} onChange={e=>phonechange(e.target.value)}/>
          <label>USERNAME</label>
          <input type="text" id="username" defaultValue={username} onChange={e=>usernamechange(e.target.value)}/>
          <div>
            <button className="button-33" type="submit">Save</button>
            <a href="/home">
                <button className="button-33" type="submit">Back</button>
            </a>
            {/* <Link to="/home">Back</Link> */}
          </div>
        </form>
      </div>
    </>
  );
};

export default Edit;
