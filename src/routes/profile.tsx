import { styled } from "styled-components";
import { auth, db , storage } from "../firebase";
import { useEffect , useState } from "react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { updateProfile } from "firebase/auth";
import {
  collection,
  
  getDocs,
  limit,
  orderBy,
  query,
  where,  
  
} from "firebase/firestore";
import { ITweet } from "../components/timeline";
import Tweet from "../components/tweet";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 20px;
`;
const AvatarUpload = styled.label`
  width: 80px;
  overflow: hidden;
  height: 80px;
  border-radius: 50%;
  background-color: #1d9bf0;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  svg {
    width: 50px;
  }
`;

const AvatarImg = styled.img`
  width: 100%;
`;
const AvatarInput = styled.input`
  display: none;
`;
const Name = styled.span`
  font-size: 22px;
`;
const Tweets = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 10px;
`;



export default function Profile() {
  const user = auth.currentUser;
   //로그인이 되어 있다면 아바타 보여주기
  const [avatar , setAvatar] = useState(user?.photoURL);
 //조건에 맞는 트윗 가져오기!!
 const [tweets , setTweets ] = useState<ITweet[]>([]);
  //아이콘을 누를 때마다 파일 열기
//이미지를 선택하고 업로드 할 수 있도록 함
  const onAvatarChange = async ( e: React.ChangeEvent<HTMLInputElement>) =>
  {
    const { files } = e.target;
    if(!user) return;
    if(files && files.length === 1) {
      const file = files[0];
      const locationRef = ref(storage,`avatars/${user?.uid}`);
      const result = await uploadBytes(locationRef , file);
      const avatarUrl = await getDownloadURL(result.ref);
      setAvatar(avatarUrl);
      await updateProfile(user,{photoURL: avatarUrl,});
    
    }
  };
  //로그인한 사용자의 트윗 가져오기!! -> fetch 사용
  //파이어 베이스와 연동해서 해당 조건만 가져오기
  //파이어베이스 사용할 때 정확히 어떤 필터를 사용할지 정해줘야함
    const fetchTweets = async () => {
      const tweetQuery = query(
        collection(db , "tweets"),
        where ("userId" , "==" , user?.uid),
        orderBy("createdAt" , "desc"),
        limit(25)
      );
      const snapshot = await getDocs(tweetQuery);
      const tweets = snapshot.docs.map((doc) => {
        const { tweet , createdAt , userId , username , photo} = doc.data();
        return {
          tweet , createdAt , userId , username , photo , id:doc.id,

        };
      });
      setTweets(tweets);
    };
    useEffect (() => {
      fetchTweets ();
    }, []);
  
   
  return (
      <Wrapper>
        <AvatarUpload htmlFor="avatar">
          {avatar ? (
            <AvatarImg src = {avatar} />
          ) : (
            <svg
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path d="M10 8a3 3 0 100-6 3 3 0 000 6zM3.465 14.493a1.23 1.23 0 00.41 1.412A9.957 9.957 0 0010 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 00-13.074.003z" />
          </svg>
          )}
        </AvatarUpload>
        <AvatarInput
        onChange = {onAvatarChange}
        id = "avatar"
        type = "file"
        accept = "image/*"
        />
        <Name>
          {user?.displayName ?? "Anoymous"}
        </Name>
       
        <Tweets>
          {tweets.map((tweet)=> (
            <Tweet key = {tweet.id} {...tweet} />
          ))}
        </Tweets>
      </Wrapper>
    );

  }

