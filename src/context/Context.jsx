import { createContext, useContext, useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";
import {
  getStorage,
  uploadBytes,
  listAll,
  getDownloadURL,
} from "firebase/storage";
import { v4 } from "uuid";
import { ref as sRef } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAvd6GhhgxHjJdMxTSDmUlFCF0d7tu_lNE",
  authDomain: "photo-manager-b3da4.firebaseapp.com",
  projectId: "photo-manager-b3da4",
  storageBucket: "photo-manager-b3da4.appspot.com",
  messagingSenderId: "819296179197",
  appId: "1:819296179197:web:703e9dde83df5eb3c1ff94",
  databaseURL: "https://photo-manager-b3da4-default-rtdb.firebaseio.com/",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const database = getDatabase(app);
export const firebaseCon = createContext(null);

export const useFirebase = () => useContext(firebaseCon);

export const ContextProvider = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [upload, setUpload] = useState([]);
  const [imageList, setImageList] = useState([]);
  const imageListRef = sRef(storage, "/images");

  const handleFileChange = (e) => {
    const files = e.target.files;
    setUpload([...files]); // Update upload state with the selected files
  };
  // const UploadImage = () => {
  //   upload.forEach((file) => {
  //     if (!Array.isArray(upload)) {
  //       console.error("Upload is not an array");
  //       return;
  //     }

  //     // Check if upload array is empty
  //     if (upload.length === 0) {
  //       console.log("No files to upload");
  //       return;
  //     }
  //     const imageRef = sRef(storage, `images/${file.name + v4()}`);
  //     uploadBytes(imageRef, file)
  //       .then(() => {
  //         console.log("Upload successful for", file.name);
  //       })
  //       .catch((error) => {
  //         console.error("Error uploading image:", error);
  //       });
  //   });
  // };
  const UploadImage = () => {
    upload.forEach((file) => {
      const imageRef = sRef(storage, `images/${file.name + v4()}`);
      uploadBytes(imageRef, file)
        .then((snapshot) => {
          snapshot.ref.getDownloadURL().then((url) => {
            const imageId = v4();
            const imageData = { url, id: imageId };
            putData(`images/${imageId}`, imageData);
            console.log("Upload successful for", file.name);
          });
        })
        .catch((error) => {
          console.error("Error uploading image:", error);
        });
    });
  };

  useEffect(() => {
    listAll(imageListRef)
      .then((response) => {
        // Map each item to a promise that fetches the download URL
        const promises = response.items.map((item) => getDownloadURL(item));
        // Wait for all promises to resolve
        Promise.all(promises)
          .then((urls) => {
            // Update the imageList state with the array of download URLs
            setImageList(urls);
          })
          .catch((error) => {
            console.error("Error fetching download URLs:", error);
          });
      })
      .catch((error) => {
        console.error("Error listing images:", error);
      });
  }, []);

  const createUser = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((value) => {
        console.log(value);
        window.location.href="/signin"
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const signInWith = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((value) => {
        window.location.href = "/photos";
      })
      .catch((error) => {
        alert(error);
      });
  };

  const putData = (key, data) => {
    set(ref(database, key), data)
      .then(() => {
        console.log("Data written successfully!");
      })
      .catch((error) => {
        console.error("Error writing data:", error);
      });
  };

  return (
    <firebaseCon.Provider
      value={{
        createUser,
        signInWith,
        setEmail,
        setPassword,
        putData,
        UploadImage,
        setUpload,
        handleFileChange,
        setImageList,
        useEffect,
        imageList,
      }}
    >
      {props.children}
    </firebaseCon.Provider>
  );
};
