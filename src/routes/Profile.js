import { authService, dbService } from "fbInstance";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const Profile = ({ refreshUser, userObj }) => {
    const history = useHistory();
    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
    const onLogoutClick = () => {
        authService.signOut();
        console.log("logout");
        history.push("/");
    };
    
    const getMyTweet = async () => {
       await dbService
                .collection("tweets")
                .where("uid", "==", userObj.uid)
                .orderBy("createDate", "desc")
                .get();
    }

    useEffect(() => {
        getMyTweet();
    }, []);

    const onChange = (e) => { 
        const {
            target: { value }
        } = e;
        console.log(value);
        setNewDisplayName(value);
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        if(userObj.displayName !== newDisplayName) {
            await userObj.updateProfile({displayName: newDisplayName,});
            refreshUser();
        }
    };

    return (
        <div className="container">
            <form onSubmit={onSubmit} className="profileForm">
                <input 
                    onChange={ onChange }
                    type="text" 
                    placeholder="Display Name"
                    value={newDisplayName}
                    autoFocus
                    className="formInput"
                />
                <input 
                    type="submit"
                    value="Update Profile"
                    className="formBtn"
                    style={{ marginTop: 10 }}
                />
            </form>
            <span className="formBtn cancelBtn logOut" onClick={onLogoutClick}>
                Log Out
            </span>
        </div>
    )

};
export default Profile;