import { useState, useMemo } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

export default function PostEdit({ posts, onUpdate }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const post = useMemo(
    () => posts.find((p) => Number(p.id) === Number(id)),
    [posts, id]
  );

  const [title, setTitle] = useState(post?.title ?? "");
  const [content, setContent] = useState(post?.content ?? "");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      alert("제목과 내용을 입력해 주세요.");
      return;
    }
    onUpdate(id, { title, content });
    navigate(`/posts/${id}`);
  };

  if (!post) {
    return (
      <section>
        <h2>글이 없습니다</h2>
        <Link to="/posts">목록으로</Link>
      </section>
    );
  }

  return (
    <section>
      <h2>글 수정</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 8 }}>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="제목"
            style={{ width: "100%", padding: 8 }}
          />
        </div>
        <div style={{ marginBottom: 8 }}>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="내용"
            rows={8}
            style={{ width: "100%", padding: 8 }}
          />
        </div>
        <button type="submit">수정 완료</button>
      </form>
    </section>
  );
}
