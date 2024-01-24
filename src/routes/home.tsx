
// 파이어베이스 인증을 통해 검증된 사람만 올 수 있음
import { auth } from "../firebase";
import { styled } from "styled-components";
import PostTweetForm from "../components/post-tweet-form";
import Timeline from "../components/timeline";

const Wrapper = styled.div`
display: grid;
  gap: 50px;
  overflow-y: scroll;
  grid-template-rows: 1fr 5fr;
`;

export default function Home() {
  const logOut = () => {
    auth.signOut();
  };
    return (
      <Wrapper>
      <PostTweetForm />
      <Timeline />
    </Wrapper>
  );
  }