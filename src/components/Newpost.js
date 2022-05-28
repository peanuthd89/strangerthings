import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { Link } from "react-router-dom";
import CloseRoundedIcon from "@material-ui/icons/CloseRounded";
import CheckRoundedIcon from "@material-ui/icons/CheckRounded";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router";

const Modal = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(6px);
`;

const Content = styled.div`
  font-family: "ABeeZee", sans-serif;
  width: 480px;
  padding: 12px;
  min-height: 200px;
  background: #d3b1c2;
  box-shadow: 0 2px 12px -8px black;
  border-radius: 5%;
`;

const Heading = styled.div`
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  font-size: 24px;
  border-bottom: 1px solid #888;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin: 12px 0 4px;
`;

const Input = styled.input`
  height: 1.5rem;
  background: #ddd;
  width: 460px;
  padding: 8px;
  font-size: 22px;
  margin-bottom: 8px;
`;

const RadioInput = styled.input``;

const Footer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

const FooterButton = styled.div`
  margin-top: 12px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  border-radius: 6px;
  box-shadow: 0 2px 6px -2px black;
  background-color: black;
  justify-content: space-around;
  align-items: center;
  height: 36px;
  width: 100px;
  a:visited {
    color: white;
  }
`;

const NewPost = (props) => {
  const { setuserPosts, setPostList, postList, userposts } = props;
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [willDeliver, setWillDeliver] = useState("");
  const token = localStorage.getItem("token");
  const history = useHistory();
  const validationHandler = () => {
    if (title.length > 0 && description.length > 0 && price.length > 0) {
      return true;
    }
    return false;
  };
  const postHandler = async (event) => {
    event.preventDefault();
    if (validationHandler()) {
      try {
        const body = JSON.stringify({
          post: {
            title: title,
            description: description,
            price: price,
            ...(location && { location: location }),
            ...(willDeliver && { willDeliver: willDeliver }),
          },
        });

        const headers = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };

        const response = axios.post(
          "https://strangers-things.herokuapp.com/api/2105-VPI-RM-WEB-PT/posts",
          body,
          headers
        );
        const obj = await response;
        const post = obj.data.data.post;
        setuserPosts([post, ...userposts]);
        setPostList([post, ...postList]);
        setTitle("");
        setDescription("");
        setPrice("");
        setLocation("");
        setWillDeliver("");
        history.push("/");
      } catch (error) {
        throw error;
      }
    } else {
      alert("Please Fill Out Form");
    }
  };
  return (
    <Modal>
      <Content>
        <section className="NewPost">
          <Heading>{<h3>New Post</h3>}</Heading>
          <Form>
            <form id="my_form" onSubmit={postHandler}>
              <div>
                <Label>Title*</Label>
                <Input
                  type="text"
                  placeholder="Title"
                  required="required"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div>
                <Label>Description*</Label>
                <Input
                  type="text"
                  placeholder="Description"
                  required="required"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div>
                <Label>Price*</Label>
                <Input
                  type="text"
                  placeholder="Price"
                  required="required"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div>
                <Label>Location</Label>
                <Input
                  type="text"
                  placeholder="Location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
              <div>
                <Label>Will Deliver?</Label>
                <RadioInput
                  type="radio"
                  value="true"
                  value={willDeliver}
                  onChange={(e) => setWillDeliver(e.target.value)}
                />
                Yes
                <RadioInput
                  type="radio"
                  value="false"
                  value={willDeliver}
                  onChange={(e) => setWillDeliver(e.target.value)}
                />
                No
              </div>
              <Footer>
                <FooterButton>
                  <CloseRoundedIcon
                    style={{ color: "white", fontSize: 30 }}
                  ></CloseRoundedIcon>{" "}
                  <Link
                    to="/"
                    style={{ textDecoration: "none" }}
                    className="btn btn-primary"
                    onClick={() => {}}
                  >
                    Cancel
                  </Link>
                </FooterButton>
                <FooterButton>
                  <CheckRoundedIcon
                    style={{ color: "white", fontSize: 30 }}
                  ></CheckRoundedIcon>
                  <Button
                    variant="contained"
                    style={{
                      textDecoration: "none",
                      backgroundColor: "black",
                      color: "white",
                    }}
                    className="btn btn-primary"
                    type="submit"
                  >
                    Submit
                  </Button>
                </FooterButton>
              </Footer>
            </form>
          </Form>
        </section>
      </Content>
    </Modal>
  );
};

export default NewPost;