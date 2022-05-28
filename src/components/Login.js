import axios from "axios";
import React, { useEffect, useState } from "react";
import BASE_URL from "../../api";
import { Link } from "react-router-dom";
import { fetchUserData } from "../../api";
import LockOpenRoundedIcon from "@material-ui/icons/LockOpenRounded";
import CloseRoundedIcon from "@material-ui/icons/CloseRounded";
import CreateRoundedIcon from "@material-ui/icons/CreateRounded";
import styled from "styled-components";
import Button from "@material-ui/core/Button";

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
`;

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

const Login = (props) => {
  const {
    username,
    setUsername,
    password,
    setPassword,
    showUser,
    setUserData,
    userId,
    setUserId,
    setuserPosts,
    setUserLoggedIn,
  } = props;
  const [formSubmitted, setformsubmitted] = useState(false);
  const loginUser = (event, history) => {
    event.preventDefault();
    console.log("form submitted");

    const body = JSON.stringify({
      user: { username: username, password: password },
    });
    const headers = { headers: { "Content-Type": "application/json" } };

    axios
      .post(`${BASE_URL}/users/login`, body, headers)
      .then((response) => {
        console.log(response);
        const token = response.data.data.token;
        localStorage.setItem("token", token);
        localStorage.setItem("name", username);
        setformsubmitted(true);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };
  useEffect(() => {
    if (formSubmitted) {
      setUserLoggedIn(true);
      fetchUserData(localStorage.getItem("token"))
        .then((val) => {
          setUserData(val);
          setuserPosts(val.data.posts.filter((post) => post.active));
          setUserId(val.data._id);
          setformsubmitted(false);
          window.location.href = "/";
        })
        .catch((error) => console.error(error));
    }
  }, [formSubmitted]);

  return (
    <Modal>
      <Content>
        <section className="login">
          <Heading>
            <h1>{showUser}</h1>
            <h3>Login</h3>
          </Heading>
          <Form>
            <div className="modal">
              <form onSubmit={loginUser}>
                <div>
                  <Label>Username</Label>
                  <br></br>
                  <Input
                    type="text"
                    required="required"
                    value={username}
                    onInput={(event) => setUsername(event.target.value)}
                  />
                </div>
                <div>
                  <Label>Password</Label>
                  <br></br>
                  <Input
                    type="password"
                    required="required"
                    value={password}
                    onInput={(event) => {
                      setPassword(event.target.value);
                    }}
                  />
                </div>
                <Footer>
                  <FooterButton>
                    <CloseRoundedIcon
                      style={{ color: "white", fontSize: 30 }}
                    ></CloseRoundedIcon>
                    <Link
                      to="/"
                      style={{ textDecoration: "none" }}
                      className="btn btn-primary"
                      onClick={() => {
                        window.location.href = "/";
                      }}
                    >
                      Cancel
                    </Link>
                  </FooterButton>
                  <FooterButton>
                    <CreateRoundedIcon
                      style={{ color: "white", fontSize: 30 }}
                    ></CreateRoundedIcon>
                    <Link
                      to="/"
                      style={{ textDecoration: "none" }}
                      className="btn btn-primary"
                      onClick={() => {
                        window.location.href = "/users/register";
                      }}
                    >
                      Register
                    </Link>
                  </FooterButton>
                  <FooterButton>
                    <LockOpenRoundedIcon
                      style={{ color: "white", fontSize: 30 }}
                    ></LockOpenRoundedIcon>
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
            </div>
          </Form>
        </section>
      </Content>
    </Modal>
  );
};

export default Login;