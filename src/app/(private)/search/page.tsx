"use client";
import { searchUsers } from "@/server-actions/users";
import { Button, Input, Radio, message } from "antd";
import React from "react";
import UsersSearchResults from "./_components/users-search-result";
import { searchPosts } from "@/server-actions/posts";
import PostsSearchResults from "./_components/posts-search-results";

function SearchPage() {
  const [searchFor, setSearchFor] = React.useState<"users" | "posts">("users");
  const [users, setUsers] = React.useState([]);
  const [posts, setPosts] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const searchHandler = async () => {
    try {
      setLoading(true);
      let response: any = null;
      if (searchFor === "users") {
        response = await searchUsers(searchValue);
      } else {
        response = await searchPosts(searchValue);
      }
      if (response.success) {
        if (searchFor === "users") {
          setUsers(response.data);
        } else {
          setPosts(response.data);
        }
      } else {
        message.error(response.message);
      }
    } catch (error: any) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-xl font-bold text-primary">
        Search Users , Posts , Hashtags
      </h1>

      <div className="flex gap-5 mt-5">
        <Input
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Search Users , Posts , Hashtags"
        />
        <Button type="primary" onClick={searchHandler} loading={loading}>
          Search
        </Button>
      </div>

      <div className="mt-5 flex gap-5 items-center">
        <span>Search For</span>
        <Radio.Group
          onChange={(e) => setSearchFor(e.target.value)}
          value={searchFor}
        >
          <Radio value="users">Users</Radio>
          <Radio value="posts">Posts</Radio>
        </Radio.Group>
      </div>

      {searchFor === "users" ? (
        <UsersSearchResults users={users} />
      ) : (
        <PostsSearchResults posts={posts} />
      )}
    </div>
  );
}

export default SearchPage;
