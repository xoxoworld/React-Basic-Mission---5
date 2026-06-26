import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function PostNew({ onCreate }) {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      alert("제목과 내용을 입력해 주세요.");
      return;
    }
    const newId = onCreate({ title, content });
    navigate(`/posts/${newId}`);
  };

  return (
    <section>
      <h2>글 작성</h2>
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
        <button type="submit">등록</button>
      </form>
    </section>
  );
}
