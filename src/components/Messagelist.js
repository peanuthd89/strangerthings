import React from "react";
import Message from "./Message";
import styled from "styled-components";

const MessageContainerList = styled.div`
  font-family: "ABeeZee", sans-serif;
  min-width: 300px;
  display: grid;
  grid-template-rows: auto minmax(0, 1fr);
  padding: 0.5em;
  background: #613659;
  overflow-y: scroll;
  height: 86vh;
`;

const MessagesList = (props) => {
  const {
    userData: { data },
  } = props;

  return (
    <MessageContainerList>
      <div>
        {data
          ? data.messages.map((message) => {
              return <Message key={message._id} message={message} />;
            })
          : null}
      </div>
    </MessageContainerList>
  );
};

export default MessagesList;