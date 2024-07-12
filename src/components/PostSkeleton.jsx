import React from "react";

function PostSkeleton() {
  return (
    <>
      <div className="post">
        <div className="post__title">
          <div className="post__title--skeleton"></div>
        </div>
        <div className="post__body">
          <p className="post__body--skeleton"></p>
        </div>
      </div>
    </>
  );
}

export default PostSkeleton;
