import React, { useEffect } from "react";
import { Card } from "react-bootstrap";
import { postListFetch } from "./PostAction";
import { useDispatch, useSelector } from "react-redux";
import "../../App.css";

const PostList = () => {
  //   debugger;
  const dispatch = useDispatch();
  const postList = useSelector((state) => state.postList.posts);
  const error = useSelector((state) => state.postList.error);
//   const error = postList.error;
    debugger;
  useEffect(() => {
    dispatch(postListFetch(2,5));
  },[]);

  console.log(postList);
  console.log(error);

  return (
    <div className="container">
      <div className="postcontainer">
     {postList !== undefined && postList.length ?
     <>
     {postList.map((post) => (
          <Card
            border="info"
            style={{ width: "300px", height: "300px", margin: "5px" }}
          >
            <Card.Header>{post.id}</Card.Header>
            <Card.Body key={post.id}>
              <Card.Title>{post.title}</Card.Title>
              <Card.Text>{post.body}</Card.Text>
            </Card.Body>
          </Card>
        ))}
     </>:
     <>
        <div>{error}</div>
     </>
     }
        
    
      </div>
    </div>
  );
};

export default PostList;
