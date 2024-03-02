import "./App.css";
import Photos from "./pages/Photos";
import SignIn from "./pages/SignIn";
import ImageView from "./pages/ImageView";
// import { getDatabase, ref, set } from "firebase/database";
// import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
// import { app } from "./firebase";
import SignUp from "./pages/SignUp";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// const db = getDatabase(app);
// const auth = getAuth(app);

function App() {
  // const signupUser = () => {
  //   createUserWithEmailAndPassword(auth, "avanish121299@gmail.com", "12345678");
  // };
  //   const putData = () => {
  //     set(ref(db, "users/avi"), {
  //       id: 1,
  //       name: "avanish",
  //       age: 24,
  //     });
  //   };
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/photos" element={<Photos />} />
          <Route path="/" element={<SignUp />} />
          <Route path="/image" element={<ImageView />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
