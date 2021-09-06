import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid"
import { storageService, dbService } from "fbInstance";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";

const TweetFactory = ({ userObj }) => {
    const [tweet, setTweet] = useState("");
    const [imageFile, setImageFile] = useState("");

    const onSubmit = async (e) => {
        if(tweet === "") {
            return;
        }

        e.preventDefault();
        let imageFileUrl = "";
        if(imageFile !== ""){
            const imageFileRef = storageService.ref().child(`${userObj.uid}/${uuidv4()}`);
            const response = await imageFileRef.putString(imageFile, "data_url");
            imageFileUrl = await response.ref.getDownloadURL();
        }
        const tweetObj = {
            text: tweet,
            uid: userObj.uid, 
            createDate: Date.now(),
            imageFileUrl
        };
        await dbService.collection("tweets").add(tweetObj);
        setTweet("");
        setImageFile("");
    }
    
    const onChange = (e) => {
        const {
            target: { value },
        } = e;
        setTweet(value);
    }

    const onImgaeChange = (e) => {
        const { target: {files} } = e;
        const file = files[0];
        const reader = new FileReader();
        reader.onload = (finishedEvent) => {
            const {currentTarget: { result } } = finishedEvent;
            setImageFile(result);
        };
        reader.readAsDataURL(file);
    }

    const onClearImageFile = () => setImageFile("");


    return (
    <form onSubmit={onSubmit} className="factoryForm">
        <div className="factoryInput__container">
            <input 
                value={tweet}
                onChange={onChange}
                type="text"
                placeholder="What's on your mind?"
                maxLength={120}
            />
            <input type="submit" value="&rarr;" className="factoryInput__arrow" />
        </div>

        <label htmlFor="image-file" className="factoryInput__label">
            <span>Add photos</span>
            <FontAwesomeIcon icon={faPlus} />
        </label>

        <input 
            id="image-file"
            type="file"
            accept="image/*"
            onChange={onImgaeChange}
            style={{
                opacity : 0
            }}
        />
        { imageFile && (
            <div className="factoryForm__imageFile">
                <img
                    src={imageFile}
                    style={{
                        backgroundImage: imageFile
                    }}
                    alt="test"
                />

                <div className="factoryForm__clear" onClick={onClearImageFile}>
                    <span>Remove</span>
                    <FontAwesomeIcon icon={faTimes} />
                </div>
            </div>
        )}
    </form>
    )}

export default TweetFactory;