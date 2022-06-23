import React, { useEffect, useState } from "react";
import "./Feed.css";
import CreateIcon from "@material-ui/icons/Create";
import InputOption from "./InputOption";
import ImageIcon from "@material-ui/icons/Image";
import SubscriptionsIcon from "@material-ui/icons/Subscriptions";
import EventNoteIcon from "@material-ui/icons/EventNote";
import CalendarViewDayIcon from "@material-ui/icons/CalendarViewDay";
import Post from "./Post";
import FlipMove from "react-flip-move";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { db } from ".";
import { selectUser } from "./features/userSlice";
import { useSelector } from "react-redux";

function Feed() {
  const user = useSelector(selectUser);
  const [input, setInput] = useState("");
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const postCollectionRef = collection(db, "posts");
    const q = query(postCollectionRef, orderBy("timestamp", "desc"));
    const getPosts = async () => {
      onSnapshot(q, (doc) => {
        setPosts(doc.docs.map((item) => ({ id: item.id, data: item.data() })));
      });
    };

    getPosts();
  }, []);

  console.log(posts);

  const sendPost = async (e) => {
    e.preventDefault();
    const postCollectionRef = collection(db, "posts");

    try {
      await addDoc(postCollectionRef, {
        name: user.displayName,
        description: user.email,
        message: { input },
        photoUrl: user.photoUrl || "",
        timestamp: serverTimestamp(),
      });
    } catch (error) {
      console.log(error);
    } finally {
      setInput("");
    }
  };

  return (
    <div className="feed">
      <div className="feed__inputcontainer">
        <div className="feed__input">
          <CreateIcon />
          <form onSubmit={sendPost}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              type="text"
            />
            <button type="submit">Send</button>
          </form>
        </div>
        <div className="feed__inputOptions">
          <InputOption Icon={ImageIcon} title="Photo" color="#70b5f9" />
          <InputOption
            Icon={SubscriptionsIcon}
            title="Video"
            color="#7E7A33E"
          />
          <InputOption Icon={EventNoteIcon} title="Event" color="#C0CBCD" />
          <InputOption
            Icon={CalendarViewDayIcon}
            title="Write article"
            color="#7FC15E"
          />
        </div>
      </div>
      <FlipMove>
        {posts.map(({ id, data: { name, description, message, photoUrl } }) => (
          <Post
            key={id}
            name={name}
            description={description}
            message={message}
            photoUrl={photoUrl}
          />
        ))}
      </FlipMove>
    </div>
  );
}

export default Feed;
