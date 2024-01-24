// 트윗부분

import { styled } from "styled-components";
import { ITweet } from "./timeline";
import { auth , db , storage} from "../firebase";
import { deleteDoc , doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  padding: 20px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 15px;
`;

const Column = styled.div``;

const Photo = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 15px;
`;

const Username = styled.span`
  font-weight: 600;
  font-size: 15px;
`;

const Payload = styled.p`
  margin: 10px 0px;
  font-size: 18px;
`;

//삭제 버튼 
const DeleteButton = styled.button`
background-color: tomato;
color: white;
font-weight: 600;
border: 0;
font-size: 12px;
padding: 5px 10px;
text-transform: uppercase;
border-radius: 5px;
cursor: pointer;
`;

//트윗 올린거에 네임 , 포토 , 트윗 이렇게 보여주겠다
export default function Tweet({ username, photo, tweet, userId, id }: 
  ITweet) {
      //본인이 맞은 경우 삭제할 수 있도록 함 (확인하는 작업)
      const user = auth.currentUser;
      const onDelete = async () => {
        const ok = confirm ("정말로 삭제하니??");
        if (!ok || user?.uid !== userId) return;
        try {
          await deleteDoc (doc (db, "tweets" , id));
          if (photo){
            const photoRef = ref(storage, `tweets/${user.uid}/${id}`);
            await deleteObject(photoRef);
          }
        }
        catch (e) {
          console.log(e);
        } finally {
          //
        }
      };
        return (
        <Wrapper>
            <Column>
            <Username>{username}</Username>
            <Payload>{tweet}</Payload> {/*payload ->> 전송되거나 전송되는 실제 데이터 */}
             {/*본인인지 확인하는 작업 */}
             {user?.uid === userId? (
              <DeleteButton onClick =
              {onDelete}>Delete</DeleteButton>
             ): null}
            </Column>
            {photo ? (
                <Column>
                <Photo src = {photo}/>
                </Column>
            ): null }
        </Wrapper>
        );
    }