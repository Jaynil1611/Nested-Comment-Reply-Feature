import React, { useState } from "react";
import { getUniqueId } from "./utils";

const AddReply = (props) => {
  const { setShowReply, parentComment, setCommentList } = props;
  const [commentText, setCommentText] = useState("");

  const updateCommentList = (prevList, newComment) => {
    const updatedParentComment = {
      ...parentComment,
      children: parentComment.children.concat(newComment.id),
    };
    return {
      ...prevList,
      [parentComment.id]: updatedParentComment,
      [newComment.id]: newComment,
    };
  };

  const handleAddComment = () => {
    if (commentText) {
      const newComment = {
        id: getUniqueId(),
        text: commentText,
        children: [],
        parentId: parentComment.id,
      };
      setCommentList((prevList) => updateCommentList(prevList, newComment));
      setCommentText("");
      setShowReply(false);
    }
  };

  const handleCommentChange = (e) => {
    setCommentText(e.target.value);
  };

  return (
    <div className="mt-6">
      <input
        type="text"
        placeholder="Enter your reply here"
        onChange={handleCommentChange}
        value={commentText}
      />
      <button
        onClick={handleAddComment}
        className="mx-4 p-1 text-bold text-blue-800 border border-blue-600"
      >
        REPLY
      </button>
    </div>
  );
};

export default AddReply;
