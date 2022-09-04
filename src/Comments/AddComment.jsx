import React, { useState } from "react";
import { getUniqueId } from "./utils";

const AddComment = (props) => {
  const { setCommentList } = props;
  const [commentText, setCommentText] = useState("");

  const handleAddComment = () => {
    const newComment = {
      id: getUniqueId(),
      text: commentText,
      children: [],
      parentId: null,
    };
    setCommentList((prevList) => prevList.concat(newComment));
    setCommentText("");
  };

  const handleCommentChange = (e) => {
    setCommentText(e.target.value);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter your comment here"
        onChange={handleCommentChange}
        value={commentText}
      />
      <button
        type="button"
        onClick={handleAddComment}
        className="m-4 p-2 text-bold text-white bg-blue-800"
      >
        ADD COMMENT
      </button>
    </div>
  );
};

export default AddComment;
