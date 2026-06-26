import { Link } from "react-router-dom";

export default function Home({ posts }) {
  const latestPosts = posts.slice(0, 3);

  return (
    <section>
      <h2>소개</h2>
      <p>React Router로 목록/상세/작성/수정/삭제를 연습하는 미션입니다.</p>
      <h3>최신 글</h3>
      {latestPosts.length === 0 ? (
        <p>글이 없습니다.</p>
      ) : (
        <ul>
          {latestPosts.map((post) => (
            <li key={post.id}>
              <Link to={`/posts/${post.id}`}>{post.title}</Link>{" "}
              <small>({post.createdAt})</small>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
