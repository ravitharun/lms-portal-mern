import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
function Auth() {
  const navigate = useNavigate("");
  useEffect(() => {
    const check = () => {
      let logined = localStorage.getItem("isLogin");
      if (logined === "false" || !logined) {
        navigate("/LMS/login");
      } else {
        console.log("User is logged in");
      }
    };
    check();
  }, [navigate]);

  return <>
  
  
  
  
  </>;
}

export default Auth;
