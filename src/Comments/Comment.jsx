import React, { useState } from "react";
import AddReply from "./AddReply";

const Comment = (props) => {
  const { comment, setCommentList } = props;
  const [showReply, setShowReply] = useState(false);
  const childLength = comment.children.length;

  const removeComment = (commentList, childToBeRemoved) => {
    return commentList.filter((comment) => comment.id !== childToBeRemoved.id);
  };

  const updateCommentList = (prevList, currentComment) => {
    if (currentComment.parentId === null) {
      return removeComment(prevList, currentComment);
    }
    const updatedList = prevList.map((comment) => {
      if (comment.id === currentComment.parentId) {
        return {
          ...comment,
          children: removeComment(comment.children, currentComment),
        };
      }
      return {
        ...comment,
        children: updateCommentList(comment.children, currentComment),
      };
    });
    return updatedList;
  };

  const handleDeleteComment = () => {
    setCommentList((prevList) => updateCommentList(prevList, comment));
  };

  const handleReplyComment = () => {
    setShowReply(true);
  };

  return (
    <>
      <div className="relative flex justify-center my-4">
        <div className="text-bold p-2">{comment.text}</div>
        <button
          type="button"
          className="mx-4 p-2 text-bold text-red-800 border border-red-600"
          onClick={handleDeleteComment}
        >
          DELETE
        </button>
        <button
          type="button"
          className="mx-4 p-2 text-bold text-blue-800 border border-blue-600"
          onClick={handleReplyComment}
        >
          REPLY
        </button>
      </div>
      <div className="relative inset-0 left-20 mb-4">
        {showReply && (
          <AddReply
            setShowReply={setShowReply}
            parentComment={comment}
            setCommentList={setCommentList}
          />
        )}
        {childLength > 0 &&
          comment.children.map((childComment) => {
            return (
              <Comment
                key={childComment.id}
                comment={childComment}
                setCommentList={setCommentList}
              />
            );
          })}
      </div>
    </>
  );
};

export default Comment;
