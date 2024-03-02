import React from "react";
import { useFirebase } from "../context/Context";
import "../App.css";
import { Link } from "react-router-dom";

const SignUp = () => {
  const firebase = useFirebase();
  const handleSubmit = (e) => {
    firebase.createUser();
  };

  return (
    <div className="main">
      <label className="label">email</label>
      <input
        className="input"
        placeholder="email"
        onChange={(e) => firebase.setEmail(e.target.value)}
        value={firebase.email}
      ></input>
      <label className="label">password</label>
      <input
        className="input"
        placeholder="password"
        onChange={(e) => firebase.setPassword(e.target.value)}
        value={firebase.password}
      ></input>
      <button
        className="btn"
        onClick={() => {
          handleSubmit();

          // eslint-disable-next-line
          // firebase.putData("users/" + "avanish", {
          //   email: firebase.email,
          //   password: firebase.password,
          // });
        }}
      >
        sign up
      </button>
      <Link to="/signin">already registered</Link>
    </div>
  );
};

export default SignUp;
