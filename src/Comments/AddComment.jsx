import React, { useState } from "react";
import { getUniqueId } from "./utils";

const AddComment = (props) => {
  const { setCommentList } = props;
  const [commentText, setCommentText] = useState("");

  const handleAddComment = () => {
    const newId = getUniqueId();
    const newComment = {
      id: newId,
      text: commentText,
      children: [],
      parentId: null,
    };
    setCommentList((prevList) => ({
      ...prevList,
      firstLevelIds: prevList.firstLevelIds.concat(newId),
      [newId]: newComment,
    }));
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
        disabled={!commentText}
        type="button"
        onClick={handleAddComment}
        className="m-4 p-2 text-bold text-white bg-blue-800 disabled:opacity-50"
      >
        ADD COMMENT
      </button>
    </div>
  );
};

export default AddComment;
