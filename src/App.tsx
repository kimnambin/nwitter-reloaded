import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./components/layout";
import Home from "./routes/home";
import Profile from "./routes/profile";
import Login from "./routes/login";
import CreateAccount from "./routes/create-account";
import { createGlobalStyle, styled } from "styled-components";
import reset from "styled-reset";
import { useEffect, useState } from "react";
import LoadingScreen from "./components/loading-screen";
import { auth } from "./firebase";
// 로그인 시 로그인한 사용자를 위함
import ProtectedRoute from "./components/protected-route";

//라우터 사용(브라우저 라우터) -->> 라우터 완전 감싸기!!
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute> {/*ProtectedRoute -> 이게 있다는 건 로그인한 사용자를 위한 것 */}
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
    ],
  },

  
//레이아웃을 로그인한 사용자만 사용하게 만들기
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/create-account",
    element: <CreateAccount />,
  },
]);

const GlobalStyles = createGlobalStyle`
  ${reset};
  * {
    box-sizing: border-box;
  }
  body {
    background-color: black;
    color:white;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
`;

//여기가 회원가입 부분
const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  `;

function App() {
  //islodadin 로딩 페이지
  const [isLoading, setLoading] = useState(true);
  const init = async () => {
    // firebase 사용자 인증 부분
    await auth.authStateReady();
    setLoading(false);
  };
  useEffect(() => {
    init();
  }, []);
  return (
    <Wrapper> {/*여기가 회원가입 부분 */}
      <GlobalStyles />
      {isLoading ? <LoadingScreen /> : <RouterProvider router={router} />}
    </Wrapper>
  );
}

export default App;