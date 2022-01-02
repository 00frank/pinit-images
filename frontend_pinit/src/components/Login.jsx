import React from "react";
import GoogleLogin from "react-google-login";
import { useNavigate } from "react-router-dom";
import { FcGoogle as GoogleIcon } from "react-icons/fc";
import { client as sanityClient } from "../client/sanityClient";

// assets
import logo from "../assets/logowhite.png";
import video from "../assets/share.mp4";

function Login() {
  const navigate = useNavigate();

  const responseGoogle = async (response) => {
    if (!response.error) {
      localStorage.setItem("user", JSON.stringify(response.profileObj));
      const { familyName, givenName, googleId, imageUrl } = response.profileObj;
      const doc = {
        _id: googleId,
        _type: "user",
        userName: `${givenName}${familyName !== null || familyName !== "" ? " " + familyName : ""}`,
        image: imageUrl,
      };
      await sanityClient.createIfNotExists(doc);
      navigate("/", { replace: true });
    }
  };

  return (
    <div className="flex justify-start items-center flex-col h-screen">
      <div className="relative w-full h-full">
        <video
          src={video}
          type="video/mp4"
          loop
          controls={false}
          muted
          autoPlay
          className="w-full h-full object-cover"
        />
        <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay">
          <div className="p-5">
            <img src={logo} width="130px" alt="pinit logo" />
          </div>
          <div className="shadow-2xl">
            <GoogleLogin
              clientId={process.env.REACT_APP_GOOGLE_API_TOKEN}
              render={(buttonProps) => (
                <button
                  className="bg-mainColor flex justify-center items-center p-3 rounded-lg outline-none"
                  type="button"
                  onClick={buttonProps.onClick}
                  disabled={buttonProps.disabled}
                >
                  <GoogleIcon className="mr-4" />
                  Iniciar sesión con Google
                </button>
              )}
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy="single_host_origin"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
