import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";

const SearchBar = styled.section`
  font-family: "ABeeZee", sans-serif;
  font-size: 18px;
  padding: 0.5em;
  background: #211522;
  color: #fff;
  text-align: center;
  border-radius: 6px 6px 6px 6px;
  display: flex;
  flex-direction: row;
  height: 3rem;
  font-size: 1.5rem;
`;

const Input = styled.input`
  padding-left: 0.5rem;
  margin-left: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 35vw;
`;

const Search = (props) => {
  const { postList, setPostList } = props;
  const [searchTerm, setSearchTerm] = useState("");
  const resettingRef = useRef(false);
  const reset = (e) => {
    resettingRef.current = true;
    setSearchTerm(e);
  };
  useEffect(() => {
    if (resettingRef.current) {
      resettingRef.current = false;
      searchHandler();
    }
  }, [searchTerm]);

  const searchHandler = () => {
    const newPostList = postList.filter((post) => {
      return post.title.toLowerCase().includes(searchTerm.toLowerCase());
    });
    setPostList(newPostList);
  };

  return (
    <form>
      <SearchBar>
        <label>Looking for something?</label>
        <Input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => {
            reset(e.target.value);
          }}
        />
      </SearchBar>
    </form>
  );
};

export default Search;