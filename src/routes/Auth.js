import { faGithub, faGoogle, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AuthForm from "components/AuthForm";
import { authService, firebaseInstance } from "fbInstance";
import React from "react";

const Auth = () => {
    const onSocialClick = async (e) => {
        const {
            target: {name}
        } = e;

        let provider;

        if(name === "google") {
            provider = new firebaseInstance.auth.GoogleAuthProvider();
        } else if(name === "github") {
            provider = new firebaseInstance.auth.GithubAuthProvider();
        } else if(name === "twitter") {
            provider = new firebaseInstance.auth.TwitterAuthProvider();
        }
        await authService.signInWithPopup(provider);
    };

    return (
        <div className="authContainer">
            <FontAwesomeIcon
                icon={faTwitter}
                color={"#04AAFF"}
                size="3x"
                style={{ marginBottom: 30 }}
            />
            <AuthForm />
            <div className="authBtns">
                <button name="google" onClick={onSocialClick} className="authBtn">
                    Continue with Google <FontAwesomeIcon icon={faGoogle} />
                </button>
                <button name="twitter" onClick={onSocialClick} className="authBtn">
                    Continue with Twitter <FontAwesomeIcon icon={faTwitter} />
                </button>
            </div>
        </div>
    );
}
export default Auth;