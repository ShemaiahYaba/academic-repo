import React from "react";

const Feed: React.FC = () => {
  const [posts, setPosts] = React.useState<string[]>([]);
  const [input, setInput] = React.useState("");

  const handleAddPost = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      setPosts([input, ...posts]);
      setInput("");
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "0 auto" }}>
      <form
        onSubmit={handleAddPost}
        style={{ display: "flex", gap: 8, marginBottom: 16 }}
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="What's on your mind?"
          style={{ flex: 1, padding: 8 }}
        />
        <button type="submit" style={{ padding: "8px 16px" }}>
          Add
        </button>
      </form>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {posts.map((post, idx) => (
          <li
            key={idx}
            style={{
              background: "#f4f4f4",
              marginBottom: 8,
              padding: 12,
              borderRadius: 6,
            }}
          >
            {post}
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Feed;
