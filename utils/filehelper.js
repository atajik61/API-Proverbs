import fs from "fs";

export const getPosts = () => {
  return JSON.parse(fs.readFileSync("proverbs.json", "utf-8"));
};

export const savePosts = (posts) => {
  fs.writeFileSync("proverbs.json", JSON.stringify(posts, null, 2));
};
export const deletePost = (id) => {
  const posts = getPosts();
  const updatedPosts = posts.filter((post) => post.id !== id);
  savePosts(updatedPosts);
};
