import { useState, useEffect, useMemo } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Posts from "./pages/Posts";
import PostNew from "./pages/PostNew";
import PostDetail from "./pages/PostDetail";
import PostEdit from "./pages/PostEdit";
import NotFound from "./pages/NotFound";

export default function App() {
  const [posts, setPosts] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const res = await fetch("/data/blog.json");
        if (!res.ok) throw new Error("초기 데이터를 불러오지 못했습니다.");
        const data = await res.json();
        if (active) setPosts(data);
      } catch (err) {
        console.error(err);
        if (active) setPosts([]);
      } finally {
        if (active) setLoaded(true);
      }
    })();

    return () => {
      active = false;
    };
  }, []);

  const handleDelete = (id) => {
    const targetId = Number(id);
    setPosts((prev) => prev.filter((post) => Number(post.id) !== targetId));
  };

  const nextId = useMemo(
    () => posts.reduce((max, post) => Math.max(max, Number(post.id)), 0) + 1,
    [posts]
  );

  const handleCreate = ({ title, content }) => {
    const newPost = {
      id: nextId,
      title: title.trim(),
      content: content.trim(),
      createdAt: new Date().toISOString().slice(0, 10),
    };
    setPosts((prev) => [newPost, ...prev]);
    return newPost.id;
  };

  const handleUpdate = (id, { title, content }) => {
    const targetId = Number(id);
    setPosts((prev) =>
      prev.map((post) =>
        Number(post.id) === targetId
          ? { ...post, title: title.trim(), content: content.trim() }
          : post
      )
    );
  };

  return (
    <Routes>
      <Route path="/" element={<Layout loaded={loaded} />}>
        <Route index element={<Home posts={posts} />} />
        <Route path="posts" element={<Posts posts={posts} />} />
        <Route path="posts/new" element={<PostNew onCreate={handleCreate} />} />
        <Route
          path="posts/:id"
          element={<PostDetail posts={posts} onDelete={handleDelete} />}
        />
        <Route
          path="posts/:id/edit"
          element={<PostEdit posts={posts} onUpdate={handleUpdate} />}
        />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
