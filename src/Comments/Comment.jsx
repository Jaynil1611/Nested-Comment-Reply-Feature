import React, { useState } from "react";
import AddReply from "./AddReply";

const Comment = (props) => {
  const { commentId, commentList, setCommentList } = props;
  const [showReply, setShowReply] = useState(false);
  const comment = commentList[commentId];

  const updateCommentList = (prevList, currentComment) => {
    const updatedComments = prevList;
    const currentId = currentComment.id;
    const childComments = updatedComments[currentId].children;
    const parentId = currentComment.parentId;
    const parentComment = updatedComments[parentId];
    if (childComments.length !== 0) {
      childComments.forEach((id) => delete updatedComments[id]);
    }
    delete updatedComments[currentId];

    if (parentId === null) {
      updatedComments.firstLevelIds = prevList.firstLevelIds.filter(
        (id) => id !== currentId
      );
      return { ...updatedComments };
    }
    const updatedParentComment = {
      ...parentComment,
      children: parentComment.children.filter((id) => id !== currentId),
    };
    return {
      ...updatedComments,
      [parentId]: updatedParentComment,
    };
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
        {comment.children.map((id) => (
            <Comment
              key={id}
              commentId={id}
              commentList={commentList}
              setCommentList={setCommentList}
            />
          ))}
      </div>
    </>
  );
};

export default Comment;
