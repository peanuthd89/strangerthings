import LockRoundedIcon from "@material-ui/icons/LockRounded";
import styled from "styled-components";

const Button = styled.div`
  padding: 0.75rem;
  background: #1b1b1b;
  color: #fafafa;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  cursor: pointer;
  font-family: "ABeeZee", sans-serif;
  border-radius: 6px;
  margin: 8px;
`;

const Logout = (props) => {
  const logoutUser = () => {
    if (localStorage.getItem("token") === null) return;
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    console.log("logout clicked");
  };

  return (
    <section className="login">
      {localStorage.getItem("token") !== null && (
        <Button
          onClick={() => {
            logoutUser();
            window.location.href = "/";
          }}
        >
          <LockRoundedIcon
            style={{ color: "white", fontSize: 30 }}
          ></LockRoundedIcon>
        </Button>
      )}
    </section>
  );
};


