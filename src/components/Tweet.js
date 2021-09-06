import { faPencilAlt, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { dbService, storageService } from "fbInstance";
import React, { useState } from "react";

const Tweet = ({ tweetObj, isOwner }) => {
    const [editTweet, setEditTweet] = useState(false);
    const [newTweet, setNewTweet] = useState(tweetObj.text);

    const onDeleteClick = async() => {
        const ok = window.confirm("Are you sure you want to delete this tweet?");
        if(ok){
            await dbService.doc(`tweets/${tweetObj.id}`).delete();
            await storageService.refFromURL(tweetObj.imageFileUrl).delete();
        }
    };

    const toggleEditTweet = () => setEditTweet((prev) => !prev);
    const onSubmit = async (e) => {
        e.preventDefault();
        await dbService.doc(`tweets/${tweetObj.id}`).update({
            text: newTweet,
        });
        setEditTweet(false);
    };

    const onChange = (e) => {
        const {target: {value}} = e;
        setNewTweet(value);
    };

    return (
        <div className="tweet">
            { editTweet ? (
                <>
                    { isOwner && (
                        <>
                            <form onSubmit={onSubmit} className="container tweetEdit">
                                <input 
                                    type="text" 
                                    placeholder="Edit Your Tweet" 
                                    onChange={onChange} 
                                    value={newTweet} 
                                    required
                                    autoFocus
                                    className="formInput"
                                />
                                <input type="submit" value="Update Tweet" className="formBtn"/>
                            </form> 
                            <span onClick={toggleEditTweet} className="formBtn cancelBtn">
                                Cancel  
                            </span>
                        </>
                    )}
                </>
            ) : (
                <>
                    <h4>{tweetObj.text}</h4>
                    {tweetObj.imageFileUrl && <img src={tweetObj.imageFileUrl} alt="uploading img"/>}
                    {isOwner && (
                        <div className="tweet_actions">
                            <span onClick={onDeleteClick}>
                                <FontAwesomeIcon icon={faTrash} />
                            </span>
                            <span onClick={toggleEditTweet}>
                                <FontAwesomeIcon icon={faPencilAlt} />
                            </span>
                        </div>
                    )}
                </>
            )}
        </div>
    )}
export default Tweet;