import React from "react";
import { useFirebase } from "../context/Context";
import "../App.css";
import { Link } from "react-router-dom";
// import { app } from "../firebase";
// import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
// const auth = getAuth(app);

const SignIn = () => {
  const firebase = useFirebase();
  const handleSubmit = () => {
    firebase.signInWith();
  };
  return (
    <div className="main">
      <label className="label">email</label>
      <input
        className="input"
        onChange={(e) => firebase.setEmail(e.target.value)}
        value={firebase.email}
      ></input>
      <label className="label">password</label>
      <input
        className="input"
        onChange={(e) => firebase.setPassword(e.target.value)}
        value={firebase.password}
      ></input>
      <button className="btn" onClick={handleSubmit}>
        sign in
      </button>
      <Link to="/">not registered</Link>
    </div>
  );
};

export default SignIn;
