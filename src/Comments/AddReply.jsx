import React, { useState } from "react";
import { getUniqueId } from "./utils";

const AddReply = (props) => {
  const { setShowReply, parentComment, setCommentList } = props;
  const [replyText, setReplyText] = useState("");

  const updateCommentList = (prevList, newComment) => {
    const updatedList = prevList.map((comment) => {
      if (comment.id === parentComment.id) {
        return {
          ...comment,
          children: comment.children.concat(newComment),
        };
      }
      return {
        ...comment,
        children: updateCommentList(comment.children, newComment),
      };
    });
    return updatedList;
  };

  const handleAddComment = () => {
    const newComment = {
      id: getUniqueId(),
      text: replyText,
      children: [],
      parentId: parentComment.id,
    };
    setCommentList((prevList) => updateCommentList(prevList, newComment));
    setReplyText("");
    setShowReply(false);
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
        onClick={handleAddComment}
        className="mx-4 p-1 text-bold text-blue-800 border border-blue-600"
      >
        REPLY
      </button>
    </div>
  );
};

export default AddReply;
