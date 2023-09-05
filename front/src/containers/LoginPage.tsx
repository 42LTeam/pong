import React from "react";

import "../css/main.css";
// @ts-ignore

import Button from "../components/utils/Button";

const LoginPage = function () {
  const handleLogin = () => {
    window.location.href = import.meta.env.VITE_API_URL + "3000:auth/login";
  };

  return (
    <div className="login-page">
      <Button
        handleClick={() =>
          (window.location.href = "localhost" + ":3000/auth/login")
        } //ATTONSION HARDCODE
        text={"Connection"}
        clickable
        buttonProps={{
          style: {
            width: "300px",
            height: "60px",
            fontSize: "40px",
          },
        }}
      />
    </div>
  );
};

export default LoginPage;
