import { Outlet } from "react-router-dom";
import Header from "./Header";

export default function Layout({ loaded }) {
  return (
    <div style={{ maxWidth: 860, margin: "0 auto", padding: 16 }}>
      <Header />
      {loaded ? <Outlet /> : <p>로딩 중...</p>}
    </div>
  );
}
