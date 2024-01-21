//사용자 계정 페이지

//사용자 회원가입 + 프로필 업데이트
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useState } from "react";
// 파이어베이스에서 사용자 인증
import { auth } from "../firebase";
// 페이지 이동을 위함 (회원가입 후 페이지 이동)
import { Link, useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import {
  Form, Error , Input , Switcher , Title , Wrapper,
} from "../components/auth-components";
//깃허브 연동을 위함
import GithubButton from "../components/github-btn";


export default function CreateAccount() {
  // 페이지 이동을 위함
  const navigate = useNavigate();
  // 로딩 화면을 위함
  const [isLoading, setLoading] = useState(false);
  // 회원가입 입력 부분
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // 에러 시
  const [error, setError] = useState("");

  //입력 값 관리 -->> 다 입력되었는지 확인용
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;
    if (name === "name") {
      setName(value);
    } else if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  //제출 시 
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); //새로고침이 되지 않도록 하는 것
    setError("");
    //입력 칸이 비었을 시 상황 종료 -->> 즉 다 입력되어 있어야 실행이 됨
    if (isLoading || name ==="" || email === "" || password === "" ) 
    return;
   
    try { //사용자 생성 
      setLoading(true);
      //credentials -> 예기치 못한 상황이 오면 여기로 와짐
     const credentials = await createUserWithEmailAndPassword(
      auth, email , password
     );
    
      //프로필 업데이트 하고 홈으로 가짐
      await updateProfile(credentials.user, {
        displayName: name,
      });
      navigate("/");

      //오류 시 처리 부분
    } catch (e) {
      if ( e instanceof FirebaseError){//파이베이스에서 요인이 있으면 에러 발생
        setError(e.message);
      }
    } finally {
      setLoading(false);
    }
  };


  return (
    <Wrapper>
      <Title>🔒Join 𝕏</Title>
      <Form onSubmit={onSubmit}>
        <Input
          onChange={onChange}
          name="name"
          value={name}
          placeholder="Name"
          type="text"
          required //필수일 때 사용
        />
        <Input
          onChange={onChange}
          name="email"
          value={email}
          placeholder="Email"
          type="email"
          required
        />
        <Input
          onChange={onChange}
          value={password}
          name="password"
          placeholder="Password"
          type="password"
          required
        />
        <Input
          type="submit"
          value={isLoading ? "Loading..." : "Create Account"}//제출 시 로딩화면
        />
      </Form> {/*에러 발생 시 파이어베이스에러*/}
      {error !== "" ? <Error>{error}</Error> : null} 
      
      {/*회원가입 버튼 밑에 */}
      <Switcher>
        이미 계정이 있나요?? 
        <Link to ="/login">
           로그인 하러 가기&rarr;
        </Link>
      </Switcher>
      <GithubButton/>
    </Wrapper>
  );
}