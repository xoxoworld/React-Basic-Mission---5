import { Link } from "react-router-dom";

export default function Posts({ posts }) {
  return (
    <section>
      <h2>글 목록</h2>
      {posts.length === 0 ? (
        <p>글이 없습니다.</p>
      ) : (
        <ul>
          {posts.map((post) => (
            <li key={post.id} style={{ marginBottom: 8 }}>
              <Link to={`/posts/${post.id}`}>{post.title}</Link>{" "}
              <small>{post.createdAt}</small>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
