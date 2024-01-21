
// 파이어베이스 인증을 통해 검증된 사람만 올 수 있음
import { auth } from "../firebase";

export default function Home() {
  const logOut = () => {
    auth.signOut();
  };
    return (
      <h1>
        <button onClick={logOut}>🔓Log out</button>
      </h1>
    );
  }