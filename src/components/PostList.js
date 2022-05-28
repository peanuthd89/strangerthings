import React from "react";
import Post from "./Post";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import styled from "styled-components";

const PostContainerList = styled.div`
  font-family: "ABeeZee", sans-serif;
  min-width: 300px;
  display: grid;
  grid-template-rows: auto minmax(0, 1fr);
  padding: 0.5em;
  background: #613659;
  overflow-y: scroll;
  height: 86vh;
`;

const PostsAllContainer = styled.div`
  font-family: "ABeeZee", sans-serif;
  font-size: 18px;
  padding: 0.5em;
  background: #211522;
  color: #fff;
  text-align: center;
  border-radius: 6px 6px 0 0;
  /* overflow-y: scroll; */
`;

const PostsMyContainer = styled.div`
  font-family: "ABeeZee", sans-serif;
  padding: 0.5em;
  background: #211522;
  color: #fff;
  text-align: center;
  font-size: 18px;
  border-radius: 6px 6px 0 0;
`; 

const PostsList = ({
  postList,
  userLoggedIn,
  setuserPosts,
  setPostList,
  mainPageList,
  userId,
  userposts
}) => {
  return (
    <div>
      <Route exact path="/"></Route>
      <Route path="/posts"></Route>
      <PostContainerList>
        {postList.map((post) => {
          return (
            <Post
              postList={postList}
              setuserPosts={setuserPosts}
              userLoggedIn={userLoggedIn}
              key={post._id}
              posts={post}
              setPostList={setPostList}
              mainPageList={mainPageList}
              userId={userId}
              userposts={userposts}
            />
          );
        })}
      </PostContainerList>
    </div>
  );
};

export default PostsList;