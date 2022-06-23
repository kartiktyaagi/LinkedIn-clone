import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { auth } from ".";
import { login } from "./features/userSlice";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const dispatch = useDispatch();

  const loginToApp = async (e) => {
    e.preventDefault();
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);

      dispatch(
        login({
          email: user.user.email,
          uid: user.user.uid,
          displayName: user.user.displayName,
          photoUrl: user.user.photoURL,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  const register = async () => {
    if (!name) {
      return alert("Please enter a full name");
    }

    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: profilePic,
      });
      dispatch(
        login({
          email: user.user.email,
          uid: user.user.uid,
          displayName: name,
          photoUrl: profilePic,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="login">
      <img
        src="https://www.pinclipart.com/picdir/middle/55-557165_graphic-transparent-library-file-logo-wikimedia-commons-transparent.png"
        alt="linkin logo"
      />

      <form>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full name (required if registering)"
        />
        <input
          type="text"
          value={profilePic}
          onChange={(e) => setProfilePic(e.target.value)}
          placeholder="Profile picture URL (optional)"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button type="submit" onClick={loginToApp}>
          Sign In
        </button>
      </form>

      <p>
        Not a member?{" "}
        <span className="login_register" onClick={register}>
          Register Now
        </span>
      </p>
    </div>
  );
}

export default Login;
