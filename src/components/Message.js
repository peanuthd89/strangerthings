import React from "react";
import styled from "styled-components";

const MessageList = styled.div`
  font-family: "ABeeZee", sans-serif;
  min-width: 300px;
  display: grid;
  grid-template-rows: auto minmax(0, 1fr);
  padding: 0.5em;
  background: #613659;
  overflow-y: scroll;
`;

const Container = styled.div`
  background-color: #c197d2;
  border: 1px solid #211522;
  background: #fafafa;
  box-shadow: 0 3px 8px -3px black;
  border-radius: 6px 6px 0 0;
  margin: 0.5rem;
`;

const Title = styled.div`
  padding: 8px;
  background: #c197d2;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-radius: 6px 6px 0 0;
  font-family: "ABeeZee", sans-serif;
  height: 48px;
`;

const Content = styled.div`
  padding: 8px;
  font-family: "ABeeZee", sans-serif;
`;

const Message = (prop) => {
  const { message } = prop;
  return (
    <MessageList>
      <Container>
        <Title>
          <h3>Re: {message.post.title}</h3>
        </Title>
        <Content>
          <div>
            <strong>From:</strong> {message.fromUser.username}
          </div>
          <div>
            <strong>Message:</strong> {message.content}
          </div>
        </Content>
      </Container>
    </MessageList>
  );
};

export default Message;
