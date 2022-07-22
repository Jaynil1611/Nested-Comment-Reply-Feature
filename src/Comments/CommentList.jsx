import React, { useState } from "react";
import AddComment from "./AddComment";
import Comment from "./Comment";

const CommentList = () => {
  const [commentList, setCommentList] = useState({
    firstLevelIds: [],
  });
  return (
    <div>
      <AddComment setCommentList={setCommentList} />
      {commentList.firstLevelIds.map((id) => {
        return (
          <div key={id} className="pl-8 flex flex-col">
            <Comment
              commentId={id}
              commentList={commentList}
              setCommentList={setCommentList}
            />
          </div>
        );
      })}
    </div>
  );
};

export default CommentList;
