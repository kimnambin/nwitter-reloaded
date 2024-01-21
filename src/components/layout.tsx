// outlet은 프로필 컴포넌트 대체

import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
     
      <Outlet />
    </>
  );
}