import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import "./Post.css"

export const Post = (props) => {
    const [post, setPost] = useState(null);
    const token = props.user.token;
    const {id} = useParams();

    const getPost = async () => {
        const response = await fetch(`http://oauth-server-virid.vercel.app/posts/post/${id}`, {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        setPost(data);
    };

    useEffect(() => {
        getPost();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    if (!post) {
        return null;
    }

    return (
        <div className="post">
            <img src={post.img} alt="" className="postImg" />
            <h1 className="postTitle">{post.title}</h1>
            <p className="postDesc">{post.desc}</p>
            <p className="postLongDesc">{post.longDesc}</p>
        </div>
    )
}

/* const post = posts.find((p)=>p.id.toString() === path) */