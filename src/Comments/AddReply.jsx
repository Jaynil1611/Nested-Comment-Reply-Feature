import React, { useState } from "react";
import { getUniqueId } from "./utils";

const AddReply = (props) => {
  const { setShowReply, parentComment, setCommentList } = props;
  const [replyText, setReplyText] = useState("");

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

  const handleAddReply = () => {
    if (replyText) {
      const newComment = {
        id: getUniqueId(),
        text: replyText,
        children: [],
        parentId: parentComment.id,
      };
      setCommentList((prevList) => updateCommentList(prevList, newComment));
      setReplyText("");
      setShowReply(false);
    }
  };

  const handleCommentChange = (e) => {
    setReplyText(e.target.value);
  };

  return (
    <div className="mt-6">
      <input
        type="text"
        placeholder="Enter your reply here"
        onChange={handleCommentChange}
        value={replyText}
      />
      <button
        disabled={!replyText}
        onClick={handleAddReply}
        className="mx-4 p-1 text-bold text-blue-800 border border-blue-600 disabled:opacity-50"
      >
        REPLY
      </button>
    </div>
  );
};

export default AddReply;
