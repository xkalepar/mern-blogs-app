import React, { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "../components/UserContext";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../components/AuthContext";

const RegisterPage = ({login}) => {
  const {login: regist} = useAuth()
    const [username, setusername] = useState("");
    const [password, setpassword] = useState("");
    const [resMsg, setResMsg] = useState("");
    const [form, setForm] = useState(true);
    const { setUserInfo } = useContext(UserContext);

    const navigate = useNavigate();

    const loginHandler = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:3001/api/v1/register", {
            method: "POST",
            body: JSON.stringify({ username, password }),
            headers: { "Content-type": "application/json" },
            credentials: "include",
        });

        if (response.ok) {
            const data = await response.json();
            const userInfo = data;
            setUserInfo(userInfo)
            setResMsg("succes");
            regist()
            setForm(true);
            navigate("/");
            // redirect the user to the home page
        } else {
            const data = await response.json();
            const errorMsg = data.error;
            setResMsg(errorMsg);
            setForm(!form)
        }
    };

    return (
        <div className="login-box">
        <form className="login" onSubmit={loginHandler}>
          <div className="user-box">
            {/* <input type="text" name="" required="" /> */}
               <input
              type="text"
           name="username"
           value={username}
           required
           onChange={(ev) => setusername(ev.target.value)}
          //  placeholder="username"
           className={form ? 'sucess' : 'fail'}
       />
            <label>Username</label>
          </div>
          <div className="user-box">
            {/* <input type="password" name="" required="" /> */}
            <input
              type="text"
              name="password"
              required
              value={password}
              onChange={(ev) => setpassword(ev.target.value)}
              // placeholder="username"
              className={form ? 'sucess' : 'fail'}
          />
            <label>Password</label>
          </div>
          <center>
            <button>
              Sign Up
              <span></span>
            </button>
          </center>
          <p className={`result ${form ? "succes" : "fail"}`}>{resMsg}</p>
        </form>
      </div>
    );
};

export default RegisterPage;
