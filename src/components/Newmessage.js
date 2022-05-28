import React, { useState } from "react";
import styled from "styled-components";

const Section = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Input = styled.input`
  width: 80vw;
`;

const Button = styled.button`
  font-family: "ABeeZee", sans-serif;
  border-radius: 6px;
  box-shadow: 0 2px 6px -2px black;
  background-color: black;
  height: 24px;
  width: 50px;
  color: white;
  cursor: pointer;
  a:visited {
    color: white;
  }
`;

const NewMessage = (props) => {
  const { author_id, userId, post_id, author } = props;
  const [message, setMessage] = useState("");
  const token = localStorage.getItem("token");
  const validationHandler = () => {
    if (message.length > 0) {
      return true;
    }
    return false;
  };
  const MessageHandler = async (event) => {
    event.preventDefault();
    if (author_id === userId) {
      alert("This is your Post!");
    } else if (validationHandler()) {
      try {
        const response = await fetch(
          `'https://strangers-things.herokuapp.com/api/2020-FTB-ET-WEB-PT'/posts/${post_id}/messages`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              message: {
                content: message,
              },
            }),
          }
        );

        const obj = await response.json();
        console.log(obj);
        setMessage("");
      } catch (error) {
        throw error;
      }
    } else {
      alert("Please Type Message");
    }
  };
  return (
    <Section className="NewMessage">
      {author_id !== userId && (
        <form onSubmit={MessageHandler}>
          <div>
            <Input
              type="text"
              placeholder="Contact owner"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></Input>
            <Button type="submit">Send</Button>
          </div>
        </form>
      )}
    </Section>
  );
};

export default NewMessage;