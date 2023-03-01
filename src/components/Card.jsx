import { useNavigate } from "react-router-dom"
import "./Card.css"

export const Card = (props) => {
  const navigate = useNavigate();
  return (
    <div className="card" onClick={() => navigate(`/posts/post/${props.post._id}`) }>
        <span className="title">{props.post.title}</span>
        <img src={props.post.img} alt="" />
        <p className="desc">{props.post.desc}</p>
        <button className="cardButton">Read More</button>
    </div>
  )
}
