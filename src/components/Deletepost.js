import React from "react";
import DeleteForeverRoundedIcon from "@material-ui/icons/DeleteForeverRounded";


const Delete = (props) => {
  const { id, postList, setuserPosts, setPostList, mainPageList } = props;
  const jwttoken = localStorage.getItem("token");
  const deleteHandler = async (postToDelete) => {
    const response = await fetch(
      `'https://strangers-things.herokuapp.com/api/2020-FTB-ET-WEB-PT'/posts/${postToDelete}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwttoken}`,
        },
      }
    );
    const data = await response.json();
      console.log(data)
      console.log(postList)
      console.log(mainPageList)
    if (data) {
      const newPosts = postList.filter((post) => {
        return post._id !== postToDelete;
      });
      const newMain = mainPageList.filter((post) => {
        return post._id !== postToDelete;
      });
      setuserPosts(newPosts);
      setPostList(newMain);
    }
  };
  return (
    <div>
    <Button
        type="button"
        className="btn btn-delete"
        onClick={() => deleteHandler(id)}
      >
        <DeleteForeverRoundedIcon
          style={{ color: "white", fontSize: 30 }}
        ></DeleteForeverRoundedIcon>{" "}
      </Button>
      </div>
  );
};

export default Delete;