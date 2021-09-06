import Tweet from "components/Tweet";
import TweetFactory from "components/TweetFactory";
import { dbService } from "fbInstance";
import React, { useEffect, useState } from "react";

const Home = ({ userObj }) => {
    const [tweets, setTweets] = useState([]);

    useEffect(() => {
        dbService.collection("tweets").onSnapshot((snap) => {
            const tweetArray = snap.docs.map(doc => ({
                id : doc.id,
                ...doc.data()
            }));
            tweetArray.sort((a, b) => b.createDate - a.createDate);
            setTweets(tweetArray);
        });
    }, []);

    return (
        <div className="container">
            <TweetFactory userObj={userObj}></TweetFactory>
            <div style={{ marginTop: 30 }}>
                {tweets.map(tweet => 
                    <Tweet key={tweet.id} tweetObj={tweet} isOwner={tweet.uid === userObj.uid}/>
                )}
            </div>
        </div>
    )};
export default Home;