// 트위터 타임라인 

import {
    collection,
    
    limit,
    onSnapshot,
    orderBy,
    query,
  } from "firebase/firestore";
  import { useEffect, useState } from "react";
  import { styled } from "styled-components";
  import { db } from "../firebase";
  import Tweet from "./tweet";
  import { Unsubscribe } from "firebase/auth";
  
  export interface ITweet {
    id: string;
    createdAt: number;
  }
  
  const Wrapper = styled.div`
    display: flex;
    gap: 10px;
    flex-direction: column;
    overflow-y : scroll;
  `;
  
  export default function Timeline() {
    const [tweets, setTweet] = useState<ITweet[]>([]);

//데이터 베이스 실시간 쿼리 (추가/수정...)
    useEffect(() => {
        let unsubscribe: Unsubscribe | null = null;
        const fetchTweets = async () => {
          const tweetsQuery = query(
            collection(db, "tweets"),
            orderBy("createdAt", "desc"),
            limit(25)
          );
        //onsnapshot -->> 실시간으로 리스너와 연결해줌
          unsubscribe = await onSnapshot(tweetsQuery, (snapshot) => {
            const tweets = snapshot.docs.map((doc) => {
              const { tweet, createdAt, userId, username, photo } = doc.data();
              return {
                tweet,
                createdAt,
                userId,
                username,
                photo,
                id: doc.id,
              };
            });
            setTweet(tweets);
          });
        };
        fetchTweets();
        return () => {
          unsubscribe && unsubscribe();
        };
      }, []);
      return (
        <Wrapper>
             {tweets.map((tweet) => (
        <Tweet key={tweet.id} {...tweet} />
      ))}
    </Wrapper>
  );
}



