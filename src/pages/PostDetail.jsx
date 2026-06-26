import { useParams, useNavigate, Link } from "react-router-dom";

export default function PostDetail({ posts, onDelete }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const post = posts.find((p) => Number(p.id) === Number(id));

  if (!post) {
    return (
      <section>
        <h2>글이 없습니다</h2>
        <p>존재하지 않는 id입니다.</p>
        <Link to="/posts">목록으로</Link>
      </section>
    );
  }

  return (
    <section>
      <h2>{post.title}</h2>
      <p>
        <small>{post.createdAt}</small>
      </p>
      <p style={{ whiteSpace: "pre-wrap", lineHeight: 1.6 }}>{post.content}</p>
      <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
        <Link to={`/posts/${post.id}/edit`}>수정하기</Link>
        <button
          type="button"
          onClick={() => {
            if (window.confirm("정말 삭제하시겠습니까?")) {
              onDelete(post.id);
              navigate("/posts");
            }
          }}
        >
          삭제하기
        </button>
      </div>
    </section>
  );
}
