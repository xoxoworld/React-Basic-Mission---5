import { Link, NavLink } from "react-router-dom";

export default function Header() {
  const activeStyle = ({ isActive }) => ({
    fontWeight: isActive ? 700 : 400,
    textDecoration: "none",
  });

  return (
    <header style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 16 }}>
      <h1 style={{ margin: 0, fontSize: 20 }}>
        <Link to="/" style={{ textDecoration: "none" }}>
          Router Mission Blog
        </Link>
      </h1>
      <nav style={{ display: "flex", gap: 12 }}>
        <NavLink to="/" style={activeStyle} end>
          Home
        </NavLink>
        <NavLink to="/posts" style={activeStyle}>
          Posts
        </NavLink>
        <NavLink to="/posts/new" style={activeStyle}>
          Write
        </NavLink>
      </nav>
    </header>
  );
}
