import React, { useState } from "react";
import AddComment from "./AddComment";
import Comment from "./Comment";

const CommentList = () => {
  const [commentList, setCommentList] = useState([]);
  return (
    <div>
      <AddComment setCommentList={setCommentList} />
      {commentList.map((comment) => {
        return (
          <div key={comment.id} className="my-6 pl-8 flex flex-col">
            <Comment comment={comment} setCommentList={setCommentList} />
          </div>
        );
      })}
    </div>
  );
};

export default CommentList;
