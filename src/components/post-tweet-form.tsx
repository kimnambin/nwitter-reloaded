//트윗을 올리는 곳

import { addDoc , collection, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { styled } from "styled-components"
import { auth , db, storage } from "../firebase";
import { getDownloadURL, ref , uploadBytes } from "firebase/storage";


const Form = styled.form `
display : flex;
flex-direction: column;
gap : 10px;
`;

const TextArea = styled.textarea`
border: 2px solid white;
  padding: 20px;
  border-radius: 20px;
  font-size: 16px;
  color: white;
  background-color: black;
  width: 100%;
  resize: none;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  &::placeholder {
    font-size: 16px;
  }
  &:focus {
    outline: none;
    border-color: #1d9bf0;
  }
`;
const AttachFileButton = styled.label`
  padding: 10px 0px;
  color: #1d9bf0;
  text-align: center;
  border-radius: 20px;
  border: 1px solid #1d9bf0;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
`;

const AttachFileInput = styled.input`
  display: none;
`;

const SubmitBtn = styled.input`
  background-color: #1d9bf0;
  color: white;
  border: none;
  padding: 10px 0px;
  border-radius: 20px;
  font-size: 16px;
  cursor: pointer;
  &:hover,
  &:active {
    opacity: 0.9;
  }
`;

export default function PostTweetForm(){
    const [isLoading, setLoading] = useState(false);
    //tweet -> 트윗 내용을 저장
    const [tweet , setTweet] = useState("");
    //이미지를 업로드 하는 것 (상태 ->> 파일 업로드 || 비어있다)
    const [file, setfile] = useState <File | null>(null);
    //onchange -->> 파일을 업로드 하기 위함
    const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setTweet(e.target.value);
    };
    //파일 1개를 업로드 하기 위한 함수 
    const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if(files && files.length===1) {
        setfile(files[0]);
    }
    };

    //데이터 추가하기 (데이터베이스)
    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) =>
    {
        e.preventDefault();
        const user = auth.currentUser;
         //글자수가 180자가 넘으면 추가 x
         if (!user || isLoading || tweet === "" || tweet.length > 180)
         return;
try {
    setLoading(true);
     //addDoc -> 파이어베이스 기능으로 새로운 document를 생성해줌
    const doc = await addDoc(collection(db, "tweets"),
    {
        tweet, 
        createdAt: Date.now(),
        username: user.displayName || "Anonymous",
        userId : user.uid, //삭제할 시 삭제할 권한이 있는지 확인 (본인 확인)
    });

//유저가 파일을 올렸는 지 확인 + 파일 url을 알아버기 쉽게 유저 아이디-이름으로
if (file) {
    const locationRef= ref (
        storage,//트윗을 올릴 때 마다 해당 유저 폴더 생성(유니크 아이디)
        `tweets/${user.uid}/${doc.id}`
    );
    const result = await uploadBytes(locationRef, file);
    const url = await getDownloadURL(result.ref);
    await updateDoc(doc, {
        photo : url,
    });
}
setTweet ("");
    setfile(null);
}

catch (e) {
    console.log(e);
} finally{
    setLoading(false);
}
    };
   
   
     
    
    return (
        <Form onSubmit={onSubmit}>
            <TextArea
            required
             rows={5}
             maxLength={180}
             onChange={onChange}
             value={tweet}
             placeholder="무슨일이야?!🤔🤔"
           />

           <AttachFileButton htmlFor='file'>
            {/*업로드 전 : 파일 업로드 // 업로드 후 : 업로드 완료*/}
            {file ? "업로드 완료✅" : "파일 업로드"} 
           </AttachFileButton>

         {/*여기가 실질적으로 파일 업로드하는 부분*/}
        <AttachFileInput 
        onChange= {onFileChange}
        type = "file"
        id= "file"
        accept="image/*"
        />


        <SubmitBtn 
        type = "submit"
        value = {isLoading ? "포스팅중 ..." : "포스팅"}
        />

        </Form>
    );
}



