//islodaing

import { styled } from "styled-components";

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Text = styled.span`
  font-size: 24px;
`;

export default function LoadingScreen() {
  return (
    <Wrapper> {/*여기서 래퍼는 화면을 감싸주는 역할*/}
      <Text>Loading...</Text>
    </Wrapper>
  );
}