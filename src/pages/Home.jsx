import { useEffect, useState } from "react";
import { Card } from "../components/Card"
import "./Home.css"

export const Home = (props) => {
  const {posts, setPosts} = props;
  const token = props.user.token;

  const getPosts = async () => {
    const response = await fetch(`http://oauth-server-virid.vercel.app/posts/home`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setPosts(data);
  };  
  useEffect(() => {
    getPosts();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!posts) {
    return null;
  }

  return (
    <div className="home">
        {posts.map((post) => (
            <Card key={post._id} post={post} />
        ))}        
    </div>
  )
}
