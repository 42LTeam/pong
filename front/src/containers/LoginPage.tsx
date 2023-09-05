import React from "react";

import "../css/main.css";
// @ts-ignore

import { useNavigate } from "react-router-dom";
import Button from "../components/utils/Button";

const LoginPage = function () {

    const handleLogin = () => {
      alert("CONARD");
      console.log("ASDASDS");
        // alert(import.meta.env.VITE_API_URL + "3000:auth/login");
        // window.location.href = import.meta.env.VITE_API_URL + "3000:auth/login";
    }

    console.log("JAI CHARGE");

  return (
    <div className="login-page">
      <Button
        handleClick={() => handleLogin}
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